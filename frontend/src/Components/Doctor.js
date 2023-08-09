import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import "./Doctor.css"
import EditDoctor from './EditDoctor';
import AddDoctor from './AddDoctor';
import { deleteDoctor, getDoctorList } from '../Services/HospitalServices';
import { useParams } from 'react-router-dom';

const DoctorTable = ({hsId}) => {
  const {hospitalId} = useParams();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [doctorData, setDoctorData] = useState([])
  const [doctorId, setDoctorId] = useState("")

  const handleEditModalOpen = (doctor, docId) => {
    setSelectedDoctor(doctor);
    setEditModalOpen(true);
    setDoctorId(docId);
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

  const getDoctors = () =>{
    getDoctorList(hsId ? hsId : hospitalId).then((res) =>{
      let results = res.data;
      if (results) {
        console.log('Logged in as hospital:', results);
        setDoctorData(results);
      }
    }).catch((error) => {
      console.error('Error logging in as hospital:', error);
    });
  }

  useEffect(() => {
    getDoctors();
  },[]);

  const handleDelete = (docId) =>{
    deleteDoctor(docId).then((res) =>{
      let results = res.data;
      if (results) {
        console.log('Delete Doctor:', results);
        window.location.reload();
      }
    }).catch((error) => {
      console.error('Error logging in as hospital:', error);
    });
  }

  return (
    <>
      {
        hsId ? null : <Navbar />
      }
      <TableContainer component={Paper} className='table-container'>
       {
        hsId ? <h2 style={{textAlign:"center"}}>Doctor Details</h2> :  
        <Button color="primary" variant="contained" className='addDoctors' onClick={handleAddModalOpen}>
        Add Doctor
      </Button>
       }
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>Languages Known</TableCell>
              <TableCell>Consultation Hours</TableCell>
              <TableCell>Availability Days</TableCell>
              {
                hsId ? null : 
                <>
                <TableCell>Contact Number</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Action</TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorData.map((doctor) => (
              <TableRow key={doctor.doctorId} className="table-row">
                <TableCell>{doctor.doctorId}</TableCell>
                <TableCell>{doctor.firstName}</TableCell>
                <TableCell>{doctor.lastName}</TableCell>
                <TableCell>{doctor.gender}</TableCell>
                <TableCell>{doctor.age}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.yearsOfExperience}</TableCell>
                <TableCell>{doctor.languagesKnown}</TableCell>
                <TableCell>{doctor.consultationHours}</TableCell>
                <TableCell>{doctor.availabilityDays}</TableCell>
                {
                  hsId ? null :
                  <>
                  <TableCell>{doctor.contactNumber}</TableCell>
                  <TableCell>{doctor.emailAddress}</TableCell>
                  <TableCell className="action-icons">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditModalOpen(doctor, doctor.doctorId)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(doctor.doctorId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                  </>
                }
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
          doctorId ={doctorId}
        />
      )}

      {addModalOpen && (
        <AddDoctor
          open={addModalOpen}
          onClose={handleAddModalClose}
          hospitalId={hospitalId}
        />
      )}

    </>
  );
};

export default DoctorTable;
