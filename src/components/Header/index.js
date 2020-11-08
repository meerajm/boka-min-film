import React from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

const Header = () => {
  const { i18n } = useTranslation();
  return (
    <div className="header-container">
      <div className="header-row">
        <div className="header-title">
          <h1>BokaMinFilm</h1>
        </div>
        <div className="header-btn">
          Select Language:
          <input
            type="button"
            value="En-us"
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          />
          <input
            type="button"
            value="En-sw"
            onClick={() => {
              i18n.changeLanguage("sv");
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
