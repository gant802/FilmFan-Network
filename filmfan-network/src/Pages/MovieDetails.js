import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
const { id } = useParams()
const [details, setDetails] = useState([])
const [isLiked, setIsLiked] = useState(false)
const [isFavorited, setIsFavorited] = useState(false)

const [likedFilms, setLikedFilms] = useState([])
const [favoritedFilms, setFavoritedFilms] = useState([])
const [userDetails, setUserDetails] = useState({})

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

        if (userObjFromStorage) {
      fetch(`http://localhost:3030/users/${userObjFromStorage.id}`)
      .then(res => res.json())
      .then(data => {
        setFavoritedFilms(() => data.favorites)
        setLikedFilms(() => data.likes)
        setUserDetails(() => data)
      })
    }



}, [])

const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`

    
    
    if (userObjFromStorage) {
      fetch(`http://localhost:3030/users/${userObjFromStorage.id}`)
      .then(res => res.json())
      .then(data => {
        const likedFilms = data.likes
        const favoritedFilms = data.favorites
        const movieLiked = likedFilms.find(film => details.id === film.id)
        const movieFavorited = favoritedFilms.find(film => details.id === film.id)
        movieLiked ? setIsLiked(() => true) : setIsLiked(false)
        movieFavorited ? setIsFavorited(() => true) : setIsFavorited(false)})
    }

   
    
    
        



//? Logic to handle liking a movie and adding it to db.json for that user
function handleLikedClick() {
  if (userObjFromStorage) {
    const title = details.name ? details.name : details.title

  const filmToAdd = {
    id: details.id,
    poster_path: details.poster_path,
    backdrop_path: details.backdrop_path,
     title: title,
     vote_average: details.vote_average,
      overview: details.overview
}
const updatedLikedFilm = [...likedFilms, filmToAdd]
const userCopy = deepCopy(userDetails)
userCopy.likes = updatedLikedFilm
setUserDetails(() => userCopy)
setLikedFilms(updatedLikedFilm)


  fetch(`http://localhost:3030/users/${userObjFromStorage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCopy)
  }).then(res => res.json())
  .then(data => setIsLiked(() => true))
  } else {
    alert("Please Sign or create an account to like!")
  }
}

//? Logic to handle unliking a film
function handleUnlikeClick() {
  const userCopy = deepCopy(userDetails)
  const likedFilm = userCopy.likes
  const updatedLikedFilm = likedFilm.filter(film => film.id !== details.id)
  userCopy.likes = updatedLikedFilm
  setUserDetails(() => userCopy)
  setLikedFilms(updatedLikedFilm)

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
  if (userObjFromStorage) {
    const title = details.name ? details.name : details.title

  const filmToAdd = {
    id: details.id,
    poster_path: details.poster_path,
    backdrop_path: details.backdrop_path,
     title: title,
     vote_average: details.vote_average,
      overview: details.overview
}
console.log(favoritedFilms)

const updatedFavoritedFilm = [...favoritedFilms, filmToAdd]
const userCopy = deepCopy(userDetails)
userCopy.favorites = updatedFavoritedFilm
setUserDetails(() => userCopy)
setFavoritedFilms(updatedFavoritedFilm)


  fetch(`http://localhost:3030/users/${userObjFromStorage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCopy)
  }).then(res => res.json())
  .then(data => setIsFavorited(() => true))
  } else {
    alert("Please Sign or create an account to favorite!")
  }
  
}

//? Logic to handle unfavoriting a film
function handleUnfavoriteClick() {
  const userCopy = deepCopy(userDetails)
  const favoritedFilm = userCopy.favorites
  const updatedFavoritedFilm = favoritedFilm.filter(film => film.id !== details.id)
  userCopy.favorites = updatedFavoritedFilm
  setUserDetails(() => userCopy)
  setFavoritedFilms(updatedFavoritedFilm)

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
         {isLiked && userObjFromStorage ?  <button onClick={handleUnlikeClick}>Liked&#10084;</button> 
         : <button onClick={handleLikedClick}>Like&#9825;</button>}
          <span>
            {isFavorited && userObjFromStorage ? <button onClick={handleUnfavoriteClick} >Favorited ⭐</button>
            : <button onClick={handleFavoriteClick} >Favorite &#9734;</button>}
            </span>
          <p>{`Description: ${details.overview}`}</p>
        </div>
      </div>
        
    )
}

export default MovieDetails