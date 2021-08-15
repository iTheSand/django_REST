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
            'Accept': 'application/json; version=2.0'
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
                    this.setState(
                        {
                            'todo': response.data.results
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
                                                                                        users={this.state.users}/>}/>
                            <Route exact path='/todo' component={() => <TodoList todo={this.state.todo}/>}/>
                            <Route exact path='/login' component={() => <LoginForm
                                get_token={(login, password) => this.get_token(login, password)}/>}/>
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