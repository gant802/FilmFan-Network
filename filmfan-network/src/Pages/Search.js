import React, {useState, useEffect} from "react";
import SearchResultsCard from "../Components/SearchResultsCard";
import 'boxicons'


function Search() {
const [search, setSearch] = useState("")
const [searchResults, setSearchResults] = useState({})

const filmsArray = searchResults.results

const apiKey = process.env.REACT_APP_API_KEY

function handleSubmit(e) {
    e.preventDefault()
}

useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${search}&page=1`)
    .then(res => res.json())
    .then(data => setSearchResults(data))
    .catch(error => console.log("error"))
}, [search])

const resultsListed = filmsArray ? filmsArray.map(film => {
    return <SearchResultsCard key={film.id} details={film} /> 
}) : null



    return (
        <div className="search-page-container">
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