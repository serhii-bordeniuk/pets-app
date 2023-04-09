import { LoginPage } from "../../pages/loginPage/LoginPage";
import { SignupPage } from "../../pages/signupPage/SignupPage";
import { AccountPage } from "../../pages/accountPage/AccountPage";
import { Navbar } from "../navbar/Navbar";
import { Header } from "../header/Header";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <div className="App">
            {/* <Navbar navbarOpen={navbarOpen} />
            <Header headerTitle="Account" setNavbarOpen={setNavbarOpen} navbarOpen={navbarOpen} /> */}
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </div>
    );
}

export default App;
