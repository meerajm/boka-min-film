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
        />
      </div>
    </>
  );
};

export default MovieDetails;
