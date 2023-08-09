import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import "./Login.css";


import { LoginHospital, LoginUsers } from '../Services/HospitalServices';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isHospitalLogin, setIsHospitalLogin] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSwitchChange = () => {
    setIsHospitalLogin((prevValue) => !prevValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isHospitalLogin) {
      LoginHospital(formData).then((res) =>{
        let results = res.data;
        if (results) {
          const hospitalId = results.hospitalId;
          console.log('Logged in as hospital:', results, hospitalId);
          navigate("/dashboard/"+hospitalId);
        }
      }).catch((error) => {
        console.error('Error logging in as hospital:', error);
      });
    } else {
      LoginUsers(formData).then((res) =>{
        let results = res.data;
        if (results) {
          const userId = results.userId;
          console.log('Logged in as hospital:', results);
          navigate("/dashboard-user/"+userId)
        }
      }).catch((error) => {
        console.error('Error logging in as hospital:', error);
      });
    }
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  return (
    <div>
      <div className="login-container">
        <form className="login-form signup-form" onSubmit={handleSubmit} noValidate autoComplete="off">
          {
            isHospitalLogin ? <h2>Login As Hospital</h2> : <h2>Login As Customer</h2>
          }
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type='email'
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={2} sx={{ marginLeft: "10px" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={isHospitalLogin}
                      onChange={handleSwitchChange}
                      sx={{ m: 1 }}
                    />
                  }
                  label="Hospital Login"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={8}>
              <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account?
                {
                  isHospitalLogin ? <Link to="/register-hospital">Sign Up</Link> : <Link to="/register-customer">Sign Up</Link>
                }
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#337b24',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export default Login;
