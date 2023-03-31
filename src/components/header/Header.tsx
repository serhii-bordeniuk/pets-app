import React from "react";
import "./header.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface HeaderProps {
    headerTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ headerTitle }) => {
    return (
        <header className="header">
            <h1 className="headerTitle">{headerTitle}</h1>
            <a className="headerNotifications" href="###">
                <NotificationsNoneIcon />
            </a>
        </header>
    );
};
