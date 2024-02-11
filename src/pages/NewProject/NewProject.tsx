import ProjectForm from '../../components/ProjectComponents/ProjectForm'
import { PageProps } from '../../types/interface.types'
import './NewProject.css'

const NewProject = (props: PageProps) => {
    const { nodeVersion } = props;
    console.log(nodeVersion);
    return ( 
        <div className='newProjectBody'>
            <ProjectForm mode="create" nodeVersion={nodeVersion}/>
        </div>
    )
}

export default NewProject
