import React, { useState, useEffect } from "react";
import { Route,useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie"
import MovieUpdateForm from "./Movies/MovieUpdateForm"
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  let history=useHistory()

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, );

  const handleSubmit=(e, movieValues, id)=>{
    e.preventDefault()
    const formattedMovieValues={...movieValues,stars:movieValues.stars.split(',')}
    console.log(formattedMovieValues)
    //setMovieValues({...movieValues,stars:movieValues.stars.split(',')})
    axios
        .put (`http://localhost:5000/api/movies/${id}`, formattedMovieValues)
        .then(resp=>{
            console.log("put request resp:",resp)
            let updatedMovieList=movieList.map(item=>{
                if(item.id===id){return resp.data}
                else{ return item}
            })
            setMovieList(updatedMovieList)
            history.push('/');
          })

        .catch(err=>{
            console.log(err)
        })

}

const handleSubmitAdd=(e, movieValues)=>{
  e.preventDefault()
  const formattedMovieValues={...movieValues,stars:movieValues.stars.split(',')}
  console.log(formattedMovieValues)
  
  axios
      .post (`http://localhost:5000/api/movies/`, formattedMovieValues)
      .then (resp=>{
        console.log ('post request resp',resp)
        setMovieList(resp.data)
        history.push('/');
      })
      .catch(err=>{
        console.log(err)
      })


}

const clickToDelete=(id)=>{
  axios
  .delete(`http://localhost:5000/api/movies/${id}`)
  history.push('/');
}


  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id" render={props=><Movie {...props} clickToDelete={clickToDelete} addToSavedList={addToSavedList} />}
        
      />

      <Route path="/update-movie/:id">
        <MovieUpdateForm handleSubmit={handleSubmit} movieList={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovie handleSubmitAdd={handleSubmitAdd} />
      </Route>
    </>
  );
};

export default App;
