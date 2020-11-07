import React, { useState, useContext } from "react";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
import AppContext from "../../store/context";
import "./index.css";

const UserDetailsComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const { tickets, selectedMovie } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();
  const userID = process.env.REACT_APP_EMAILJS_USER_ID;
  console.log("ENV:", userID);
  const showDetails = `Show details:
  Movie: ${state.selectedMovie.title},
  Date: ${tickets.date},
  Time: ${tickets.time},
  Quantity: ${tickets.quantity},
  SeatNo: ${tickets.seatNo}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "setUserDetails",
      data: { name, email, phoneNo },
    });
    dispatch({
      type: "setTicketDetails",
      data: {
        ...tickets,
        username: name,
        movieName: selectedMovie.title,
      },
    });
    emailjs.sendForm("gmail", "template_qzheows", e.target, userID).then(
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
              value={name}
              name="name"
              placeholder="Your name.."
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
              placeholder="Your email.."
              onChange={handleEmail}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNo}
              placeholder="Your phone number.."
              onChange={handlePhoneNo}
            />
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
