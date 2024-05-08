import React from "react";
import FilmFolders from "./FilmFolders";

function FilmContainer({data}) {
    
    //? Map each genre into its own film folder
    const genresListed = data.map((genre, index) => {
        return <FilmFolders key={index} genre={genre} genreIndex={index}/>
    })


    return (
        <>{genresListed}</>
    )
}

export default FilmContainer