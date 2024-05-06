import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
const { id } = useParams()
const [details, setDetails] = useState([])

const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`


useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJlMzAwZTQ5NzgzMDU2YjIxYmU5ZWMzNjVkYjA0NSIsInN1YiI6IjY2MzJhY2UzYzA0NDI5MDEyYzhkZGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RT6CpKeBZ6A-CjL-ZVUf9JeweVrJxpjAzP1agYhEBk8'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setDetails(response))
        .catch(err => console.error(err));

}, [])

    return (
      <div className="film-details-container">
        <div>
        <img className="film-details-image" src={details.poster_path === null || details.poster_path === undefined
                 ? "https://www.reelviews.net/resources/img/default_poster.jpg"
                  : posterOrBackdrop } alt={details.name ? details.name : details.title}/>
        </div>
        <div className="film-details-text-container">
          <h1>{details.name ? details.name : details.title}</h1>
          <p>{`Rating: ${details.vote_average} / 10`}</p>
          <button>Like 💗</button><span><button>Favorite ⭐</button></span>
          <p>{`Description: ${details.overview}`}</p>
        </div>
      </div>
        
    )
}

export default MovieDetails