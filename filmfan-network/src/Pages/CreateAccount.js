import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
const navigate = useNavigate()

const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    profilePhoto: "",
    email: "",
    birthday: "",
    likes: [],
    favorites: []
})

function handleFormChange(e) {
const key = e.target.name
const value = e.target.value
setNewUserData({
    ...newUserData,
    [key] : value
})
}

function handleFormSubmit (e){
e.preventDefault()
fetch("http://localhost:3030/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData)
})
.then(res => res.json())
.then(data => {
navigate("/login")
})
.catch(error => console.log("error"))


}

    return (
        <div id="form-container">
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <label>First Name: </label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.firstName} 
                type="text" name="firstName" />

                <label>Last Name: </label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.lastName}
                 type="text" name="lastName" />

                <label>Username: </label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.username}
                 type="text" name="username" />

                <label>Profile Picture URL: </label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.profilePhoto} 
                type="text" name="profilePhoto" />

                <label>Email Address: </label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.email} 
                type="email" name="email" />

                <label>Birthday: </label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.birthday}
                 type="date" name="birthday" />

                <button type="submit">Create Profile</button>
            </form>
        </div>
    )
}


export default CreateAccount