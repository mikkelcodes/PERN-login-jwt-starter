import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import image from "../images/background.jpg";
import { Portal } from "./Portal";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Portal
      heading="Sign up"
      onChange={onChange}
      onSubmitForm={onSubmitForm}
      switchText="Already signed up?"
      switchLink="/login"
      switchLinkText="Log in"
      email={email}
      password={password}
    />
  );
};

export default Register;
