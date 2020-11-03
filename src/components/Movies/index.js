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
    <figure className="card">
      <img
        src={movie.poster}
        alt={`The movie titled: ${movie.title}`}
        onClick={handleSelectedMovie}
        onKeyDown={handleSelectedMovie}
      />
      <figcaption>{movie.title}</figcaption>
    </figure>
  );
};

export default Movie;
