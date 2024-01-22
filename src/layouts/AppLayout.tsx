import LeftNavbar from '../components/LeftNavbar'
import { Outlet } from 'react-router-dom'
import TitleBar from '../components/TitleBar'
import './AppLayout.css'

const AppLayout = () => {
    return (
        <>
            <TitleBar />
            <LeftNavbar />
            <div className='opacityLayer'/>
            <div className='dashboardLayer'>
                <Outlet />
            </div>
        </>
    )
}

export default AppLayout
