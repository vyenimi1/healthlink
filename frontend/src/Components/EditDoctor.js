import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import "./EditDoctor.css"
import { updateDoctor } from '../Services/HospitalServices';

const EditModal = ({ open, onClose, doctor, doctorId }) => {
  const [formData, setFormData] = useState(doctor);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    updateDoctor(formData,doctorId).then((res) =>{
      let results = res.data;
      if (results) {
        console.log('Doctor Added', results);
        window.location.reload();
      }
    }).catch((error) => {
      console.error('Error While adding doctor:', error);
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Doctor Information</DialogTitle>
      <DialogContent dividers style={{ height: '70vh' }}>
        <form>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            type='tel'
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="emailAddress"
            type='email'
            value={formData.emailAddress}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Languages Known"
            name="languagesKnown"
            value={formData.languagesKnown}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Consultation Hours"
            name="consultationHours"
            value={formData.consultationHours}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Availability Days"
            name="availabilityDays"
            type='number'
            value={formData.availabilityDays}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;