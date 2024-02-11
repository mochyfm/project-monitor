import { useEffect, useState } from 'react'
import './ProjectsList.css'
import { getProjects } from '../../utils/fetch.utils'
import { Collection, Project } from '../../types/application.types'
import { FaPlus } from 'react-icons/fa'
import Constants from '../../constants/options.constants'
import ProjectListCard from '../../components/ProjectComponents/ProjectListCard'
import { useNavigate } from 'react-router-dom'
import { Web } from '../../constants/app.constants'
import { PageProps } from '../../types/interface.types'

const ProjectsList = (props: PageProps) => {
    const { nodeVersion } = props
    const [projectsList, setProjectsList] = useState<Collection | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const projects = await getProjects()
            console.log(projects)
            setProjectsList(projects)
        }

        fetchData()
    }, [])

    return (
        <div className='projectsList'>
            <div className='projects'>
                {projectsList &&
                    projectsList.map((project: Project, index: number) => {
                        return (
                            <ProjectListCard
                                nodeVersion={nodeVersion}
                                id={project.id}
                                name={project.name}
                                launcheables={project.launcheables}
                                dockerList={project.dockerList}
                                key={index}
                            />
                        )
                    })}
            </div>
            <button
                className='addProject'
                onClick={() => navigate(Web.newProject.path)}
            >
                <FaPlus size={Constants.iconsSize + 10} />
            </button>
        </div>
    )
}

export default ProjectsList
