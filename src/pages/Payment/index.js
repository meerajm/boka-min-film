import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Payment = () => {
  const price = 100 * 11.23;
  const name = "BokaMinFilm";
  async function handleToken(token) {
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      {
        token,
        name,
      }
    );
    const { status } = response.data;
    console.log(status);
    if (status === "success") {
      console.log("Success");
    } else {
      console.log("Something went wrong");
    }
  }
  return (
    <div>
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
