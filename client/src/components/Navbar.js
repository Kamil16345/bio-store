import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import { useAuth } from './auth'


export const Navbar = () => {
  const auth = useAuth()

    //const {state}=useLocation()
    //const {name}=state
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
              <NavLink to='/logout'>Sign Out</NavLink>
            </>
        )}
        
    </nav>
  )
}
