import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

const TicketDetail = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { tickets, selectedCinema, selectedMovie, selectedShow } = state;
  const divBG = {
    backgroundImage: `url(${selectedMovie.poster})`,
    width: "100%",
    height: "470px",
    opacity: "0.6",
  };

  return (
    <div style={divBG}>
      <h1 className="text-white">Ticket details</h1>
      <table className="ticket-details">
        <tr>
          <td>{t("ticketDetails.movieName")}</td>
          <td>{tickets.movieName}</td>
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
      </table>
    </div>
  );
};

export default TicketDetail;
