import React, { Component } from "react";

export default class RegisterPage extends Component {
  state = {
    login: null,
    pass: null,
    name: null,
    repeatPass: null,
    result: ""
  };

  register = () => {
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
        else this.setState({ result: data.text });
      });
  };

  changeLogin = login => this.setState({ login });
  changePassword = pass => this.setState({ pass });
  changeRepeatPassword = repeatPass => this.setState({ repeatPass });
  changeName = name => this.setState({ name });

  render = () => (
    <div>
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
    </div>
  );
}
