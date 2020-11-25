import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";

const Movie = ({ movie }) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSelectedMovie = () => {
    dispatch({
      type: "setSelectedMovie",
      data: movie,
    });
    navigate("./details");
  };
  return (
    <figure className="card" data-testid="movie-card">
      <img
        data-testid="movie-poster"
        src={movie.poster}
        alt={`The movie titled: ${movie.title}`}
        onClick={handleSelectedMovie}
        onKeyDown={handleSelectedMovie}
      />
      <figcaption data-testid="movie-title">{movie.title}</figcaption>
    </figure>
  );
};

export default Movie;
