import ProjectMonitorStatus from '../ProjectMonitorStatus'
import './LeftNavbar.css'
import LeftNavbarButton from './LeftNavbarButton'

const LeftNavbar = () => {
    return (
        <>
            <div className='leftNavbar'>
                <div className='buttonsPanel'>
                    <LeftNavbarButton name='Inicio' />
                    <LeftNavbarButton name='Projects' />
                    <LeftNavbarButton name='Dockers' />
                    <LeftNavbarButton name='Monitoring' />
                </div>
                <ProjectMonitorStatus className='bottomPanel' />
            </div>
        </>
    )
}

export default LeftNavbar
