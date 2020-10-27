import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from "../../store/reducer";
import Movie from "../../components/Movies";
import { fetchMovies } from "../../api"

const Main = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchMovies()
          .then(jsonResponse => {
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
            });
          });
      }, []);
  
    const { movies, errorMessage, loading } = state;
  
    return (
      <div className="wrapper">
        <h2><strong>Aktuellt på bio</strong></h2>
        <div className="cards">
  
        {loading &&
          <span>loading...</span>
        }
  
        {errorMessage &&
          <span>{errorMessage}</span>
        }
  
        {movies &&
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        }
  
        </div>
      </div>
    );
  };

  export default Main;