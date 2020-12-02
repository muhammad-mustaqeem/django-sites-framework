import React from "react";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/Navbar";

const LoginPage = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <LoginForm/>
        </React.Fragment>
    );
}

export default LoginPage;
