//add tests in a study
//add surveys in a study
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

const AddTest = (props) => {
    let navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const study_id_local = localStorage.getItem("study_id_local");
    const [study, setStudy] = useState([]);
    const [tests, setTests] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [testName, setTestName] = useState("");
    const [testLink, setTestLink] = useState("");
    const [surveyName, setSurveyName] = useState("");
    const [surveyLink, setSurveyLink] = useState("");

    const onChangeTests = (event) => {
        setTests(event.target.value);
    }
    const onChangeSurveys = (event) => {
        setSurveys(event.target.value);
    }
    const onChangeTestName = (event) => {
        setTestName(event.target.value);
    }
    const onChangeTestLink = (event) => {
        setTestLink(event.target.value);
    }
    const onChangeSurveyName = (event) => {
        setSurveyName(event.target.value);
    }
    const onChangeSurveyLink = (event) => {
        setSurveyLink(event.target.value);
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/adminLogin");
        }
        if (!localStorage.getItem("study_id_local")) {
            navigate("/adminDashboard");
        }
        const ID = {
            study_id: study_id_local
          }
        axios
            .post('http://localhost:5000/api/users/getstudydetails', ID)
            .then((response) => {
                setTests(response.data.tests);
                setSurveys(response.data.surveys);
                setStudy(response.data)
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
    }, []);
const resetInputs = () => {
    setTestName("");
    setTestLink("");
    setSurveyName("");
    setSurveyLink("");
}
    const onSubmit = (e) => {
        e.preventDefault();
        const newTest = {
            authToken,
            testName: testName,
            testLink: testLink,
            studyId: study_id_local
        }
        axios
            .post('http://localhost:5000/api/users/auth/addteststudy', newTest,{
                headers: {
                    "auth-token": authToken
                }
            })
            .then((response) => {
                console.log(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
            resetInputs();
    }

    const onSubmitSurvey = (e) => {
        e.preventDefault();
        const newSurvey = {
            authToken,
            survey_name: surveyName,
            survey_link: surveyLink,
            study_id: study_id_local
        }
        axios
            .post('http://localhost:5000/api/users/auth/addsurveystudy', newSurvey,{
                headers: {
                    "auth-token": authToken
                }
            })
            .then((response) => {
                console.log(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
            resetInputs();
    }


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: "20px" }}>
                        <h1>Study Name: {study.study_name}</h1>
<h2>Add Test</h2>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Test Name"
                                        variant="outlined"
                                        value={testName}
                                        onChange={onChangeTestName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Test Link"   
                                        variant="outlined"
                                        value={testLink}
                                        onChange={onChangeTestLink}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Add Test
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <h2>Add Survey</h2>
                        <form onSubmit={onSubmitSurvey}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth                   
                                        label="Survey Name"
                                        variant="outlined"
                                        value={surveyName}
                                        onChange={onChangeSurveyName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Survey Link"
                                        variant="outlined"
                                        value={surveyLink}
                                        onChange={onChangeSurveyLink}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Add Survey
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

export default AddTest;



                        

