import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import AddTask from './SeniorDeveloper/AddTask'
import MainEmployee from "./Employee/MainEmployee";

const TabPanel = ({ value, index, children }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};

function ApplicationPage() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div sx={{ width: "100%", bgcolor: "background.paper" }}>
            {/* Вкладки */}
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Вкладка 1" />
                <Tab label="Вкладка 2" />
                <Tab label="Вкладка 3" />
            </Tabs>

            {/* Контент вкладок */}
            <TabPanel value={activeTab} index={0}>
                <MainEmployee/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                Содержимое второй вкладки
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                Содержимое третьей вкладки
            </TabPanel>
        </div>
    );
};

export default ApplicationPage;
