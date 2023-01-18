import React, { useState, useEffect } from "react";

import maintainProducts from '../../services/maintainProducts'
import maintainUserShoppingCart from '../../services/maintainUserShoppingCart';

export const Products = () => {
  const [products, setProducts] = useState([]);

  let customerId = localStorage.getItem("customerId");
  useEffect(() => {
    homePageProducts();
  }, []);

  function homePageProducts() {
    maintainProducts
      .getAllProducts()
      .then(async (response) => {
        await setProducts(response.data);
        let productsDiv = document.getElementById("products");
        let children = productsDiv.children;
        setTimeout(() => {
          for (let i = 0; i < response.data.length; i++) {
            children[i].setAttribute("id", response.data[i]._id);
            children[i].children[0].dataset.productId = response.data[i]._id;
            children[i].children[1].dataset.productName = response.data[i].name;
            children[i].children[2].dataset.productCategory =
              response.data[i].category.name;
          }
        }, 20);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function addToCart(event) {
    if (customerId) {
      let product = event.target.parentElement;
      let productId = product.getAttribute("id");
      var customerData = {
        productId: productId,
        customerId: customerId,
      };
      console.log(productId);
      maintainUserShoppingCart.postProduct(customerData);
    } else {
      console.log("You are not logged in.");
    }
  }
  return (
    <>
      <h1>Featured Products</h1>
      <div className="products" id="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3 id="productName">{product.name}</h3>
            <h5 id="productCategory">{product.category.name}</h5>
            <button id="addToCartButton" onClick={(event) => addToCart(event)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
