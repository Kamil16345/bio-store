import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticateDataService from "../services/signInUserServices"
import {useAuth} from "./auth"

const submitted=false;
export const SignInUser = () => {
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const auth = useAuth()
    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Welcome </h4>
                    <button>
                        Some button
                    </button>
                </div>
            ):(
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
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

    function onChangeEmail(event){
        setEmail(event.target.value)
    }
    
    function onChangePassword(event){
        setPassword(event.target.value)
    }
    
    function saveUser(){
        var data={
            email: email,
            password: password
        };

         AuthenticateDataService.create(data)
            .then(response => ({
                
                email: email,
                password: password,
                submitted: true
            }))
            .catch(e =>{
                console.log(e);
            });
        
            AuthenticateDataService.getUser(data.email)
            .then(response => (
                auth.login(email),
                navigate(`/userPanel/${email}`, {
                    state: {
                        email:response.data.email, 
                        name:response.data.name
                    }})
        ))
            .catch(e=> {
                console.log(e)
            })
        
    }

}