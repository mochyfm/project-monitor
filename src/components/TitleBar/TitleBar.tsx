import { appWindow } from '@tauri-apps/api/window'
import { FaRegWindowMinimize  } from 'react-icons/fa'
import { LuMaximize } from 'react-icons/lu'
import { GrClose } from 'react-icons/gr'
import './TitleBar.css'

const TitleBar = () => {
    const iconsSize: number = 12

    return (
        <>
            <div data-tauri-drag-region className='titlebar'>
                <div
                    className='titlebar-button'
                    id='titlebar-minimize'
                    onClick={() => appWindow.minimize()}
                >
                    <FaRegWindowMinimize size={iconsSize} />
                </div>
                <div
                    className='titlebar-button'
                    id='titlebar-maximize'
                    onClick={() => appWindow.toggleMaximize()}
                >
                    <LuMaximize size={iconsSize} />
                </div>
                <div
                    className='titlebar-button'
                    id='titlebar-close'
                    onClick={() => appWindow.close()}
                >
                    <GrClose size={iconsSize} />
                </div>
            </div>
        </>
    )
}

export default TitleBar
