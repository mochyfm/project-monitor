import { LeftNavbarButtonOptions } from '../../../types/interface.types'
import './LeftNavbarButton.css'

const LeftNavbarButton = (leftNavBar: LeftNavbarButtonOptions) => {
    
    const { name } = leftNavBar;
    // const navigate = useNavigate();      onClick={() => link && navigate(link)}

    return (
        <div className='leftNavbarButton'> 
            <div className='leftNavbarButtonName'>{name}</div>
        </div>  
    )
}

export default LeftNavbarButton
