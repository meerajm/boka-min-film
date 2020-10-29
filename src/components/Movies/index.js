import React from "react";

const Movie = ({ movie }) => {
  return (
    <figure className="card">
      <img src={movie.poster} alt={`The movie titled: ${movie.title}`} />
      <figcaption>{movie.title}</figcaption>
    </figure>
  );
};

export default Movie;
