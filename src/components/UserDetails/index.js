import React, { useState, useContext } from "react";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
import AppContext from "../../store/context";
import "./index.css";

const UserDetails = () => {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();
  const emailjsUserID = process.env.EMAILJS_USER_ID;
  console.log("process", process);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("gmail", "template_qzheows", e.target, emailjsUserID).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    dispatch({
      type: "setUserDetails",
      data: { name, email, phoneNo },
    });
    navigate("./payment");
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };

  console.log(state);
  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input type="text" value={name} onChange={handleName} />
          </label>
        </div>

        <div>
          <label>
            E-mail:
            <input type="text" value={email} onChange={handleEmail} />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="text" value={phoneNo} onChange={handlePhoneNo} />
          </label>
        </div>
        <div>
          <input type="submit" value="Payment" />
        </div>
      </form>
    </div>
  );
};
export default UserDetails;
