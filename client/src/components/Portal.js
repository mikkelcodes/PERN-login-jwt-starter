import React from "react";
import image from "../images/background.jpg";
import { Link } from "react-router-dom";

export const Portal = ({
  onChange,
  onSubmitForm,
  heading,
  switchText,
  switchLink,
  email,
  password,
  switchLinkText,
}) => (
  <div className="h-screen w-full flex flex-col items-center justify-center">
    <img src={image} alt="nature" className="object-cover w-full h-full" />
    <div className="w-full max-w-lg mx-auto fixed bg-white bg-opacity-20 p-20 rounded-3xl border border-lg">
      <h1 className="text-4xl mb-8 text-center text-white font-bold">
        {heading}
      </h1>
      <form onSubmit={onSubmitForm} className="flex flex-col w-full">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          className="my-1 border px-2 py-2 rounded-lg"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="my-2 border px-2 py-2 rounded-lg"
          placeholder="password"
        />
        <button className="my-1 px-2 py-2 rounded-lg bg-green-400 shadow-md text-white font-bold transition duration-200">
          Submit
        </button>
      </form>
      <div className="mx-auto block text-blue-700 mt-1 font-bold text-lg">
        <span className="text-white font-normal"> {switchText}</span>{" "}
        <Link to={switchLink}>{switchLinkText}</Link>
      </div>
    </div>
  </div>
);
