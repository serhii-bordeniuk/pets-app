import React from "react";
import "./loginPage.scss";
import { MainBanner } from "../../components/mainBanner/MainBanner";
import { Login } from "../../components/login/Login";

export const LoginPage: React.FC = () => {
    return (
        <div className="loginPage">
            <MainBanner />
            <Login />
        </div>
    );
};
