import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../components/history";

export default class RegisterPage extends Component {
  state = {
    login: null,
    pass: null,
    name: null,
    repeatPass: null,
    needsVerify: false,
    error: ""
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) history.push("/");
  };

  register = () => {
    this.setState({ result: "Loading..." });
    if (this.state.pass != this.state.repeatPass) {
      this.setState({ result: "Passwords dont matches." });
      return;
    }
    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.login,
        password: this.state.pass
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (!data.auth) this.setState({ result: data.text });
        else {
          localStorage.setItem("email", this.state.login);
          history.push("/verify");
        }
      });
  };

  changeLogin = login => this.setState({ login });
  changePassword = pass => this.setState({ pass });
  changeRepeatPassword = repeatPass => this.setState({ repeatPass });
  changeName = name => this.setState({ name });

  render = () => (
    <div className="login">
      <img className="logo" src="logo.png" />

      <h1>Sign Up</h1>
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
              <i class="material-icons prefix">edit</i>
              <input
                id="icon_prefix1"
                type="text"
                class="validate"
                onChange={e => this.changeName(e.target.value)}
              />
              <label htmlFor="icon_prefix1">Your name</label>
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
            <div class="input-field col s6">
              <i class="material-icons prefix">vpn_key</i>
              <input
                id="icon_telephone1"
                type="password"
                class="validate"
                onChange={e => this.changeRepeatPassword(e.target.value)}
              />
              <label htmlFor="icon_telephone1">Repeat password</label>
            </div>
          </div>
        </form>
      </div>
      <div className="btns">
        <a class="waves-effect waves-light btn" onClick={() => this.register()}>
          <i class="material-icons left">person_add</i>
          Sign Up
        </a>

        <Link to="/login">
          <a class="waves-effect waves-light btn" style={{ margin: 0 }}>
            <i class="material-icons left">arrow_forward</i>
            Log In
          </a>
        </Link>
      </div>
      <h5>
        <b>{this.state.result}</b>
      </h5>
    </div>
  );
}
