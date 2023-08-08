import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const EditBedsAvailability = ({ open, onClose, bed }) => {
  const [formData, setFormData] = useState(bed);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Edited bed availability data:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Bed Availability Information</DialogTitle>
      <DialogContent dividers style={{ height: '70vh' }}>
        <form>
          <TextField
            fullWidth
            label="Bed Type"
            name="bedType"
            value={formData.bedType}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Bed Availability"
            name="bedAvailability"
            type="number"
            value={formData.bedCount}
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

export default EditBedsAvailability;