import '../../styles/global.css'
import ListTasks from '../../components/ListTasks'
import { Tabs, Tab } from '@mui/material'
import { TabPanel } from '../../utilites/componentsUtilites'
import ListTasksProgrammer from '../../components/ListTasksProgrammer'
import { useState, useEffect } from 'react'
import GanttChart from '../../components/GanttChart'
import axios from '../../axios'

function MainProgrammer(){
    const [activeTab, setActiveTab] = useState(0);
    
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    

    const [listTasksForSenior, setListTasksForSenior] = useState([])

    useEffect(()=>{
        axios.get('/senior/programmer/all/task'
        )
        .then((data)=>{
            console.log(data.data.allTasks)
            setListTasksForSenior(data.data.allTasks)
        })
    },[])

    return (
        <div> 
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Задачи" />
                <Tab label="Диаграмма Ганта" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <ListTasksProgrammer/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <GanttChart tasks={listTasksForSenior}/>
            </TabPanel>
        </div>
    )
}

export default MainProgrammer