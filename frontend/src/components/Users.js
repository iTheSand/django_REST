import React from 'react'
import { Link } from 'react-router-dom'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                <Link to={`user/${user.id}`}>{user.email}</Link>
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                Firstname
            </th>
            <th>
                Lastname
            </th>
            <th>
                Email
            </th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList