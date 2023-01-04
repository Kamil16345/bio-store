import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import {useAuth} from "./auth"

export const Logout = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  auth.logout()
  useEffect(()=>{
    navigate('/')
  })
  

}
