import './LeftNavbar.css'
import LeftNavbarButton from './LeftNavbarButton'
import { AiFillHome } from "react-icons/ai";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { FaDocker } from "react-icons/fa";
import { Web } from '../../constants/app.constants';


const LeftNavbar = () => {
    return (
        <>
            <div className='leftNavbar'>
                <div className='buttonsPanel'>
                    <LeftNavbarButton name='Dashboard' icon={AiFillHome} link={Web.dashboard.path} />
                    <LeftNavbarButton name='Projects' icon={AiFillProject} link={Web.projectsList.path} />
                    <LeftNavbarButton name='Dockers' icon={FaDocker} link={Web.dockers.path} />
                    <LeftNavbarButton name='Monitoring' icon={MdOutlineMonitorHeart} link={Web.monitoring.path} />
                </div>
            </div>
        </>
    )
}

export default LeftNavbar
