import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'users': [],
            'link_rep': ''
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

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users, this.state.link_rep);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" value={this.state.name}
                       onChange={(event) => this.handleChange(event)}/>
                <select multiple name="users" onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((users) => <option value={users.id}>{users.username}</option>)}
                </select>
                <input type="text" name="link_rep" placeholder="link_rep" value={this.state.link_rep}
                       onChange={(event) => this.handleChange(event)}/>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

export default ProjectForm