import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { updateBed } from '../Services/HospitalServices';

const EditBeds = ({ open, onClose, bed, hospitalId }) => {
  const [formData, setFormData] = useState({
    hospitalId: hospitalId,
    regularBeds: bed.regularBeds,
    icuBeds: bed.icuBeds,
    pediatricBeds: bed.pediatricBeds,
    maternityBeds: bed.maternityBeds,
    birthingBeds: bed.birthingBeds,
    orthopedicBeds: bed.orthopedicBeds,
    homeCareBeds: bed.homeCareBeds,
    emergencyBeds: bed.emergencyBeds,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Edited bed data:', formData);
    updateBed(formData)
      .then((res) => {
        let results = res.data;
        if (results) {
          console.log('Bed information updated:', results);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error updating bed information:', error);
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Bed Information</DialogTitle>
      <DialogContent dividers style={{ height: '70vh' }}>
        <form>
          <TextField
            fullWidth
            label="Regular Beds"
            name="regularBeds"
            type="number"
            value={formData.regularBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="ICU Beds"
            name="icuBeds"
            type="number"
            value={formData.icuBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Pediatric Beds"
            name="pediatricBeds"
            type="number"
            value={formData.pediatricBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Maternity Beds"
            name="maternityBeds"
            type="number"
            value={formData.maternityBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Birthing Beds"
            name="birthingBeds"
            type="number"
            value={formData.birthingBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Orthopedic Beds"
            name="orthopedicBeds"
            type="number"
            value={formData.orthopedicBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="HomeCare Beds"
            name="homeCareBeds"
            type="number"
            value={formData.homeCareBeds}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Emergency Beds"
            name="emergencyBeds"
            type="number"
            value={formData.emergencyBeds}
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

export default EditBeds;
