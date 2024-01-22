import { useEffect, useId, useState } from 'react'
import './ProjectsList.css'
import { getProjects } from '../../utils/fetch.utils'
import { Collection, Project } from '../../types/application.types'
import { FaPlus } from 'react-icons/fa'
import Constants from '../../constants/options.constants'
import ProjectListCard from '../../components/ProjectComponents/ProjectListCard'

const ProjectsList = () => {
    const [projectsList, setProjectsList] = useState<Collection | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjects()
            console.log(projects)
            setProjectsList(projects)
        }
        fetchProjects()
    }, [])

    return (
        <div className='projectsList'>
            <div className='projects'>
                {projectsList &&
                    projectsList.map((project: Project, index: number) => {
                        return (
                            <ProjectListCard
                                id={project.id}
                                name={project.name}
                                launcheables={project.launcheables}
                                dockers={project.dockerList}
                                key={index}
                            />
                        )
                    })}
            </div>
            <div className='addProject'>
                <FaPlus size={Constants.iconsSize + 10} />
            </div>
        </div>
    )
}

export default ProjectsList
