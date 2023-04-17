import { useEffect } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useNavigate } from "react-router-dom";
import { Account } from "../../components/account/Account";
import "./accountPage.scss";

export const AccountPage = () => {
    // const authorized = useAuthorization();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!authorized) {
    //         navigate("/login");
    //     }
    // }, [navigate, authorized]);

    return (
        <div className="accountPage">
            <Account />
        </div>
    );
};
