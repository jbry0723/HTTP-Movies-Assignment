import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import {useHistory} from 'react-router-dom'

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push}=useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  

  const clickToEdit= ()=>{
    push(`/update-movie/${movie.id}`)
  }

  
  const handleDeleteClick=(e)=>{
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then (resp=>{
        console.log(resp.data)
        push(`/`)
      })
      .catch (err=>{
        console.log(err)
      })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={clickToEdit}>Edit Entry</button>
      <button onClick={handleDeleteClick}>Delete Entry</button>
    </div>
  );
}

export default Movie;
