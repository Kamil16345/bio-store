import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpCustomerServices from "../../services/signUpCustomerServices";
import { useAuth } from "../AuthenticateAdmin/AuthenticateAdmin";
import "./SignUpCustomer.css";
export const SignUpCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="signUpComponent">
        <div className="form col-xxl-3 col-l-2 col-md-4 col-sm-6">
          <div id="signUpLabel">
            <h2>Sign Up</h2>
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              type="text"
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
              placeholder="Password"
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={onChangePassword}
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Name"
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={onChangeName}
              name="name"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Surname"
              type="text"
              className="form-control"
              id="surname"
              required
              value={surname}
              onChange={onChangeSurname}
              name="surname"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Phone number"
              type="text"
              className="form-control"
              id="phone"
              required
              value={phone}
              onChange={onChangePhone}
              name="phone"
            />
          </div>

          <button
            onClick={() => saveCustomer()}
            className="signUpButton btn btn-success"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeSurname(event) {
    setSurname(event.target.value);
  }

  function onChangePhone(event) {
    setPhone(event.target.value);
  }

  function saveCustomer() {
    var data = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      phone: phone,
      shoppingCart: {},
    };
    SignUpCustomerServices.create(data)
      .then(
        (response) => (
          // eslint-disable-next-line no-sequences
          auth.login(email),
          navigate(`/customerPanel/${email}`, {
            state: {
              email: response.data.email,
              name: response.data.name,
              surname: response.data.surname,
              phone: response.data.phone,
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
