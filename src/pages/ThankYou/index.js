import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";

const ThankYou = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { userDetails } = state;
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>{t("thankyou.firstMsg")}</h1>
      <h3>
        <span>
          {t("thankyou.secondMsgPart1")}
          {userDetails.name.split(" ")[0]}
          {t("thankyou.secondMsgPart2")}
        </span>
      </h3>
      <h3>{t("thankyou.thirdMsg")}</h3>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("allContent");
          navigate("./main");
        }}
      >
        {t("thankyou.bookAgain")}
      </button>
    </div>
  );
};

export default ThankYou;
