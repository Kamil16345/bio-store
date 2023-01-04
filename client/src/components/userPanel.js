import React from 'react'
import {useLocation, useParams} from 'react-router-dom'
import AuthenticateDataService from '../services/signInUserServices'

export const UserPanel =() => {
  //const params = useParams()
  const {state}=useLocation()
  const {name, email}=state
  console.log(state)
  return (
      <h2>Hello, {name}</h2>
  )
}