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
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Your name"
        onChange={e => this.changeName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Repeat password"
        onChange={e => this.changeRepeatPassword(e.target.value)}
      />
      <button onClick={() => this.register()}>Sign up</button>
      <p>{this.state.result}</p>
      <Link to="/login">Log in</Link>
    </div>
  );
}
