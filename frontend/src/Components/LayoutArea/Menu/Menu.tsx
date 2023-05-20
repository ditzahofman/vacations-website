import "./Menu.css";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import logo from "../../../Assets/Images/vacation-website-high-resolution-logo-white-on-transparent-background.png"
function Menu(): JSX.Element {
    return (
        <div className="Menu">
             <AppBar position="static" className="appBar">
      <Toolbar>
      <img src ={logo}/>
        <Typography variant="h6"> <FlightIcon /> </Typography>
        
        <Typography variant="h6" className="a"  > <NavLink to={"/home"} > <HomeIcon /></NavLink></Typography>
        <Typography variant="h6" className="a" > <NavLink to={"/vacations"} > Vacations</NavLink></Typography>
        
      </Toolbar>
    </AppBar>
            
        </div>
    );
}

export default Menu;