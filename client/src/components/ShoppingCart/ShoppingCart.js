import React, { useEffect, useState } from "react";
import MaintainShoppingCart from "../../services/maintainUserShoppingCart";
import { addToCart } from "../Products/Products";
import { removeFromCart } from "../Products/Products";
import "./ShoppingCart.css";

var customerId = localStorage.getItem("customerId");

export const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getShoppingCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getShoppingCart() {
    console.log("CUSTOMER ID:", customerId);
    MaintainShoppingCart.getShoppingCart(customerId)
      .then((response) => {
        setProducts(response.data.products);
        setAttributes(response.data.products);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function setAttributes(products) {
    const cartProducts = document.getElementById("cartProducts");
    console.log(cartProducts.children);
    setTimeout(() => {
      for (let i = 0; i < products.length; i++) {
        cartProducts.children[i].setAttribute("id", products[i]._id);
        //cartProducts.children[i].children[0].dataset=products[i].name;
        //cartProducts.children[i].children.getElementbyId("productAmount").setAttribute("data-product-amount", products[i].amountInCart);
      }
    }, 100);
  }
  function addOneMoreProduct(event) {
    const updatedProducts = products.map((product) => {
      if (product._id === event.target.parentElement.getAttribute("id")) {
        document.getElementById(product._id).disabled = false;
        return { ...product, amountInCart: product.amountInCart + 1 };
      }
      return product;
    });
    summarizeCart();
    setProducts(updatedProducts);
    addToCart(event);
  }
  function removeProduct(event) {
    const updatedProducts = products.map((product) => {
      if (product._id === event.target.parentElement.getAttribute("id")) {
        if (product.amountInCart === 1) {
          console.log("Disabled button.");
          console.log(document.getElementById(product._id));
          document.getElementById(product._id).disabled = true;
          document.getElementById(product._id).remove();
        }

        return { ...product, amountInCart: product.amountInCart - 1 };
      }
      return product;
    });
    summarizeCart();
    setProducts(updatedProducts);
    removeFromCart(event);
  }
  function summarizeCart() {
    let productsAmount = 0;
    let productsPrice = 0;
    console.log("products: ");
    console.log(products);
    for (let i = 0; i < products.length; i++) {
      productsAmount += products[i].amountInCart;
      console.log("productsPrice: ");
      productsPrice += products[i].amountInCart * products[i].price;
    }
    let productsPriceFixed = productsPrice.toFixed(2);
    console.log("productsPrice: ");
    console.log(productsPrice);
    return {
      productsAmount: productsAmount,
      productsPrice: productsPriceFixed,
    };
  }
  let results = summarizeCart();
  let productsAmount = results.productsAmount;
  let productsPrice = results.productsPrice;
  return (
    <>
      <div className="cartProductsParent">
      
        <div className="cartProducts col-6" id="cartProducts">
        <h3 className="header">Summary</h3>
          {products.map((product) => (
            <div key={product.id} className="cartProduct">
              <span className="productName">{product.name}</span>
              <button
                className="btn btn-success"
                id="increaseAmount"
                onClick={(event) => addOneMoreProduct(event)}
              >
                +
              </button>
              &nbsp;
              <span id="productAmount">{product.amountInCart}</span>
              &nbsp;
              <button
                className="btn btn-warning"
                id="decreaseAmount"
                onClick={(event) => removeProduct(event)}
              >
                -
              </button>
            </div>
          ))}
          <div class="summaryDiv bg-success text-white text-center p-2">
            Summarize ({productsAmount} products): {productsPrice}zł{" "}
          </div>
          <br></br>
          <br></br>
          <br></br>
          <button className="btn btn-primary proceedButton">
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  );
};