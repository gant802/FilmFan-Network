import React from "react";
import { useNavigate } from "react-router-dom";


function SearchResultsCard({details}) {
    const navigate = useNavigate()


    const posterOrBackdrop = details.backdrop_path ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`

    function handleNavigate() {
        !details.name ? navigate(`/movie/${details.id}`) : 
        navigate(`/tv/${details.id}`)
    }

    console.log(details)
    

    return (
        <div className="search-result-card-container" onClick={handleNavigate}>
            <img className="search-result-image" src={details.backdrop_path === null || details.poster_path === null || details.poster_path === undefined || details.backdrop_path === undefined
                 ? "https://www.reelviews.net/resources/img/default_poster.jpg"
                  : posterOrBackdrop } alt={details.name ? details.name : details.title}/>
                <h3 className="search-result-text">{details.name ? details.name : details.title}</h3>
            </div>
    )
}

export default SearchResultsCard