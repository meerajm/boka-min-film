import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../../store/context";
import "./index.css";

const BookTicket = () => {
  const { state, dispatch } = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const CINEMA_API_URL = `${baseUrl}api/v1/cinemas`;

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

  const { cinemas, errorMessage, loading } = state;
  const filterAndDisplay = (selectedDate) => {
    console.log(cinemas);
    const formattedDate = selectedDate.split(" ")[0];
    let filterData = cinemas.map((cinema) => {
      const temp = cinema.showData.filter(
        (data) => data.showDate === formattedDate
      );
      return temp;
    });
    filterData = filterData.filter((cinema) => cinema.length !== 0);
    console.log(filterData);
  };
  const days = [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ];
  const today = new Date();
  const allDays = [];
  let currentDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()} - 
  i dag`;
  if (today.getDate() < 10) {
    currentDate = `0${currentDate}`;
  }
  allDays.push(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
    filterAndDisplay(event.target.value);
  };
  for (let i = 0; i < 6; i += 1) {
    const newDate = new Date(today.setDate(today.getDate() + 1));
    let dayField = "";
    if (newDate.getDate() < 10) {
      dayField = `0${newDate.getDate()}`;
    }
    allDays.push(
      `${dayField}/${newDate.getMonth() + 1}/${today.getFullYear()} - ${
        days[newDate.getDay()]
      }`
    );
  }
  return (
    <div>
      <h1>Boka biljetter</h1>
      <select id="choose-date" value={selectedDate} onChange={handleChange}>
        {allDays.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <div className="grid-container">
        {loading && <span>loading...</span>}
        {errorMessage && <span>{errorMessage}</span>}
        <div className="items">Hello</div>
        <div className="items">Hiee</div>
      </div>
    </div>
  );
};

export default BookTicket;
