import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../../store/context";
import "./index.css";

const BookTicket = () => {
  const { state, dispatch } = useContext(AppContext);
  const { cinemas, selectedMovie } = state;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const CINEMA_API_URL = `${baseUrl}api/v1/cinemas`;
  const [filterData, setFilterData] = useState([]);

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
  async function filterAndDisplay(selectedDate) {
    let temp = JSON.parse(JSON.stringify(cinemas));
    const formattedDate = selectedDate.split(" ")[0];
    console.log(filterData);
    temp.forEach((item) => {
      item.showData = item.showData.filter(
        (data) => data.showDate === formattedDate
      );
    });
    temp = temp.filter((item) => item.showData.length !== 0);
    temp.forEach((item) => {
      item.showData.forEach((data) => {
        data.time = data.time.filter(
          (movie) => movie.movieTitle === selectedMovie.title
        );
      });
    });
    console.log(temp);
    setFilterData(temp);
  }
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
        {filterData.map((data) => (
          <div key={data._id} className="items">
            {data.cinemaName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTicket;
