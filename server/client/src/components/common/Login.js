import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Login = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setUsername("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const User = {
            username: username,
            password: password
        };

        // console.log(User)

        axios
            .post("http://localhost:5000/api/users/auth/login", User)
            .then((res) => {
                console.log(res.data);
                if (res.data === "Invalid username") {
                    alert("Invalid username");
                } else if (res.data === "Invalid password") {
                    alert("Invalid password");
                } else {
                    console.log(res.data);
                    localStorage.setItem("token", res.data);
                    localStorage.setItem("patient_id_local", res.data.x);
                    navigate("/patientdashboard");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        resetInputs();
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item xs={12}>
                <h1>Login</h1>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"            
                                variant="outlined"
                                value={username}
                                onChange={onChangeUsername}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={onChangePassword}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;