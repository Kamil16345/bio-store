import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import maintainCustomer from "../../services/maintainCustomer";
//import AuthenticateDataService from '../services/signInCustomerServices'
import "./CustomerPanel.css";
export const CustomerPanel = () => {
  //const location = useLocation();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    if (!customerData) {
      userInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  //const queryString = new URLSearchParams(location.search);
  //const customerId = queryString.get("customer");
  const customerEmail = localStorage.getItem("customerEmail");
  function userInfo() {
    maintainCustomer
      .getCurrentCustomer(customerEmail)
      .then((response) => {
        setCustomerData(response.data);
        console.log(response.data.isGold);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      {customerData && (
        <>
          <div className="customerPanel">
            <div className="elements col-4">
              <h3 className="header">Customer Information</h3>
              <div className="name">name: <b>{customerData.name}</b></div>
              <div className="surname">surname: <b>{customerData.surname}</b></div>
              <div className="email">email: <b>{customerData.email}</b></div>
              <div className="phone">phone: <b>{customerData.phone}</b></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
