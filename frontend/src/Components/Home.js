import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './Home.css';
import Navbar from './Navbar';
import { LoginHostipal } from '../Services/HospitalServices';

function Home() {

  return (
    <div className="home-container">
        <Navbar/>
      <Grid container spacing={3} className='gridButtons'>
          <Grid item>
            <div
              className="grid-item item1"
            >
              <h2>Doctor</h2>
              <p>Click on the "Doctors" button to explore our team of experienced and dedicated medical professionals. Our doctors are committed to providing the best care and medical expertise to ensure your well-being.</p>
              <div className="button-wrapper">
                <Button className='homeButtons'>
                  <span className="button-text">Click</span>
                  <ArrowForwardIcon className="arrow-icon" />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item>
            <div
              className="grid-item item2"
            >
              <h2>Number Of Beds</h2>
              <p>Need to check the availability of beds in our facility? Click on the "Number of Beds" button to get real-time information about our available bed count and make informed decisions for your healthcare needs.</p>
              <div className="button-wrapper">
                <Button className='homeButtons'>
                  <span className="button-text">Click</span>
                  <ArrowForwardIcon className="arrow-icon" />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item>
            <div
              className="grid-item item3"
            >
              <h2>Beds Availability</h2>
              <p>If you are looking for the current status of beds in specific departments or units, use the "Bed Availability" button. This feature allows you to find vacant beds in the hospital quickly and conveniently.</p>
              <div className="button-wrapper">
                <Button className='homeButtons'>
                  <span className="button-text">Click</span>
                  <ArrowForwardIcon className="arrow-icon" />
                </Button>
              </div>
            </div>
          </Grid>
      </Grid>
    </div>
  );
}

export default Home;
