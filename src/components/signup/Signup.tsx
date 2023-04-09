import React from "react";
import "./signup.scss";
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
import { useState } from "react";

export const Signup: React.FC = (): JSX.Element => {
    interface FormValues {
        email: string;
        password: string;
        confirmedPassword: string;
        showPassword: boolean;
        showConfirmedPassword: boolean;
    }

    const [credentials, setCredentials] = useState<FormValues>({
        email: "",
        password: "",
        confirmedPassword: "",
        showPassword: false,
        showConfirmedPassword: false,
    });

    const handleChange =
        (prop: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials({ ...credentials, [prop]: event.target.value });
        };

    const handleClickShowPassword = (prop: keyof FormValues) => () => {
        if (prop === "password") {
            setCredentials({ ...credentials, showPassword: !credentials.showPassword });
        } else {
            setCredentials({
                ...credentials,
                showConfirmedPassword: !credentials.showConfirmedPassword,
            });
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(credentials);
    };

    return (
        <div className="signup">
            <div className="mainlogo-wrapper">
                <img className="mainlogo" src={mainlogo} alt="logotype" />
            </div>
            <form className="signupForm" onSubmit={handleSubmit}>
                <h1 className="signupFormTitle">Sign Up</h1>
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
                                    onClick={handleClickShowPassword("password")}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="confirm-password-input"
                        type={credentials.showConfirmedPassword ? "text" : "password"}
                        value={credentials.confirmedPassword}
                        onChange={handleChange("confirmedPassword")}
                        label="password"
                        placeholder="Confirm your password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword("confirmedPassword")}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {credentials.showConfirmedPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
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
                <p className="loginLink">
                    Do you have an account already?{" "}
                    <Link to="/login" className="loginLinkButton">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};
