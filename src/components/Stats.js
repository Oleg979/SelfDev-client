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

  renderStat = stat => (
    <div className="stat">
      <b>
        {stat.fullDate
          .split(" ")
          .slice(0, 2)
          .join(".")}
        :
      </b>{" "}
      done <i>{stat.done}</i> of <i>{stat.all}</i> tasks
      {stat.tasks.filter(task => task.isChecked).map(task => (
        <div class="done_task">
          <b>+ {task.text}</b>
        </div>
      ))}
      {stat.tasks.filter(task => !task.isChecked).map(task => (
        <div class="undone_task">
          <b>- {task.text}</b>
        </div>
      ))}
    </div>
  );

  render = () => (
    <div className="login">
      <h4>Statistics</h4>
      {this.state.stat.reverse().map(this.renderStat)}
    </div>
  );
}
