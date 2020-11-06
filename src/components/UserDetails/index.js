import React, { useState, useContext } from "react";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
import AppContext from "../../store/context";
import "./index.css";

const UserDetailsComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const { ticketDetails } = state;
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();
  const showDetails = `Show details:
  Movie: ${state.selectedMovie.title},
  Date: ${ticketDetails.date},
  Time: ${ticketDetails.time},
  Quantity: ${ticketDetails.quantity},
  SeatNo: ${ticketDetails.seatNo}`;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "setUserDetails",
      data: { username, email, phoneNo },
    });
    dispatch({
      type: "setTicketDetails",
      data: {
        ...ticketDetails,
        name: username,
      },
    });
    console.log(showDetails);
    emailjs
      .sendForm(
        "gmail",
        "template_qzheows",
        e.target,
        "user_Bl0ubee1hE6jVYhnTF6U3"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    navigate("./payment");
  };
  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePhoneNo = (e) => {
    e.preventDefault();
    setPhoneNo(e.target.value);
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              value={username}
              name="username"
              onChange={handleName}
            />
          </label>
        </div>
        <div>
          <label>
            E-mail:
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleEmail}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="text" value={phoneNo} onChange={handlePhoneNo} />
          </label>
          <div>
            <label>
              Show Details:
              <textarea
                type="text"
                rows="6"
                cols="30"
                value={showDetails}
                name="details"
              />
            </label>
          </div>
        </div>
        <div>
          <input type="submit" value="Payment" />
        </div>
      </form>
    </div>
  );
};
export default UserDetailsComponent;
