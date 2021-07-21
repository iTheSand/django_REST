import React from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import MenuList from './components/Menu.js'
import Footer from './components/Footer.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(
                response => {
                    const users = response.data
                    this.setState(
                        {
                            'users': users
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
                    <MenuList menu={this.state.menu}/>
                </div>
                <div>
                    <UserList users={this.state.users}/>
                </div>
                <div className="footer">
                    <Footer footer={this.state.footer}/>
                </div>
            </div>
        );
    }
}

export default App;