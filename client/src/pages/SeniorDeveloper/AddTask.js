import '../../styles/global.css'
import { Button, Fab } from '@mui/material'
import ListTasks from '../../components/ListTasks'
import AddTaskModal from '../../components/AddTaskModal'
import { useEffect, useState } from 'react'
import axios from '../../axios'


function AddTask({idApplication}){
    const [isOpen, setOpen] = useState(false)
    const [allProgrammer, setAllProgrammer] = useState([])

    useEffect(()=>{
        axios.get('/senior/developer/programmer')
        .then((data)=>{
            console.log(data.data.allProgrammer[0].idEmployee.name)
            setAllProgrammer(data.data.allProgrammer)
        })
    },[])

    return (
        <div>
            <Button onClick={()=>setOpen(true)}>Добавить задачу</Button>
            <ListTasks  idApplication={idApplication}/>
            <AddTaskModal isOpen={isOpen} onClose={()=>setOpen(false)} idApplication={idApplication} allProgrammer={allProgrammer}/>
        </div>
    )
}

export default AddTask