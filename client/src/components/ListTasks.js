import '../styles/global.css'
import { Link } from 'react-router-dom';
import OneTask from './OneTask.js';
import axios from '../axios.js'
import { useEffect, useState } from 'react';


function ListTasks({idApplication}) {
    const [listTasksForSenior, setListTasksForSenior] = useState([])

    useEffect(()=>{
        console.log("пизда", idApplication)
        axios.post('/senior/developer/all/task', 
            {"aplication" : idApplication}
        )
        .then((data)=>{
            console.log(data.data.allTasks)
            setListTasksForSenior(data.data.allTasks)
        })
    },[])

    const applications = [1,2,3,4,1]
    return(
        <div>
            <div className='applications col'>
               {listTasksForSenior.map((obj)=>
                    <Link to={`/task/${obj._id}`}>
                        <OneTask
                            title={obj.titleTask}
                            desription={obj.descriptionTask}
                            status={obj.status}
                            deadline={obj.deadline}
                        /> 
                    </Link>            
                )}
            </div>
        </div>
    )
}
// to={`/application/page/${obj}`}
export default ListTasks