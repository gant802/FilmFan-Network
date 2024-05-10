import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

function LoginPage() {
    const [loginData, setLoginData] = useState("")
    const [loggedIn, setLoggedIn] = useOutletContext()

    const navigate = useNavigate()

    //? Logic to handle logging in if a user is found or not
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3030/users`)
            .then(res => res.json())
            .then(data => {
                const foundProfile = data.find(user => loginData === user.username)
                const localStorageUserID = { id: foundProfile.id }
                if (foundProfile) {
                    setLoggedIn(() => !loggedIn)
                    localStorage.setItem("user", JSON.stringify(localStorageUserID))
                    setLoggedIn(() => !loggedIn)
                    navigate(`/userProfile/${foundProfile.id}`)
                } else {
                    alert("No Profile Found!")
                }
            })
    }

    return (
        <div id="login-container">
            <h1>Welcome Back!</h1>
            <div id="login-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>
                        <input id="username-input" value={loginData.value} onChange={(e) => setLoginData(e.target.value)} type="text" placeholder="Enter username..."></input>
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p id="no-account-text">Don't have an account?</p>
                <p>
                    <Link id="create-profile-text" to={'/createAccount'}>Create Profile</Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage

