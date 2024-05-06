import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
const { id } = useParams()
const [details, setDetails] = useState([])
const [isLiked, setIsLiked] = useState(false)
const [isFavorited, setIsFavorited] = useState({})

const userFromStorage = localStorage.getItem("user")
const userObjFromStorage = JSON.parse(userFromStorage)

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};



useEffect(() => {
  
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJlMzAwZTQ5NzgzMDU2YjIxYmU5ZWMzNjVkYjA0NSIsInN1YiI6IjY2MzJhY2UzYzA0NDI5MDEyYzhkZGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RT6CpKeBZ6A-CjL-ZVUf9JeweVrJxpjAzP1agYhEBk8'
        }
      };
      
      if (id.includes("M")) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setDetails(() =>response))
        .catch(err => console.error(err))
        } else {
          fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setDetails(response))
        .catch(err => console.error(err));
        }
}, [])

const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`

    
fetch(`http://localhost:3030/users/${userObjFromStorage.id}`)
      .then(res => res.json())
      .then(data => {
        const likedFilms = data.likes
        const favoritedFilms = data.favorites
        const movieLiked = likedFilms.find(film => details.id === film.id)
        console.log(movieLiked)
        
        const movieFavorited = favoritedFilms.find(film => details.id === film.id)
        movieLiked ? setIsLiked(() => true) : setIsLiked(false)
        movieFavorited ? setIsFavorited(() => true) : setIsFavorited(false)})



//? Logic to handle liking a movie and adding it to db.json for that user
function handleLikedClick() {
  const title = details.name ? details.name : details.title

  const filmToAdd = {
    id: details.id,
     title: title,
     rating: details.vote_average,
      overview: details.overview
}
const userCopy = deepCopy(userObjFromStorage)
localStorage.removeItem("user")
userCopy.likes.push(filmToAdd)
localStorage.setItem("user", JSON.stringify(userCopy))

  fetch(`http://localhost:3030/users/${userObjFromStorage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCopy)
  }).then(res => res.json())
  .then(data => setIsLiked(() => true))
}

//? Logic to handle unliking a film
function handleUnlikeClick() {
  const userCopy = deepCopy(userObjFromStorage)
  localStorage.removeItem("user")
  userCopy.likes = userCopy.likes.filter(film => film.id !== details.id)
  localStorage.setItem("user", JSON.stringify(userCopy))

  fetch(`http://localhost:3030/users/${userObjFromStorage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCopy)
  }).then(res => res.json())
  .then(data => setIsLiked(() => false))
  
}

//? Logic to handle favoriting a movie and adding it to db.json for that user
function handleFavoriteClick() {
  const title = details.name ? details.name : details.title

  const filmToAdd = {
    id: details.id,
     title: title,
     rating: details.vote_average,
      overview: details.overview
}
const userCopy = deepCopy(userObjFromStorage)
localStorage.removeItem("user")
userCopy.favorites.push(filmToAdd)
localStorage.setItem("user", JSON.stringify(userCopy))

  fetch(`http://localhost:3030/users/${userObjFromStorage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCopy)
  }).then(res => res.json())
  .then(data => setIsFavorited(() => true))
}

//? Logic to handle unfavoriting a film
function handleUnfavoriteClick() {
  const userCopy = deepCopy(userObjFromStorage)
  localStorage.removeItem("user")
  userCopy.favorites = userCopy.favorites.filter(film => film.id !== details.id)
  localStorage.setItem("user", JSON.stringify(userCopy))

  fetch(`http://localhost:3030/users/${userObjFromStorage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCopy)
  }).then(res => res.json())
  .then(data => setIsFavorited(() => false))
  
}


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
         {isLiked ?  <button onClick={handleUnlikeClick}>Liked&#10084;</button> 
         : <button onClick={handleLikedClick}>Like&#9825;</button>}
          <span>
            {isFavorited ? <button onClick={handleUnfavoriteClick} >Favorited ⭐</button>
            : <button onClick={handleFavoriteClick} >Favorite &#9734;</button>}
            </span>
          <p>{`Description: ${details.overview}`}</p>
        </div>
      </div>
        
    )
}

export default MovieDetails