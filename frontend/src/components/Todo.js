import React from 'react'


const TodoItem = ({todo, deleteTodo}) => {
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
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todo, deleteTodo}) => {
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
            {todo.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}

export default TodoList