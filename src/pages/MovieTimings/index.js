import React, { useContext, useEffect, useState } from "react";
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
  const [displayMsg, setDisplayMsg] = useState(false);

  useEffect(() => {
    async function fetchTheatreData() {
      const response = await axios.get(`${CINEMA_API_URL}`);
      const allCinemas = await response.data;
      if (allCinemas.length === 0) {
        setDisplayMsg(true);
      }
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
      <center>
        <img
          className="small-img"
          src={selectedMovie.poster}
          alt={selectedMovie.title}
        />
        {displayMsg && (
          <div className="display-msg">{t("movieTiming.displayMsg")}</div>
        )}
        {!displayMsg && (
          <table className="show-details-table">
            <thead>
              <tr key="title">
                <th>{t("movieTiming.movieTimeHeader")}</th>
                <th>{t("movieTiming.screenNoHeader")}</th>
              </tr>
            </thead>
            <tbody>
              {cinemas.map((data, i) => (
                <tr key={cinemas.id}>
                  <td key={`start_id${i + 1}`}>{data.startTime}</td>
                  <td key={`screen_id${i + 1}`}>
                    {t("movieTiming.screen")}
                    &nbsp;
                    {data.screen}
                  </td>
                  <td key={`book_id${i + 1}`}>
                    <button
                      key={`book_btn_id${i + 1}`}
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
            </tbody>
          </table>
        )}
      </center>
    </div>
  );
};

export default MovieTimings;
