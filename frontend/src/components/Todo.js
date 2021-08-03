import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.text}
            </td>
        </tr>
    )
}

const TodoList = ({todo}) => {
    return (
        <table>
            <th>
                Id
            </th>
            <th>
                Project
            </th>
            <th>
                User
            </th>
            <th>
                Text
            </th>
            {todo.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodoList