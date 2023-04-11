import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthorization = (): boolean => {
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = sessionStorage.getItem("Auth Token");
        if (authToken) {
            setAuthorized(true);
        }
    }, []);

    return authorized;
};
