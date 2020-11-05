import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";

const ThankYou = () => {
  const { state } = useContext(AppContext);
  const { userDetails } = state;
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Yipeeee!!! Your booking is confirmed!!!</h1>
      <h2>
        Thank you
        {userDetails.name}
        for booking with us. We hope see you again soon.
      </h2>
      <h3>An copy of your ticket has been sent to your inbox.</h3>
      <button
        type="button"
        onClick={() => {
          navigate("./main");
        }}
      >
        Go to main page
      </button>
    </div>
  );
};

export default ThankYou;
