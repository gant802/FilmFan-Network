import React from "react";
import FilmCard from "./FilmCard";

function FilmFolders({genre, genreIndex}) {

const genreName = ["Trending TV and Movies", "Action Movies", "Action TV", 
"Comedy Movies", "Comedy TV", "Documentaries", "Drama TV", "Family TV", 
"Horror Movies", "Kids TV", "Reality TV", "Romance Movies", "Thriller Movies"]


    const filmInGenre = genre.results

    const films = filmInGenre.map(film => {
        return <FilmCard key={film.id} details={film} />
    })
    
    return (
        <div className="filmTypeContainer">
            <div className="headingContainer">
                <h2>{genreName[genreIndex]}</h2>
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