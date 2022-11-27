// display the study 
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';

const StudyDashboard = (props) => {
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
    };
    const onChangeSurveys = (event) => {
        setSurveys(event.target.value);
    };
    const onChangeTestName = (event) => {
        setTestName(event.target.value);
    };
    const onChangeTestLink = (event) => {
        setTestLink(event.target.value);
    };
    const onChangeSurveyName = (event) => {
        setSurveyName(event.target.value);
    };
    const onChangeSurveyLink = (event) => {
        setSurveyLink(event.target.value);
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/adminLogin");
        }
        if (!localStorage.getItem("study_id_local")) {
            navigate("/adminDashboard");
        }

        //get the study
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

// get the test names and links from tests array
    const testNames = tests.map((test) => {
        return test.testName;
    }
    );
    const testLinks = tests.map((test) => {
        return test.testLink;
    }
    );
// get the survey names and links from survey array
    const surveyNames = surveys.map((survey) => {
        return survey.surveyName;
    }
    );
    const surveyLinks = surveys.map((survey) => {
        return survey.surveyLink;
    }
    );

// display tests and surveys with their links in a table
//display links as hyperlinks with links opening in new tabs
    const displayTests = testNames.map((testName, index) => {
        return (
            <TableRow>
                <TableCell>{testName}</TableCell>
                <TableCell><a href={testLinks[index]} target="_blank">{testLinks[index]}</a></TableCell>
            </TableRow>
        )
    }
    );
    const displaySurveys = surveyNames.map((surveyName, index) => {
        return (
            <TableRow>
                <TableCell>{surveyName}</TableCell>
                <TableCell><a href={surveyLinks[index]} target="_blank">{surveyLinks[index]}</a></TableCell>
            </TableRow>
        )
    }
    );

    return (
        // make tables of tests and surveys with their links
        <div>
            <h1>Study Dashboard</h1>
            
            <h2>Tests</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Test Name</TableCell>
                            <TableCell>Test Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayTests}
                    </TableBody>
                </Table>
            </TableContainer>
            <h2>Surveys</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Survey Name</TableCell>
                            <TableCell>Survey Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displaySurveys}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StudyDashboard;


