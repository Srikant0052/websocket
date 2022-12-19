import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import customStyle from "./registeration.module.css";

// import "./style.css";
function RegistrationForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
    }

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async () => {
    console.log(userName, email, password, confirmPassword);
    try {
      let resp = await axios({
        method: "post",
        url: `http://localhost:4000/register`,
        data: {
          userName,
          email,
          password,
          confirmPassword,
        },
      });
      console.log(resp);
      // if (resp.data.data) {
      //   setBetData(resp.data.data);
      // }
    } catch (error) {
      // setErr(error.response.data);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={customStyle.form}>
      <div className={customStyle.form_body}>
        <div>
          <h2>Register Here!</h2>
        </div>
        <div className="username">
          <label className={customStyle.form_label} htmlFor="userName">
            User Name
          </label>
          <input
            className={customStyle.form_input}
            type="text"
            value={userName}
            onChange={(e) => handleInputChange(e)}
            id="userName"
            placeholder="User Name"
          />
        </div>
        <div className="email">
          <label className={customStyle.form_label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={customStyle.form_input}
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className={customStyle.form_label} htmlFor="password">
            Password{" "}
          </label>
          <input
            className={customStyle.form_input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className={customStyle.form_label} htmlFor="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className={customStyle.form_input}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div className={customStyle.footer}>
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
        <div>
          Have an Account ?<Link to="/login">Login Here</Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
