import "./Menu.css";
import { NavLink } from "react-router-dom";
import { AppBar, IconButton, Toolbar, SelectChangeEvent, Box } from '@mui/material';
import logo from "../../../Assets/Images/vacation-website-high-resolution-logo-white-on-transparent-background.png";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { Home, Info } from "@mui/icons-material";
import { useState } from "react";

import { authStore } from "../../../Redux/AuthState";
import ResponsiveNavbar from "../ResponsiveNavbar/ResponsiveNavbar";

function Menu(): JSX.Element {
  const user = authStore.getState().user
  // const [selectedLink, setSelectedLink] = useState('');
  

  // const handleLinkChange = (event: SelectChangeEvent<string>) => {
  //   setSelectedLink(event.target.value);
  // };

  const isSmallScreen = window.innerWidth < 600;

  return (
    <div className="Menu">
       <AppBar position="static" className="appBar">
    <Toolbar>
      
      {isSmallScreen ? (
        <>
    <ResponsiveNavbar/>
          <div >
        <img src={logo} alt="Logo"className="logoInLittleScreen" />
      </div>
      </>
      ) : (<>
      <div >
        <img src={logo} alt="Logo"className="logo" />
      </div>
        <div className="links">
        <IconButton color="inherit" aria-label="home">
          <NavLink  className="link" to={"home"}><Home /> Home</NavLink>
        </IconButton>
        <IconButton color="inherit" aria-label="about" >
          <NavLink  className="link" to={"about"}><Info /> About</NavLink>
        </IconButton>
       
      </div>
     
     
       <Box className="authMenu">
    
       <IconButton color="inherit" aria-label="auth-menu">
      
         <AuthMenu />
       </IconButton>
     </Box>
        </>
      )}
    </Toolbar>
   
  </AppBar>
    </div>
  );
}

export default Menu;

