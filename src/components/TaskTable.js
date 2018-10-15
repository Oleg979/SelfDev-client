import React, { Component } from "react";
import Task from "./Task";
import history from "../components/history";

export default class TaskTable extends Component {
  state = {
    tasks: [],
    text: "",
    hours: "",
    minutes: ""
  };

  getTasks = () =>
    fetch("http://localhost:3000/tasks/get", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(data => data.json())
      .then(data => {
        if (!data.success) this.setState({ tasks: [] });
        else this.setState({ tasks: data.tasks });
      })
      .catch(e => history.push("/login"));

  componentDidMount = () => {
    this.getTasks();
  };

  changeText = text => this.setState({ text });
  changeHours = hours => this.setState({ hours });
  changeMinutes = minutes => this.setState({ minutes });

  add = () => {
    let date = new Date();
    date.setHours(+this.state.hours);
    date.setMinutes(+this.state.minutes);
    fetch("http://localhost:3000/push/send", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.text,
        time: Math.round(+date / 1000)
      })
    }).catch(e => history.push("/login"));
    fetch("http://localhost:3000/tasks/add", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.text,
        time: `${this.state.hours}:${this.state.minutes}`
      })
    })
      .then(data => {
        this.getTasks();
        this.setState({
          text: "",
          hours: "",
          minutes: ""
        });
      })
      .catch(e => history.push("/login"));
  };

  delete = id => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(data => data.json())
      .then(data => {
        if (!data.success) throw new Error();
        this.getTasks();
      })
      .catch(e => history.push("/login"));
  };

  check = (id, isChecked) => {
    let type = isChecked ? "un" : "";
    fetch(`http://localhost:3000/tasks/${type}check/${id}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(data => data.json())
      .then(data => {
        if (!data.success) throw new Error();
        this.getTasks();
      })
      .catch(e => history.push("/login"));
  };

  render = () => (
    <div>
      <h3>
        Tasks: {this.state.tasks.filter(task => task.isChecked).length}/
        {this.state.tasks.length}
      </h3>
      {this.state.tasks.length > 0 &&
        this.state.tasks.map((task, idx) => (
          <Task
            key={idx}
            text={task.text}
            time={task.time}
            isChecked={task.isChecked}
            onChange={() => this.check(task._id, task.isChecked)}
            onDelete={() => this.delete(task._id)}
          />
        ))}
      <input
        type="text"
        placeholder="text"
        value={this.state.text}
        onChange={e => this.changeText(e.target.value)}
      />
      <input
        className="time"
        type="number"
        placeholder="hours"
        value={this.state.hours}
        onChange={e => this.changeHours(e.target.value)}
      />
      :
      <input
        className="time"
        type="number"
        placeholder="min"
        value={this.state.minutes}
        onChange={e => this.changeMinutes(e.target.value)}
      />
      <button onClick={this.add}>Add</button>
      <br />
      <br />
    </div>
  );
}
