import React from "react";
import { useNavigate } from "react-router-dom";


function FilmCard({details}) {
    const navigate = useNavigate()


    //? Logic to handle if a tv or movie does not have a poster image path
    const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`




    //? Function to handle navigating to the movie details page. (movies have a different path than TV...see Movie Details component)
    function handleNavigate() {
        details.title ? navigate(`/movie/${details.id}M`) : 
        navigate(`/movie/${details.id}`)
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

