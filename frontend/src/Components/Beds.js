import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import "./Doctor.css"
import AddBeds from './AddBeds';
import EditBeds from './EditBeds';

const bedData = {
  regularBeds: 50,
  icuBeds: 20,
  pediatricBeds: 10,
  maternityBeds: 5,
  birthingBeds: 3,
  orthopedicBeds: 15,
  homeCareBeds: 8,
  emergencyBeds: 30,
};

const BedsTable = () => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);
  
    const handleEditModalOpen = (bedType) => {
      setSelectedBed({ bedType, bedCount: bedData[bedType] });
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
          Add Bed
        </Button>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bed Type</TableCell>
            <TableCell>Bed Count</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(bedData).map((bedType) => (
            <TableRow key={bedType} className="table-row">
              <TableCell>{bedType}</TableCell>
              <TableCell>{bedData[bedType]}</TableCell>
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
      <EditBeds
        open={editModalOpen}
        onClose={handleEditModalClose}
        bed={selectedBed}
        bedData={bedData}
      />
    )}

    {addModalOpen && (
      <AddBeds
        open={addModalOpen}
        onClose={handleAddModalClose}
        bedData={bedData}
      />
    )}

   </>
  );
};

export default BedsTable;
