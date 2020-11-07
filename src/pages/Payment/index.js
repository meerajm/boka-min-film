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
  const { tickets, selectedCinema, selectedMovie } = state;
  const navigate = useNavigate();
  const priceInKr = tickets.quantity * 120;
  const price = priceInKr * 11.23;
  const name = "BokaMinFilm";
  let payment = false;
  async function handleToken(token) {
    const response = await axios.post("http://localhost:5000/checkout", {
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
          stripeKey="pk_test_51HioJQGD6ZzSWKwpBgVhOlwsWz4JlxCdazddqlkJ6sx01WlKAZmqqqks2a1GGOwwhW2FiCa1qFT7XtqqUgwO0E0w00RJIn8Meb"
          token={handleToken}
          amount={price}
          name={name}
        />
      </div>
    </div>
  );
};

export default Payment;
