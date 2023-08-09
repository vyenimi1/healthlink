import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Navbar from './Navbar';
import "./UserDashboard.css"
import { getHospitalList } from '../Services/HospitalServices';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HospitalDetailsModal from './HospitalDetailsModal';
import BedsTable from './Beds';
import BedsAvailabilityTable from './BedsAvailabilityTable';
import DoctorTable from './Doctor';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleForBooking = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "35%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserDashboard = () => {
  const [hospitalData, setHospitalData] = useState([])
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handleGetDetails = (hospitalId) => {
    console.log(`Getting details for hospital with ID: ${hospitalId}`);
    setOpen(true);
    const selected = hospitalData.find((hospital) => hospital.hospitalId === hospitalId);
    setSelectedHospital(selected);
  };

  const [openBedModal, setOpenBedModal] = React.useState(false);
  const [selectedBedHospital, setSelectedBedHospital] = React.useState(null);

  const handleGetBeds = (hospitalId) => {
    console.log(`Getting beds for hospital with ID: ${hospitalId}`);
    setSelectedBedHospital(hospitalId);
    setOpenBedModal(true);
  };

  const [openBedAvailabilityModal, setOpenBedAvailabilityModal] = React.useState(false);
  const [selectedBedAvailabilityHospital, setSelectedBedAvailabilityHospital] = React.useState(null);

  const handleGetBedsAvailability = (hospitalId) => {
    console.log(`Getting beds availability for hospital with ID: ${hospitalId}`);
    setSelectedBedAvailabilityHospital(hospitalId);
    setOpenBedAvailabilityModal(true);
  };

  const [openDoctorModal, setOpenDoctorModal] = React.useState(false);
  const [selectedDoctorHospital, setSelectedDoctorHospital] = React.useState(null);

  const handleGetDoctors = (hospitalId) => {
    console.log(`Getting doctors for hospital with ID: ${hospitalId}`);
    setSelectedDoctorHospital(hospitalId);
    setOpenDoctorModal(true);
  };

  const hospitalDetailsList = () => {
    getHospitalList().then((res) => {
      let results = res.data;
      if (results) {
        console.log('Delete Doctor:', results);
        setHospitalData(results);
      }
    }).catch((error) => {
      console.error('Error logging in as hospital:', error);
    });
  }

  useEffect(() => {
    hospitalDetailsList();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = searchQuery === ''
    ? hospitalData
    : hospitalData.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Navbar />
      <div style={{ width: '80%', height: '100%', margin: '80px auto 0' }}>
      <TextField
          type="text"
          placeholder="Search by Hospital Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px', width: '50%' }} // Set width to 50%
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon /> {/* Add your search icon here */}
                </IconButton>
              </InputAdornment>
            ),
            style: { backgroundColor: 'white' }, // Set background color to white
          }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className='dashboard-head'>
                <TableCell>Hospital Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='dashboard-body'>
              {filteredHospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>{hospital.name}</TableCell>
                  <TableCell>{hospital.city}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleGetDetails(hospital.hospitalId)}>
                      Book Appointment
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleGetBeds(hospital.hospitalId)}>
                      check Beds
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleGetBedsAvailability(hospital.hospitalId)}>
                      Check Beds Availability
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleGetDoctors(hospital.hospitalId)}>
                      check Doctors
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleForBooking}>
          <HospitalDetailsModal
            hospital={selectedHospital}
          />
        </Box>
      </Modal>
      <Modal
        open={openBedModal}
        onClose={() => setOpenBedModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedBedHospital && (
            <BedsTable hsId={selectedBedHospital} />
          )}
        </Box>
      </Modal>
      <Modal
        open={openBedAvailabilityModal}
        onClose={() => setOpenBedAvailabilityModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedBedAvailabilityHospital && (
            <BedsAvailabilityTable hsId={selectedBedAvailabilityHospital} />
          )}
        </Box>
      </Modal>
      <Modal
        open={openDoctorModal}
        onClose={() => setOpenDoctorModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedDoctorHospital && (
            <DoctorTable hsId={selectedDoctorHospital} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserDashboard;
