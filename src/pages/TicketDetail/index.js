import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

const TicketDetail = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { tickets, selectedCinema, selectedMovie, selectedShow } = state;
  const navigate = useNavigate();
  const paymentStatus = tickets.transactionSuccess
    ? "paymentSuccess"
    : "paymentFailed";
  return (
    <div className="ticket-details-container">
      <h1 className="text-white">Ticket details</h1>
      <table className="ticket-details">
        <tbody>
          <tr>
            <td>{t("ticketDetails.movieName")}</td>
            <td>{tickets.movieName}</td>
            <td rowSpan="3">
              <img src={selectedMovie.poster} alt={selectedMovie.title} />
            </td>
          </tr>
          <tr>
            <td>{t("ticketDetails.cinemaName")}</td>
            <td>{selectedCinema}</td>
          </tr>
          <tr>
            <td>{t("ticketDetails.showDetails")}</td>
          </tr>
          <tr>
            <td>{t("ticketDetails.date")}</td>
            <td>{tickets.date}</td>
          </tr>
          <tr>
            <td>{t("ticketDetails.time")}</td>
            <td>{tickets.time}</td>
          </tr>
          <tr>
            <td>{t("seatSelect.selectedSeat")}</td>
            <td>{tickets.seatNo}</td>
          </tr>
          <tr>
            <td>{t("movieTiming.screen")}</td>
            <td>{selectedShow.screen}</td>
          </tr>
          <tr>
            <td>{t("ticketDetails.paymentStatus")}</td>
            <td>{t(`ticketDetails.${paymentStatus}`)}</td>
          </tr>
          <tr>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      <button
        className="ok-btn"
        type="button"
        onClick={() => {
          navigate("./thank-you");
        }}
      >
        {t("ticketDetails.ok")}
      </button>
      <br />
    </div>
  );
};

export default TicketDetail;
