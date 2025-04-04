import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import ListApplications from "../../components/ListApplications";
import ListApplicationsDeveloper from "./ListApplicationsDeveloper";
import { TabPanel } from "../../utilites/componentsUtilites";




function MainDeveloper(){ 
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    

    return (
        <div>
            MainDeveloper
            {/* Вкладки */}
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Активные" />
                <Tab label="Не просмотренные" />
                <Tab label="Все заявки" />
            </Tabs>

            {/* Контент вкладок */}
            <TabPanel value={activeTab} index={0}>
                <ListApplicationsDeveloper variant={0}/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <ListApplicationsDeveloper variant={1}/>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <ListApplicationsDeveloper variant={2}/>
            </TabPanel>
        </div>
    )
}

export default MainDeveloper