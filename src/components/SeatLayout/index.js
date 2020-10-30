import React, { useState } from "react";
import "./index.css";

const SeatLayout = () => {
  const [ticketCounter, setTicketCounter] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [showBookButton, setShowBookButton] = useState(false);
  const rows = [1, 2, 3, 4, 5];
  const columns = ["A", "B", "C", "D", "E"];

  const handleSelect = (e) => {
    const shouldSelect =
      selectedSeat.length === ticketCounter
        ? (document.getElementsByName("seat").disabled = true)
        : setSelectedSeat([...selectedSeat, e.target.value]);
    setShowBookButton(shouldSelect);
  };
  return (
    <>
      <div className="ticket-select">
        <text>Please select the number of seats</text>
        <button
          type="button"
          onClick={() => {
            setTicketCounter(ticketCounter - 1);
          }}
        >
          -
        </button>
        <span className="counter">{ticketCounter}</span>
        <button
          type="button"
          onClick={() => {
            setTicketCounter(ticketCounter + 1);
          }}
        >
          +
        </button>
      </div>
      {ticketCounter !== 0 && (
        <div className="seatStructure">
          <center>
            <table id="seatsBlock">
              <p id="notification" />
              <tr>
                <td colSpan="15">
                  <div className="screen">SCREEN</div>
                </td>

                <td rowSpan="30">
                  <div className="smallBox greenBox">Selected Seat</div>
                  <br />
                  <div className="smallBox redBox">Reserved Seat</div>
                  <br />
                  <div className="smallBox emptyBox">Empty Seat</div>
                  <br />
                </td>
                <br />
              </tr>

              <tr>
                <td />
                {rows.map((row) => {
                  return <td>{row}</td>;
                })}
              </tr>
              {columns.map((column) => {
                return (
                  <tr>
                    <tr>
                      <td>{column}</td>
                    </tr>
                    {rows.map((row) => {
                      return (
                        <td>
                          <input
                            id="seat"
                            type="checkbox"
                            className="seats"
                            value={`${column}${row}`}
                            onClick={handleSelect}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </table>

            <br />
            {showBookButton && (
              <button type="button" className="" onClick="bookTicket()">
                Bekräfta valet
              </button>
            )}
          </center>
        </div>
      )}
    </>
  );
};

export default SeatLayout;
