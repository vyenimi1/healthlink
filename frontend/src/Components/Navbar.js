import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoImage from '../images/hospitalLogo.png'

import './Navbar.css';
import { Button } from '@mui/material';

function Navbar() {
  const navigate = useNavigate();
  const {hospitalId , userId} = useParams();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleProfileCheckUser = () =>{
    navigate("/user-Profile/"+userId);
  }

  const handleProfileCheck = () =>{
    navigate("/hospital-Profile/"+hospitalId);
  }

  const handleBackToHome = () =>{
    navigate("/dashboard/"+hospitalId);
  }

  const handleBackToHomeUser = () =>{
    navigate("/dashboard-user/"+userId);
  }

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className='navbarContent'>
        <Box sx={{ flexGrow: 1 }}>
        <img src={LogoImage} alt="Logo" className="logoImage" onClick={hospitalId ? handleBackToHome : handleBackToHomeUser} style={{cursor:"pointer"}}/>
        </Box>
        <div className='rightSide'>
        <AccountBoxIcon className='profileIcon' onClick={hospitalId ? handleProfileCheck : handleProfileCheckUser } style={{cursor:"pointer"}}/>
        <IconButton className='iconButtonNav'>
          <Button onClick={handleLogout}><LogoutIcon />Log out</Button>
        </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
