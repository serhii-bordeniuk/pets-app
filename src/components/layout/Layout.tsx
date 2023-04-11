import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "../navbar/Navbar";
import { Header } from "../header/Header";

interface LayoutProps {
    children: React.ReactNode;
    className: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <div className={`${className}`}>
            {!["/signup", "/login"].includes(location.pathname) && (
                <>
                    <Navbar navbarOpen={navbarOpen} />
                    <Header
                        headerTitle="Account"
                        setNavbarOpen={setNavbarOpen}
                        navbarOpen={navbarOpen}
                    />
                </>
            )}
            {children}
        </div>
    );
};
