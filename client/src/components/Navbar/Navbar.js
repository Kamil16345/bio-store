import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthenticateAdmin/AuthenticateAdmin";
import maintainProducts from "../../services/maintainProducts";

export const Navbar = () => {
  const auth = useAuth();
  const customerId = localStorage.getItem("customerId");
  const userId = localStorage.getItem("userId");
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!customerId && (
        <>
          <NavLink to="signUp">Sign Up</NavLink>
          <NavLink to="authCustomer">Sign In</NavLink>
        </>
      )}
      {customerId && (
        <>
          <NavLink to="customerPanel/${customerId}">Customer Panel</NavLink>
          <NavLink to="shoppingCart" id="shoppingCart">
            ShoppingCart
          </NavLink>
          <NavLink to="/logout" id="logoutButton">
            Logout
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
