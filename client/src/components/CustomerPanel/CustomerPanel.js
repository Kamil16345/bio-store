import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import maintainCustomer from "../../services/maintainCustomer";
//import AuthenticateDataService from '../services/signInCustomerServices'

export const CustomerPanel = () => {
  const location = useLocation();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    if(!customerData){
      userInfo();
    }
  }, [customerData]);

  const queryString = new URLSearchParams(location.search);
  const customerId = queryString.get("customer");
  const customerEmail=localStorage.getItem("customerEmail")
  function userInfo() {
    maintainCustomer
      .getCurrentCustomer(customerEmail)
      .then((response) => {
        setCustomerData(response.data);
        console.log(response.data.isGold)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      {customerData && (
        <>
          <p>email: {customerData.email}</p>
          <p>name: {customerData.name}</p>
          <p>surname: {customerData.surname}</p>
          <p>phone: {customerData.phone}</p>
        </>
      )}
    </>
  );
  
};
