import { useState,useEffect } from 'react';
import axios from '../axios.js';
import '../styles/global.css'
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Card} from '@mui/material'


function ApplicationPage() {
    const {idApplication} = useParams()
    const location = useLocation();
    const { senior } = location.state || {};
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
            <Card>
                <p>Отвественный за выполнение</p>
            </Card>
        </div>
    );
};

export default ApplicationPage;
