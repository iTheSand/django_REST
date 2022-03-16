import React from 'react'
import {Link} from 'react-router-dom'
// import App from "../App";

const MenuList = ({menu}) => {
    return (
        <table>
            <th>
                <Link to='/'>Users</Link>
            </th>
            <th>
                <Link to='/projects'>Projects</Link>
            </th>
            <th>
                <Link to='/projects/create'>Create project</Link>
            </th>
            <th>
                <Link to='/todo'>Todo</Link>
            </th>
            <th>
                <Link to='/todo/create'>Create todo</Link>
            </th>
        </table>
    )
}

export default MenuList