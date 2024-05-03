import React from "react";

function NavBar(){
    return (
        <div id="navbar-container">
            <div id="navbar-non-login-container">
                <div id="logo-ffn-container"><img src="https://banner2.cleanpng.com/20180404/uzq/kisspng-film-director-cinema-television-film-video-recorder-5ac57a617d3650.0978071115228913615129.jpg"/>
            <h2 id="ffn-left-corner-text">Film Fan Network</h2>
            </div>
            <h2 className="navbar-btns">Home</h2>
            <h2 className="navbar-btns">Search</h2>
            </div>
            <h2 className="navbar-btns" id="login-btn">Login</h2>
        </div>
    )
}

export default NavBar