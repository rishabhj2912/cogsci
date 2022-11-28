//add a study
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

const AddStudy = (props) => {
    let navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const [studies, setStudies] = useState([]);
    const [studyName, setstudyName] = useState("");
    const [studyDescription, setstudyDescription] = useState("");
    const [study_type, setStudy_type] = useState("");
    const [studyStatus, setstudyStatus] = useState("");
    const [studyStartDate, setstudyStartDate] = useState("");
    const [studyEndDate, setstudyEndDate] = useState("");
    const [study_id, setStudy_id] = useState("");
    
    const onChangestudyName = (event) => {
        setstudyName(event.target.value);
    }
    const onChangestudyDescription = (event) => {
        setstudyDescription(event.target.value);
    }
    const onChangeStudy_type = (event) => {
        setStudy_type(event.target.value);
    }
    const onChangestudyStatus = (event) => {
        setstudyStatus(event.target.value);
    }
    const onChangestudyStartDate = (event) => {
        setstudyStartDate(event.target.value);
    }
    const onChangestudyEndDate = (event) => {
        setstudyEndDate(event.target.value);
    }
    const onChangeStudy_id = (event) => {
        setStudy_id(event.target.value);
    }
    const resetInputs = () => {
        setstudyName("");
        setstudyDescription("");
        setstudyStatus("");
        setstudyStartDate("");
        setstudyEndDate("");
      
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
        const study = {
            authToken,
            studyName: studyName,
            studyDescription: studyDescription,
            studyStatus: studyStatus,
            studyStartDate: studyStartDate,
            studyEndDate: studyEndDate
        }
        axios.post("http://localhost:5000/api/users/auth/addstudy", study, {
            headers: {
                "auth-token": authToken
            }
        })
        .then((res) => {
            console.log(res.data);
            if (res.data === "Study added!") {
                alert("Study added!");
                navigate("/adminDashboard");
            } else {
                alert("Study added!");
            }
        })
        resetInputs();
    }   
    return (
        <div className="addStudy">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Add Study</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="studyName"
                                    label="Study Name"
                                    variant="outlined"
                                    
                                    value={studyName}
                                    onChange={onChangestudyName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="studyDescription"
                                    label="Study Description"
                                    variant="outlined"
                                    
                                    value={studyDescription}
                                    onChange={onChangestudyDescription}
                                />
                            </Grid>
                       
                            <Grid item xs={12}>
                                <TextField
                                    id="studyStatus"   
                                    label="Study Status"
                                    variant="outlined"
                                    
                                    value={studyStatus}
                                    onChange={onChangestudyStatus}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="studyStartDate"
                                    label="Study Start Date"
                                    variant="outlined"
                                    
                                    value={studyStartDate}
                                    onChange={onChangestudyStartDate}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="studyEndDate"                 
                                    label="Study End Date"
                                    variant="outlined"
                                    
                                    value={studyEndDate}
                                    onChange={onChangestudyEndDate}
                                />  
                            </Grid>
                    
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    
                                >
                                    Add Study
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default AddStudy;

