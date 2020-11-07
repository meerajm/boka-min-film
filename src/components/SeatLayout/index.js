import React, { useState, useContext } from "react";
import AppContext from "../../store/context";
import "./index.css";
import UserDetails from "../UserDetails";

const SeatLayout = () => {
  const { state, dispatch } = useContext(AppContext);
  const { selectedShow, tickets } = state;
  const [seatCounter, setSeatCounter] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [disableSelection, setDisableSelection] = useState(false);
  const [showBookButton, setShowBookButton] = useState(false);
  const rows = [1, 2, 3, 4, 5];
  const columns = ["A", "B", "C", "D", "E"];
  const [showUserDetails, setShowUserDetails] = useState(false);

  const seatReset = () => {
    window.location.reload();
  };
  const checkBooked = (value) => {
    const res = selectedShow.bookedSeats.find((item) => {
      return item === value;
    });
    if (res) {
      return true;
    }
    return false;
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
    dispatch({
      type: "setTicketDetails",
      data: {
        ...tickets,
        time: selectedShow.startTime,
        quantity: selectedSeat.length,
        seatNo: selectedSeat,
      },
    });
    setShowUserDetails(true);
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
      setShowUserDetails(false);
    }
  };

  return (
    <>
      <div className="ticket-select">
        <span className="text-large-white">
          Please select the number of seats:&nbsp;
        </span>
        <button
          type="button"
          className="counter-btn"
          onClick={() => {
            if (seatCounter === 0) {
              setSeatCounter(0);
            } else {
              setSeatCounter(seatCounter - 1);
            }
            updateSeatSelection();
          }}
        >
          <img src="minus.png" alt="-" />
        </button>
        <span className="counter">{seatCounter}</span>
        <button
          type="button"
          className="counter-btn"
          onClick={() => {
            setSeatCounter(seatCounter + 1);
            checkBooked();
            setDisableSelection(false);
            if (selectedSeat.length - 1 < seatCounter) {
              setShowBookButton(false);
            }
          }}
        >
          <img src="add.png" alt="+" />
        </button>
      </div>
      {seatCounter !== 0 && (
        <div>
          <center>
            <h3 className="text-large-white display-msg">*120 kr per seat</h3>
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
                            id={`${column}${row}`}
                            key={`${column}${row}`}
                            value={`${column}${row}`}
                            onClick={handleSelect}
                            disabled={disableSelection}
                            hidden={checkBooked(`${column}${row}`)}
                          />
                          <div
                            className="seat-container"
                            hidden={!checkBooked(`${column}${row}`)}
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
      {showUserDetails && (
        <div className="text-large-white">
          <h3>
            Selected seats:&nbsp;
            <span>{selectedSeat}</span>
          </h3>
          <h3>
            To pay:&nbsp;
            {selectedSeat.length * 120}
            &nbsp; kr
          </h3>
          <UserDetails />
        </div>
      )}
    </>
  );
};

export default SeatLayout;
