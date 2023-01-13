import React from 'react'
import MaintainShoppingCart from '../services/maintainUserShoppingCart'

export const ShoppingCart = () => {
  return (
    <>
    <div>ShoppingCart</div>
    <button onClick={getShoppingCart()}>getShoppingCart</button>
    </>
  )
  function getShoppingCart(){

    let customerId = localStorage.getItem("customerId")
    console.log(customerId)
    MaintainShoppingCart.getShoppingCart(customerId)
        .then(response =>(
            console.log(response)
        ))
        .catch(e=>{
            console.log(e)
        })
        console.log()
  }
}
