import React, { Component } from "react";

export default class LoginPage extends Component {
  state = {
    login: null,
    pass: null,
    result: ""
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
        else this.setState({ result: data.token });
      });
  };

  changeLogin = login => this.setState({ login });
  changePassword = password => this.setState({ password });

  render = () => (
    <div>
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
    </div>
  );
}
