import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import FilmCard from "../Components/FilmCard";

function UserProfile() {
    const [loggedIn, setLoggedIn] = useOutletContext()

    const userFromStorage = localStorage.getItem("user")
    const userObjFromStoarge = JSON.parse(userFromStorage)

    const [user, setUser] = useState({})
    const [likedFilms, setLikedFilms] = useState([])
    const [favoritedFilms, setFavoritedFilms] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        if (userObjFromStoarge) {
            fetch(`http://localhost:3030/users/${userObjFromStoarge.id}`)
                .then(res => res.json())
                .then(data => {
                    setUser(() => data)
                    setFavoritedFilms(() => data.favorites)
                    setLikedFilms(() => data.likes)
                })
        }

    }, [])


    function handleLogOut() {
        localStorage.removeItem("user")
        setLoggedIn(() => !loggedIn)
        navigate("/")
    }

    const favoritesListed = favoritedFilms.map(film => {
        return <FilmCard key={film.id} details={film} />
    })

    const likedListed = likedFilms.map(film => {
        return <FilmCard key={film.id} details={film} />
    })



    return (
        <div id="profile-container">
            <div id="image-name-container">
                <img id="profile-photo" src={user.profilePhoto !== "" ? user.profilePhoto
                    : "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                    alt="user profile photo" />
                <div>
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <h2>{`@${user.username}`}</h2>
                    <div id="quote-container">
                        <p>{`"${user.favoriteFilmQuote}"`}</p>
                        <p>{`- ${user.quoteAuthor}`}</p>
                    </div>

                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
            <div id="liked-favorited-container">
                <h3 className="favorite-and-liked-text">Favorited: </h3>
                <div id="favorited-film-container">
                    {favoritesListed}
                </div>
                <h3 className="favorite-and-liked-text">Liked: </h3>
                <div id="liked-film-container">
                    {likedListed}
                </div>
            </div>

        </div>
    )
}

export default UserProfile