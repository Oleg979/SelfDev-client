import React, { Component } from "react";
import Task from "./Task";
import history from "../components/history";

export default class TaskTable extends Component {
  state = {
    tasks: [],
    text: "",
    hours: "",
    minutes: "",
    tag: ""
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
        if (!data.success) throw new Error();
        else this.setState({ tasks: data.tasks });
      })
      .catch(e => history.push("/login"));

  componentDidMount = () => {
    this.getTasks();
  };

  changeText = text => this.setState({ text });
  changeHours = hours => this.setState({ hours });
  changeMinutes = minutes => this.setState({ minutes });
  changeTag = tag => this.setState({ tag });

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
        tag: this.state.tag,
        time: `${this.state.hours}:${this.state.minutes}`
      })
    })
      .then(data => {
        this.getTasks();
        this.setState({
          text: "",
          hours: "",
          minutes: "",
          tag: ""
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
    <div className="login">
      <h4>
        Tasks done: {this.state.tasks.filter(task => task.isChecked).length}/
        {this.state.tasks.length}
      </h4>
      {this.state.tasks.length > 0 &&
        this.state.tasks.map((task, idx) => (
          <Task
            key={idx}
            text={task.text}
            time={task.time}
            tag={task.tag}
            isChecked={task.isChecked}
            onChange={bool => this.check(task._id, bool)}
            onDelete={() => this.delete(task._id)}
          />
        ))}

      <div class="row login-row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">menu</i>
              <input
                id="icon_prefix"
                type="text"
                class="validate"
                value={this.state.text}
                onChange={e => this.changeText(e.target.value)}
              />
              <label htmlFor="icon_prefix">Text</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">bookmark</i>
              <input
                id="icon_tag"
                type="text"
                class="validate"
                value={this.state.tag}
                onChange={e => this.changeTag(e.target.value)}
              />
              <label htmlFor="icon_tag">Tag</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">access_time</i>
              <input
                id="icon_hours"
                type="number"
                min="0"
                max="23"
                class="validate"
                value={this.state.hours}
                onChange={e => this.changeHours(e.target.value)}
              />
              <label htmlFor="icon_hours">Hours</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">access_time</i>
              <input
                id="icon_minutes"
                type="number"
                class="validate"
                min="0"
                max="59"
                value={this.state.minutes}
                onChange={e => this.changeMinutes(e.target.value)}
              />
              <label htmlFor="icon_minutes">Minutes</label>
            </div>
          </div>
        </form>
      </div>

      <a class="waves-effect waves-light btn add-task" onClick={this.add}>
        <i class="material-icons left">add_circle</i>
        Add task
      </a>
      <br />
      <br />
    </div>
  );
}
