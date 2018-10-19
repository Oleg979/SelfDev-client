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
    this.setState({ result: "Loading..." });
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
    <div className="login">
      <img className="logo" src="logo.png" />
      <h1>Verify token from your email</h1>
      <div class="row login-row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">vpn_key</i>
              <input
                id="icon_telephone"
                type="password"
                class="validate"
                onChange={e => this.handleCodeChange(e.target.value)}
              />
              <label htmlFor="icon_telephone">Your token</label>
            </div>
          </div>
        </form>
      </div>
      <div className="btns">
        <a class="waves-effect waves-light btn" onClick={() => this.verify()}>
          <i class="material-icons left">import_export</i>
          Verify
        </a>

        <Link to="/">
          <a class="waves-effect waves-light btn" style={{ margin: 0 }}>
            <i class="material-icons left">dehaze</i>
            Main Page
          </a>
        </Link>
      </div>
      <h5>
        <b>{this.state.result}</b>
      </h5>
    </div>
  );
}
