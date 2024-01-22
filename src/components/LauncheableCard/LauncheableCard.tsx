import React, { ReactNode, useState } from 'react'
import Constants from '../../constants/options.constants'
import {
    LauncheableCardProps,
    ProgrammingLanguage,
} from '../../types/interface.types'
import './LauncheableCard.css'
import { IoSettingsSharp, IoSettingsOutline } from 'react-icons/io5'

const LauncheableCard = ({
    name,
    language,
    preferedIde,
    path,
}: LauncheableCardProps) => {
    const [isSettingsIconVisible, setSettingsIconVisibility] =
        useState<boolean>(false)

    const openSettings = () => {
        console.log('Hola')
    }

    return (
        <div className='launcheableCard'>
            <h3 className='launcheableName'>{name}</h3>
            <img className='launcheableIcon' src={`../../src/assets/icons/${language}.png`} alt={language}/>
            <div className='launcheableLang'>{language}</div>
            <div className='launcheableIde'>{preferedIde}</div>
            <div className='launcheablePath'>{path}</div>
            <div
                className='launcheableDropButton'
                onMouseEnter={() => setSettingsIconVisibility(true)}
                onMouseLeave={() => setSettingsIconVisibility(false)}
                onClick={openSettings}
            >
                {isSettingsIconVisible ? (
                    <IoSettingsOutline
                        size={Constants.iconsSize + 10}
                        onClick={openSettings}
                    />
                ) : (
                    <IoSettingsSharp size={Constants.iconsSize + 10} />
                )}
            </div>
        </div>
    )
}

export default LauncheableCard
