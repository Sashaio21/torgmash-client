import '../styles/global.css'
import { Card,Button } from '@mui/material';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import parseISO from 'date-fns/parseISO';
import axios from '../axios'

function OneTaskProgrammer({title, desription, status, deadline, idApplication}) {

    const deleteTask = () => {
        axios.delete(`senior/developer/task/${idApplication}`)
    }

    // Проверяем, является ли deadline строкой и преобразуем в дату
    const date = typeof deadline === "string" ? parseISO(deadline) : new Date(deadline);
    
    // Если дата валидна, форматируем, иначе показываем "Некорректная дата"
    const formattedDeadline = isNaN(date.getTime()) 
        ? "Некорректная дата" 
        : format(date, "dd-MM-yyyy", { locale: ru });

    return(
        <Card className='oneApplications row'>
            <div>
                <h4>{title}</h4>
                <div>{desription}</div>
                <Button onClick={()=>deleteTask()}>Выполнить</Button>
            </div>
            <div>
                <div>{status}</div>
                <div>{formattedDeadline}</div>
            </div>
        </Card> 
        
    )
}

export default OneTaskProgrammer