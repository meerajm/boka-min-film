import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../store/context";
import DisplayCinemaSelection from "../../components/CinemaNames";
import "./index.css";

const BookTicket = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { selectedCinema } = state;
  const navigate = useNavigate();
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
  }/${today.getFullYear()} - i dag`;
  if (today.getDate() < 10) {
    currentDate = `0${currentDate}`;
  }
  allDays.push(currentDate);
  const [selectedDate, setSelectedDate] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
    let formattedDate = e.target.value.split(" ")[2];
    if (formattedDate === "i") {
      let index = today.getDay();
      index += 1;
      if (index === days.length) {
        index = 0;
      }
      formattedDate = days[index];
    }
    dispatch({
      type: "setSelectedDay",
      data: formattedDate,
    });
  };

  for (let i = 0; i < 6; i += 1) {
    const newDate = new Date(today.setDate(today.getDate() + 1));
    let dayField = "";
    if (newDate.getDate() < 10) {
      dayField = `0${newDate.getDate()}`;
    } else {
      dayField = `${newDate.getDate()}`;
    }
    allDays.push(
      `${dayField}/${newDate.getMonth() + 1}/${today.getFullYear()} - ${
        days[newDate.getDay()]
      }`
    );
  }
  const goToNextPage = () => {
    if (selectedCinema) {
      dispatch({
        type: "setTicketDetails",
        data: { date: selectedDate },
      });
      navigate("./confirm");
    } else {
      toast("Please select a cinema", { type: "error" });
    }
  };
  return (
    <div className="book-ticket-container">
      <h1>{t("bookTicket.bookTickets")}</h1>
      <div className="select-container">
        <select
          id="choose-date"
          className="select-date"
          value={selectedDate}
          onChange={handleChange}
        >
          <option key="0" value="">
            {t("bookTicket.selectDate")}
          </option>
          {allDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <DisplayCinemaSelection />
      </div>
      {selectedDate && (
        <button type="button" onClick={goToNextPage}>
          {t("bookTicket.next")}
        </button>
      )}
    </div>
  );
};

export default BookTicket;
