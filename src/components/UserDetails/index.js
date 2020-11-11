import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
import AppContext from "../../store/context";
import "./index.css";

const UserDetailsComponent = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { tickets, selectedMovie } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();
  const userID = process.env.REACT_APP_EMAILJS_USER_ID;
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          {t("userDetails.fullName")}
          <input
            type="text"
            value={name}
            name="name"
            placeholder={t("userDetails.placeHolderName")}
            onChange={handleName}
          />
        </label>
      </div>
      <div>
        <label>
          {t("userDetails.email")}
          <input
            type="text"
            value={email}
            name="email"
            placeholder={t("userDetails.placeHolderEmail")}
            onChange={handleEmail}
          />
        </label>
      </div>
      <div>
        <label>
          {t("userDetails.phone")}
          <input
            type="text"
            value={phoneNo}
            placeholder={t("userDetails.placeHolderPhone")}
            onChange={handlePhoneNo}
          />
        </label>
        <div>
          <label>
            {t("userDetails.showDetails")}
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
        <input type="submit" value={t("userDetails.payment")} />
      </div>
    </form>
  );
};
export default UserDetailsComponent;
