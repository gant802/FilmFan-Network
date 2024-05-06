import React, {useState} from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

function LoginPage() {
const [loginData, setLoginData] = useState("")
const [loggedIn, setLoggedIn] = useOutletContext()

const navigate = useNavigate()

function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:3030/users`)
    .then(res => res.json())
    .then(data => {
        const foundProfile = data.find(user => loginData === user.username)
        if (foundProfile) {
            setLoggedIn(() => !loggedIn)
            localStorage.setItem("user", JSON.stringify(foundProfile))
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
                    <label>{"Username"}</label>
                    <input value={loginData.value} onChange={(e) => setLoginData(e.target.value)} type="text" placeholder="Enter username..."></input>
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