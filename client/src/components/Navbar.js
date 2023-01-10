import React from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from './auth'


export const Navbar = () => {
  const auth = useAuth()
  return (
    <nav>
        <NavLink to='/'>Home</NavLink>
        {!auth.email && (
            <>
              <NavLink to='signUp'>Sign Up</NavLink>
              <NavLink to='authenticate'>Sign In</NavLink>
            </>
        )}
        {auth.email && (
            <>
              <NavLink to='customerPanel'>Customer Panel</NavLink>
              <NavLink to='shoppingCart' id="shoppingCart">ShoppingCart</NavLink>
              <NavLink to='/logout' id="logoutButton">Logout</NavLink>
            </>
        )}
        
    </nav>
  )
}
