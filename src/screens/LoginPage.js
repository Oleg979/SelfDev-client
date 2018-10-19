import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../components/history";

export default class LoginPage extends Component {
  state = {
    login: null,
    pass: null,
    result: ""
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) history.push("/");
  };

  logIn = () => {
    this.setState({ result: "Loading..." });
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.login,
        password: this.state.password
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (!data.auth) this.setState({ result: data.text });
        else {
          localStorage.setItem("token", data.token);
          history.push("/");
        }
      });
  };

  changeLogin = login => this.setState({ login });
  changePassword = password => this.setState({ password });

  render = () => (
    <div className="login">
      <img className="logo" src="logo.png" />
      <h1>Log in</h1>
      <div class="row login-row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input
                id="icon_prefix"
                type="text"
                class="validate"
                onChange={e => this.changeLogin(e.target.value)}
              />
              <label htmlFor="icon_prefix">Your email</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">vpn_key</i>
              <input
                id="icon_telephone"
                type="password"
                class="validate"
                onChange={e => this.changePassword(e.target.value)}
              />
              <label htmlFor="icon_telephone">Your password</label>
            </div>
          </div>
        </form>
      </div>
      <div className="btns">
        <a class="waves-effect waves-light btn" onClick={() => this.logIn()}>
          <i class="material-icons left">arrow_forward</i>
          Log In
        </a>

        <Link to="/register">
          <a class="waves-effect waves-light btn" style={{ margin: 0 }}>
            <i class="material-icons left">person_add</i>
            Sign Up
          </a>
        </Link>
      </div>
      <h5>
        <b>{this.state.result}</b>
      </h5>
    </div>
  );
}
