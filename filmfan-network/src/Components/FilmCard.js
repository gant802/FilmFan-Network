import React from "react";

function FilmCard({details}) {


    return (
        <div className="individual-film-card">
            <img className="movie-image" src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`} />
            {details.name ? details.name : details.title}
            
            </div>
    )
}

export default FilmCard

