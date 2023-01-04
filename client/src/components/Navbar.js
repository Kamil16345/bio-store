import React from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from './auth'

export const Navbar = () => {
  const auth = useAuth()
  return (
    <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='userPanel'>User Panel</NavLink>
        <NavLink to='signUp'>Sign Up</NavLink>
        <NavLink to='authenticate'>Sign In</NavLink>
    </nav>
  )
}
