import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Redirection() {
    const {user, message, error} = useSelector((state) => state.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if (user && user.user && user.user.jobTitle) {
            switch (user.user.jobTitle.nameJobTitle) {
                case "Старший разработчик":
                    navigate('/developer');
                    break;
                case "Программист":
                    navigate('/programmer');
                    break;
                default:
                    navigate('/employee');
            }
        } else {
            navigate('/auth')
        }
    },[])

    return (
        <div>
            Переадрессация
        </div>
    )
}

export default  Redirection