import React, { useContext } from "react";
import AppContext from "../../store/context";

const ThankYou = () => {
  const { state } = useContext(AppContext);
  const { userDetails } = state;

  return (
    <div className="container">
      <h1>Yipeeee!!! Your booking is confirmed!!!</h1>
      <h3>
        <span>
          Thank you&nbsp;
          {userDetails.name.split(" ")[0]}
          &nbsp;for booking with us. We hope see you again soon.
        </span>
      </h3>
      <h3>An copy of your ticket has been sent to your inbox.</h3>
      <button type="button">Go to Main</button>
    </div>
  );
};

export default ThankYou;
