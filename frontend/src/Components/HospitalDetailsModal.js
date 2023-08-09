import React from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import EmailIcon from '@mui/icons-material/Email';
import "./HospitalDetailsModal.css"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalDetailsModal = ({ hospital }) => {
  return (
    <div className="modal-paper">
      <div className="modal-header">
        <LocalHospitalIcon/>
        <Typography variant="h5">{hospital.name}</Typography>
      </div>
      <div className="modal-content">
        <div className="contact-details">
          <div className="contact-field">
            <EmailIcon />
            <Typography style={{marginLeft:'10px'}}>Email: {hospital.email}</Typography>
          </div>
          <div className="contact-field">
            <PhoneIcon />
            <Typography style={{marginLeft:'10px'}}>Contact Number: {hospital.contactNumber}</Typography>
          </div>
          <div className="contact-field">
            <WebIcon />
            <Typography style={{marginLeft:'10px'}}>Website: {hospital.website}</Typography>
          </div>
        </div>
        <Typography variant="body2" className="appointment-text" style={{fontWeight:'700', margin:'10px'}}>
          <h3>Book your appointment by calling us or dropping us an email.</h3>
        </Typography>
        <Button variant="contained" color="primary" className="book-appointment-btn">
          <PhoneIcon /> Call to Book
        </Button>
        <Button variant="contained" color="primary" className="book-appointment-btn">
          <EmailIcon /> Email to Book
        </Button>
      </div>
    </div>
  );
};

export default HospitalDetailsModal;
