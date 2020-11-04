import React, { useContext } from "react";
import AppContext from "../../store/context";

const DisplayCinemaSelection = () => {
  const { state, dispatch } = useContext(AppContext);
  const { cinemaNames, selectedCinema } = state;

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: "setSelectedCinema",
      data: e.target.value,
    });
  };
  console.log(state);
  return (
    <div>
      <select id="choose-cinema" value={selectedCinema} onChange={handleChange}>
        <option key="0" value="">
          --Select Cinema--
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
