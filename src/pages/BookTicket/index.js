import React, { useState } from "react";
import "./index.css";

const BookTicket = () => {
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
  const currentDate = `${today.getDate()}/${today.getMonth()} - 
  i dag`;
  allDays.push(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };
  for (let i = 0; i < 6; i += 1) {
    const newDate = new Date(today.setDate(today.getDate() + 1));
    allDays.push(
      `${newDate.getDate()}/${newDate.getMonth()} - ${days[newDate.getDay()]}`
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
        <div className="items">Hello</div>
        <div className="items">Hiee</div>
      </div>
    </div>
  );
};

export default BookTicket;
