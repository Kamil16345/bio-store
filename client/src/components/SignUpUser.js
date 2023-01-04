import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpUserServices from "../services/signUpUserServices"
import {useAuth} from "./auth"

const submitted=false;
export const SignUpUser = () => {
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const auth=useAuth()
    const navigate = useNavigate()
    
    return(
        <div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value= {email}
                    onChange={onChangeEmail}
                    name="email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value= {name}
                    onChange={onChangeName}
                    name="name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={password}
                    onChange={onChangePassword}
                    name="password"
                />
                <button onClick={()=>saveUser()} className="btn btn-success">
                    Sign Up
                </button>
            </div>
        </div>
   )
   function onChangeEmail(event){
    setEmail(event.target.value)
    }   

    function onChangeName(event){
        setName(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    function saveUser(){
        var data={
            email: email,
            name: name,
            password: password
        };
        
        SignUpUserServices.create(data)
            .then(response => (
                auth.login(email),
                navigate(`/userPanel/${email}`, {
                    state: {
                        email:response.data.email, 
                        name:response.data.name
                }})
            ))
            .catch(e =>{
                console.log(e);
            }); 
        
    }
}
