import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

const DisplayCinemaSelection = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { cinemaNames, selectedCinema } = state;
  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: "setSelectedCinema",
      data: e.target.value,
    });
  };
  return (
    <div>
      <select
        id="choose-cinema"
        className="select-cinema"
        value={selectedCinema}
        onChange={handleChange}
      >
        <option key="0" value="">
          {t("bookTicket.selectCinema")}
        </option>
        {cinemaNames.map((name) => (
          <option key={name._id} value={name.cinemaName}>
            {name.cinemaName}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DisplayCinemaSelection;
