import React, { useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../../store/context";
import "./index.css";

const MovieTimings = () => {
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie, selectedCinema, cinemas, selectedDay } = state;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const CINEMA_API_URL = `${baseUrl}api/v1/cinemas/${selectedCinema}/${selectedMovie.title}/${selectedDay}`;

  useEffect(() => {
    async function fetchTheatreData() {
      const response = await axios.get(`${CINEMA_API_URL}`);
      const allCinemas = await response.data;
      dispatch({
        type: "setCinemas",
        data: allCinemas,
      });
    }
    fetchTheatreData();
  }, []);

  const handleBook = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    return e.target.id;
  };

  return (
    <div className="grid-container">
      {cinemas.map((data) => (
        <div className="items">
          <span className="align-left">{data.startTime}</span>
          <input
            type="button"
            value="Book now"
            className="book-btn"
            onClick={handleBook}
          />
          <span>Hello</span>
        </div>
      ))}
    </div>
  );
};

export default MovieTimings;
