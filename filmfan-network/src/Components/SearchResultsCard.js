import React from "react";
import { useNavigate } from "react-router-dom";


function SearchResultsCard({details}) {
    const navigate = useNavigate()


    const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`

    function handleNavigate() {
        !details.name ? navigate(`/movie/${details.id}M`) : 
        navigate(`/movie/${details.id}`)
    }
    

    return (
        <div className="search-result-card-container" onClick={handleNavigate}>
            <img className="smallImage" src={details.poster_path === null || details.poster_path === undefined
                 ? "https://www.reelviews.net/resources/img/default_poster.jpg"
                  : posterOrBackdrop } alt={details.name ? details.name : details.title}/>
                <h3 className="search-result-text">{details.name ? details.name : details.title}</h3>
            </div>
    )
}

export default SearchResultsCard