import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

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

  //! Needed for running certain code only if a user is logged on
  const [loggedIn] = useOutletContext()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJlMzAwZTQ5NzgzMDU2YjIxYmU5ZWMzNjVkYjA0NSIsInN1YiI6IjY2MzJhY2UzYzA0NDI5MDEyYzhkZGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RT6CpKeBZ6A-CjL-ZVUf9JeweVrJxpjAzP1agYhEBk8'
      }
    };

    //! Logic to determine fetch url depending on it if id in param has an "M" or not ("M" = movie)
    if (id.includes("M")) {
      const realId = id.toString().replace(/M$/, "")
      fetch(`https://api.themoviedb.org/3/movie/${realId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setDetails(() => response))
        .catch(err => console.error(err))
    } else {
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setDetails(response))
        .catch(err => console.error(err));
    }

    //? If there is a user logged in, set the state all the liked and favorited movies and TV shows, and all user details
    if (loggedIn) {
      fetch(`http://localhost:3030/users/${userObjFromStorage.id}`)
        .then(res => res.json())
        .then(data => {
          setFavoritedFilms(() => data.favorites)
          setLikedFilms(() => data.likes)
          setUserDetails(() => data)
        })
    }



  }, [])


  if (loggedIn) {
    fetch(`http://localhost:3030/users/${userObjFromStorage.id}`)
      .then(res => res.json())
      .then(data => {
        const likedFilms = data.likes
        const favoritedFilms = data.favorites
        const movieLiked = likedFilms.find(film => details.id === film.id)
        const movieFavorited = favoritedFilms.find(film => details.id === film.id)
        movieLiked ? setIsLiked(() => true) : setIsLiked(false)
        movieFavorited ? setIsFavorited(() => true) : setIsFavorited(false)
      })
  }




  //? Logic to handle liking a movie and adding it to db.json for that user
  function handleLikedClick() {
    if (loggedIn) {
      const titleOrNameValue = details.name ? details.name : details.title
      const titleOrName = details.name ? "name" : "title"

      const filmToAdd = {
        id: details.id,
        poster_path: details.poster_path,
        backdrop_path: details.backdrop_path,
        [titleOrName]: titleOrNameValue,
        vote_average: details.vote_average,
        overview: details.overview
      }
      const userCopy = deepCopy(userDetails)
      const updatedLikedFilm = [...likedFilms, filmToAdd]
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
    if (loggedIn) {
      const titleOrNameValue = details.name ? details.name : details.title
      const titleOrName = details.name ? "name" : "title"

      const filmToAdd = {
        id: details.id,
        poster_path: details.poster_path,
        backdrop_path: details.backdrop_path,
        [titleOrName]: titleOrNameValue,
        vote_average: details.vote_average,
        overview: details.overview
      }
      const userCopy = deepCopy(userDetails)
      const updatedFavoritedFilm = [...favoritedFilms, filmToAdd]
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

  //? Logic to determine if a movie or TV show has a poster or a backdrop
  const posterOrBackdrop = details.poster_path ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
    : `https://image.tmdb.org/t/p/original/${details.backdrop_path}`


  return (
    <div className="film-details-container">
      <div>
        <img className="film-details-image" src={details.poster_path === null || details.poster_path === undefined
          ? "https://www.reelviews.net/resources/img/default_poster.jpg"
          : posterOrBackdrop} alt={details.name ? details.name : details.title} />
      </div>
      <div className="film-details-text-container">
        <h1>{details.name ? details.name : details.title}</h1>
        <p className="film-rating">{`Rating: ${details.vote_average} / 10`}</p>
        <div className="like-favorite-btn-container">
          {isLiked && userObjFromStorage ? <button onClick={handleUnlikeClick}>Liked&#10084;</button>
            : <button onClick={handleLikedClick}>Like&#9825;</button>}

          {isFavorited && userObjFromStorage ? <button onClick={handleUnfavoriteClick} >Favorited ⭐</button>
            : <button onClick={handleFavoriteClick} >Favorite &#9734;</button>}
        </div>

          <p className="overview" ><strong>Overview</strong></p>
        <p className="description-text">{`${details.overview}`}</p>
      </div>
    </div>

  )
}

export default MovieDetails