import React from "react";
import mainlogo from "../../resources/img/mainlogo.svg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./login.scss";
import { useState } from "react";
import { setUser } from "../../slices/userSlice";
import { useAppDispatch } from "../../hooks/useRedux";

interface FormValues {
    email: string;
    password: string;
}

export const Login: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = (data: FormValues) => {
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, data.email, data.password)
            .then((response) => {
                const { email } = response.user;
                response.user.getIdTokenResult().then((idTokenResult) => {
                    sessionStorage.setItem("Auth Token", idTokenResult.token);
                    dispatch(setUser({ email }));
                    navigate("/account");
                });
                reset();
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setError("Check the Email");
                } else if (error.code === "auth/wrong-password") {
                    setError("Check the Password");
                }
            });
    };

    return (
        <div className="login">
            <div className="mainlogoWrapper">
                <img className="mainlogo" src={mainlogo} alt="logotype" />
            </div>
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h1 className="loginFormTitle">Log In</h1>
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
                                        onClick={handleClickShowPassword}
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
