import React from "react";
import { useNavigate } from "react-router-dom";


function FilmCard({details}) {
    const navigate = useNavigate()

    const posterOrBackdrop = details.backdrop_path ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`

    function handleNavigate() {
        !details.name ? navigate(`/movie/${details.id}`) : 
        navigate(`/tv/${details.id}`)
    }

    return (
        <div className="smallCardContainer" onClick={handleNavigate}>
            <img className="smallImage" src={posterOrBackdrop} alt={details.name ? details.name : details.title}/>
                <h3 className="smallCardText">{details.name ? details.name : details.title}</h3>
            </div>
    )
}

export default FilmCard

