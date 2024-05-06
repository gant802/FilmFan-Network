import React from "react";
import { useOutletContext,useNavigate } from "react-router-dom";

function UserProfile() {
    const [loggedIn, setLoggedIn] = useOutletContext()
    const navigate = useNavigate()
    const userFromStorage = localStorage.getItem("user")
    const user = JSON.parse(userFromStorage)

    function handleLogOut() {
        localStorage.removeItem("user")
        setLoggedIn(() => !loggedIn)
        navigate("/")
    }


    return (
        <div>
            <h1>{user.username}</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default UserProfile