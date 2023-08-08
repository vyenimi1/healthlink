import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createHospitals } from '../Services/HospitalServices';

function RegisterHospital() {
  const [formData, setFormData] = useState({
    password: '',
    name: '',
    street: '',
    zipCode: '',
    city: '',
    state: '',
    contactNumber: '',
    email: '',
    website: '',
    labFacility: '',
    insuranceAcceptance: '',
    scanningFacility: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = 'Hospital Name is required.';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long.';
    }
    if (!formData.street.trim()) {
      validationErrors.street = 'Street is required.';
    }
    if (!formData.zipCode) {
      validationErrors.zipCode = 'ZIP Code is required.';
    } else if (!isValidZipCode(formData.zipCode)) {
      validationErrors.zipCode = 'Please enter a valid ZIP Code.';
    }
    if (!formData.city.trim()) {
      validationErrors.city = 'City is required.';
    }
    if (!formData.state.trim()) {
      validationErrors.state = 'State is required.';
    }
    if (!formData.contactNumber.trim()) {
      validationErrors.contactNumber = 'Contact Number is required.';
    } else if (!isValidPhoneNumber(formData.contactNumber)) {
      validationErrors.contactNumber = 'Please enter a valid contact number.';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email ID is required.';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (formData.website.trim() && !isValidWebsite(formData.website)) {
      validationErrors.website = 'Please enter a valid website URL.';
    }
    if (!formData.labFacility) {
      validationErrors.labFacility = 'Lab Facility selection is required.';
    }
    if (!formData.insuranceAcceptance) {
      validationErrors.insuranceAcceptance = 'Insurance Acceptance selection is required.';
    }
    if (!formData.scanningFacility) {
      validationErrors.scanningFacility = 'Scanning Facility selection is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const createdHospital = await createHospitals(formData);
      console.log('Created hospital:', createdHospital);
      navigate("/login")
    } catch (error) {
      console.error('Error creating hospital:', error);
    }
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d+$/.test(phoneNumber);
  };

  const isValidZipCode = (zipCode) => {
    return /^\d+$/.test(zipCode);
  };

  const isValidWebsite = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  return (
    <div>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h2>Sign Up As Hospital</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hospital Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                type="number"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                error={!!errors.website}
                helperText={errors.website}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Lab Facility</InputLabel>
                <Select
                  name="labFacility"
                  value={formData.labFacility}
                  onChange={handleChange}
                  error={!!errors.labFacility}
                  helperText={errors.labFacility}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Insurance Acceptance</InputLabel>
                <Select
                  name="insuranceAcceptance"
                  value={formData.insuranceAcceptance}
                  onChange={handleChange}
                  error={!!errors.insuranceAcceptance}
                  helperText={errors.insuranceAcceptance}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Scanning Facility</InputLabel>
                <Select
                  name="scanningFacility"
                  value={formData.scanningFacility}
                  onChange={handleChange}
                  error={!!errors.scanningFacility}
                  helperText={errors.scanningFacility}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p style={{ textAlign: 'center', marginTop: '-15px' }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default RegisterHospital;