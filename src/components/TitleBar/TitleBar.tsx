import { appWindow } from '@tauri-apps/api/window'
import { FaRegWindowMinimize  } from 'react-icons/fa'
import { LuMaximize } from 'react-icons/lu'
import { GrClose } from 'react-icons/gr'
import './TitleBar.css'
import Constants from '../../constants/options.constants';

const TitleBar = () => {

    return (
        <>
            <div data-tauri-drag-region className='titlebar'>
                <div
                    className='titlebar-button'
                    id='titlebar-minimize'
                    onClick={() => appWindow.minimize()}
                >
                    <FaRegWindowMinimize size={Constants.iconsSize} className='toolbar-icon'/>
                </div>
                <div
                    className='titlebar-button'
                    id='titlebar-maximize'
                    onClick={() => appWindow.toggleMaximize()}
                >
                    <LuMaximize size={Constants.iconsSize + 3} className='toolbar-icon'/>
                </div>
                <div
                    className='titlebar-button'
                    id='titlebar-close'
                    onClick={() => appWindow.close()}
                >
                    <GrClose size={Constants.iconsSize + 2} className='toolbar-icon'/>
                </div>
            </div>
        </>
    )
}

export default TitleBar
