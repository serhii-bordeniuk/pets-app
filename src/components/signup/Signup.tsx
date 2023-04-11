import React from "react";
import { app } from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./signup.scss";
import mainlogo from "../../resources/img/mainlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import {
    TextField,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl,
    Button,
    Snackbar,
    Alert,
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

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<FormValues>({
        email: "",
        password: "",
        confirmedPassword: "",
        showPassword: false,
        showConfirmedPassword: false,
    });

    const [error, setError] = useState<string | null>(null);

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
        const authentication = getAuth(app);
        createUserWithEmailAndPassword(authentication, credentials.email, credentials.password)
            .then((response) => {
                navigate("/account");
                response.user.getIdTokenResult().then((idTokenResult) => {
                    sessionStorage.setItem("Auth Token", idTokenResult.token);
                });
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setError("This Email already in use");
                }
            });
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
                {error && (
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        onClose={() => setError(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Alert severity="error" sx={{ width: "100%" }}>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
            </form>
        </div>
    );
};
