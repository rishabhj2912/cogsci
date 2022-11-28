import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default props => {
const navigate = useNavigate();

  return (<div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/studyDashboard")}
          >
            Tests/Surveys list
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" sx={{ bgcolor: "green" }} onClick={() => navigate("/adminDashboard")}>
            Studies
          </Button>
          <Button color="inherit" sx={{ bgcolor: "blue" }} onClick={() => navigate("/login")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Menu>
 <a className="menu-item">
        <h1>Tests</h1>
      </a>
      <a className="menu-item" href="/addTest">
        Add Test
      </a>
      <a className="menu-item">
        <h1>Surveys</h1>
      </a>
      <a className="menu-item" href="/addTest">
        Add Survey
      </a>
      <a className="menu-item">
        <h1>Participants</h1>
      </a>
      <a className="menu-item" href="/addPatient">
        Add/Remove Participants
      </a>
      
    </Menu></div>
  );
};