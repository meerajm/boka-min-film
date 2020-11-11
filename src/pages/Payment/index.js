import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import AppContext from "../../store/context";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

toast.configure();

const Payment = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    tickets,
    selectedCinema,
    selectedMovie,
    userDetails,
    selectedShow,
  } = state;
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const USER_API_URL = `${baseUrl}api/v1/users`;
  const CINEMA_API_URL = `${baseUrl}api/v1/cinemas`;
  const priceInKr = tickets.quantity * 120;
  const price = priceInKr * 11.23;
  const name = "BokaMinFilm";
  let payment = false;
  async function handleToken(token) {
    const response = await axios.post(`${baseUrl}checkout`, {
      token,
      name,
      price,
    });
    const { status } = response.data;
    if (status === "success") {
      payment = true;
      toast("Payment successful", { type: "success" });
    } else {
      payment = false;
      toast("Something went wrong", { type: "error" });
    }
    dispatch({
      type: "setTicketDetails",
      data: {
        ...tickets,
        transactionSuccess: payment,
      },
    });
    const newUser = JSON.stringify({
      ...userDetails,
      ticketDetails: { ...tickets, transactionSuccess: payment },
    });
    const resForAddUser = await axios.post(`${USER_API_URL}`, newUser, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(resForAddUser);
    const resForUpdateSeats = await axios.patch(
      `${CINEMA_API_URL}/${selectedCinema}/${selectedShow.id}`,
      tickets,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(resForUpdateSeats);
    setTimeout(() => {
      navigate("./thank-you");
    }, 2000);
  }
  return (
    <div className="container">
      <div className="details-container">
        <h1>{selectedCinema}</h1>
        <h1>{selectedMovie.title}</h1>
        <h3>
          Total:&nbsp;
          {priceInKr}
          &nbsp;kr
        </h3>
      </div>
      <div className="details" />
      <div>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={handleToken}
          amount={price}
          name={name}
        />
      </div>
    </div>
  );
};

export default Payment;
