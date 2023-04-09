import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import mainlogo from "../../resources/img/mainlogo.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";
import PaidIcon from "@mui/icons-material/Paid";

interface NavbarProps {
    navbarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ navbarOpen }) => {
    return (
        <div className={navbarOpen ? "navbar open" : "navbar"}>
            <div className="navbarHeader">
                <div className="navbarHeaderLogo">
                    <img src={mainlogo} alt="logo" />
                </div>
                <span className="navbarHeaderLine"></span>
                <nav className="navbarHeaderMenu">
                    <button className="menuItem">
                        <AccountCircleIcon /> Profile
                    </button>
                    <button className="menuItem">
                        <PetsIcon />
                        My Pets
                    </button>
                    <button className="menuItem">
                        <PaidIcon />
                        Expenses
                    </button>
                    <button className="menuItem">
                        <LocalHospitalIcon />
                        Health
                    </button>
                </nav>
            </div>
            <div className="navbarFooter">
                <button className="navbarFooterLogout">
                    {" "}
                    <LogoutIcon /> Log Out
                </button>
            </div>
        </div>
    );
};
