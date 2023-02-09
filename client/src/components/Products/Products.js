import React, { useState, useEffect } from "react";
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
      console.log("productsOfCategory: ")
      console.log(productsOfCategory)
      setProducts(productsOfCategory);
      categoryProducts(productsOfCategory);
    } else {
      homePageProducts();
      console.log(products);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            children[i].children[0].dataset.productCategory = response.data[i].category.name;
            children[i].children[0].dataset.productName = response.data[i].name;
            children[i].children[0].dataset.productId = response.data[i]._id;
            children[i].children[2].dataset.description = response.data[i].description
            children[i].children[3].dataset.price = response.data[i].price;
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
    console.log(products.length);

    //children - class = "card"
    setTimeout(() => {
      //children[0].children[0].dataset.productCategory =
      console.log("products.parentElement: ");
      console.log(products);
      for (let i = 0; i < children.length; i++) {
        // children[i].setAttribute("id", products[i]._id);
        // productsDiv.children[i].children[0].dataset.productName =
        //   products[i].name;

        // productsDiv.children[i].children[1].dataset.price = products[i].price;
        children[i].setAttribute("id", products[i]._id);
        productsDiv.children[i].children[0].dataset.productCategory = products[i].category.name;
        productsDiv.children[i].children[0].dataset.productName = products[i].name;
        productsDiv.children[i].children[0].dataset.productId = products[i]._id;
        productsDiv.children[i].children[2].dataset.description = products[i].description
        productsDiv.children[i].children[3].dataset.price = products[i].price;
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
    console.log("We are adding product")
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
