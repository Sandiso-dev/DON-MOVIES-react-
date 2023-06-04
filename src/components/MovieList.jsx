import React from 'react'

export const MovieList = (props) => {

  const AddToFav = props.favComponent;
  return (
    <>
    {props.movies?.map((movie) =>(
      <div className='image-container'>

        <div className="photo-container">
        <img src={movie.Poster} alt="movies" />
        <p>{movie.Title}</p>
        <p>{movie.Year}</p>
        <div onClick={() => props.handleFavClick(movie)}
         className="overlay d-flex align-items-center justify-content-center"><AddToFav/></div>
        </div>
       
      </div>
    ))}
    </>
  )
}
