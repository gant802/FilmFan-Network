import React from "react";


function FilmCard({details}) {

    const defaultImage = details.backdrop_path ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`

    return (
        <div className="smallCardContainer">
            <img className="smallImage" src={defaultImage} />
                <h3 className="smallCardText">{details.name ? details.name : details.title}</h3>
            </div>
    )
}

export default FilmCard

