import React from "react";
import FilmCard from "./FilmCard";

function FilmFolders({genre, genreIndex}) {

    //? Genre names array that gets linked to each genre of movies (in a specific order based on initial fetch on Home page)
const genreName = ["Trending TV and Movies", "Action Movies", "Action TV", 
"Comedy Movies", "Comedy TV", "Documentaries", "Drama TV", "Family TV", 
"Horror Movies", "Kids TV", "Reality TV", "Romance Movies", "Thriller Movies"]

    const filmInGenre = genre.results

    const films = filmInGenre.map(film => {
        return <FilmCard key={film.id} details={film} />
    })
    
    return (
        <div className="film-types-container">
            <div className="headingContainer">
                <h2 className="genre-name">{genreName[genreIndex].toUpperCase()}</h2>
            </div>
            <div className="film-cards-container">
                {films}
            </div>
        </div>
    )
}

export default FilmFolders