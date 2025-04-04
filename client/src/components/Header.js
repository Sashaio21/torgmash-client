import '../styles/global.css'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import {styled} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserMe } from '../redux/slices/userSlices';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../axios.js';


const CustomButton = styled(Button)({
    color: "#76cb95 ",
});


function Header(){
    const navigate = useNavigate()
    const [user1, setUser1] = useState(false)
    const { user, status, error } = useSelector((state) => state.user);
    const dispatchAuthMe = useDispatch()

    

    useEffect(()=>{
        console.log("header",user)
    }, [])

    const deleteToken = () => {
        window.localStorage.removeItem('token');
        dispatchAuthMe(fetchUserMe()); // Перезапрашиваем пользователя
        setUser1(false);
        // navigate('/')
    };
    
    const test = () => {
        console.log(user)
    }

    return (
        <header>
            <div className='row container' style={{justifyContent: "space-between", alignItems: "center", height:"100%"}}>
                <Link to={'/'}
                    className='row' 
                    style={{gap: "10px"}}
                >
                    <img className='image' alt="Some text"></img>
                    <p >На главную</p>
                </Link>
                {user && user.user ? (
                    <div className='row' style={{alignSelf:"center", gap: "10px"}}>
                        <div className='nameEmployee' style={{alignSelf:"center", gap: "10px"}}>
                            {user.user.numberPassport}
                        </div>
                        <CustomButton onClick={deleteToken}>Выйти</CustomButton>
                    </div>
                ) : (
                    <div className='row' style={{alignSelf:"center", gap: "10px"}}>
                        <CustomButton onClick={test}>Войти</CustomButton>
                    </div>
                )}

            </div>
        </header>
    )
}
export default Header 