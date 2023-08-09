import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from './Navbar';
import "./Doctor.css";
import EditBedsAvailability from './EditBedsAvailability';
import { getBedAvlList } from '../Services/HospitalServices';
import { useParams } from 'react-router-dom';

const bedAvailabilityData = {
  regularBedAvail: 0,
  icuBedAvail: 0,
  pediatricBedAvail: 0,
  maternityBedAvail: 0,
  birthingBedAvail: 0,
  orthopedicBedAvail: 0,
  homeCareBedAvail: 0,
  emergencyBedAvail: 0,
};

const BedsAvailabilityTable = ({hsId}) => {

  const {hospitalId} = useParams();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);

    const [bedAvlData, setBedAvlData] = useState(bedAvailabilityData)
  
    const handleEditModalOpen = () => {
      setSelectedBed(bedAvlData);
      setEditModalOpen(true);
    };
  
    const handleEditModalClose = () => {
      setEditModalOpen(false);
      setSelectedBed(null);
    };

    const getBedsAvl = () =>{
      getBedAvlList(hsId ? hsId : hospitalId).then((res) =>{
        let results = res.data;
        if (results) {
          console.log('Logged in as hospital:', results);
          setBedAvlData(results);
        }
      }).catch((error) => {
        console.error('Error logging in as hospital:', error);
      });
    }
  
    useEffect(() => {
      getBedsAvl();
    },[]);

  return (
   <>
   {
    hsId ? null : <Navbar/>
   }
    <TableContainer component={Paper} className='table-container'>

        {
          hsId ? <h2 style={{textAlign:"center"}}>Bed Availability Details</h2> :     
          <Button color="primary" variant="contained" className='addDoctors' onClick={() => handleEditModalOpen()}>
          Edit Bed Availability
        </Button>
        }
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bed Type</TableCell>
            <TableCell>Bed Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(bedAvlData).map((bedType) => (
            !(bedType === 'serialNum' || bedType === 'hospitalId') && (
              <TableRow key={bedType} className="table-row">
                <TableCell>{bedType}</TableCell>
                <TableCell>{bedAvlData[bedType]}</TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {selectedBed && (
      <EditBedsAvailability
        open={editModalOpen}
        onClose={handleEditModalClose}
        bed={selectedBed}
        hospitalId={hospitalId}
      />
    )}
   </>
  );
};

export default BedsAvailabilityTable;
