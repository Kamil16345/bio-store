import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticateDataService from "../../services/signInCustomerServices";
import { useAuth } from "../AuthenticateAdmin/AuthenticateAdmin";
import "./SignInCustomer.css";
//import { Button } from 'react-bootstrap'
const submitted = false;
export const SignInCustomer=() =>{
  const [email, setEmail] = useState("");
  const [id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <div
      className="signInForm d-flex justify-content-center align-items-center"
      id="signInForm"
    >
      {submitted ? (
        <div>
          <h4>Welcome </h4>
          <button>Some button</button>
        </div>
      ) : (
        <div className="form col-xxl-3 col-l-2 col-md-4 col-sm-6">
          <div id="signInLabel">
            <h2>Sign In</h2>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={onChangeEmail}
              name="email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={onChangePassword}
              name="password"
            />
          </div>
          <div className="float-end">
            <button
              onClick={() => {
                saveCustomer();
              }} 
              className="btn btn-primary"
              id="signInButton"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function saveCustomer() {
    let data = {
      id: id,
      email: email,
      password: password,
    };

    AuthenticateDataService.getCustomer(data.email)
      .then(
        (response) => (
          // eslint-disable-next-line no-sequences
          console.log(response),
          auth.login(email),
        //   navigate(`/customerPanel/${email}`, {
          navigate(`/`, {
            state: {
              email: response.data.email,
              name: response.data.name,
              id: response.data._id,
            },
          }),
          localStorage.setItem("customerId", response.data._id),
          localStorage.setItem("customerEmail", response.data.email)
        )
      )
      .catch((e) => {
        console.log(e);
      });
  }
};
