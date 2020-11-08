import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";

const ThankYou = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { userDetails } = state;

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
      <button type="button">Go to Main</button>
    </div>
  );
};

export default ThankYou;
