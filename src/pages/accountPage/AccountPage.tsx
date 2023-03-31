import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Account } from "../../components/account/Account";
import "./accountPage.scss";

export const AccountPage = () => {
    return (
        <div className="accountPage">
            <Navbar />
            <Account />
        </div>
    );
};
