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
          <button
            className="language-btn"
            type="button"
            value="Hi-ind"
            onClick={() => {
              i18n.changeLanguage("hi");
            }}
          >
            <img src="india.png" alt="Hindi" />
          </button>
          <button
            className="language-btn"
            type="button"
            value="Sv-sw"
            onClick={() => {
              i18n.changeLanguage("sv");
            }}
          >
            <img src="sweden.png" alt="Swedish" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
