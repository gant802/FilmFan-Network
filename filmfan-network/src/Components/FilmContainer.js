import React from "react";
import FilmFolders from "./FilmFolders";

function FilmContainer({data}) {
    
    console.log(data)
    

    
    const genresListed = data.map((genre, index) => {
        return <FilmFolders key={index} genre={genre}/>
    })


    return (
        <>{genresListed}</>
    )
}

export default FilmContainer