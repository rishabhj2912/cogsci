//add patient to a study
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom"

const AddPatient = (props) => {
    let navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const study_id_local = localStorage.getItem("study_id_local");
    const [study, setStudy] = useState([]);
    const [patient, setPatient] = useState([]);
    const [patient_id, setPatient_id] = useState("");
    const [username, setUsername] = useState("");

const onChangePatient_id = (event) => {
        setPatient_id(event.target.value);
    }
    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/adminLogin");
        }
        if (!localStorage.getItem("study_id_local")) {
            navigate("/adminDashboard");
        }
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        const Username = {
            authToken,
            username: username,
        }
        // get patient from username
        axios.post("http://localhost:5000/api/users/getpatientfromusername", Username)
            .then((res) => {
                setPatient(res.data);
                setPatient_id(res.data._id);
                console.log(res.data._id);
        // add patient to study
        const ID = {
            authToken: authToken,
            studyId: study_id_local,
            patientId: patient_id
          }
        axios
            .post('http://localhost:5000/api/users/auth/addpatientstudy', ID)
            .then((res) => {
                console.log(res.data);
                alert("Patient added to study!");
            }
            )
            .catch((err) => {
                console.log(err);
                alert("Patient already added to study!");
            }
            )
            })
            .catch((err) => {
                console.log(err);
                alert("Patient not found!");
            }
            )
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <form onSubmit={onSubmit}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="username"
                                        name="username"
                                        label="Username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button     
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Add Patient
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default AddPatient;