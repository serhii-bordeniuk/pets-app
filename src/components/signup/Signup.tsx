import React from "react";
import { app } from "../../firebase-config";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

interface FormValues {
    email: string;
    password: string;
    confirmedPassword: string;
}

export const Signup: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
        confirmedPassword: yup
            .string()
            .required("confirm password is a required field")
            .nullable()
            .test("match", "Passwords must match", function (value) {
                if (value === null) {
                    return false;
                }
                return value === this.parent.password;
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickShowPassword = (prop: keyof FormValues) => () => {
        if (prop === "password") {
            setShowPassword((prevShowPassword) => !prevShowPassword);
        } else {
            setShowConfirmedPassword((prevShowConfirmedPassword) => !prevShowConfirmedPassword);
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = (data: FormValues) => {
        const authentication = getAuth(app);
        createUserWithEmailAndPassword(authentication, data.email, data.password)
            .then((response) => {
                response.user.getIdTokenResult().then((idTokenResult) => {
                    sessionStorage.setItem("Auth Token", idTokenResult.token);
                    navigate("/account");
                });
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setError("This Email already in use");
                }
            });
        reset();
    };

    return (
        <div className="signup">
            <div className="mainlogo-wrapper">
                <img className="mainlogo" src={mainlogo} alt="logotype" />
            </div>
            <form className="signupForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h1 className="signupFormTitle">Sign Up</h1>
                <FormControl variant="outlined">
                    <TextField
                        {...register("email")}
                        id="email-input"
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your email"
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <TextField
                        {...register("password")}
                        id="password-input"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        label="Password"
                        placeholder="Enter your password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword("password")}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <TextField
                        {...register("confirmedPassword")}
                        id="confirm-password-input"
                        type={showConfirmedPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Confirm your password"
                        error={!!errors.confirmedPassword}
                        helperText={errors.confirmedPassword?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword("confirmedPassword")}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
