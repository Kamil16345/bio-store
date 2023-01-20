import React from 'react'
import {useLocation, } from 'react-router-dom'
//import AuthenticateDataService from '../services/signInCustomerServices'

export const CustomerPanel =() => {
  //const params = useParams()
  const {state}=useLocation()
  const {name}=state
  return (
      <h2>Hello, {name}</h2>
  )
}