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
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

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
            'todo': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(
                response => {
                    const users = response.data
                    this.setState(
                        {
                            'users': response.data.results
                        })
                })
            .catch(
                error => console.log(error)
            )

        axios.get('http://127.0.0.1:8000/api/project/')
            .then(
                response => {
                    const project = response.data
                    this.setState(
                    {
                        'project': response.data.results
                    })
                })
            .catch(
                error => console.log(error)
            )

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(
                response => {
                    const todo = response.data
                    this.setState(
                    {
                        'todo': response.data.results
                    })
                })
            .catch(
                error => console.log(error)
            )
    }

    render() {
        return (
            <div className="App-header">

                <div>
                    <HashRouter>
                        <nav>
                            <MenuList menu={this.menu}/>
                        </nav>
                        <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}  />} />
                        <Route exact path='/projects' component={() => <ProjectList project={this.state.project} users={this.state.users} />} />
                        <Route exact path='/todo' component={() => <TodoList todo={this.state.todo} />} />
                        <Route path='/user/:id'>
                            <UserProjectList project={this.state.project} users={this.state.users} />
                        </Route>
                        <Redirect from='/users' to='/' />
                        <Route component={Page404} />
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