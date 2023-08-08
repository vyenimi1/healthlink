import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useEffect } from "react"
import Login from './Components/Login';
import RegisterCustomer from './Components/RegisterCustomer';
import Home from './Components/Home';
import DoctorTable from './Components/Doctor';
import RegisterHospital from './Components/RegisterHospital';
import BedsTable from './Components/Beds';
import BedsAvailabilityTable from './Components/BedsAvailabilityTable';

function App() {
  return (
  
      <Routes>
        <Route path="/login" element={<Login  />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-hospital" element={<RegisterHospital />} />
        <Route path="/doctor" element={<DoctorTable />} />
        <Route path="/beds" element={<BedsTable />} />
        <Route path="/beds-avail" element={<BedsAvailabilityTable />} />
      </Routes>
   
  );
}

const MainApp=()=>{
  const location= useLocation()
  const Navigation= useNavigate()
  useEffect(()=>{
    const token= localStorage.getItem('token')
    if(token){
      Navigation(location.pathname)
    }else{
      Navigation('/login')
    }
  },[])
  return <App />
}
export default MainApp;