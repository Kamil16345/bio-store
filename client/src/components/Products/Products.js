import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import maintainProducts from "../../services/maintainProducts";
import maintainUserShoppingCart from "../../services/maintainUserShoppingCart";

import './Products.css'
//const navigate = useNavigate();

export const Products = ({ productsOfCategory }) => {
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    if (productsOfCategory) {
      setProducts(productsOfCategory);
      categoryProducts(productsOfCategory);
    } else {
      homePageProducts();
    }
  }, [state]);

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
            children[i].children[0].dataset.productCategory =
              response.data[i].category.name;
            children[i].children[0].dataset.productId = response.data[i]._id;
            children[i].children[1].dataset.productName = response.data[i].name;
            children[i].children[1].dataset.price = response.data[i].price;
          }
        }, 20);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function categoryProducts(products) {
    let productsDiv = document.getElementById("products");
    let children = productsDiv.children;
    console.log("productsDiv.length: ");
    console.log(products);
    
    //children - class = "card"
    setTimeout(() => {
      //children[0].children[0].dataset.productCategory = 
      console.log("products.parentElement: ")
      console.log(products.parentElement)
      for (let i = 0; i < children.length; i++) {
        children[i].setAttribute("id", products[i]._id);
        productsDiv.children[i].children[0].dataset.productName =
          products[i].name;

        productsDiv.children[i].children[1].dataset.price = products[i].price;
      }
    }, 20);
  }

  return (
    <>
      <h1>Featured Products</h1>
      <div className="products" id="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            {/* <img src="" /> */}
            <h3 id="productName" key={product.name}>{product.name}</h3>
            <h5 id="productPrice" key={product.price}>{product.price} zł</h5>
            <button id="addToCartButton" key={product.id} onClick={(event) => addToCart(event)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export const addToCart = (event) => {
  const customerId = localStorage.getItem("customerId");
  if (customerId) {
    let product = event.target.parentElement;
    let productId = product.getAttribute("id");
    var customerData = {
      productId: productId,
      customerId: customerId,
    };
    maintainUserShoppingCart.postProduct(customerData);
  } else {
    console.log("You are not logged in.");
  }
};
