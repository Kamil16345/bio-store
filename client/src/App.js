import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthenticateUser from "./components/authenticate-user";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/authenticate-user"} className="navbar-brand">
            bioMe
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/authenticate-user"} className="nav-link">
                Sign In
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/authenticate-user" element={<AuthenticateUser/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
