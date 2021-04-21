import React, { useState, useEffect } from "react";
import "./layout.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { toast } from "react-toastify";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Router>
        <div className="">
          <Body isAuthenticated={isAuthenticated} setAuth={setAuth} />
        </div>
      </Router>
    </>
  );
}

export const Body = ({ isAuthenticated, setAuth }) => (
  <Switch>
    <Route
      exact
      path="/login"
      render={(props) =>
        !isAuthenticated ? (
          <Login {...props} setAuth={setAuth} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
    <Route
      exact
      path="/register"
      render={(props) =>
        !isAuthenticated ? (
          <Register {...props} setAuth={setAuth} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
    <Route
      exact
      path="/dashboard"
      render={(props) =>
        isAuthenticated ? (
          <Dashboard {...props} setAuth={setAuth} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  </Switch>
);

export default App;
