import React, { Component } from "react";
import history from "../components/history";

export default class HomePage extends Component {
  state = {
    user: {}
  };

  componentDidMount = () => {
    if (!localStorage.getItem("token")) return history.push("/login");
    fetch("http://localhost:3000/auth/me", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(data => data.json())
      .then(user => {
        if (!user.auth) {
          localStorage.removeItem("token");
          return history.push("/login");
        }
        this.setState({ user: user.user });
      });
  };

  logout = () => {
    fetch("http://localhost:3000/auth/logout").then(data => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      history.push("/login");
    });
  };

  render = () => (
    <div>
      <h1>Home page</h1>
      <p>{JSON.stringify(this.state.user)}</p>
      <button onClick={this.logout}>Logout</button>
    </div>
  );
}
