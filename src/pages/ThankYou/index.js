import React, { useContext } from "react";
import axios from "axios";
import AppContext from "../../store/context";

const ThankYou = () => {
  const { state } = useContext(AppContext);
  const { userDetails, tickets } = state;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const USER_API_URL = `${baseUrl}api/v1/users`;
  console.log("USER", userDetails);
  console.log("TICKET", tickets);

  const newUser = JSON.stringify({ ...userDetails, ticketDetails: tickets });
  console.log(newUser);
  async function postUserDetails() {
    const response = await axios.post(`${USER_API_URL}`, newUser, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(response);
  }

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
      <button
        type="button"
        onClick={() => {
          postUserDetails();
        }}
      >
        Save my details
      </button>
    </div>
  );
};

export default ThankYou;
