import React, { useState, useEffect } from 'react'
import maintainProducts from '../../services/maintainProducts'
import maintainCategories from '../../services/maintainCategories'
import maintainUserShoppingCart from '../../services/maintainUserShoppingCart';

export const Home=()=>{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    let userId = localStorage.getItem("userId")
    useEffect(() => {
        homePageProducts();
        navigationCategories();
    }, []);
    
    function homePageProducts(){
        maintainProducts.getAllProducts()
        .then((response) => {
            setProducts(response.data)
            console.log(products)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    function navigationCategories(){
        maintainCategories.getAllCategories()
        .then((response)=>{
            setCategories(response.data)
            console.log(categories)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    function addToCart(product){
        if(userId){
            maintainUserShoppingCart.postProduct(userId, product)
        }else{
            console.log("You are not logged in.")
        }
    }
    return(
        <div className='App'>
            
            <div className='categories'>
                <div>Categories</div>
                {categories.map((category) => (
                <div className='categoryCard' key={category.id}>
                    
                    <li >{category.name}</li>
                </div>
            ))}
            </div>

            <h1>Featured Products</h1>
            <div className='products'>
                {products.map((product) => (
                <div className='card' key={product.id}>
                    <h3>{product.name}</h3>
                    <h5>{product.category.name}</h5>
                    <button id='addToCartButton' onClick={()=>addToCart()}>Add to cart</button>
                </div>
            ))}
            </div>
        </div>
    )
 
}