import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Iframe from "react-iframe";
import { navigate } from "@reach/router";
import AppContext from "../../store/context";
import "./index.css";

const MovieDetails = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { selectedMovie } = state;
  const [play, setPlay] = useState(false);
  const trailer = play
    ? `${selectedMovie.trailer}?modestbranding=1&autoplay=1`
    : `${selectedMovie.trailer}?modestbranding=1`;

  const handleTicket = () => {
    navigate("./tickets");
  };

  return (
    <div data-testid="movie-details">
      <figure className="poster">
        <img
          src={selectedMovie.poster}
          alt={selectedMovie.title}
          data-testid="movie-poster"
        />
        <figcaption data-testid="movie-title" className="movie-name">
          {selectedMovie.title}
        </figcaption>
        <figcaption className="text-large-white bold">
          {t("movieDetail.language")}: &nbsp;
          <span className="movie-info" data-testid="movie-language">
            {selectedMovie.language}
          </span>
        </figcaption>
        <figcaption className="text-large-white bold">
          {t("movieDetail.genre")}: &nbsp;
          <span className="movie-info" data-testid="movie-genre">
            {selectedMovie.genre}
          </span>
        </figcaption>
        <figcaption className="text-large-white">
          {t("movieDetail.description")}: &nbsp;
          <span className="movie-info" data-testid="movie-description">
            {selectedMovie.description}
          </span>
        </figcaption>
        <button type="button" onClick={handleTicket} data-testid="tickets-btn">
          {t("movieDetail.tickets")}
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
          allow="autoplay"
        />
        {!play && (
          <button
            type="button"
            className="play-btn"
            onClick={() => setPlay(true)}
          >
            <img src="video-player.png" alt="play" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
