import React, { Component } from "react";
import history from "../components/history";
import { Link } from "react-router-dom";

export default class VerificationPage extends Component {
  state = {
    code: null,
    result: null
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) history.push("/");
  };

  handleCodeChange = code => this.setState({ code });

  verify = () => {
    fetch("http://localhost:3000/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        verificationCode: this.state.code,
        email: localStorage.getItem("email")
      })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (!data.success) this.setState({ result: data.text });
        else {
          history.push("/login");
        }
      });
  };

  render = () => (
    <div>
      <h1>Verify token</h1>
      <input
        type="text"
        placeholder="Enter code from your email"
        onChange={e => this.handleCodeChange(e.target.value)}
      />
      <button onClick={() => this.verify()}>Verify</button>
      <p>{this.state.result}</p>
      <Link to="/">To main page</Link>
    </div>
  );
}
