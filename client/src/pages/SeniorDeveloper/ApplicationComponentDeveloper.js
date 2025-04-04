import '../../styles/global.css'
import { Button } from '@mui/material'
import {Card} from '@mui/material'

function ApplicationComponentDeveloper({ title, description, urgency, status }){

    return (
        <Card className='oneApplications row'>
            <div>
                <div>{title}</div>
                <div>{description}</div>
            </div>
            <div>
                <div>{status}</div>
                <Button>Удалить</Button>
            </div>
        </Card> 
    )
}

export default ApplicationComponentDeveloper