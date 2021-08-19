import React from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Project.js'
import UserProjectList from './components/UserProject.js'
import TodoList from './components/Todo.js'
import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'
import LoginForm from './components/LoginForm'
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
// import Cookies from 'universal-cookie'
import Cookies from "universal-cookie/lib";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


const Page404 = ({location}) => {
    return <div>
        Page {location.pathname} not found.
    </div>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'project': [],
            'todo': [],
            'token': ''
        }
    }

    is_auth() {
        return !!this.state.token
    }

    get_token_from_storage() {
        const cookie = new Cookies()
        this.setState({'token': cookie.get('token')}, this.get_data)
    }

    get_headers() {
        let header = {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json; version=2.0'
        }
        const cookie = new Cookies()
//        cookie.set('token', response.data.token)
//                console.log(cookie.get('token'))

        header['Authorization'] = 'Token ' + cookie.get('token')

        return header;
    }

    get_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(
                response => {
                    const users = response.data
                    this.setState(
                        {
                            'users': response.data.results
                        })
                })
            .catch(
                error => {
                    this.setState({
                        'users': []
                    })
                    console.log(error)
                }
            )

        axios.get('http://127.0.0.1:8000/api/project/', {headers})
            .then(
                response => {
                    const project = response.data
                    this.setState(
                        {
                            'project': response.data.results
                        })
                })
            .catch(
                error => {
                    this.setState({
                        'project': []
                    })
                    console.log(error)
                }
            )

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(
                response => {
                    const todo = response.data

                    let array_data_is_active = []
                    for (let i = 0; i < response.data.results.length; i++) {
                        if (response.data.results[i].is_active == true)
                            array_data_is_active.push(response.data.results[i])
                    }

                    this.setState(
                        {
                            'todo': array_data_is_active
                        })
                })
            .catch(
                error => {
                    this.setState({
                        'todo': []
                    })
                    console.log(error)
                }
            )
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {
                "username": login,
                "password": password
            })
            .then(
                response => {
                    const cookie = new Cookies()
                    cookie.set('token', response.data.token)
                    this.setState({'token': response.data.token}, this.get_data)
//                this.get_data()
//                console.log(cookie.get('token'))
                }
            ).catch(
            error => console.log(error)
        )
    }

    logout() {
        const cookie = new Cookies()
        cookie.set('token', '')
        this.setState({'token': ''}, this.get_data)
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    // componentDidMount() {
    //     axios.get('http://127.0.0.1:8000/api/users/')
    //         .then(
    //             response => {
    //                 const users = response.data
    //                 this.setState(
    //                     {
    //                         'users': response.data.results
    //                     })
    //             })
    //         .catch(
    //             error => console.log(error)
    //         )
    //
    //     axios.get('http://127.0.0.1:8000/api/project/')
    //         .then(
    //             response => {
    //                 const project = response.data
    //                 this.setState(
    //                 {
    //                     'project': response.data.results
    //                 })
    //             })
    //         .catch(
    //             error => console.log(error)
    //         )
    //
    //     axios.get('http://127.0.0.1:8000/api/todo/')
    //         .then(
    //             response => {
    //                 const todo = response.data
    //                 this.setState(
    //                 {
    //                     'todo': response.data.results
    //                 })
    //             })
    //         .catch(
    //             error => console.log(error)
    //         )
    // }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}/`, {headers})
            .then(response => {
                    // this.setState({project: this.state.project.filter((item) => item.id !== id)}
                    // )}
                    this.get_data()
                }
            ).catch(error => console.log(error))
    }

    createProject(name, users, link_rep) {

        if (!name || users.length == 0) {
            console.log("Empty params:", name, users)
            return;
        }

        const headers = this.get_headers()
        axios.post('http://127.0.0.1:8000/api/project/',
            {
                'name': name,
                'users': users,
                'link_rep': link_rep
            },
            {headers})
            .then(response => {
                    this.get_data()
                }
            ).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`, {headers})
            .then(response => {
                    // this.setState({todo: this.state.todo.filter((item) => item.id !== id)}
                    // )}
                    this.get_data()
                }
            ).catch(error => console.log(error))
    }

    createTodo(text, project, user) {

        const headers = this.get_headers()
        axios.post('http://127.0.0.1:8000/api/todo/',
            {
                'text': text,
                'project': project,
                'user': user
            },
            {headers})
            .then(response => {
                    this.get_data()
            }
            ).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App-header">

                <div>
                    <HashRouter>
                        {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}
                        <MenuList menu={this.menu}/>
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList project={this.state.project}
                                                                                        users={this.state.users}
                                                                                        deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/todo' component={() => <TodoList todo={this.state.todo}
                                                                                 deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                get_token={(login, password) => this.get_token(login, password)}/>}/>
                            <Route exact path='/projects/create' component={() =>
                                <ProjectForm
                                    users={this.state.users}
                                    createProject={(name, users, link_rep) => this.createProject(name, users, link_rep)}
                                />}
                            />
                            <Route exact path='/todo/create' component={() =>
                                <TodoForm
                                    users={this.state.users}
                                    project={this.state.project}
                                    createTodo={(text, project, user) => this.createTodo(text, project, user)}
                                />}
                            />
                            <Route path='/user/:id'>
                                <UserProjectList project={this.state.project} users={this.state.users}/>
                            </Route>
                            <Redirect from='/users' to='/'/>
                            <Route component={Page404}/>
                        </Switch>
                    </HashRouter>
                </div>
                <div className="footer">
                    <Footer footer={this.footer}/>
                </div>
            </div>
        );
    }
}

export default App;