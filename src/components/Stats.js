import React, { Component } from "react";
import history from "../components/history";

export default class Stats extends Component {
  state = {
    stat: []
  };
  componentDidMount = () => {
    fetch("http://localhost:3000/stat/get", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(data => data.json())
      .then(stat => this.setState({ stat: stat.stats }))
      .catch(e => history.push("/login"));
  };
  render = () => (
    <div>
      {this.state.stat.map(stat => (
        <h1 key={stat._id}>
          {stat.fullDate
            .split(" ")
            .slice(0, 2)
            .join(".")}
          : done {stat.done} tasks of {stat.all}
        </h1>
      ))}
    </div>
  );
}
