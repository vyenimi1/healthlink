import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import "./Doctor.css"
import EditDoctor from './EditDoctor';
import AddDoctor from './AddDoctor';

const doctorData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    age: 35,
    specialization: 'Cardiology',
    contact_number: '123-456-7890',
    email_address: 'john.doe@example.com',
    years_of_experience: 10,
    languages_known: 'English, Spanish',
    consultation_hours: '9:00 AM - 5:00 PM',
    availability_days: 'Mon, Wed, Fri',
  },
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    age: 35,
    specialization: 'Cardiology',
    contact_number: '123-456-7890',
    email_address: 'john.doe@example.com',
    years_of_experience: 10,
    languages_known: 'English, Spanish',
    consultation_hours: '9:00 AM - 5:00 PM',
    availability_days: 'Mon, Wed, Fri',
  },
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    age: 35,
    specialization: 'Cardiology',
    contact_number: '123-456-7890',
    email_address: 'john.doe@example.com',
    years_of_experience: 10,
    languages_known: 'English, Spanish',
    consultation_hours: '9:00 AM - 5:00 PM',
    availability_days: 'Mon, Wed, Fri',
  },
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    age: 35,
    specialization: 'Cardiology',
    contact_number: '123-456-7890',
    email_address: 'john.doe@example.com',
    years_of_experience: 10,
    languages_known: 'English, Spanish',
    consultation_hours: '9:00 AM - 5:00 PM',
    availability_days: 'Mon, Wed, Fri',
  },
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    age: 35,
    specialization: 'Cardiology',
    contact_number: '123-456-7890',
    email_address: 'john.doe@example.com',
    years_of_experience: 10,
    languages_known: 'English, Spanish',
    consultation_hours: '9:00 AM - 5:00 PM',
    availability_days: 'Mon, Wed, Fri',
  },
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    age: 35,
    specialization: 'Cardiology',
    contact_number: '123-456-7890',
    email_address: 'john.doe@example.com',
    years_of_experience: 10,
    languages_known: 'English, Spanish',
    consultation_hours: '9:00 AM - 5:00 PM',
    availability_days: 'Mon, Wed, Fri',
  },
];

const DoctorTable = () => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
  
    const handleEditModalOpen = (doctor) => {
      setSelectedDoctor(doctor);
      setEditModalOpen(true);
    };
  
    const handleEditModalClose = () => {
      setEditModalOpen(false);
      setSelectedDoctor(null);
    };

    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleAddModalOpen = () => {
      setAddModalOpen(true);
    };
  
    const handleAddModalClose = () => {
      setAddModalOpen(false);
    };

  return (
   <>
    <Navbar/>
    <TableContainer component={Paper} className='table-container'>
        <Button color="primary" variant="contained" className='addDoctors' onClick={handleAddModalOpen}>
          Add Doctor
        </Button>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Years of Experience</TableCell>
            <TableCell>Languages Known</TableCell>
            <TableCell>Consultation Hours</TableCell>
            <TableCell>Availability Days</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctorData.map((doctor) => (
            <TableRow key={doctor.id} className="table-row">
              <TableCell>{doctor.id}</TableCell>
              <TableCell>{doctor.first_name}</TableCell>
              <TableCell>{doctor.last_name}</TableCell>
              <TableCell>{doctor.gender}</TableCell>
              <TableCell>{doctor.age}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.contact_number}</TableCell>
              <TableCell>{doctor.email_address}</TableCell>
              <TableCell>{doctor.years_of_experience}</TableCell>
              <TableCell>{doctor.languages_known}</TableCell>
              <TableCell>{doctor.consultation_hours}</TableCell>
              <TableCell>{doctor.availability_days}</TableCell>
              <TableCell className="action-icons">
              <IconButton
                    aria-label="edit"
                    onClick={() => handleEditModalOpen(doctor)}
                  >
                    <EditIcon />
                  </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {selectedDoctor && (
        <EditDoctor
          open={editModalOpen}
          onClose={handleEditModalClose}
          doctor={selectedDoctor}
        />
      )}

{addModalOpen && (
        <AddDoctor
          open={addModalOpen}
          onClose={handleAddModalClose}
        />
      )}

   </>
  );
};

export default DoctorTable;
