import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { updateUserDetails } from '../Services/HospitalServices';
import { useParams } from 'react-router-dom';
import { getUserdetails } from '../Services/HospitalServices';
import Navbar from './Navbar';
import "./Register.css"

const UserProfile = () => {
  const { userId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [userData, setUserData] = useState("");

  const getUserDetail = () => {
    getUserdetails(userId).then((res) => {
      let results = res.data;
      if (results) {
        console.log('Logged in as user:', results);
        setUserData(results);
      }
    }).catch((error) => {
      console.error('Error logging in as user:', error);
    });
  }

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    updateUserDetails(userData, userId).then((res) => {
      let results = res.data;
      if (results) {
        console.log('User profile updated:', results);
        setUserData(results);
      }
    }).catch((error) => {
      console.error('Error updating user profile:', error);
    });
    setIsEditMode(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div>
        <Navbar/>
      <Grid container spacing={2} className='profileTextFeilds' style={{justifyContent:'center'}}>
      <div style={{ textAlign: "center", margin: "20px 20px 20px 20px"}}>
        <Typography variant="h5">{userData.firstName}&nbsp;{userData.middleName}&nbsp;{userData.lastName}</Typography>
      </div>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="password"
            type='password'
            value={userData.password}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="emailId"
            type='email'
            value={userData.emailId}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="middleName"
            value={userData.middleName}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="contactNumber"
            type='number'
            value={userData.contactNumber}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="streetName"
            value={userData.streetName}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="city"
            value={userData.city}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="zipCode"
            type="number"
            value={userData.zipCode}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="state"
            value={userData.state}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="emergencyContactName"
            value={userData.emergencyContactName}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="emergencyContactNumber"
            type='number'
            value={userData.emergencyContactNumber}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
      </Grid>
      {isEditMode ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      ) : (
        <EditIconWrapper onClick={handleEditClick}>
          <Edit style={{ margin: "10px", backgroundColor: "white", padding: '10px', borderRadius: '25px' }} />
        </EditIconWrapper>
      )}
    </div>
  );
};

const EditIconWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  marginTop: '10px',
});

export default UserProfile;