import React, { useState, useEffect} from "react";

import maintainProducts from "../../services/maintainProducts";
import maintainUserShoppingCart from "../../services/maintainUserShoppingCart";
const customerId = localStorage.getItem("customerId");
//const navigate = useNavigate();

export const Products = ({ productsOfCategory }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productsOfCategory) {
      setProducts(productsOfCategory);
    } else {
      homePageProducts();
    }
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

  return (
    <>
      <h1>Featured Products</h1>
      <div className="products" id="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            {/* <img src="" /> */}
            <h3 id="productName">{product.name}</h3>
            <h5 id="productPrice">{product.price} zł</h5>
            <button id="addToCartButton" onClick={(event) => addToCart(event)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export const addToCart = (event) => {
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
