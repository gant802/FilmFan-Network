import React from "react";
import FilmCard from "./FilmCard";

function FilmFolders({genre}) {
    const filmInGenre = genre.results

    const films = filmInGenre.map(film => {
        return <FilmCard key={film.id} details={film} />
    })
    
    return (
        <div className="filmTypeContainer">
            <div className="headingContainer">
                <h2>Hi</h2>
                <div className="btnContainer">
                <button id="leftButton"> scroll left </button>
                    <button id="rightButton"> scroll right </button>
                </div>
            </div>
            <div className="film-cards-container">
                {films}
            </div>
        </div>
    )
}

export default FilmFolders