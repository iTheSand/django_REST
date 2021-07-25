import React from 'react'

const MenuList = ({menu}) => {
    return (
        <table>
            <th>
                <p><a href="">List</a></p>
            </th>
            <th>
                <p><a href="">Add</a></p>
            </th>
            <th>
                <p><a href="">Change</a></p>
            </th>
            <th>
                <p><a href="">Delete</a></p>
            </th>
        </table>
    )
}

export default MenuList