import React from "react";
import "./index.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-row">
        <div className="header-title">
          <h1>BokaMinFilm</h1>
        </div>
        <div className="header-btn">
          Select Language:
          <input type="button" value="En-us" />
          <input type="button" value="En-sw" />
        </div>
      </div>
    </div>
  );
};
export default Header;
