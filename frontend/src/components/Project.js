import React from 'react'

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

const ProjectList = ({project, users}) => {
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
                Link of rep
            </th>
            {project.map((project) => <ProjectItem project={project} users={users}/>)}
        </table>
    )
}

export default ProjectList