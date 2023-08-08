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

const EditModal = ({ open, onClose, doctor }) => {
  const [formData, setFormData] = useState(doctor);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Call the API to update the doctor data with formData
    // For example:
    // try {
    //   await axios.put(`/updateDoctor/${doctor.id}`, formData);
    //   onClose();
    // } catch (error) {
    //   console.log(error);
    // }
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
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
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
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Years of Experience"
            name="years_of_experience"
            type="number"
            value={formData.years_of_experience}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Languages Known"
            name="languages_known"
            value={formData.languages_known}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Consultation Hours"
            name="consultation_hours"
            value={formData.consultation_hours}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Availability Days"
            name="availability_days"
            value={formData.availability_days}
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