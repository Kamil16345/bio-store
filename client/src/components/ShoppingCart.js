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

    let userId = localStorage.getItem("userId")
    console.log(userId)
    MaintainShoppingCart.getShoppingCart(userId)
        .then(response =>(
            console.log(response)
        ))
        .catch(e=>{
            console.log(e)
        })
        console.log()
  }
}
