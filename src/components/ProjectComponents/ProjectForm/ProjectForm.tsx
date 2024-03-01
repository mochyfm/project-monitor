import { useState } from 'react'
import {
    FormLauncheable,
    Launcheable,
    Project,
    ProjectFormProps,
} from '../../../types/application.types'
import './ProjectForm.css'
import ProjectLauncheable from './ProjectLauncheable'
import { v4 as uuid4 } from 'uuid'
import Constants from '../../../constants/options.constants'
import { Bounce, toast } from 'react-toastify'

const ProjectForm = (props: ProjectFormProps) => {
    const { mode, nodeVersion } = props

    const defaultProject = {
        id: uuid4(),
        name: '',
        launcheables: [] as FormLauncheable[],
    }

    const [projectData, setProjectData] = useState<Project>(defaultProject)

    const clearForm = () => {
        setProjectData(defaultProject)
    }

    const removeLauncheable = (idToRemove: string) => {
        setProjectData((prevData) => ({
            ...prevData,
            launcheables: prevData.launcheables.filter(
                (element) => element.id !== idToRemove,
            ),
        }))
    }

    const addLauncheable = () => {
        if (projectData.launcheables.length < Constants.maxLauncheables) {
            const newLauncheable: FormLauncheable = { id: uuid4(), name: '', edited: false }
            setProjectData((prevData) => ({
                ...prevData,
                launcheables: [...prevData.launcheables, newLauncheable],
            }))
        }
    }

    const handleLauncheableChange = (data: Launcheable) => {
        setProjectData((prevData) => ({
            ...prevData,
            launcheables: prevData.launcheables.map((launcheable) =>
                launcheable.id === data.id
                    ? { ...launcheable, ...data }
                    : launcheable,
            ),
        }))
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        setProjectData((prevData) => ({
            ...prevData,
            [target.name]: target.value,
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (projectData.launcheables.length >= 1 && projectData.name !== '') {
            const hasLauncheablesWithContent = projectData.launcheables.every(
                (launcheable: any) => launcheable.edited,
            )
            if (hasLauncheablesWithContent) {
                toast.success('Project Saved!', {
                    position: 'top-center',
                    autoClose: 5000,
                    theme: 'dark',
                    transition: Bounce,
                })
            } else {
                toast.error(
                    'You have a launcheable without content, remove it or add minimum a name on it ',
                    {
                        position: 'top-center',
                        autoClose: 5000,
                        theme: 'dark',
                        transition: Bounce,
                    },
                )
            }
        } else {
            console.error('Debe tener el nombre y 1 o más launcheables')
            console.log(projectData)
        }
    }

    return (
        <form className='projectLauncheablesBlock' onSubmit={handleSubmit}>
            <div className='projectInfo'>
                <input
                    name='name'
                    value={projectData.name}
                    className='projectInfoInput'
                    placeholder='YourProject_01'
                    onChange={handleInput}
                    autoComplete='off'
                />
            </div>
            {mode === 'create' && (
                <>
                    <div className='projectLauncheableButtonPanel'>
                        <label>
                            Total launcheables:{' '}
                            {projectData.launcheables.length}/
                            {Constants.maxLauncheables}
                        </label>
                        <div>
                            <button
                                type='button'
                                className='projectFormButton'
                                onClick={addLauncheable}
                            >
                                Add Launcheable
                            </button>
                            <button
                                type='button'
                                className='projectFormClearButton'
                                onClick={clearForm}
                            >
                                Clear Launcheables
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className='launcheablePannel'>
                {projectData.launcheables.map((launcheable) => (
                    <ProjectLauncheable
                        key={launcheable.id}
                        architecture={launcheable.architecture}
                        id={launcheable.id}
                        sdk={launcheable.sdk}
                        language={launcheable.language}
                        path={launcheable.path}
                        preferedIde={launcheable.preferedIde}
                        sdkVersion={launcheable.sdkVersion}
                        name={launcheable.name}
                        dependencies={launcheable.dependencies}
                        launchFile={launcheable.launchFile}
                        structure={launcheable.structure}
                        scripts={launcheable.scripts}
                        script={launcheable.script}
                        onEdit={handleLauncheableChange}
                        onDelete={removeLauncheable}
                        nodeVersion={nodeVersion}
                    />
                ))}
            </div>
            <div className='projectFormButtonPanel'>
                <button className='projectFormButton' type='submit'>
                    Create Project
                </button>
                <button
                    className='projectFormClearButton'
                    type='button'
                    onClick={clearForm}
                >
                    Clear Project
                </button>
            </div>
        </form>
    )
}

export default ProjectForm
