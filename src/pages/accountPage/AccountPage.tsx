import React from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import { Navigate, useNavigate } from "react-router-dom";
import { Account } from "../../components/account/Account";
import "./accountPage.scss";

export const AccountPage = () => {
    const authorized = useAuthorization();
    const navigate = useNavigate();

    if (!authorized) {
        navigate("/login");
    }
    return (
        <div className="accountPage">
            <Account />
        </div>
    );
};
