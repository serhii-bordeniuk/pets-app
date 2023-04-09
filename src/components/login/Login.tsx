import React from "react";
import mainlogo from "../../resources/img/mainlogo.svg";
import { Link } from "react-router-dom";
import {
    TextField,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./login.scss";
import { useState } from "react";

export const Login: React.FC = (): JSX.Element => {
    interface FormValues {
        email: string;
        password: string;
        showPassword: boolean;
    }

    const [credentials, setCredentials] = useState<FormValues>({
        email: "",
        password: "",
        showPassword: false,
    });

    const handleChange =
        (prop: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials({ ...credentials, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setCredentials({ ...credentials, showPassword: !credentials.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(credentials);
    };

    return (
        <div className="login">
            <div className="mainlogoWrapper">
                <img className="mainlogo" src={mainlogo} alt="logotype" />
            </div>
            <form className="loginForm" onSubmit={handleSubmit}>
                <h1 className="loginFormTitle">Log In</h1>
                <FormControl variant="outlined">
                    <TextField
                        id="email-input"
                        type="text"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange("email")}
                        placeholder="Enter your email"
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password-input"
                        type={credentials.showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={handleChange("password")}
                        label="password"
                        placeholder="Enter your password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    className="submitButton"
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Submit
                </Button>
                <p className="registrationLink">
                    Dont have an account yet?{" "}
                    <Link to="/signup" className="registrationLinkButton">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};
