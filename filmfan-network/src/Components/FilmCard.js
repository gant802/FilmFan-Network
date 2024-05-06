import React from "react";
import { useNavigate } from "react-router-dom";


function FilmCard({details}) {
    const navigate = useNavigate()

    const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`

    function handleNavigate() {
        !details.name ? navigate(`/movie/${details.id}`) : 
        navigate(`/tv/${details.id}`)
    }

    return (
        <div className="smallCardContainer" onClick={handleNavigate}>
            <img className="smallImage" src={details.poster_path === null  
                 ? "https://www.reelviews.net/resources/img/default_poster.jpg"
                  : posterOrBackdrop } alt={details.name ? details.name : details.title}/>
                <h3 className="smallCardText">{details.name ? details.name : details.title}</h3>
            </div>
    )
}

export default FilmCard

