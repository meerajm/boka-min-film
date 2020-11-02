import React, { useState } from "react";
import "./index.css";

const SeatLayout = () => {
  const [seatCounter, setSeatCounter] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [disableSelection, setDisableSelection] = useState(false);
  const [showBookButton, setShowBookButton] = useState(false);
  const rows = [1, 2, 3, 4, 5];
  const columns = ["A", "B", "C", "D", "E"];

  const seatReset = () => {
    window.location.reload();
  };
  const handleSelect = (e) => {
    if (e.target.checked) {
      if (selectedSeat.length < seatCounter - 1) {
        setSelectedSeat([...selectedSeat, e.target.value]);
      } else if (selectedSeat.length === seatCounter - 1) {
        setDisableSelection(true);
        setSelectedSeat([...selectedSeat, e.target.value]);
        setShowBookButton(true);
      }
    } else {
      const temp = selectedSeat.filter((seat) => seat !== e.target.value);
      setSelectedSeat([]);
      setSelectedSeat(temp);
      document.getElementById(e.target.value).checked = false;
    }
  };

  const displaySeats = () => {
    console.log(selectedSeat);
  };

  const updateSeatSelection = () => {
    if (selectedSeat.length > 0) {
      if (selectedSeat.length - 1 < seatCounter) {
        selectedSeat.forEach((seat) => {
          document.getElementById(seat).checked = false;
        });
        setDisableSelection(false);
      }
      setSelectedSeat([]);
      setShowBookButton(false);
    }
  };

  return (
    <>
      <div className="ticket-select">
        <span className="text-with-white">
          Please select the number of seats
        </span>
        <button
          type="button"
          onClick={() => {
            setSeatCounter(seatCounter - 1);
            updateSeatSelection();
          }}
        >
          <img src="minus.png" alt="-" />
        </button>
        <span className="counter">{seatCounter}</span>
        <button
          type="button"
          onClick={() => {
            setSeatCounter(seatCounter + 1);
            setDisableSelection(false);
          }}
        >
          <img src="add.png" alt="+" />
        </button>
      </div>
      {seatCounter !== 0 && (
        <div>
          <center>
            <table className="table-margin text-with-white" id="seatsBlock">
              <tr>
                <td colSpan="15">
                  <div className="screen">SCREEN</div>
                </td>

                <td rowSpan="30" className="seat-alignment">
                  <div className="smallBox greenBox text-with-white">
                    Selected Seat
                  </div>
                  <br />
                  <div className="smallBox redBox text-with-white">
                    Reserved Seat
                  </div>
                  <br />
                  <div className="smallBox emptyBox text-with-white">
                    Empty Seat
                  </div>
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
                            type="checkbox"
                            className="seats"
                            id={`${column}${row}`}
                            key={`${column}${row}`}
                            value={`${column}${row}`}
                            onClick={handleSelect}
                            disabled={disableSelection}
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
              <div>
                <button type="button" onClick={displaySeats}>
                  Bekräfta valet
                </button>
                <button type="button" onClick={seatReset}>
                  Reset seats
                </button>
              </div>
            )}
          </center>
        </div>
      )}
    </>
  );
};

export default SeatLayout;
