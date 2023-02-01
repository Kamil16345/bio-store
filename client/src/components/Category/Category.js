import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Categories } from "../Categories/Categories";
import { Products } from "../Products/Products";

export const Category = () => {
  const { state } = useLocation();
  const products = state.products;

  const [data, setData] = useState()
  useEffect(setData)
  return (
    <>
      <Categories />
      {/* <Products productsOfCategory={products} /> */}
    </>
  );
};
