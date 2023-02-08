import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";

import maintainProducts from "../../services/maintainProducts";
import maintainUserShoppingCart from "../../services/maintainUserShoppingCart";

import "./Products.css";
//const navigate = useNavigate();
var customerId = localStorage.getItem("customerId");
export const Products = ({ productsOfCategory }) => {
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    if (productsOfCategory) {
      setProducts(productsOfCategory);
      categoryProducts(productsOfCategory);
    } else {
      homePageProducts();
      console.log(products);
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
            // children[i].children[0].dataset.productImageUrl =
            //   "data:image/jpeg;base64," +
            //   response.data[i].image.data.toString("base64");
            console.log(children[i].children[0].dataset.productImageUrl);
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
      console.log("products.parentElement: ");
      console.log(products.parentElement);
      for (let i = 0; i < children.length; i++) {
        children[i].setAttribute("id", products[i]._id);
        productsDiv.children[i].children[0].dataset.productName =
          products[i].name;

        productsDiv.children[i].children[1].dataset.price = products[i].price;
      }
    }, 20);
  }
  // const base64Image = Buffer.from(product.image.data).toString('base64');
  return (
    <div id="productsRoot">
      <h1 id="productsHeader">Featured Products</h1>
      <div className="products" id="products">
        {products.map((product) => (
          <div
            className="product col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3"
            id="product"
            key={product.id}
          >
            <h3 id="productName" key={product.name}>
              <b>{product.name}</b>
            </h3>
            <img
              src={`data:image/jpeg;base64,${Buffer.from(
                product.image.data
              ).toString("base64")}`}
              alt="Red dot"
            />
            <h6 id="description" key={product.description}>{product.description}</h6>
            <h5 id="productPrice" key={product.price}>
              Price: <b>{product.price}zł</b> 
            </h5>
            <button
              id="addToCartButton"
              className="col-5 col-md-6 btn btn-success"
              key={product.id}
              onClick={(event) => addToCart(event)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const addToCart = (event) => {
  if (customerId) {
    let product = event.target.parentElement;
    let productId = product.getAttribute("id");
    var customerData = {
      productId: productId,
      customerId: customerId,
      operation: "add",
    };
    maintainUserShoppingCart.postProduct(customerData);
  } else {
    console.log("You are not logged in.");
  }
};
export const removeFromCart = (event) => {
  if (customerId) {
    let product = event.target.parentElement;
    let productId = product.getAttribute("id");
    var customerData = {
      productId: productId,
      customerId: customerId,
      operation: "remove",
    };
    console.log("Adding/removing item");
    maintainUserShoppingCart.postProduct(customerData);
  } else {
    console.log("You are not logged in.");
  }
};
