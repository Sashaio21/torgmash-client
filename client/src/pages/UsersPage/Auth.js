import '../../styles/global.css'
import { useForm } from 'react-hook-form'
import { Button, Card, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchUserMe } from '../../redux/slices/userSlices';
import { useNavigate } from 'react-router-dom';


function Auth() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatchAuth = useDispatch()  
    const dispatchAuthMe = useDispatch()
    const {user, message, error} = useSelector((state) => state.user)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const authResponse = await dispatchAuth(fetchAuth(data)).unwrap(); // Дожидаемся завершения
        // console.log("Авторизация успешна:", authResponse);
        console.log("test")
        await dispatchAuthMe(fetchUserMe()).unwrap();
        console.log("Форма отправлена:", user);
        // Обработать данные только если пользователь загружен
        navigate('/')
    };

    const test = () => {
        console.log(user)
    }

    return (
        <div>
            <h2 style={{marginBottom: "30px"}}>Авторизация</h2>
            <Card>
                <form 
                    className='col'
                    onSubmit={handleSubmit(onSubmit)}
                    style={{gap: "20px"}}
                >
                    <Input
                        placeholder='Номер паспорта'
                        {...register("numberPassport", { required: "Введите номер паспорта" })}
                    />
                    <Input
                        type='password'
                        placeholder='Пароль'
                        {...register("password", { required: "Введите номер паспорта" })}
                    />
                    <Button type='onsubmit'>Войти</Button>
                    <Button onClick={()=>test()}>Войти</Button>
                </form>
            </Card>
        </div>
    )
}

export default Auth