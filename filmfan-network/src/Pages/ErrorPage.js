import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div id="error-container">
            <div>
              <h1>Error!</h1>
            <img src="https://i.pinimg.com/564x/46/3e/71/463e711e390963847579321ba1085a80.jpg" />
            <div>
              <Link to="/"><button>Go to Home Page</button></Link>  
            </div>  
            </div>
        </div>
    )
}

export default ErrorPage