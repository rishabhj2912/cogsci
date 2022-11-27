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

const Register = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  // registration form for patient
  const [patient_id, setPatient_id] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePatient_id = (event) => {
    setPatient_id(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangePassword2 = (event) => {
    setPassword2(event.target.value);
  };
  const resetInputs = () => {
    setUsername("");
    setPatient_id("");
    setPassword("");
    setPassword2("");
    setType("");
  };
const onSubmit = (event) => {
  const newUser = {
    type: type,
    username: username,
    password: password,
    password2: password2,
  };

  // error handling
  // password length should be > 8
  // password and password2 should be the same

  if (newUser.password.length < 8) {
    alert("Password length should be at least 8");
    setPassword("");
    setPassword2("");
  }
  else if (newUser.password !== newUser.password2) {
    alert("Passwords do not match");
    setPassword("");
    setPassword2("");
  }
  else {
    //axios createpatient post request
    axios
      .post("http://localhost:5000/api/users/createpatient", newUser)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert("Patient Registered!");
        setPatient_id(res.data.patient_id);
        navigate("/login");
      }
      )
      .catch((err) => {
        console.log(err);
      }
  );
resetInputs();
  }
};
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={onChangeType}
                  >
                    <MenuItem value={"patient"}>Patient</MenuItem>
                    
                  </Select>
                </FormControl>
              </div>
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  defaultValue=""
                  variant="outlined"
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>
              <div>
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
              <div>
                <TextField
                  required
                  id="outlined-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={password2}
                  onChange={onChangePassword2}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{ m: 1, minWidth: 120 }}
                >
                  Register
                </Button>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};


export default Register;