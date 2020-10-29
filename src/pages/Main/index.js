import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../store/context";
import Movie from "../../components/Movies";
import "./index.css";

const Main = () => {
  const { state, dispatch } = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const MOVIE_API_URL = `${baseUrl}api/v1/movies`;

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(`${MOVIE_API_URL}`);
      const allMovies = await response.data;
      dispatch({
        type: "setMovies",
        data: allMovies,
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
          movies.map((movie) => <Movie key={movie._id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Main;
