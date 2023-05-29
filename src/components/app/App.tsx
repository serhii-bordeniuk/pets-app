import { LoginPage } from "../../pages/loginPage/LoginPage";
import { SignupPage } from "../../pages/signupPage/SignupPage";
import { AccountPage } from "../../pages/accountPage/AccountPage";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { Layout } from "../layout/Layout";
import { AuthRoute } from "../authRoute/AuthRoute";
import { Provider } from "react-redux";
import { store } from "../../store/store";

function App() {
    return (
        <Provider store={store}>
            <Layout className="app">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/account"
                        element={
                            <AuthRoute>
                                <AccountPage />
                            </AuthRoute>
                        }
                    />
                </Routes>
            </Layout>
        </Provider>
    );
}

export default App;
