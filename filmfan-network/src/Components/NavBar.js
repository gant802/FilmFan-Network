import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ loggedIn }) {

    //! Gets the id of the logged im user to navigate to their page (line 21 logic)
    const userFromStorage = localStorage.getItem("user")
    const user = JSON.parse(userFromStorage)



    return (
        <div id="navbar-container">
            <div id="navbar-non-login-container">
                <div id="logo-ffn-container"><img src="https://banner2.cleanpng.com/20180404/uzq/kisspng-film-director-cinema-television-film-video-recorder-5ac57a617d3650.0978071115228913615129.jpg" />
                    <NavLink to="/" className="navbar-btns">Film Fan Network</NavLink>
                </div>
                <NavLink to="/" className="navbar-btns">HOME</NavLink>
                <NavLink to="/search" className="navbar-btns">SEARCH</NavLink>
            </div>
            {loggedIn ? <NavLink to={`/userProfile/${user.id}`} className="navbar-btns">MY PROFILE</NavLink>
                : <NavLink to="/login" className="navbar-btns" id="login-btn">LOGIN</NavLink>}
        </div>
    )
}

export default NavBar