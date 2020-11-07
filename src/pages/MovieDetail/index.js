import React, { useContext } from "react";
import Iframe from "react-iframe";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";
import "./index.css";

const MovieDetails = () => {
  const { state } = useContext(AppContext);
  const { selectedMovie } = state;
  const navigate = useNavigate();
  const trailer = `${selectedMovie.trailer}?modestbranding=1&?showinfo=0`;

  const handleTicket = () => {
    navigate("./tickets");
  };

  console.log(state);
  return (
    <div>
      <figure className="poster">
        <img src={selectedMovie.poster} alt={selectedMovie.title} />
        <figcaption className="movie-name">{selectedMovie.title}</figcaption>
        <figcaption className="text-large-white bold">
          {selectedMovie.language}
        </figcaption>
        <figcaption className="text-large-white bold">
          {selectedMovie.genre}
        </figcaption>
        <figcaption className="text-large-white">
          Description:
          {selectedMovie.description}
        </figcaption>
        <button type="button" onClick={handleTicket}>
          Biljetter
        </button>
      </figure>
      <div className="react-player">
        <Iframe
          url={trailer}
          width="650px"
          height="450px"
          display="initial"
          position="relative"
          controls="true"
        />
      </div>
    </div>
  );
};

export default MovieDetails;
