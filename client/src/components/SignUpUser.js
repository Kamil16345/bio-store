import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignUpUserServices from "../services/signUpUser"

export class SignUpUser extends Component{
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangePassword =this.onChangePassword.bind(this)
        this.saveUser = this.saveUser.bind(this)

        this.state={
            email:"",
            name:"",
            password:"",

            submitted:false
        };
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangeName(e){
        this.setState({
            name: e.target.value
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
            name: this.state.name,
            password: this.state.password
        };
        

        SignUpUserServices.create(data)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    name: response.data.name,
                    password: response.data.password,

                    submitted: true
                })
                console.log(response.data)
                
            })
            .catch(e => {
                console.log(e);
            });

    }
    newAuthentication(){
        this.setState({
            email:"",
            name:"",
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
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
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
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                name="password"
                            />
                            <button onClick={this.saveUser} className="btn btn-success">
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}