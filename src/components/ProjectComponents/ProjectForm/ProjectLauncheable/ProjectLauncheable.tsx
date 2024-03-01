import { invoke } from '@tauri-apps/api'
import {
    ProjectLauncheableProps,
    ProjectPackageData,
} from '../../../../types/application.types'
import './ProjectLauncheable.css'
import { open } from '@tauri-apps/api/dialog'
import { findXmlVersion } from '../../../../utils/fetch.utils'
import { CompatibleSDK } from '../../../../types/interface.types'
import {
    detectProjectLanguage,
    removeExtension,
    renderLanguage,
    renderPreferedIde,
    renderSdk,
    retrieveLaunchFile,
} from '../../../../utils/project.utils'
import {
    detectArchitecture,
    detectMavenTechnologies,
} from '../../../../utils/launcheable.utils'

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
        architecture,
        structure,
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
                architecture,
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
                const { structure, database } = detectMavenTechnologies(
                    data?.content.Xml.artifactId,
                )
                console.log(structure, database)
                const mainPath: string = await invoke('find_java_main', {
                    rootDir: path,
                })
                const version = findXmlVersion(data.content.Xml)
                const sdk: CompatibleSDK =
                    version !== 'Maven' ? 'springboot' : 'maven'
                onEdit({
                    id,
                    name,
                    architecture: null,
                    structure: structure,
                    path,
                    sdk: sdk,
                    scripts: null,
                    dependencies: data?.content.Xml.artifactId,
                    launchFile: mainPath,
                    preferedIde: 'intellij',
                    sdkVersion: version !== 'Maven' ? version : null,
                    language: 'Java',
                })
            } else if (data.name.includes('package')) {
                const projectScripts = data.content.Json!.scripts
                const architecture = detectArchitecture(
                    data.content.Json!.dependencies,
                )
                const projectLanguage = detectProjectLanguage(
                    data.content.Json!.dependencies,
                    data.content.Json!.devDependencies,
                )
                onEdit({
                    id,
                    name,
                    architecture,
                    structure: null,
                    path,
                    sdk: 'node',
                    scripts: projectScripts,
                    dependencies: data.content.Json!.dependencies,
                    launchFile: null,
                    preferedIde: 'vscode',
                    sdkVersion: nodeVersion,
                    language: projectLanguage,
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
            <div>
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
                        type='button'
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
            </div>
            {language && (
                <div className='launcheableProgramLanguageAndArchitecture'>
                    <div className='launcheableProgramLanguage'>
                        <img
                            className='promLangIcon'
                            src={`/assets/icons/prog/${language}.png`}
                            alt={`${language} icon`}
                        />
                        <span>{language}</span>
                    </div>
                    {architecture && (
                        <div className='launcheableArchitecture'>
                            <img
                                className='promLangIcon'
                                src={`/assets/icons/arch/${
                                    architecture.charAt(0).toUpperCase() +
                                    architecture.slice(1)
                                }.png`}
                                alt={`${language} icon`}
                                width={30}
                            />
                            <span>
                                {architecture.charAt(0).toUpperCase() +
                                    architecture.slice(1)}
                            </span>
                        </div>
                    )}
                </div>
            )}
            {(scripts || launchFile) && (
                <div className='launcheableProjectDependenciesAndScripts'>
                    {scripts && (
                        <>
                            <h2>Scripts:</h2>
                            <div className='launcheableScriptsList'>
                                {Object.entries(scripts).map(([key, value]) => (
                                    <div className='scriptElement' key={key}>
                                        <strong>{key} -</strong> {value}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {launchFile && (
                        <>
                            <h2>Project main file:</h2>
                            <div className='launcheableLaunchFileDisplay'>
                                <img
                                    src={`/assets/icons/prog/${renderLanguage(
                                        launchFile,
                                    )}.png`}
                                    width={40}
                                />
                                {removeExtension(
                                    retrieveLaunchFile(launchFile),
                                )}
                            </div>
                            {structure && (
                                <div className='launcheableStructureDisplay'>
                                    {structure.map((value, index) => (
                                        <div
                                            key={index}
                                            className='launcheableStructure'
                                        >
                                            <span>{value}</span>
                                            <img
                                                src={`/assets/icons/structure/${value}.png`}
                                                width={30}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
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
