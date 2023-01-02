import React from 'react'
import {useParams} from 'react-router-dom'

export const UserPanel = () => {
    const params = useParams()
    const userEmail = params.email
  return (
    <div>Welcome {userEmail}</div>
  )
}
