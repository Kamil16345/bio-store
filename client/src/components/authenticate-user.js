import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.sendCredentials = this.sendCredentials.bind(this);
    //this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      login: "",
      password: "", 
      //published: false,

      submitted: false
    };
  }

  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  sendCredentials() {
    var data = {
      login: this.state.login,
      password: this.state.password
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          //id: response.data.id,
          login: response.data.login,
          password: response.data.password,
          //published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  newTutorial() {
    this.setState({
      id: null,
      login: "",
      password: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                required
                value={this.state.login}
                onChange={this.onChangeLogin}
                name="login"
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
            </div>
            <button onClick={this.sendCredentials} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
