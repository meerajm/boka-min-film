import React from "react";
import ReactPlayer from "react-player";
import "./index.css";

const MovieDetails = () => {
  return (
    <>
      <div className="player-wrapper">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=03-KVRmd3xo"
          controls="true"
          className="react-player"
          playing
          playIcon={<button type="button">&#9658;</button>}
          light="https://m.media-amazon.com/images/M/MV5BNThhYzE5MDUtODYyMC00ZWI3LTk0ZTgtNDgyMmYxM2UzZjBmXkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_SX300.jpg"
        />
      </div>
    </>
  );
};

export default MovieDetails;
