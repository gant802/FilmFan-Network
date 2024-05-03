import React from "react";
import FilmCard from "./FilmCard";

function FilmFolders({genre, data}) {
    
    console.log(data)
    


    return (
        <div className="filmTypeContainer">
            <div className="headingContainer">
                <h2>{genre}</h2>
                <div className="btnContainer">
                    <button id="leftButton" className="leftButton" data-button="reality tv left"><i className="fa-solid fa-chevron-left"></i></button>
                    <button id="rightButton" className="rightButton" data-button="reality tv right"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
            <div className="tvItemsContainer" id="realityTv"></div>
        </div>
    )
}

export default FilmFolders