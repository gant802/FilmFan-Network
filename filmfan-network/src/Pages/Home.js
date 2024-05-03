import React, { useEffect, useState } from "react";
import FilmFolders from '../Components/FilmFolders'

function Home() {
    const [actFilm, setActFilm] = useState([])
    const [actTV, setActTV] = useState([])
    const [comFilm, setComFilm] = useState([])
    const [docuTV, setDocuTV] = useState([])
    const [comTV, setComTV] = useState([])
    const [dramaTV, setDramaTV] = useState([])
    const [famTV, setFamTV] = useState([])
    const [horrorMV, setHorrorMV] = useState([])
    const [kidsTV, setKidsTV] = useState([])
    const [realityTV, setRealityTV] = useState([])
    const [romMV, setRomMV] = useState([])
    const [thrillerMV, setThrillerMV] = useState([])
    const [trending, setTrending] = useState([])

    const apiKey = process.env.REACT_APP_API_KEY


    useEffect(() => {

        // Action Movies
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28&without_genres=35%2C%2027%2C%2010749%2C%2053`)
            .then(res => res.json())
            .then(data => setActFilm({ data: data.results, type: "Action Movies" }))

        // Action TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10759&without_genres=35%2C%2099%2C%2018%2C%2010751%2C10762%2C10763%2C10764%2C10767`)
            .then(res => res.json())
            .then(data => setActTV({ data: data.results, type: "Action TV" }))

        // Comedy Movies
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35&without_genres=28%2C%2027%2C%2010749%2C%2053`)
            .then(res => res.json())
            .then(data => setComFilm({ data: data.results, type: "Comedy Movies" }))

        // Comedy TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=35&without_genres=10759%2C%2099%2C%2018%2C%2010751%2C10762%2C10763%2C10764%2C10767`)
            .then(res => res.json())
            .then(data => setComTV({ data: data.results, type: "Comedy TV" }))

        // Documentary TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=99&without_genres=10759%2C%2035%2C%2018%2C%2010751%2C10762%2C10763%2C10764%2C10767`)
            .then(res => res.json())
            .then(data => setDocuTV({ data: data.results, type: "Documentaries" }))

        // Drama TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=18&without_genres=10759%2C%2035%2C%2099%2C%2010751%2C10762%2C10763%2C10764%2C10767`)
            .then(res => res.json())
            .then(data => setDramaTV({ data: data.results, type: "Drama TV" }))

        // Family TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10751&without_genres=10759%2C%2035%2C%2099%2C%2018%2C10762%2C10763%2C10764%2C10767`)
            .then(res => res.json())
            .then(data => setFamTV({ data: data.results, type: "Family TV" }))

        // Horror Movies
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=27&without_genres=28%2C%2035%2C%2010749%2C%2053`)
            .then(res => res.json())
            .then(data => setHorrorMV({ data: data.results, type: "Horror Movies" }))

        // Kids TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10762&without_genres=10759%2C%2035%2C%2099%2C%2018%2C%2010751%2C10763%2C10764%2C10767`)
            .then(res => res.json())
            .then(data => setKidsTV({ data: data.results, type: "Kids TV" }))

        // Reality TV
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=1&with_genres=10764&without_genres=10759%2C%2035%2C%2099%2C%2018%2C%2010751%2C10762%2C10767`)
            .then(res => res.json())
            .then(data => setRealityTV({ data: data.results, type: "Reality TV" }))

        // Romance Movies
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10749&without_genres=27%2C%20%2053%2C%2028`)
            .then(res => res.json())
            .then(data => setRomMV({ data: data.results, type: "Romance Movies" }))

        // Thiller Movies
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=53&without_genres=27%2C%2028%2C%2035%2C%2010749`)
            .then(res => res.json())
            .then(data => setThrillerMV({ data: data.results, type: "Thriller Movies" }))

        // Trending Movies and TV
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
            .then(res => res.json())
            .then(data => setTrending({ data: data.results, type: "Trending Movies and TV" }))
    }, [])

    const allFilm = [actFilm, actTV, comFilm, comTV, docuTV, dramaTV, famTV, horrorMV, kidsTV, realityTV, romMV, thrillerMV, trending]

    const genresListed = allFilm.map((genre, index) => {
        return <FilmFolders key={index} genre={genre.type} data={genre.data} />
    })

    return (
        <div>
            <h1>Welcome to the Film Fan Network</h1>
            <div>
                {genresListed}
            </div>
        </div>
    )
}

export default Home
