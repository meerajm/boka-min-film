import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AppContext from "../../store/context";
import Movie from "../../components/Movies";
import "./index.css";

const Main = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const MOVIE_API_URL = `${baseUrl}api/v1/movies`;
  const CINEMA_API_URL = `${baseUrl}api/v1/cinemas/all`;
  let allMovies = [];
  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(`${MOVIE_API_URL}`);
      allMovies = await response.data;
      dispatch({
        type: "setMovies",
        data: allMovies,
      });
      dispatch({
        type: "setSearchResult",
        data: allMovies,
      });
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchCinemaNames() {
      const response = await axios.get(`${CINEMA_API_URL}`);
      const allCinemaNames = await response.data;
      dispatch({
        type: "setCinemaNames",
        data: allCinemaNames,
      });
    }
    fetchCinemaNames();
  }, []);

  const { movies, errorMessage, loading, searchResult } = state;
  const [movieName, setName] = useState("");
  const search = () => {
    console.log(movies);
    let searchMovie = [];
    searchMovie = movies.filter((movie) =>
      movie.title.toLowerCase().includes(movieName.toLowerCase())
    );
    if (!searchMovie) {
      console.log("empty");
    } else {
      console.log("movie found:", searchMovie);
      dispatch({
        type: "setSearchResult",
        data: searchMovie,
      });
    }
  };
  return (
    <div className="wrapper" data-testid="main-container">
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for movies"
          value={movieName}
          onBlur={(e) => setName(e.target.value)}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={search}>
          Search
        </button>
      </form>
      <h2>
        <strong data-testid="heading">{t("mainPage.heading")}</strong>
      </h2>
      <div className="cards">
        {loading && <span>{t("mainPage.loading")}</span>}

        {errorMessage && <span>{errorMessage}</span>}

        {searchResult &&
          searchResult.map((movie) => <Movie key={movie._id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Main;
