import '../../styles/global.css'
import { Button} from '@mui/material'
import ListApplications from '../../components/ListApplications.js';
import { Link } from 'react-router-dom';


function MainEmployee() {
    return(
        <div>
            <Link to="/send/application"><Button>Отправить</Button></Link>
            <ListApplications/>
        </div>
    )
}

export default MainEmployee