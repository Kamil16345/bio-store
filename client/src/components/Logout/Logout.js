import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import {useAuth} from "../AuthenticateAdmin/AuthenticateAdmin"

export const Logout = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  //const [count, setCount]=useState(0)

  localStorage.removeItem("customerId")
  localStorage.removeItem("customerEmail")
  auth.logout()

  useEffect(()=>{
    navigate('/')
  })
  //setCount(count+1)
}
