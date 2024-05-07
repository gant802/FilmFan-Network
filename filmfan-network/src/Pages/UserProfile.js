import React, {useEffect, useState} from "react";
import { useOutletContext,useNavigate } from "react-router-dom";

function UserProfile() {
    const [loggedIn, setLoggedIn] = useOutletContext()
    const navigate = useNavigate()
    const userFromStorage = localStorage.getItem("user")
    const userObjFromStoarge = JSON.parse(userFromStorage)

    const [user, setUser] = useState({})
    
    

useEffect(() => {
    if(userObjFromStoarge){ 
        fetch(`http://localhost:3030/users/${userObjFromStoarge.id}`)
    .then(res => res.json())
    .then(data => setUser(() => data))
    }
    
}, [])


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