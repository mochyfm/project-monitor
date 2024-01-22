import { useNavigate } from 'react-router-dom'
import Constants from '../../../constants/options.constants'
import { LeftNavbarButtonOptions } from '../../../types/interface.types'
import './LeftNavbarButton.css'

const LeftNavbarButton = (leftNavBar: LeftNavbarButtonOptions) => {
    
    const { name, link, icon: IconComponent } = leftNavBar
    const navigate = useNavigate();

    const goTo = () => {
        link && navigate(link);
    }

    return (
        <div className='leftNavbarButton' onClick={goTo}>
            {IconComponent && <IconComponent size={Constants.iconsSize + 10}/>}
            <div className='leftNavbarButtonHoverAnimation leftNavbarButtonName'>{name}</div>
        </div>
    )
}

export default LeftNavbarButton
