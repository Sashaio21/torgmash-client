import '../../styles/global.css'
import ApplicationComponent from '../../components/ApplicationComponent.js';
import axios from '../../axios.js';
import ApplicationComponentDeveloper from './ApplicationComponentDeveloper.js';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { fetchAllApplication } from '../../redux/slices/employeeSlices.js';
import { setStatus } from '../../utilites/globalUtilites.js';
import { fetchUserMe } from '../../redux/slices/userSlices.js';


function ListApplicationsDeveloper({variant}) {
    const [listApplicationsForEmployee, setListApplicationsForEmployee] = useState(false)
    const dispatchApplications = useDispatch()
    const {applications, status, error} = useSelector((state)=>state.applications)
    const {user, statusUser, errorUser} = useSelector((state)=>state.user)




    useEffect(()=>{
        dispatchApplications(fetchAllApplication())
        dispatchApplications(fetchUserMe())
        console.log(applications)
        console.log("хуятина :)ggggggggcbvbcbcvbcbbcbcbcbvxcxcx", user)
    },[])

    
    return(
        <div>
            {applications && user ? 
            <div className='applications col'>
               {applications.applications
                    .filter(obj => 
                        (variant === 0 && obj.status == "Активно" && obj.responsible == user.user._id) ||
                        (variant === 1 && obj.status == "Не просмотрено") ||
                        variant === 2 // Если variant === 2, фильтр не применяется
                    )
                    .map((obj) => (
                        <Link 
                        key={obj._id}
                        to={{
                            pathname: `/application/page/senior/${obj._id}`,
                            state: { 
                                "senior": true
                            }
                        }}
                        onClick={()=>{setStatus(obj._id,obj.status, "Просмотрено")}}
                        >
                        <ApplicationComponentDeveloper 
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

export default ListApplicationsDeveloper