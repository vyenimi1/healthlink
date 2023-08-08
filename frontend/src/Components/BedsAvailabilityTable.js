import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import "./Doctor.css";
import AddBedsAvailability from './AddBedsAvailability';
import EditBedsAvailability from './EditBedsAvailability';

const bedAvailabilityData = {
  regularBedAvail: 50,
  icuBedAvail: 20,
  pediatricBedAvail: 10,
  maternityBedAvail: 5,
  birthingBedAvail: 3,
  orthopedicBedAvail: 15,
  homeCareBedAvail: 8,
  emergencyBedAvail: 30,
};

const BedsAvailabilityTable = () => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);
  
    const handleEditModalOpen = (bedType) => {
      setSelectedBed({ bedType, bedCount: bedAvailabilityData[bedType] });
      setEditModalOpen(true);
    };
  
    const handleEditModalClose = () => {
      setEditModalOpen(false);
      setSelectedBed(null);
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
          Add Bed Availability
        </Button>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bed Type</TableCell>
            <TableCell>Bed Availability</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(bedAvailabilityData).map((bedType) => (
            <TableRow key={bedType} className="table-row">
              <TableCell>{bedType}</TableCell>
              <TableCell>{bedAvailabilityData[bedType]}</TableCell>
              <TableCell className="action-icons">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditModalOpen(bedType)}
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

    {selectedBed && (
      <EditBedsAvailability
        open={editModalOpen}
        onClose={handleEditModalClose}
        bed={selectedBed}
        bedAvailabilityData={bedAvailabilityData}
      />
    )}

    {addModalOpen && (
      <AddBedsAvailability
        open={addModalOpen}
        onClose={handleAddModalClose}
        bedAvailabilityData={bedAvailabilityData}
      />
    )}

   </>
  );
};

export default BedsAvailabilityTable;
