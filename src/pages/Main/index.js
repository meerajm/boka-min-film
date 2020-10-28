import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../store/context";
import Movie from "../../components/Movies";

const Main = () => {
  const { state, dispatch } = useContext(AppContext);
  const MOVIE_API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(`${MOVIE_API_URL}&s=children`);
      const allMovies = await response.data;
      dispatch({
        type: "setMovies",
        data: allMovies.Search,
      });
    }
    fetchMovies();
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

        {movies &&
          movies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)}
      </div>
    </div>
  );
};

export default Main;
