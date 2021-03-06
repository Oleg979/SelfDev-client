import React, { Component } from "react";
import history from "../components/history";
import TaskTable from "../components/TaskTable";
import Stats from "../components/Stats";

export default class HomePage extends Component {
  state = {
    user: {},
    loading: true,
    page: "Tasks"
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

  changePage = page => this.setState({ page });

  render = () => (
    <div>
      {this.state.loading && (
        <div class="preloader-wrapper active spinner">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
        </div>
      )}
      {!this.state.loading && (
        <div>
          <nav>
            <div class="nav-wrapper ">
              <a href="#" class="brand-logo">
                <img src="logo1.png" />
              </a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li
                  className={this.state.page == "Tasks" ? "active" : ""}
                  onClick={() => this.changePage("Tasks")}
                >
                  <a>Tasks</a>
                </li>
                <li
                  className={this.state.page == "Tasks" ? "" : "active"}
                  onClick={() => this.changePage("Stats")}
                >
                  <a>Statistics</a>
                </li>
                <li>
                  <a onClick={this.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </nav>
          {this.state.page == "Tasks" ? <TaskTable /> : <Stats />}
        </div>
      )}
    </div>
  );
}
