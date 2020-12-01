import React from "react";
import {NavBar} from "../components/Navbar";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
        <div>
            <NavBar/>
            <h1>LoginPage</h1>
            <LoginForm/>
        </div>
    );
}

export default LoginPage;