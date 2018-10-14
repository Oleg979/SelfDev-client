import React, { Component } from "react";
import history from "../components/history";
import TaskTable from "../components/TaskTable";

export default class HomePage extends Component {
  state = {
    user: {},
    loading: true
  };

  componentDidMount = () => {
    this.setState({ loading: true });
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
        this.setState({ user: user.user, loading: false });
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
      {this.state.loading && <h2>Loading...</h2>}
      {!this.state.loading && (
        <div>
          <p>Hello, {this.state.user.name}!</p>
          <TaskTable />
          <button onClick={this.logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
