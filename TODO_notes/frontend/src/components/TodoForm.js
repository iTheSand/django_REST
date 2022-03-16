import React from 'react'
import project from "./Project";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'project': props.project[0].id,
            'users': props.users[0].id
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //
    // handleProjectChange(event) {
    //     if (!event.target.selectedOptions) {
    //         this.setState({
    //             'project': []
    //         })
    //         return;
    //     }
    //
    //     let project = []
    //     for (let i = 0; i < event.target.selectedOptions.length; i++) {
    //         project.push(event.target.selectedOptions.item(i).value)
    //     }
    //     this.setState({
    //         'project': project
    //     })
    // }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.project, this.state.users);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="text" placeholder="text" value={this.state.text}
                       onChange={(event) => this.handleChange(event)}/>
                <select name="project" onChange={(event) => this.handleChange(event)}>
                    {this.props.project.map((item) => <option value={item.id}>{item.name}</option>)}
                </select>
                <select name="user" onChange={(event) => this.handleChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

export default TodoForm