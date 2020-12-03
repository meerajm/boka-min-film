import React from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

const Header = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  return (
    <div className="header-container" data-testid="header">
      <div className="header-row">
        <div className="header-title">
          <a href="/" className="menu">
            <h1 className="title-text">BokaMinFilm</h1>
          </a>
        </div>
        <div className="header-btn">
          {t("header.selectLang")}
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
