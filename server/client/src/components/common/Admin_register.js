import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from 'react';
import axios from "axios";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Admin_register = (props) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");


  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeCpassword = (event) => {
    setCpassword(event.target.value);
  };

  const resetInputs = () => {
    setUsername("");
    setPassword("");
    setCpassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      username: username,
      password: password,
      cpassword: cpassword,
    };

    // error handling
    // if (newUser.contact.length !== 10) {
    //   alert("Invalid Phone Number!");
    //   setContact("");
    // }
    if (newUser.password.length < 8) {
      alert("Password is too short!");
      setPassword("");
      setCpassword("");
    }
    else if (newUser.password !== newUser.cpassword) {
      alert("Confirm password does not match!");
      setCpassword("");
    }
    else {
      axios
        .post("http://localhost:5000/api/users/createadmin", newUser)
      resetInputs();
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="form-group">
              <TextField
                required
                id="outlined-required"
                label="Username"
                variant="outlined"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className="form-group">
              <TextField
                required      
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="form-group">
              <TextField
                required            
                id="outlined-password-input1"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={cpassword}
                onChange={onChangeCpassword}
              />
            </div>
            <div className="form-group">
              <Button
                variant="contained"             
                onClick={onSubmit}
              >
                Register
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>          
  );
};

export default Admin_register;