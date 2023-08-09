import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useEffect } from "react"
import Login from './Components/Login';
import RegisterCustomer from './Components/RegisterCustomer';
import Home from './Components/Home';
import DoctorTable from './Components/Doctor';
import RegisterHospital from './Components/RegisterHospital';
import BedsTable from './Components/Beds';
import BedsAvailabilityTable from './Components/BedsAvailabilityTable';
import HospitalProfile from './Components/HospitalProfile';
import UserDashboard from './Components/UserDashboard';
import UserProfile from './Components/UserProfile';

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/dashboard/:hospitalId" element={<Home />} />
        <Route path="/dashboard-user/:userId" element={<UserDashboard />} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-hospital" element={<RegisterHospital />} />
        <Route path="/doctor/:hospitalId" element={<DoctorTable />} />
        <Route path="/beds/:hospitalId" element={<BedsTable />} />
        <Route path="/beds-avail/:hospitalId" element={<BedsAvailabilityTable />} />
        <Route path="/hospital-Profile/:hospitalId" element={<HospitalProfile />} />
        <Route path="/user-Profile/:userId" element={<UserProfile />} />
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