import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const navigate = useNavigate()

    const [newUserData, setNewUserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        profilePhoto: "",
        favoriteFilmQuote: "",
        quoteAuthor: "",
        email: "",
        birthday: "",
        likes: [],
        favorites: []
    })

    //? Handles catching form in state as you type in the form
    function handleFormChange(e) {
        const key = e.target.name
        const value = e.target.value
        setNewUserData({
            ...newUserData,
            [key]: value
        })
    }

    //? Handles form submission and adds new user to db.json
    function handleFormSubmit(e) {
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
            <h2>Create your Profile</h2>
            <form id="new-profile-form" onSubmit={(e) => handleFormSubmit(e)}>
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

                <label>Favorite Quote From Movie or TV:</label>
                <textarea onChange={(e) => handleFormChange(e)} value={newUserData.favoriteFilmQuote}
                    rows="4" cols="30" placeholder="Do not use quotation marks! Example: Luke, I am your father." name="favoriteFilmQuote"></textarea>

                <label>Author of Quote:</label>
                <input onChange={(e) => handleFormChange(e)} value={newUserData.quoteAuthor}
                    type="text" name="quoteAuthor" placeholder="Darth Vader" />
                <div>
                    <button type="submit">Create Profile</button>
                </div>

            </form>
        </div>
    )
}


export default CreateAccount