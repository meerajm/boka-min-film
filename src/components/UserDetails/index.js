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
  const [nameValidator, setNameValidator] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidator, setEmailValidator] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNoValidator, setPhoneNoValidator] = useState(false);
  const navigate = useNavigate();
  const userID = process.env.REACT_APP_EMAILJS_USER_ID;
  const showDetails = `Show details:
  Movie: ${state.selectedMovie.title},
  Date: ${tickets.date},
  Time: ${tickets.time},
  Quantity: ${tickets.quantity},
  SeatNo: ${tickets.seatNo}`;

  const validateForm = (e) => {
    e.preventDefault();
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("phone: ", phoneNo);
    if (name && email && phoneNo) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email.toLowerCase())) {
        setEmailValidator(true);
        return false;
      }
      return true;
    }
    if (!name) {
      setNameValidator(true);
    } else {
      console.log("disable name");
      setNameValidator(false);
    }
    if (!email) {
      setEmailValidator(true);
    }
    if (!phoneNo) {
      setPhoneNoValidator(true);
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validateForm(e);
    if (validateResult) {
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
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    if (e.target.value) setNameValidator(false);
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    if (e.target.value) setEmailValidator(false);
    setEmail(e.target.value);
  };
  const handlePhoneNo = (e) => {
    e.preventDefault();
    if (e.target.value) setPhoneNoValidator(false);
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

          {nameValidator && (
            <label className="validation">*Please enter a name</label>
          )}
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
          {emailValidator && (
            <label className="validation">*Please enter a valid email</label>
          )}
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
          {phoneNoValidator && (
            <label className="validation">*Please enter a valid phone no</label>
          )}
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
