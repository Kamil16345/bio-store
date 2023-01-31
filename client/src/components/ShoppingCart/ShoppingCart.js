import React, { useEffect, useState } from "react";
import MaintainShoppingCart from "../../services/maintainUserShoppingCart";
import "./ShoppingCart.css";

export const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getShoppingCart();
  }, []);
  function getShoppingCart() {
    let customerId = localStorage.getItem("customerId");
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
      cartProducts.children[i].children[0].dataset=products[i].name;
      cartProducts.children[i].children.getElementbyId("productAmount").setAttribute("data-product-amount", products[i].amountInCart);

    }
  }
  function addOneMoreProduct() {}

  return (
    <>
      <div className="cartProducts" id="cartProducts">
        {products.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>
            <span id="decreaseAmount"> - </span>
            <span id="productAmount">{product.amountInCart}</span>
            <span id="increaseAmount"> + </span>
          </div>
        ))}
      </div>
    </>
  );
};
