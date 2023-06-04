import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react"
import { MovieHeading } from './components/MovieHeading';
import { MovieList } from "./components/MovieList"
import { SearchBox } from './components/SearchBox';
import AddToFav from './components/AddToFav'
import RemoveFav from './components/RemoveFav';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [favs, setFavs] = useState([])
 
  // function for fetching data from the Api using fetchApi
  const getMovies = async ()  =>{
    const url = `http://www.omdbapi.com/?s=${searchMovie}&apikey=62655a88`;

    const response = await fetch(url);
    const responsoJson = await response.json();

    if(responsoJson.Search){
      setMovies(responsoJson.Search)
    }
  };

  // using the useEffect hook to control the render of the search input
  // every time there is change  in it 
  useEffect(()=>{
    getMovies(searchMovie);
  }, [searchMovie]);


  // using this second useEffect hook to render in local storage the saved favourites using the 'Parse' method to convert the JSON into an object.
  /*useEffect(()=>{
    const movieFavs = JSON.parse(localStorage.getItem('movie-app-favourites'))

    setFavs(movieFavs);
  },[])*/


// function for adding movies to favourites
  const addingFavs = (movie) =>{
    const newFavList = [...favs, movie];

    setFavs(newFavList);
    saveToLocalStorage(newFavList);
  };

  // function for removing movies from the favourites list 
  const removingFavs = (movie) =>{
    const newFavList2 = favs.filter((fav) => fav.imdbId !== movie.imdbId);

    setFavs(newFavList2);
    
  };

  //function for saving the favourites in local storage for user history to not be lost when the user leaves the application 

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('movie-app-favourites'), JSON.stringify(items);
  };


  return (
    <div className="movies-app movie-list"> 

    <div className="logo-spot">
      <MovieHeading heading='Don Movies'/>
      <SearchBox 
      searchMovie={searchMovie} 
      setSearchMovie={setSearchMovie}/>
    </div>

      <div className="row move-list">
      <MovieList
       movies={movies} 
       favComponent={AddToFav}
       handleFavClick={addingFavs}/>
      </div>

      <div className="row">
      <MovieHeading heading='Favourites'/>
      </div>

      <div className="row movie-list">
      <MovieList
       movies={favs} 
       favComponent={RemoveFav}
       handleFavClick={removingFavs}/>
      </div>
         
    </div>
 
  )
}

export default App
