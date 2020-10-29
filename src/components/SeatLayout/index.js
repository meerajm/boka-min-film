import React from "react";
import "./index.css";

const SeatLayout = () => {
  const rows = [1, 2, 3, 4, 5];
  const columns = ["A", "B", "C", "D", "E"];
  return (
    <div className="seatStructure">
      <center>
        <table id="seatsBlock">
          <p id="notification" />
          <tr>
            <td colSpan="14">
              <div className="screen">SCREEN</div>
            </td>
            <td rowSpan="20">
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
                        type="checkbox"
                        className="seats"
                        value={`${column}${row}`}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>

        <br />
        <button type="button" onClick="updateTextArea()">
          Confirm Selection
        </button>
      </center>
    </div>
  );
};

export default SeatLayout;
