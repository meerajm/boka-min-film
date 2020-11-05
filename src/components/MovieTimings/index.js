import React, { useContext, useEffect } from "react";
import { useNavigate } from "@reach/router";
import axios from "axios";
import AppContext from "../../store/context";
import "./index.css";

const MovieTimings = () => {
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie, selectedCinema, cinemas, selectedDay } = state;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const CINEMA_API_URL = `${baseUrl}api/v1/cinemas/${selectedCinema}/${selectedMovie.title}/${selectedDay}`;
  const navigate = useNavigate();

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
    console.log("clicked button", e.target.value);
    const selectedShowDetails = cinemas.find((show) => {
      return show.id === +e.target.value;
    });
    console.log(cinemas);
    console.log(selectedShowDetails);
    dispatch({
      type: "setSelectedShow",
      data: selectedShowDetails,
    });
    e.preventDefault();
    navigate("./seats");
  };

  return (
    <div>
      <h2>
        <strong>{selectedCinema}</strong>
      </h2>
      <img src={selectedMovie.poster} alt={selectedMovie.title} />
      <div className="grid-container">
        {cinemas.map((data) => (
          <div className="items" key={cinemas.id}>
            <span className="align-left">{data.startTime}</span>
            <input
              type="button"
              value={data.id}
              className="book-btn"
              onClick={handleBook}
            />
            <span>
              Screen
              {data.screen}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTimings;
