import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialState={
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:'',
}

export const AddMovie = ({handleSubmitAdd}) => {
    const [movieValues,setMovieValues]=useState(initialState)
    
    
        
    
  
    const changeHandler = e => {
        
        setMovieValues({...movieValues,[e.target.name]:e.target.value})
      };

    

    
  
    return (
      <div>
        <h2>Update Item</h2>
        <form onSubmit={(e)=>{handleSubmitAdd(e,movieValues)}}>
         
        <input
            type="text"
            name="id"
            onChange={changeHandler}
            placeholder="id"
            value={movieValues.id}
          />
          
  
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={movieValues.title}
          />
          
  
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={movieValues.director}
          />
          
  
          <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={movieValues.metascore}
          />
          
  
          <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="Stars:Separate with comma"
            value={movieValues.stars}
          />
          
  
          <button className="md-button form-button">Update</button>
        </form>
      </div>
    );
  };
  
  export default AddMovie;