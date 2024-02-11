// const renderLauncheablePathData = () => {
//     console.log(launcheablePathData?.content)
//     let sdk = null
//     if (launcheablePathData?.content.Xml) {
//         const version = findXmlVersion(launcheablePathData.content.Xml)
//         sdk = (
//             <>
//                 <img
//                     src='/assets/icons/sdk/springboot.png'
//                     alt='Logo de Spring'
//                     width={30}
//                 />
//                 {version !== 'Maven' ? `SpringBoot v${version}` : version}
//             </>
//         )
//     } else if (launcheablePathData?.name.includes('package')) {
//         sdk = (
//             <>
//                 <img
//                     src='/assets/icons/sdk/node.png'
//                     alt='Logo de Node.js'
//                     width={30}
//                 />
//                 Node {nodeVersion}
//             </>
//         )
//         console.log(`Lleva Node ${nodeVersion}`)
//     }
//     return sdk
// }

import { invoke } from '@tauri-apps/api'
import {
    ProjectLauncheableProps,
    ProjectPackageData,
} from '../../../../types/application.types'
import './ProjectLauncheable.css'
import { open } from '@tauri-apps/api/dialog'
import { findXmlVersion } from '../../../../utils/fetch.utils'
import { CompatibleSDK } from '../../../../types/interface.types'
import { renderPreferedIde, renderSdk } from '../../../../utils/project.utils'

const ProjectLauncheable = (props: ProjectLauncheableProps) => {
    const {
        onEdit,
        onDelete,
        name,
        id,
        sdk,
        sdkVersion,
        language,
        path,
        preferedIde,
        scripts,
        launchFile,
        nodeVersion,
    } = props

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        onEdit &&
            onEdit({
                id,
                name,
                sdk,
                sdkVersion,
                language,
                path,
                preferedIde,
                [target.name]: target.value,
            })
    }

    const fetchProject = async () => {
        try {
            const path = await open({ directory: true })
            const data: ProjectPackageData = await invoke('find_project_file', {
                path,
            })
            console.log(data)
            if (data?.content.Xml) {
                const mainPath = await invoke('find_java_main', { rootDir: path })
                const version = findXmlVersion(data.content.Xml)
                const sdk: CompatibleSDK =
                    version !== 'Maven' ? 'springboot' : 'maven'
                onEdit({
                    id,
                    name,
                    sdk,
                    path,
                    launchFile: mainPath,
                    preferedIde: 'intellij',
                    sdkVersion: version !== 'Maven' ? version : null,
                    language: 'Java',

                })
            } else if (data.name.includes('package')) {
                const projectName = data.content.Json!.name
                const capitalizedProjectName =
                    projectName.charAt(0).toUpperCase() + projectName.slice(1)
                const projectScripts = data.content.Json!.scripts
                onEdit({
                    id,
                    name: capitalizedProjectName,
                    path,
                    preferedIde: 'vscode',
                    sdk: 'node',
                    sdkVersion: nodeVersion,
                    language: 'JavaScript',
                    scripts: projectScripts
                })
            }
            return data
        } catch (error) {
            console.error('Error fetching project:', error)
            return null
        }
    }

    return (
        <div className='launcheableFormBody'>
            <input
                name='name'
                className='launcheableInputName'
                value={name}
                onChange={handleChange}
                placeholder={`MyLauncheableName`}
            />
            <div className='launcheableFormRootLocation'>
                Select Folder:
                <button
                    className='projectFindPathOfProject'
                    onClick={fetchProject}
                >
                    Find Path
                </button>
                <label className='legend'>
                    *Here you select the root folder of the project
                </label>
            </div>
            {onDelete && (
                <button
                    className='projectFormDeleteLauncheableButton'
                    type='button'
                    onClick={() => onDelete(id)}
                >
                    <img src='/assets/icons/ui/cross.svg' width={15} />
                </button>
            )}
            {launchFile && <div>{launchFile}</div>}
            <div className='launcheableSdkAndIde'>
                {sdk && (
                    <div className='launcheableSdkAndVersion'>
                        <img src={`/assets/icons/sdk/${sdk}.png`} width={25} />
                        {renderSdk(sdk)} {sdkVersion}
                    </div>
                )}
                {preferedIde && (
                    <div className='launcheableSdkAndVersion'>
                        <img
                            src={`/assets/icons/ide/${preferedIde}.png`}
                            width={30}
                        />
                        {renderPreferedIde(preferedIde)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectLauncheable
