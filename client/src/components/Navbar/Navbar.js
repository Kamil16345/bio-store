import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthenticateAdmin/AuthenticateAdmin";
import maintainProducts from "../../services/maintainProducts";
import "./Navbar.css";
export const Navbar = () => {
  const auth = useAuth();
  const customerId = localStorage.getItem("customerId");
  const userId = localStorage.getItem("userId");
  const categoryId = localStorage.getItem("categoryId");
  return (
    <nav id="navbar">
      <NavLink className="navbarLink" id="homeLink" to="/">
        Home
      </NavLink>
      {!customerId && (
        <>
          <NavLink className="navbarLink" to="signUp">
            Sign Up
          </NavLink>
          <NavLink className="navbarLink" to="authCustomer">
            Sign In
          </NavLink>
        </>
      )}
      {customerId && (
        <>
          <NavLink
            className="navbarLink"
            to={{
              pathname: "/customerPanel",
              search: `?customer=${customerId}`,
            }}
          >
            Customer Panel
          </NavLink>
          <NavLink className="navbarLink logout" to="/logout" id="logoutButton">
            Logout
          </NavLink>
          <NavLink
            className="navbarLink shoppingCart"
            to="shoppingCart"
            id="shoppingCart"
          >
            ShoppingCart
          </NavLink>
        </>
      )}
      {userId && (
        <>
          <NavLink to="filesUpload">Upload Image</NavLink>
          <NavLink to="manageProducts">Manage products</NavLink>
          <NavLink to="manageCategories">Manage categories</NavLink>
          <NavLink to="manageCustomers">Manage customers</NavLink>
        </>
      )}
    </nav>
  );
};
