//Admin Dashboard
// create a table of all the studies and but to delete them or navigate to the study
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

const AdminDashboard = (props) => {
    let navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const [studies, setStudies] = useState([]);

    const onChangeStudies = (event) => {
        setStudies(event.target.value);
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/adminLogin");
        }
        // get all studies
        axios
            .get("http://localhost:5000/api/users/getstudies")
            .then((res) => {
                setStudies(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteStudy = (id) => {
        const ID = {
            authToken: authToken,
            id: id,
        }
        axios
            .post("http://localhost:5000/api/users/auth/deletestudy", ID, {
                headers: {
                    "auth-token": authToken
                }
            })

            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }
            
    const onSubmit = (id) => {
        localStorage.setItem("study_id_local",id);
        navigate("/studyDashboard");
      };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div className="adminDashboard">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Admin Dashboard</h1>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Study Name</StyledTableCell>
                                    <StyledTableCell align="right">Study Description</StyledTableCell>
                                    <StyledTableCell align="right">Study Type</StyledTableCell>
                                    <StyledTableCell align="right">Study Status</StyledTableCell>
                                    <StyledTableCell align="right">Study Start Date</StyledTableCell>
                                    <StyledTableCell align="right">Study End Date</StyledTableCell>
                                    <StyledTableCell align="right">Go To study</StyledTableCell>
                                    <StyledTableCell align="right">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studies.map((study) => (
                                    <StyledTableRow key={study._id}>
                                        <StyledTableCell component="th" scope="row">
                                            {study.studyName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{study.studyDescription}</StyledTableCell>
                                        <StyledTableCell align="right">{study.studyType}</StyledTableCell>
                                        <StyledTableCell align="right">{study.studyStatus}</StyledTableCell>
                                        <StyledTableCell align="right">{study.studyStartDate}</StyledTableCell>
                                        <StyledTableCell align="right">{study.studyEndDate}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSubmit(study._id)}
                                            >
                                                Go To Study
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="contained"                         
                                                color="error"
                                                onClick={() => deleteStudy(study._id)}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashboard;






