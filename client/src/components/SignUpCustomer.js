import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpCustomerServices from "../services/signUpCustomerServices"
import {useAuth} from "./auth"

export const SignUpCustomer = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const auth=useAuth()
    const navigate = useNavigate()
    
    return(
        <div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
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
                <label htmlFor="password">Password: </label>
                <input 
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={password}
                    onChange={onChangePassword}
                    name="password"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
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
                <label htmlFor="surname">Surname: </label>
                <input 
                    type="text"
                    className="form-control"
                    id="surname"
                    required
                    value= {surname}
                    onChange={onChangeSurname}
                    name="surname"
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone number: </label>
                <input 
                    type="text"
                    className="form-control"
                    id="phone"
                    required
                    value= {phone}
                    onChange={onChangePhone}
                    name="phone"
                />
            </div>
            
            <button onClick={()=>saveCustomer()} className="btn btn-success">
                Sign Up
            </button>
            
        </div>
   )
   function onChangeEmail(event){
    setEmail(event.target.value)
    }   

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    function onChangeName(event){
        setName(event.target.value)
    }

    function onChangeSurname(event){
        setSurname(event.target.value)
    }

    function onChangePhone(event){
        setPhone(event.target.value)
    }

    function saveCustomer(){
        var data={
            email: email,
            password: password,
            name: name,
            surname:surname,
            phone:phone,
            shoppingCart:{}
        };
        SignUpCustomerServices.create(data)
            .then(response => (
                auth.login(email),
                navigate(`/customerPanel/${email}`, {
                    state: {
                        email:response.data.email,
                        name:response.data.name,
                        surname:response.data.surname,
                        phone:response.data.phone
                    }
                }),
                localStorage.setItem("customerId", response.data._id)
            ))
            .catch(e =>{
                console.log(e);
            }); 
        
    }
}
