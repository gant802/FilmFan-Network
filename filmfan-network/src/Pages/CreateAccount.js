import React from "react";

function CreateAccount() {
    return (
        <div id="form-container">
            <form>
                <label>Username: </label>
                <input type="text" name="username" />

                <label>Profile Picture URL: </label>
                <input type="text" name="image-url" />

                <label>Email Address: </label>
                <input type="email" name="email" />

                <label>Birthday: </label>
                <input type="date" name="birthday" />

                <button type="submit">Create Profile</button>
            </form>
        </div>
    )
}


export default CreateAccount