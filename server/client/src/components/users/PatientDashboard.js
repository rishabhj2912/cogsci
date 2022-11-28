//aptient Dashboard
// create a table of all the studies under the patient
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

const PatientDashboard = (props) => {
    let navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const patient_id_local = localStorage.getItem("patient_id_local");
    const [studies, setStudies] = useState([]);
    
    const onChangeStudies = (event) => {
        setStudies(event.target.value);
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/patientLogin");
        }
//get all studies under the patient id
const Id = {
            patientId: patient_id_local
}
        axios
            .post("http://localhost:5000/api/users/auth/getpatientstudies", Id)
            .then((res) => {
                setStudies(res.data);
                console.log(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    }, []);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
//make a table of all the studies under the patient
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Study Name</TableCell>
                                        <TableCell align="center">Study Description</TableCell>
                                        <TableCell align="center">Study Start Date</TableCell>
                                        <TableCell align="center">Study End Date</TableCell>
                                        <TableCell align="center">Study Status</TableCell>
                                        <TableCell align="center">Go to Study</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studies.map((study) => (
                                        <TableRow
                                            key={study._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{study.studyName}</TableCell>
                                            <TableCell align="center">{study.studyDescription}</TableCell>
                                            <TableCell align="center">{study.studyStartDate}</TableCell>
                                            <TableCell align="center">{study.studyEndDate}</TableCell>
                                            <TableCell align="center">{study.studyStatus}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        localStorage.setItem("study_id_local", study._id);
                                                        navigate("/studyDashboard");
                                                    }}
                                                >   Go to Study
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default PatientDashboard;




