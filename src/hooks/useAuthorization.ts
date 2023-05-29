import { useState, useEffect } from "react";

export const useAuthorization = (): boolean => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const authToken = sessionStorage.getItem("Auth Token");
        if (authToken) {
            setAuthorized(true);
        }
    }, []);

    return authorized;
};
