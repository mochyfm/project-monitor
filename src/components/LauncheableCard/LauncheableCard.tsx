import { useEffect, useState } from 'react'
import Constants from '../../constants/options.constants'
import './LauncheableCard.css'
import { IoSettingsSharp, IoSettingsOutline } from 'react-icons/io5'
import {
    openIde,
    renderPreferedIde,
    renderSdk,
} from '../../utils/project.utils'
import { findProjectFile } from '../../utils/fetch.utils'
import { LauncheableCardProps } from '../../types/interface.types'

const LauncheableCard = ({
    name,
    language,
    sdk,
    preferedIde,
    path,
    nodeVersion,
}: LauncheableCardProps) => {
    const [isSettingsIconVisible, setSettingsIconVisibility] =
        useState<boolean>(false)

    useEffect(() => {
        const projectStructure = async () => {
            path &&
                findProjectFile(path).then((projectData) => {
                    console.log(projectData)
                })
        }
        projectStructure()
    }, [])

    return (
        <section className='launcheableCard'>
            <header className='launcheableHeader'>
                <h3 className='launcheableName'>{name}</h3>
                <div className='launcheableSdk'>
                    <span>{`${renderSdk(sdk)} ${
                        sdk === 'node'
                            ? nodeVersion !== undefined
                                ? nodeVersion
                                : 'Not Installed'
                            : ''
                    }`}</span>
                    <img
                        className='sdkIcon'
                        src={`/assets/icons/sdk/${sdk}.png`}
                        alt={`${sdk} icon`}
                    />
                </div>
                <div className='launcheablePromLanguage'>
                    <span>{language}</span>
                    <img
                        className='promLangIcon'
                        src={`/assets/icons/prog/${language}.png`}
                        alt={`${language} icon`}
                    />
                </div>
            </header>
            <div className='launcheableIde'>
                <div className='innerIdeLabel'>
                    <img
                        className='ideIcon'
                        src={`/assets/icons/ide/${preferedIde}.png`}
                        alt={`${
                            preferedIde && renderPreferedIde(preferedIde)
                        } icon`}
                    />
                    <div>{preferedIde && renderPreferedIde(preferedIde)}</div>
                </div>
                {(preferedIde === 'vscode' ||
                    preferedIde === 'intellij' ||
                    preferedIde === 'intellij_community') && (
                    <button onClick={() => openIde(path, preferedIde, sdk)}>
                        Open with
                    </button>
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
