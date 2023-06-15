import "./Menu.css";
import { NavLink } from "react-router-dom";
import { AppBar, IconButton, Toolbar, SelectChangeEvent, Box } from '@mui/material';
import logo from "../../../Assets/Images/vacation-website-high-resolution-logo-white-on-transparent-background.png";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { Home, Info, Flight } from "@mui/icons-material";
import { useState, ChangeEvent } from "react";
import NavbarForTheLittleScreen from "../NavbarFor THe Little Screen/NavbarForTheLittleScreen";

import { authStore } from "../../../Redux/AuthState";
function Menu(): JSX.Element {
  const user = authStore.getState().user
  const [selectedLink, setSelectedLink] = useState('');
  

  const handleLinkChange = (event: SelectChangeEvent<string>) => {
    setSelectedLink(event.target.value);
  };

  const isSmallScreen = window.innerWidth < 600;

  return (
    <div className="Menu">
       <AppBar position="static" className="appBar">
    <Toolbar>
      
      {isSmallScreen ? (
        <>
     <NavbarForTheLittleScreen/>
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
        {user?.role==="Admin"&&
        <IconButton  color="inherit" aria-label="travels" className="link">
          <NavLink className="link" to={"/vacations"}><Flight /> Chart</NavLink>
        </IconButton>}
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

