import React, { useEffect, useContext } from "react";
import AppContext from "../../store/context";
import Movie from "../../components/Movies";

const Main = () => {
  const { state, dispatch } = useContext(AppContext);
  const MOVIE_API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    fetch(`${MOVIE_API_URL}&s=children`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: "setMovies",
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const { movies, errorMessage, loading } = state;

  return (
    <div className="wrapper">
      <h2>
        <strong>Aktuellt på bio</strong>
      </h2>
      <div className="cards">
        {loading && <span>loading...</span>}

        {errorMessage && <span>{errorMessage}</span>}

        {movies && movies.map((movie) => <Movie movie={movie} />)}
      </div>
    </div>
  );
};

export default Main;
