import React from "react";
import "./account.scss";
import photoicon from "../../resources/icons/photo_icon.svg";
import {
    Button,
    FormControl,
    TextField,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export const Account: React.FC = (): JSX.Element => {
    interface FormValues {
        email: string;
        userName: string;
        password: string;
        confirmedPassword: string;
        showPassword: boolean;
        showConfirmedPassword: boolean;
    }

    const [credentials, setCredentials] = useState<FormValues>({
        email: "",
        userName: "",
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
        <div className="account">
            <div className="wrapper">
                <div className="accoutnContainer">
                    <form className="accountForm">
                        <div className="formDetails">
                            <div className="formTitle">Basic details</div>
                            <div className="formDetailsInputs">
                                <div className="photoInput">
                                    <img src={photoicon} alt="" />
                                </div>
                                <div className="textInputs">
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="fullname-input"
                                            type="text"
                                            label="Full name"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange("userName")}
                                            placeholder="User name"
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="email-input"
                                            type="text"
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange("email")}
                                            placeholder="example@gmail.com"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="formChangePassword">
                            <div className="formTitle">Change password</div>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
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
                                                {credentials.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
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
                                                onClick={handleClickShowPassword(
                                                    "confirmedPassword"
                                                )}
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
                            <FormControl variant="outlined">
                                <TextField
                                    id="phone-input"
                                    type="text"
                                    label="Telephone"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange("userName")}
                                    placeholder="+380 00 000 00 00"
                                />
                            </FormControl>
                        </div>
                        <Button className="button save" variant="contained">
                            Save
                        </Button>
                        <div className="formDeleteAcc">
                            <div className="formDeleteAccTitle">Delete Account</div>
                            <div className="formDeleteAccText">
                                Delete your account and all your source data. This is irreversible
                            </div>
                            <Button className="button delete" variant="contained">
                                Delete
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
