import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import image from "../images/background.jpg";
import { Portal } from "./Portal";

const Login = ({ setAuth }) => {
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
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");
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
    heading="Log in"
    onChange={onChange}
    onSubmitForm={onSubmitForm}
    switchText="New user?"
    switchLink="/register"
    switchLinkText="Sign up"
    email={email}
    password={password}
  />
  );
};

export default Login;
