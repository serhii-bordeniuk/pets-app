import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

type AuthRouteProps = {
    children: React.ReactNode;
};

export const AuthRoute = ({ children }: AuthRouteProps) => {
    const navigate = useNavigate();
    const authToken = sessionStorage.getItem("Auth Token");

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, []);

    const content = authToken ? <React.Fragment>{children}</React.Fragment> : null;
    return content;
};
