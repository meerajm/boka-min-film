import React from "react";
import { useNavigate } from "@reach/router";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

toast.configure();

const Payment = () => {
  const navigate = useNavigate();
  const price = 100 * 11.23;
  const name = "BokaMinFilm";
  async function handleToken(token) {
    const response = await axios.post("http://localhost:5000/checkout", {
      token,
      name,
      price,
    });
    const { status } = response.data;
    if (status === "success") {
      toast("Payment successful", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
    setTimeout(() => {
      navigate("./thank-you");
    }, 2000);
  }
  return (
    <div className="container">
      <div className="details">
        <h1>Cinema Name</h1>
        <h1>Movie Name</h1>
        <h3>Total: </h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_51HioJQGD6ZzSWKwpBgVhOlwsWz4JlxCdazddqlkJ6sx01WlKAZmqqqks2a1GGOwwhW2FiCa1qFT7XtqqUgwO0E0w00RJIn8Meb"
        token={handleToken}
        amount={price}
        name={name}
      />
    </div>
  );
};

export default Payment;
