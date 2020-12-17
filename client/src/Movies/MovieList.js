import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const {push}=useHistory()

  const clickToAdd= ()=>{
    push(`/add-movie`)
  }


  return (
    <div className="movie-list">
      <button onClick={clickToAdd}>Add Movie</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
         
        ))
      }
       
    </div>
  );
}

export default MovieList;
