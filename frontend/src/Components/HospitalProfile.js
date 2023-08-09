import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import "./Register.css"
import Navbar from './Navbar';
import { getHospitaldetails, updateHospitalDetails } from '../Services/HospitalServices';
import { useParams } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalProfile = () => {
  const { hospitalId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [hospitalData, setHospitalData] = useState("");

  const getHospitalDetail = () => {
    getHospitaldetails(hospitalId).then((res) => {
      let results = res.data;
      if (results) {
        console.log('Logged in as hospital:', results);
        setHospitalData(results);
      }
    }).catch((error) => {
      console.error('Error logging in as hospital:', error);
    });
  }

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    updateHospitalDetails(hospitalData, hospitalId).then((res) => {
      let results = res.data;
      if (results) {
        console.log('Logged in as hospital:', results);
        setHospitalData(results);
      }
    }).catch((error) => {
      console.error('Error logging in as hospital:', error);
    });
    setIsEditMode(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHospitalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getHospitalDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", margin: "80px 20px 20px 20px" }}>
        <LocalHospitalIcon fontSize='large'/>
        <Typography variant="h5">{hospitalData.name}</Typography>
        <Typography>Email: {hospitalData.email}</Typography>
      </div>
      <Grid container spacing={2} className='profileTextFeilds'>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                // label="Hospital Name"
                name="name"
                value={hospitalData.name}
                onChange={handleChange}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                // label="Email"
                name="email"
                type='email'
                value={hospitalData.email}
                onChange={handleChange}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="Password"
            type="password"
            name="password"
            value={hospitalData.password}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="Street"
            name="street"
            value={hospitalData.street}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            // label="ZIP Code"
            name="zipCode"
            type='number'
            value={hospitalData.zipCode}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            // label="City"
            name="city"
            value={hospitalData.city}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="State"
            name="state"
            value={hospitalData.state}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="Contact Number"
            name="contactNumber"
            type='number'
            value={hospitalData.contactNumber}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="Website"
            name="website"
            value={hospitalData.website}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            fullWidth
            // label="Insurance Acceptance"
            name="insuranceAcceptance"
            value={hospitalData.labFacility}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="Insurance Acceptance"
            name="insuranceAcceptance"
            value={hospitalData.insuranceAcceptance}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            // label="Scanning Facility"
            name="scanningFacility"
            value={hospitalData.scanningFacility}
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

export default HospitalProfile;
