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
    <div>
      <h1>Log in</h1>
      <input
        type="text"
        placeholder="Your email"
        onChange={e => this.changeLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        onChange={e => this.changePassword(e.target.value)}
      />
      <button onClick={() => this.logIn()}>Log in</button>
      <p>{this.state.result}</p>
      <Link to="/register">Sign up</Link>
    </div>
  );
}
