import React, { Component } from "react";

export default class VerificationPage extends Component {
  state = {
    code: null,
    login: null,
    result: null
  };

  handleCodeChange = code => this.setState({ code });
  changeLogin = login => this.setState({ login });

  verify = () => {
    fetch("http://localhost:3000/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        verificationCode: this.state.code,
        email: this.state.login
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (!data.success) this.setState({ result: data.text });
        else this.setState({ result: data.text });
      });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Your email"
          onChange={e => this.changeLogin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter code from your email"
          onChange={e => this.handleCodeChange(e.target.value)}
        />
        <button onClick={() => this.verify()}>Verify</button>
        <p>{this.state.result}</p>
      </div>
    );
  }
}
