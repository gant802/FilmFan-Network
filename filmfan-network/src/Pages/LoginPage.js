import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div id="login-container">
            <h1>Welcome Back!</h1>
            <div id="login-form">
                <form>
                    <label>{"Username"}</label>
                    <input type="text" placeholder="Enter username..."></input>
                    <button type="submit">Login</button>
                </form>
                <p>{`Don't have an account?`}</p>
                <p>
                    <Link to={'/createAccount'}>Create Profile</Link>
                </p>
                
            </div>
        </div>
    )
}

export default LoginPage

//! Needs logic to see if a user exists