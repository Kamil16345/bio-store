import React, { useState } from "react";
import MaintainShoppingCart from "../../services/maintainUserShoppingCart";

export const ShoppingCart = () => {
  
  const [products, setProducts]=useState([]);

  return (
    <>
      {products.map((product) => (
        <div className="categoryCard" key={product.id}>
          <li>{product.name}</li>
        </div>
      ))}
      {/* <div>ShoppingCart</div>
      <button onClick={() => getShoppingCart()}>getShoppingCart</button> */}
    </>
  );
  function getShoppingCart() {
    let customerId = localStorage.getItem("customerId");
    console.log(customerId);
    MaintainShoppingCart.getShoppingCart(customerId)
      .then((response) => console.log(response))
      .catch((e) => {
        console.log(e);
      });
    console.log();
  }
};
