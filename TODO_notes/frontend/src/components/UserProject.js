import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectItem = ({project, users}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.users.map((userId) => {
                    let user = users.find((user) => user.id == userId)
                    if (user) {
                        return user.email + ' '
                    }
                })
                }

            </td>
            <td>
                {project.link_rep}
            </td>
        </tr>
    )
}

const UserProjectList = ({project, users}) => {
    let {id} = useParams();
    let filtered_projects = project.filter((project) => project.users.includes(parseInt(id)));
    return (
        <table>
            <th>
                Id
            </th>
            <th>
                Name
            </th>
            <th>
                Users
            </th>
            <th>
                LinkOfRep
            </th>
            {filtered_projects.map((project) => <ProjectItem project={project} users={users}/>)}
        </table>
    )
}

export default UserProjectList