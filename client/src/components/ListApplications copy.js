import '../styles/global.css'
import ApplicationComponent from './ApplicationComponent.js';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { fetchAllApplication } from '../redux/slices/employeeSlices.js';


function ListApplications({variant}) {
    const [listApplicationsForEmployee, setListApplicationsForEmployee] = useState(false)
    const dispatchApplications = useDispatch()
    const {applications, status, error} = useSelector((state)=>state.applications)
    const {user, statusUser, errorUser} = useSelector((state)=>state.user)


    useEffect(()=>{
        dispatchApplications(fetchAllApplication())
        console.log(applications)
    },[])

    
    return(
        <div>
            {applications ? 
            <div className='applications col'>
               {applications.applications
                    .filter(obj => 
                        (variant === 0 && obj.status != "Не просмотрено") ||
                        (variant === 1 && obj.status == "Не просмотрено") ||
                        variant === 2 // Если variant === 2, фильтр не применяется
                    )
                    .map((obj) => (
                        <Link 
                        key={obj._id}
                        to={{
                            pathname: `/application/page/${obj._id}`,
                            state: { 
                                "senior": true
                            }
                        }}
                        >
                        <ApplicationComponent 
                            title={obj.title}
                            description={obj.description}
                            urgency={obj.urgency}
                            status={obj.status}
                        /> 
                        </Link>            
                    ))
                    }
            </div>:
            <div>Пусто</div>
            }
        </div>
    )
}

export default ListApplications