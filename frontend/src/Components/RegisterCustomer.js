import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUsers } from '../Services/HospitalServices';
import "./Register.css"

function RegisterCustomer() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    emailId: '',
    password: '',
    contactNumber: '',
    streetName: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
  });

  const [errors, setErrors] = useState({});
const navigate = useNavigate();
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
    if (!formData.firstName.trim()) {
      validationErrors.firstName = 'First Name is required.';
    }
    if (!formData.lastName.trim()) {
      validationErrors.lastName = 'Last Name is required.';
    }
    if (!formData.emailId.trim()) {
      validationErrors.emailId = 'Email ID is required.';
    } else if (!isValidEmail(formData.emailId)) {
      validationErrors.emailId = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long.';
    }
    if (!formData.contactNumber.trim()) {
      validationErrors.contactNumber = 'Contact Number is required.';
    } else if (!isValidPhoneNumber(formData.contactNumber)) {
      validationErrors.contactNumber = 'Please enter a valid contact number.';
    }
    if (!formData.streetName.trim()) {
      validationErrors.streetName = 'Street Name is required.';
    }
    if (!formData.city.trim()) {
      validationErrors.city = 'City is required.';
    }
    if (!formData.state.trim()) {
      validationErrors.state = 'State is required.';
    }
    if (!formData.zipCode) {
      validationErrors.zipCode = 'ZIP Code is required.';
    } else if (!isValidZipCode(formData.zipCode)) {
      validationErrors.zipCode = 'Please enter a valid ZIP Code.';
    }
    if (!formData.emergencyContactName.trim()) {
      validationErrors.emergencyContactName = 'Emergency Contact Name is required.';
    }
    if (!formData.emergencyContactNumber.trim()) {
      validationErrors.emergencyContactNumber = 'Emergency Contact Number is required.';
    } else if (!isValidPhoneNumber(formData.emergencyContactNumber)) {
      validationErrors.emergencyContactNumber = 'Please enter a valid emergency contact number.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const createdHospital = await createUsers(formData);
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

  return (
    <div>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h2>SignUp As Customer</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                error={!!errors.middleName}
                helperText={errors.middleName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailId"
                type='email'
                value={formData.emailId}
                onChange={handleChange}
                error={!!errors.emailId}
                helperText={errors.emailId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
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
                label="Street Name"
                name="streetName"
                value={formData.streetName}
                onChange={handleChange}
                error={!!errors.streetName}
                helperText={errors.streetName}
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
                label="Emergency Contact Name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                error={!!errors.emergencyContactName}
                helperText={errors.emergencyContactName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact Number"
                type="tel"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                error={!!errors.emergencyContactNumber}
                helperText={errors.emergencyContactNumber}
              />
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

export default RegisterCustomer;
