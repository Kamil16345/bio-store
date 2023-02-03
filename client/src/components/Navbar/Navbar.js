import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthenticateAdmin/AuthenticateAdmin";
import maintainProducts from "../../services/maintainProducts";
import './Navbar.css'
export const Navbar = () => {
  const auth = useAuth();
  const customerId = localStorage.getItem("customerId");
  const userId = localStorage.getItem("userId");
  const categoryId = localStorage.getItem("categoryId");
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
          <NavLink to={{
            pathname: "/customerPanel",
            search:`?customer=${customerId}`
          }}>Customer Panel</NavLink>
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
