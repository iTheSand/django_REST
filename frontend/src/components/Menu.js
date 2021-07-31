import React from 'react'
import {Link} from 'react-router-dom'

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
                <Link to='/todo'>Todo</Link>
            </th>
        </table>
    )
}

export default MenuList