import { useEffect, useState } from 'react'
import Constants from '../../constants/options.constants'
import './LauncheableCard.css'
import { IoSettingsSharp, IoSettingsOutline } from 'react-icons/io5'
import { renderPreferedIde, renderSdk } from '../../utils/project.utils'
import { Launcheable } from '../../types/application.types'
import { Child, Command } from '@tauri-apps/api/shell'
import { CompatibleIDEs } from '../../types/interface.types'
import { sendNotification } from '@tauri-apps/api/notification'
import { findProjectFile } from '../../utils/fetch.utils'

export interface LauncheableCardProps extends Launcheable {
    node_version: string
}

const LauncheableCard = ({
    name,
    language,
    sdk,
    preferedIde,
    path,
    node_version,
}: LauncheableCardProps) => {
    const [isSettingsIconVisible, setSettingsIconVisibility] =
        useState<boolean>(false)

    const [ideToLaunch, setIdeToLaunch] = useState<string | undefined>(
        preferedIde,
    )

    function tieneEspacios(path: string) {
        const partes = path.split('\\')
        for (let parte of partes) {
            if (parte.includes(' ')) {
                return true
            }
        }
        return false
    }

    const openIde = () => {
        if (path && !tieneEspacios(path)) {
            console.log(`Launching IDE: ${ideToLaunch}`)
            const ideLaunchCommand = new Command(
                'cmd',
                ['/c', `start /B /MIN ${ideToLaunch} .`],
                { cwd: path },
            )
            try {
                ideLaunchCommand.execute()
                sendNotification({
                    title: `Launching ${
                        preferedIde ? renderPreferedIde(preferedIde) : `...`
                    }`,
                    icon: `../../src/assets/icons/sdk/${sdk}.png`,
                    body: 'Opening in a new tab',
                })
            } catch (error) {
                console.error(error)
            }   
        }
    }

    useEffect(() => {
        switch (preferedIde) {
            case 'intellij_community':
            case 'intellij':
                setIdeToLaunch('idea')
            break;
            case 'vscode':
                setIdeToLaunch('code')
            break;
            default:
                setIdeToLaunch('code')
        }
 
        const projectStructure = async () => {
            path && findProjectFile(path).then((projectData) => {
                console.log(projectData);
            })
            
        }
        projectStructure();

    }, [])

    return (
        <section className='launcheableCard'>
            <header className='launcheableHeader'>
                <h3 className='launcheableName'>{name}</h3>
                <div className='launcheableSdk'>
                    <span>{`${renderSdk(sdk)} ${
                        sdk === 'node' ? node_version : ''
                    }`}</span>
                    <img
                        className='sdkIcon'
                        src={`../../src/assets/icons/sdk/${sdk}.png`}
                        alt={`${sdk} icon`}
                    />
                </div>
                <div className='launcheablePromLanguage'>
                    <span>{language}</span>
                    <img
                        className='promLangIcon'
                        src={`../../src/assets/icons/prog/${language}.png`}
                        alt={`${language} icon`}
                    />
                </div>
            </header>
            <div className='launcheableIde'>
                <div className='innerIdeLabel'>
                    <img
                        className='ideIcon'
                        src={`../../src/assets/icons/ide/${preferedIde}.png`}
                        alt={`${
                            preferedIde && renderPreferedIde(preferedIde)
                        } icon`}
                    />
                    <div>{preferedIde && renderPreferedIde(preferedIde)}</div>
                </div>
                {(preferedIde === 'vscode' ||
                    preferedIde === 'intellij' ||
                    preferedIde === 'intellij_community') && (
                    <button onClick={openIde}>Open with</button>
                )}
            </div>
            <div className='launcheablePath'>{`${path}`}</div>
            <div
                className='launcheableDropButton'
                onMouseEnter={() => setSettingsIconVisibility(true)}
                onMouseLeave={() => setSettingsIconVisibility(false)}
            >
                {isSettingsIconVisible ? (
                    <IoSettingsOutline size={Constants.iconsSize + 10} />
                ) : (
                    <IoSettingsSharp size={Constants.iconsSize + 10} />
                )}
            </div>
        </section>
    )
}

export default LauncheableCard
