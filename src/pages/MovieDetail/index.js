import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";
import "./index.css";

const MovieDetails = () => {
  const { state } = useContext(AppContext);
  const { selectedMovie } = state;
  const navigate = useNavigate();
  const handleTicket = () => {
    navigate("./tickets");
  };
  console.log(state);
  return (
    <div>
      <figure className="poster">
        <img src={selectedMovie.poster} alt={selectedMovie.title} />
        <figcaption className="movie-name">{selectedMovie.title}</figcaption>
        <button type="button" className="ticket-button" onClick={handleTicket}>
          Biljetter
        </button>
        <figcaption className="text-large-white">
          {selectedMovie.language}
        </figcaption>
        <figcaption className="text-large-white">
          {selectedMovie.genre}
        </figcaption>
        <figcaption className="description">
          {selectedMovie.description}
        </figcaption>
      </figure>
      <div className="player-wrapper">
        <ReactPlayer
          width="60%"
          height="60%"
          url={selectedMovie.trailer}
          controls="true"
          className="react-player"
          playing
          playIcon={<button type="button">&#9658;</button>}
          light={selectedMovie.poster}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
