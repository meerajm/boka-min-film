import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import axios from "axios";
import AppContext from "../../store/context";
import "./index.css";

const MovieTimings = () => {
  const { t } = useTranslation();
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
    const selectedShowDetails = cinemas.find((show) => {
      return show.id === +e.target.value;
    });
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
      <table className="show-details-table">
        <tr>
          <th>{t("movieTiming.movieTimeHeader")}</th>
          <th>{t("movieTiming.screenNoHeader")}</th>
        </tr>
        {cinemas.map((data) => (
          <tr key={cinemas.id}>
            <td>{data.startTime}</td>
            <td>
              {t("movieTiming.screen")}
              &nbsp;
              {data.screen}
            </td>
            <td>
              <button
                type="button"
                value={data.id}
                className="book-btn"
                onClick={handleBook}
              >
                {t("movieTiming.bookNow")}
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MovieTimings;
