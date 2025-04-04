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
            {applications?.applications?.length > 0 ? (
                applications.applications.map((obj) => (
                    <Link 
                        key={obj._id}
                        to={{
                            pathname: `/application/page/${obj._id}`,
                            state: { senior: true }
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
            ) : (
                <p>Заявок пока нет</p>
            )}

        </div>
    )
}

export default ListApplications