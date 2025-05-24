import { useState } from "react";
import {Button} from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import ListApplications from "../../components/ListApplications";
import ListApplicationsDeveloper from "./ListApplicationsDeveloper";
import { TabPanel } from "../../utilites/componentsUtilites";
import { Link } from "react-router-dom";
import ListNewFunction from "./ListNewFunction";



function MainDeveloper(){ 
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    

    return (
        <div>
            <div className="row"
                style={{
                    justifyContent: "space-between"
                }}
            >
                <h3>Старший разработчик</h3>
                <Link to={"/application/create"}><Button>Добавить функцию</Button></Link>
            </div>
            {/* Вкладки */}
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Активные" />
                <Tab label="Не просмотренные" />
                <Tab label="Все заявки" />
                <Tab label="Новые функции" />
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
            <TabPanel value={activeTab} index={3}>
                <ListNewFunction/>
            </TabPanel>
        </div>
    )
}

export default MainDeveloper