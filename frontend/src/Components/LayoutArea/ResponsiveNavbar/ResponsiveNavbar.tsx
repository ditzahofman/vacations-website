import { NavLink } from "react-router-dom";
import "./ResponsiveNavbar.css";
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


function ResponsiveNavbar(): JSX.Element {
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
  {[
    { label: 'Home', icon: <Home />, link: 'home' },
    { label: 'About', icon: <Info />, link: 'about' },
    user === 'Admin' && { label: 'Add', icon: <AddIcon />, link: 'add-vacation' },
    user === 'Admin' && { label: 'Chart', icon: <BarChartIcon />, link: '/chart' },
    user === 'Admin' && { label: 'Csv', icon: <CsvFile />, link: '/csv' },
    { label: 'Login', icon: <LoginIcon />, link: '/login' },
    { label: 'Logout', icon: <LogoutIcon />, link: '/logout' },
  ].map((item, index) => {
    if (!item) return null;
    const { label, icon, link } = item;
    return (
      <IconButton key={index} onClick={() => handleLinkClick(link)} aria-label={label}>
        <NavLink className="link" to={link}>
          {icon} {label}
        </NavLink>
      </IconButton>
    );
  })}
</Menu>
    </div>
  );
}


export default ResponsiveNavbar;
