import React from "react";

import { Categories } from "../Categories/Categories";
import { Products } from "../Products/Products";

export const Home = () => {
  const customerId = localStorage.customerId;
  const userId = localStorage.userId;
  return (
    <div>
        <div className="App">
          <Categories />
          <Products />
        </div>
    </div>
  );
};
