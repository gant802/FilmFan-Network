import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
const { id } = useParams()
const [details, setDetails] = useState([])

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
        <h1>{details.id}</h1>
    )
}

export default MovieDetails