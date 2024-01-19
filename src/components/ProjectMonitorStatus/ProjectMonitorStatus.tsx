import { useState } from 'react'
import Constants from '../../constants/options.constants'
import { ProjectMonitorParams } from '../../types/interface.types'
import './ProjectMonitorStatus.css'
import { FaPowerOff } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'

const ProjectMonitorStatus = (projectMonitor: ProjectMonitorParams) => {
    const { className } = projectMonitor

    const [isProjectMonitorActive, setProjectMonitorStatus] =
        useState<boolean>(false)

    return (
        <div className={`${className} projectMonitorBlock`}>
            <div className='projectMonitorStatus'></div>
            <div
                className={`projectMonitorButtonPanel projectMonitor${
                    isProjectMonitorActive ? 'Active' : 'Inactive'
                }`}
            >
                <div className='projectMonitorPowerButton'>
                    <FaPowerOff size={Constants.iconsSize} />
                </div>
                <div className='projectMonitorPauseButton'>
                    {isProjectMonitorActive ? (
                        <FaPause size={Constants.iconsSize} />
                    ) : (
                        <FaPlay size={Constants.iconsSize} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectMonitorStatus
