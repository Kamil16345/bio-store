import React from "react";
import { useLocation } from "react-router-dom";
import { Categories } from "../Categories/Categories";
import { Products } from "../Products/Products";

export const Category = () => {
  const { state } = useLocation();
  const products = state.products;

  return (
    <>
      <div className="App row">
        <div className="categories-component col-2">
          <Categories />
        </div>
        <div className="products-component col-10">
          <Products productsOfCategory={products} />
        </div>
      </div>
    </>
  );
};
