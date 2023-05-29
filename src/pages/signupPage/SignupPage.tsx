import React from "react";
import "./signupPage.scss";
import { MainBanner } from "../../components/mainBanner/MainBanner";
import { Signup } from "../../components/signup/Signup";

export const SignupPage: React.FC = () => {
    return (
        <div className="signupPage">
            <MainBanner />
            <Signup />
        </div>
    );
};
