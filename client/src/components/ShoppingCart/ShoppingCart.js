import React, { useEffect, useState } from "react";
import MaintainShoppingCart from "../../services/maintainUserShoppingCart";

export const ShoppingCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getShoppingCart();
    //shoppingCartProducts();
  }, []);
  function getShoppingCart() {
    let customerId = localStorage.getItem("customerId");
    MaintainShoppingCart.getShoppingCart(customerId)
      .then((response) => {
        setProducts(response.data.products);
        //groupProductsByName(response.data.products)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  // var groupedProducts = {};
  // function groupProductsByName(input) {
  //   const products = input.products;
    
  //   products.forEach(product => {
  //     const name = product.name;
  //     if (!groupedProducts[name]) {
  //       groupedProducts[name] = [];
  //     }
  //     groupedProducts[name].push(product);
  //   });
  //   //console.log(Object.values(groupedProducts))
  //   return groupedProducts;
  // }

  return (
    <>
        {products.map((product) => (
          <div className="categoryCard" key={product.id}>
            <li>{product.name}</li>
          </div>
        ))}
    </>
  );
};
