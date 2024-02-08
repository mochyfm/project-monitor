import { useEffect, useState } from 'react'
import './ProjectsList.css'
import { getProjects } from '../../utils/fetch.utils'
import { Collection, Project } from '../../types/application.types'
import { FaPlus } from 'react-icons/fa'
import Constants from '../../constants/options.constants'
import ProjectListCard from '../../components/ProjectComponents/ProjectListCard'
import { invoke } from '@tauri-apps/api'
import { useNavigate } from 'react-router-dom'
import { Web } from '../../constants/app.constants'

const ProjectsList = () => {
    const [projectsList, setProjectsList] = useState<Collection | null>(null)
    const [nodeVersion, setNodeVersion] = useState<string>('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const [projects, version] = await Promise.all([
                getProjects(),
                invoke<string>('get_node_version').catch(err => {
                    console.error(err)
                    return ''
                })
            ])
            console.log(projects);
            setProjectsList(projects)
            setNodeVersion(version)
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
                                node_version={nodeVersion}
                                id={project.id}
                                name={project.name}
                                launcheables={project.launcheables}
                                dockers={project.dockerList}
                                key={index}
                            />
                        )
                    })}
            </div>
            <button className='addProject' onClick={() => navigate(Web.newProject.path)}>
                <FaPlus size={Constants.iconsSize + 10} />
            </button>
        </div>
    )
}

export default ProjectsList
