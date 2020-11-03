import React, { useState } from "react";
import "./index.css";

const UserDetails = () => {
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    alert("A name was submitted");
    event.preventDefault();
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <label>
            Full Name:
            <input type="text" value={name} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            E-mail:
            <input type="text" value={name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="text" value={name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
export default UserDetails;
