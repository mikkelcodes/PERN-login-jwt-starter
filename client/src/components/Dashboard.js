import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../layout.css";

const Dashboard = ({ setAuth }) => {
  const [email, setEmail] = useState("");

  console.log(localStorage);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setEmail(parseData.email);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="p-20">
        <h1 className="text-5xl mb-4">Dashboard</h1>
        <h2 className="text-3xl mb-4">Welcome {email}</h2>
        <button onClick={(e) => logout(e)} className="px-3 py-2 bg-red-500 text-white font-bold">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
