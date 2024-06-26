import React, {useState, useEffect} from "react";
import SearchResultsCard from "../Components/SearchResultsCard";
import 'boxicons'

function Search() {
const [search, setSearch] = useState("")
const [searchResults, setSearchResults] = useState({})

const filmsArray = searchResults.results

const apiKey = process.env.REACT_APP_API_KEY


//? This only prevents the default refresh after clicking search button 
//? Since the search is caught in state, there is no need for a submit function
function handleSubmit(e) {
    e.preventDefault()
}


//? Catches search input in state and searches API every time a letter is typed in
useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${search}&page=1`)
    .then(res => res.json())
    .then(data => setSearchResults(data))
    .catch(error => console.log("error"))
}, [search])


//? Handles listing out results of search
const resultsListed = filmsArray ? filmsArray.map(film => {
    return <SearchResultsCard key={film.id} details={film} /> 
}) : null


    return (
        <div className="search-page-container">
            <h1>Search for Movies or TV Shows</h1>
        <div className="search-input-container">
            <form id="search-form" onSubmit={handleSubmit}>
                <input onChange={e => setSearch(e.target.value)} value={search}
                 type="text" name="searchInput" placeholder="Search..."/>
                <button>&rarr;</button>
            </form>
        </div>
        <div id="results-container">
            {resultsListed}
        </div>
        </div>
    )
}

export default Search