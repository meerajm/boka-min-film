import { useNavigate } from "@reach/router";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

const SeatLayout = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { selectedShow, tickets } = state;
  const navigate = useNavigate();
  const [seatCounter, setSeatCounter] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [disableSelection, setDisableSelection] = useState(false);
  const [showBookButton, setShowBookButton] = useState(false);
  const rows = [1, 2, 3, 4, 5];
  const columns = ["A", "B", "C", "D", "E"];

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
    navigate("./user-details");
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
      <center>
        <div>
          <span className="text-large-white">{t("seatSelect.selectText")}</span>
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
              if (seatCounter === 5) {
                setSeatCounter(5);
              } else {
                setSeatCounter(seatCounter + 1);
              }
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
            <h3 className="text-large-white display-msg">
              {t("seatSelect.priceText")}
              <br />
              {t("seatSelect.maxSeat")}
            </h3>
            <table className="table-margin text-with-white" id="seatsBlock">
              <tbody>
                <tr>
                  <td colSpan="15">
                    <div className="screen"> {t("seatSelect.screen")}</div>
                  </td>

                  <td rowSpan="30" className="seat-alignment">
                    <div className="smallBox greenBox text-with-white">
                      {t("seatSelect.selectedSeat")}
                    </div>
                    <br />
                    <div className="smallBox redBox text-with-white">
                      {t("seatSelect.reservedSeat")}
                    </div>
                    <br />
                    <div className="smallBox emptyBox text-with-white">
                      {t("seatSelect.emptySeat")}
                    </div>
                    <br />
                  </td>
                  <br />
                </tr>

                <tr>
                  <td />
                  {rows.map((row) => {
                    return <td key={row}>{row}</td>;
                  })}
                </tr>
                {columns.map((column) => {
                  return (
                    <tr>
                      <tr>
                        <td key={column}>{column}</td>
                      </tr>
                      {rows.map((row) => {
                        return (
                          <td>
                            {checkBooked(`${column}${row}`) ? (
                              <div className="seat-container" />
                            ) : (
                              <input
                                type="checkbox"
                                id={`${column}${row}`}
                                key={`${column}${row}`}
                                value={`${column}${row}`}
                                onClick={handleSelect}
                                disabled={disableSelection}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />

            {showBookButton && (
              <div>
                <button type="button" onClick={displaySeats}>
                  {t("seatSelect.confirmSelect")}
                </button>
                <button type="button" onClick={seatReset}>
                  {t("seatSelect.resetSeat")}
                </button>
              </div>
            )}
          </div>
        )}
        <div className="text-large-white">
          <h3>
            {t("seatSelect.selectedSeat")}
            :&nbsp;
            <span>{selectedSeat}</span>
          </h3>
          <h3>
            {t("seatSelect.toPay")}
            {selectedSeat.length * 120}
            &nbsp; kr
          </h3>
        </div>
      </center>
    </>
  );
};

export default SeatLayout;
