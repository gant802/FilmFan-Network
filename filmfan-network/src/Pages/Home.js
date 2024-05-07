import React, { useEffect, useState } from "react";
import FilmContainer from "../Components/FilmContainer";

function Home() {

    const [allFilm, setAllFilm] = useState([])

    const apiKey = process.env.REACT_APP_API_KEY


    useEffect(() => {

        const fetchArray = [
            `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28&without_genres=35%2C%2027%2C%2010749%2C%2053`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10759&without_genres=35%2C%2099%2C%2018%2C%2010751%2C10762%2C10763%2C10764%2C10767`,
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35&without_genres=28%2C%2027%2C%2010749%2C%2053`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=35&without_genres=10759%2C%2099%2C%2018%2C%2010751%2C10762%2C10763%2C10764%2C10767`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=99&without_genres=10759%2C%2035%2C%2018%2C%2010751%2C10762%2C10763%2C10764%2C10767`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=18&without_genres=10759%2C%2035%2C%2099%2C%2010751%2C10762%2C10763%2C10764%2C10767`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10751&without_genres=10759%2C%2035%2C%2099%2C%2018%2C10762%2C10763%2C10764%2C10767`,
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=27&without_genres=28%2C%2035%2C%2010749%2C%2053`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10762&without_genres=10759%2C%2035%2C%2099%2C%2018%2C%2010751%2C10763%2C10764%2C10767`,
            `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10764&without_genres=10759%2C%2035%2C%2099%2C%2018%2C%2010751%2C10762%2C10767`,
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10749&without_genres=27%2C%20%2053%2C%2028`,
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=53&without_genres=27%2C%2028%2C%2035%2C%2010749`
        ];
        
        Promise.all(fetchArray.map(url => fetch(url)))
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            })
            .then(data => {
                setAllFilm(() => data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        
    }, [])
    

    

    return (
        <div>
            <h1 id="welcome-message">Welcome to the Film Fan Network</h1>
            <p id="page-intro-text">Browse through our genres below or search for Movies and TV Shows! 
                Create a profile to like or favorite things that you'd like to be saved to your profile!
            </p>
            <div id="all-genres-container">
                <FilmContainer data={allFilm}/>
            </div>
        </div>
    )
}

export default Home
