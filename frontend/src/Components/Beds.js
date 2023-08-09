import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import "./Doctor.css"
import EditBeds from './EditBeds';
import { useParams } from 'react-router-dom';
import { getBedList } from '../Services/HospitalServices';

const bedDetails = {
  regularBeds: 0,
  icuBeds: 0,
  pediatricBeds: 0,
  maternityBeds: 0,
  birthingBeds: 0,
  orthopedicBeds: 0,
  homecareBeds: 0,
  emergencyBeds: 0,
};

const BedsTable = ({hsId}) => {

  const {hospitalId} = useParams();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);
  
    const [bedData, setBedData] = useState(bedDetails)
    const handleEditModalOpen = () => {
      setSelectedBed(bedData);
      setEditModalOpen(true);
    };
  
    const handleEditModalClose = () => {
      setEditModalOpen(false);
      setSelectedBed(null);
    };

    const getBeds = () =>{
      getBedList(hsId ? hsId : hospitalId).then((res) =>{
        let results = res.data;
        if (results) {
          console.log('Logged in as hospital:', results);
          setBedData(results);
        }
      }).catch((error) => {
        console.error('Error logging in as hospital:', error);
      });
    }
  
    useEffect(() => {
      getBeds();
    },[]);

  return (
   <>
   {
    hsId ? null :     <Navbar/>
   }
    <TableContainer component={Paper} className='table-container'>
    {
      hsId ? <h2 style={{textAlign:"center"}}>Bed Details</h2> :
      <Button color="primary" variant="contained" className='addDoctors' onClick={() => handleEditModalOpen()}>
          Edit Beds
        </Button>
    }
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bed Type</TableCell>
            <TableCell>Bed Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(bedData).map((bedType) => (
            !(bedType === 'serialNum' || bedType === 'hospitalId') && (
              <TableRow key={bedType} className="table-row">
                <TableCell>{bedType}</TableCell>
                <TableCell>{bedData[bedType]}</TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {selectedBed && (
      <EditBeds
        open={editModalOpen}
        onClose={handleEditModalClose}
        bed={selectedBed}
        hospitalId={hospitalId}
      />
    )}
   </>
  );
};

export default BedsTable;
