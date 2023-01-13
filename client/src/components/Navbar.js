import React from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from './auth'
import maintainProducts from '../services/maintainProducts'


export const Navbar = () => {
  const auth = useAuth()
  let customerId=localStorage.getItem("customerId")
  return (
    <nav>
        <NavLink to='/'>Home</NavLink>
        {!customerId && (
            <>
              <NavLink to='signUp'>Sign Up</NavLink>
              <NavLink to='authenticate'>Sign In</NavLink>
            </>
        )}
        {customerId && (
            <>
              <NavLink to='customerPanel'>Customer Panel</NavLink>
              <NavLink to='shoppingCart' id="shoppingCart">ShoppingCart</NavLink>
              <NavLink to='/logout' id="logoutButton">Logout</NavLink>
            </>
        )}
        
    </nav>
  )
}
