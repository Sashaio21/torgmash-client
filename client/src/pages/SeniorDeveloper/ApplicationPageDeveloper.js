import { useState,useEffect } from 'react';
import axios from '../../axios.js';
import '../../styles/global.css'
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserMe } from '../../redux/slices/userSlices.js';
import { useNavigate } from 'react-router-dom';
import {Card, Button} from '@mui/material'
import { setStatus } from '../../utilites/globalUtilites.js';
import { useSelector } from 'react-redux';
import { setApplicant } from '../../utilites/globalUtilites.js';
import ComponentResponsible from '../../components/ComponentResponsible.js';

function ApplicationPageDeveloper() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {idApplication} = useParams()
    const location = useLocation();
    const { senior } = location.state || {};
    const user = useSelector(state => state.user)
    const [active, setActive] = useState(false)
    const [oneApplication, setOneApplication] = useState(false)



    useEffect(()=>{
        axios.get(`/employee/application/one/${idApplication}`)
        .then((data)=>{
            console.log(data.data.oneApplication[0])
            setOneApplication(data.data.oneApplication[0])
            if (data.data.oneApplication[0].status == "Не просмотрено") {
                setActive(true)
            }
          
        })
        console.log("senior", senior)
    },[])


    return (
        <div 
        className="col"
        style={{gap: "20px"}}>
            <div 
                className="row"
                style={{justifyContent: "space-between"}}
            >
            
                <h2>{oneApplication.title}</h2>
                <div>{oneApplication.status}</div>
            </div>
            <p>{oneApplication.description}</p>
            {oneApplication.status == "Активно"?
            <div></div>:
            <Button onClick={()=>{setApplicant(idApplication, oneApplication.status,"Активно", navigate, user.user.user._id)}}>
                Перейти к выполнению
            </Button>
            }
        </div>
    );
};

export default ApplicationPageDeveloper;
