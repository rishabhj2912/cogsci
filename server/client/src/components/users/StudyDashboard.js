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
import Box from '@mui/material/Box';

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
const onDeletetest = (testName) => {
    const ID = {
        authToken: authToken,
        studyId: study_id_local,
        testName: testName
        }
    axios
        .post('http://localhost:5000/api/users/auth/deleteteststudy', ID)
        .then((response) => {
            console.log(response.data);
            window.location.reload();
        }
        )
        .catch((error) => {
            console.log(error);
        }
        );
}
const onDeletesurvey = (surveyName) => {
    const ID = {
        authToken: authToken,
        studyId: study_id_local,
        surveyName: surveyName
        }
    axios
        .post('http://localhost:5000/api/users/auth/deletesurveystudy', ID)
        .then((response) => {
            console.log(response.data);
            window.location.reload();
        }
        )
        .catch((error) => {
            console.log(error);
        }
        );
}


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
//add styling to the table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    
    const displayTests = testNames.map((testName, index) => {
        return (
            <TableRow>
                <StyledTableCell>{testName}</StyledTableCell>
                <StyledTableCell><a
                    href={testLinks[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {testLinks[index]}
                </a></StyledTableCell>
                {/* attempt button with the etst link */}
                <StyledTableCell><Button
                    variant="contained"
                    color="primary"
                    href={testLinks[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Attempt
                </Button></StyledTableCell>
                {/* delete button */}
                <StyledTableCell><Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeletetest(testName)}
                >
                    <DeleteIcon />
                </Button></StyledTableCell>

            </TableRow>
        )
    }
    );
    const displaySurveys = surveyNames.map((surveyName, index) => {
        return (

            <TableRow>
                <StyledTableCell>{surveyName}</StyledTableCell>
                <StyledTableCell><a
                    href={surveyLinks[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {surveyLinks[index]}
                </a></StyledTableCell>
                {/* attempt button with the survey link */}
                <StyledTableCell><Button
                    variant="contained"
                    color="primary"
                    href={surveyLinks[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Attempt
                </Button></StyledTableCell>
                {/* delete button */}
                <StyledTableCell><Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onDeletesurvey(surveyName)}
                >
                    <DeleteIcon />
                </Button></StyledTableCell>


            </TableRow>
        )
    }
    );

    return (
        // make tables of tests and surveys with their links
        <div>
            {/* leave 20px gap from top */}
            <Box sx={{ pt: 5 }} />
            <h1>Study Dashboard</h1>
            
            <h2>Tests</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Test Name</StyledTableCell>
                            <StyledTableCell>Test Link</StyledTableCell>
                            <StyledTableCell>Attempt</StyledTableCell>
                            <StyledTableCell>Delete</StyledTableCell>
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
                            <StyledTableCell>Survey Name</StyledTableCell>
                            <StyledTableCell>Survey Link</StyledTableCell>
                            <StyledTableCell>Attempt</StyledTableCell>
                            <StyledTableCell>Delete</StyledTableCell>
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


