import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Admin_login = (props) => {

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
            .post("http://localhost:5000/api/users/auth/adminlogin", User)
            .then((res) => {
                // console.log(res.data)
                if (res.data === "Invalid username or password") {
                    alert("Invalid username or password");

                } else {
                    localStorage.setItem("token", res.data);
                    navigate("/adminDashboard");
                }
        resetInputs();
    });
    }
    return (
        <div className="login">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Admin Login</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="username"
                                    name="username"
                                    label="Username"
                                    fullWidth
                                    autoComplete="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required            
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"                                   
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Admin_login;