import React from 'react'
import {useLocation} from 'react-router-dom'

export const UserPanel = () => {
  const {state}=useLocation()
  const {name, email}=state
  return (
    <div>Welcome {email}</div>
  )
}
