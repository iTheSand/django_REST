import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'project': '',
            'user': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }

        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'project': []
            })
            return;
        }

        let project = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'project': project
        })
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.project, this.state.users);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="text" placeholder="text" value={this.state.text}
                       onChange={(event) => this.handleChange(event)}/>
                <select name="project" onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.project.map((project) => <option value={project.id}>{project.name}</option>)}
                </select>
                <select name="user" onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((users) => <option value={users.id}>{users.username}</option>)}
                </select>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

export default TodoForm