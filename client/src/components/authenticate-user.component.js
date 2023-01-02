import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";
import AuthenticateDataService from "../services/authenticate.service"

export class AuthenticateUser extends Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword =this.onChangePassword.bind(this)
        this.saveUser = this.saveUser.bind(this)

        this.state={
            email:"",
            password:"",

            submitted:false
        };
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    saveUser(){
        console.log(this.state)
        var data={
            email: this.state.email,
            password: this.state.password
        };
        

        AuthenticateDataService.create(data)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    password: response.data.password,

                    submitted: true
                })
                
            })
            .catch(e => {
                console.log(e);
            });
        return redirect("/user-panel")
    }
    newAuthentication(){
        this.setState({
            email:"",
            password:"",

            submitted: false
        })
    }

    render(){
        var user = this.state.email
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Welcome {user}</h4>
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
                                value={this.state.email}
                                onChange={this.onChangeEmail}
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
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                name="password"
                            />
                            <button onClick={this.saveUser} className="btn btn-success">
                                Sign In
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
