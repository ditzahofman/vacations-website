import { NavLink } from "react-router-dom";
import "./NavbarForTheLittleScreen.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Flight, Home, Info } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import CsvFile from "../../VacationsArea/Admin/CsvFile/CsvFile";
import AddIcon from '@mui/icons-material/Add';
import { authStore } from "../../../Redux/AuthState";


function NavbarForTheLittleScreen(): JSX.Element {
  const user = authStore.getState().user?.role;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: { currentTarget: any }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLinkClick = (link: string) => {
    handleMenuClose();
  };

  return (
    <div className="Navbar">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        className="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <IconButton onClick={() => handleLinkClick('home')} aria-label="home">
          <NavLink className="link" to={'home'}>
            <Home /> Home
          </NavLink>
        </IconButton>
        <IconButton onClick={() => handleLinkClick('about')} aria-label="about">
          <NavLink className="link" to={'about'}>
            <Info /> About
          </NavLink>
        </IconButton>
        {user === 'Admin' && (
          <>
            <IconButton onClick={() => handleLinkClick('add-vacation')} aria-label="about">
              <NavLink className="link" to={'add-vacation'}>
                <AddIcon /> Add
              </NavLink>
            </IconButton>
            {/* <IconButton onClick={() => handleLinkClick('Travels')}  aria-label="travels" color="inherit"  >
            <NavLink className="link" to={"/vacations"}><Flight /> Travels</NavLink>
            </IconButton> */}
            <IconButton onClick={() => handleLinkClick('Chart')} color="inherit" aria-label="travels">
              <NavLink className="link" to={'/chart'}>
                <BarChartIcon /> Chart
              </NavLink>
            </IconButton>
            <IconButton onClick={() => handleLinkClick('Csv')} color="inherit" aria-label="travels">
              <NavLink className="link" to={'/csv'}>
                <CsvFile /> Csv
              </NavLink>
            </IconButton>
          </>
        )}
        <IconButton onClick={() => handleLinkClick('Login')} color="inherit" aria-label="travels">
          <NavLink className="link" to={'/login'}>
            <LoginIcon /> Login
          </NavLink>
        </IconButton>
        <IconButton onClick={() => handleLinkClick('Logout')} color="inherit" aria-label="travels">
          <NavLink className="link" to={'/logout'}>
            <LogoutIcon /> Logout
          </NavLink>
        </IconButton>
      </Menu>
    </div>
  );
}


export default  NavbarForTheLittleScreen;
