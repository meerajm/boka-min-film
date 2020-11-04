import React, { useState, useContext } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";
import "./index.css";

const UserDetails = () => {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "setUserDetails",
      data: { name, email, phone },
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
    setPhone(e.target.value);
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
            <input type="text" value={phone} onChange={handlePhoneNo} />
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
