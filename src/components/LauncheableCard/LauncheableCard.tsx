import { useEffect, useState } from 'react'
import Constants from '../../constants/options.constants'
import './LauncheableCard.css'
import { IoSettingsSharp, IoSettingsOutline } from 'react-icons/io5'
import { renderPreferedIde, renderSdk } from '../../utils/project.utils'
import { Launcheable } from '../../types/application.types'
import { Command } from '@tauri-apps/api/shell'
import { CompatibleIDEs } from '../../types/interface.types'

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

    const [ideToLaunch, setIdeToLaunch] = useState<CompatibleIDEs | undefined>(
        preferedIde,
    )

    const ideLaunchCommand = new Command(`launch-${ideToLaunch}`, `${path}`)

    const openIde = () => {
        console.log(ideLaunchCommand)
        console.log(`Launching IDE: ${ideToLaunch}`)
        ideLaunchCommand.execute()
    }

    useEffect(() => {
        if (preferedIde === 'intellij_community') {
            setIdeToLaunch('intellij')
        } else {
            setIdeToLaunch(preferedIde)
        }

        ideLaunchCommand.on('close', (data) => {
            console.error(
                `Command finished with code ${data.code} and signal ${data.signal}`,
            )
        })
        ideLaunchCommand.on('error', (error) =>
            console.error(`command error: "${error}"`),
        )
    }, [ideLaunchCommand])

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
