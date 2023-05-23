import React from "react";
import "./account.scss";
import photoicon from "../../resources/icons/photo_icon.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

interface FormValues {
    email: string | null | undefined;
    userName: string;
    password: string;
    confirmedPassword: string;
    telephone: string;
}

export const Account: React.FC = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

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
        console.log(console.log(data));
    };

    return (
        <div className="account">
            <div className="wrapper">
                <div className="accoutnContainer">
                    <form className="accountForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="formDetails">
                            <div className="formTitle">Basic details</div>
                            <div className="formDetailsInputs">
                                <div className="photoInput">
                                    <img src={photoicon} alt="" />
                                </div>
                                <div className="textInputs">
                                    <FormControl variant="outlined">
                                        <TextField
                                            {...register("userName")}
                                            id="fullname-input"
                                            type="text"
                                            label="Full name"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="User name"
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined">
                                        <TextField
                                            {...register("email")}
                                            id="email-input"
                                            type="text"
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
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
                                    {...register("password")}
                                    id="password-input"
                                    type={showPassword ? "text" : "password"}
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
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
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
                                    {...register("confirmedPassword")}
                                    id="confirm-password-input"
                                    type={showConfirmedPassword ? "text" : "password"}
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
                                                {showConfirmedPassword ? (
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
                                    {...register("telephone")}
                                    id="phone-input"
                                    type="text"
                                    label="Telephone"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="+380 00 000 00 00"
                                />
                            </FormControl>
                        </div>
                        <Button className="button save" variant="contained" type="submit">
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
