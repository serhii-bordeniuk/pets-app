import React from "react";
import "./header.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface HeaderProps {
    headerTitle: string;
    setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navbarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ headerTitle, setNavbarOpen, navbarOpen }) => {
    function toggleNavbar() {
        setNavbarOpen(!navbarOpen);
    }

    return (
        <header className="header">
            <div className="wrapper">
                <div className="headerContainer">
                    <div className="burgerButton" onClick={toggleNavbar}>
                        <span></span>
                    </div>
                    <div className="headerTitle">{headerTitle}</div>
                    <a className="headerNotifications" href="###">
                        <NotificationsNoneIcon />
                    </a>
                </div>
            </div>
        </header>
    );
};
