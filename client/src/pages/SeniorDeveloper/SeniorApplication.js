import '../../styles/global.css'
import ApplicationPageDeveloper from './ApplicationPageDeveloper';
import { TabPanel } from '../../utilites/componentsUtilites';
import { Tab, Tabs } from '@mui/material';
import AddTask from './AddTask'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllApplication } from '../../redux/slices/employeeSlices';
import { fetchUserMe } from '../../redux/slices/userSlices';

function SeniorApplication() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const [visibleTabs, setVisibleTabs] = useState(null)
    const applications = useSelector(state=>state.applications)
    const user = useSelector(state=>state.user)
    const {idApplication} = useParams()
        
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const test = ()=>{
        console.log(applications.applications.applications.find(app => app._id === idApplication).applicant)
        console.log(user.user.user._id)
    }

    useEffect(() => {
        dispatch(fetchAllApplication()); 
        dispatch(fetchUserMe()); 
    }, [dispatch]); 

    const foundApplication = applications?.applications?.applications?.find(app => app._id === idApplication);
    const foundUser = user?.user?.user?._id

    useEffect(() => {
        if (foundApplication && foundUser) {
            console.log("cccccccccccccccccc",foundApplication.responsible)
            console.log("dddddddddddddddd",user.user.user._id)
            // console.log("senior", foundApplication.responsible);
            if (foundApplication.responsible == user.user.user._id)
            {
                console.log("ddfddddddddddddddddddd")
                setVisibleTabs(true)
            }
        } else {
            console.log("Данные ещё загружаются...");
        }
    }, [foundApplication, foundUser]); // useEffect срабатывает, когда foundApplication обновляется

    return (
        <div> 
            {visibleTabs ? 
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Заявка" />
                <Tab label="Задачи" />
            </Tabs> :
            <>
            </>
            }
            <TabPanel value={activeTab} index={0}>
                <ApplicationPageDeveloper/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <AddTask idApplication={idApplication}/>
            </TabPanel>
            <button onClick={()=>{test()}}>gfdfg</button>

        </div>
    );
};

export default SeniorApplication;
