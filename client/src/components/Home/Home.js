import React from "react";

import { Categories } from "../Categories/Categories";
import { Products } from "../Products/Products";

export const Home = () => {
  const customerId = localStorage.customerId;
  const userId = localStorage.userId;
  return (
    <div>
      <div className="App row">
        <div className=" categories-component col-2">
          <Categories />
        </div>
        <div className="products-component col-10">
        <Products />
        </div>
        
      </div>
    </div>
  );
};
