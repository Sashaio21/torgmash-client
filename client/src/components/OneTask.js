import '../styles/global.css'
import { Card,Button } from '@mui/material';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import parseISO from 'date-fns/parseISO';

function OneTask({title, desription, status, deadline}) {

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
                <Button>Удалить</Button>
            </div>
            <div>
                <div>{status}</div>
                <div>{formattedDeadline}</div>
            </div>
        </Card> 
        
    )
}

export default OneTask