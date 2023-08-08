import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoImage from '../images/hospitalLogo.png'

import './Navbar.css';
import { Button } from '@mui/material';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className='navbarContent'>
        <Box sx={{ flexGrow: 1 }}>
        <img src={LogoImage} alt="Logo" className="logoImage" />
        </Box>
        <div className='rightSide'>
        <AccountBoxIcon className='profileIcon'/>
        <IconButton className='iconButtonNav'>
          <Button onClick={handleLogout}><LogoutIcon />Log out</Button>
        </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
