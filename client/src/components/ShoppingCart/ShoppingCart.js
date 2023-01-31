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
  }, []);
  function getShoppingCart() {
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
    console.log(cartProducts.children)
    for(let i=0; i<products.length; i++){
      cartProducts.children[i].setAttribute("id", products[i]._id)
      //cartProducts.children[i].children[0].dataset=products[i].name;
      //cartProducts.children[i].children.getElementbyId("productAmount").setAttribute("data-product-amount", products[i].amountInCart);

    }
  }
  function addOneMoreProduct(event) {
    const updatedProducts = products.map((product) => {
      if (product._id === event.target.parentElement.getAttribute("id")) {
        return { ...product, amountInCart: product.amountInCart + 1 };
      }
      return product;
    });
    setProducts(updatedProducts)
    addToCart(event)
  }
  function removeProduct(event){
    const updatedProducts = products.map((product) => {
      if (product._id === event.target.parentElement.getAttribute("id")) {
        console.log("product: ")
        console.log(product)
        if(product.amountInCart===1){
          console.log("product.amountInCart: ")
          console.log(product.amountInCart)
          document.getElementById(product._id).remove()
        }
        return { ...product, amountInCart: product.amountInCart - 1 };

      }
      
      

      return product;
    });
    setProducts(updatedProducts)
    removeFromCart(event)
  }

  return (
    <>
      <div className="cartProducts" id="cartProducts">
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>
            <button id="decreaseAmount" onClick={(event)=>removeProduct(event)}>-</button>
            <span id="productAmount">{product.amountInCart}</span>
            <button id="increaseAmount" onClick={(event)=>addOneMoreProduct(event)}> +  </button>
          </div>
        ))}
      </div>
    </>
  );
};
