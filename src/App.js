import React, { Component } from "react";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import HomePage from "./screens/HomePage";
import VerificationPage from "./screens/VerificationPage";
import { Router, Route } from "react-router-dom";
import history from "./components/history";

class App extends Component {
  render = () => (
    <Router history={history}>
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/verify" component={VerificationPage} />
      </div>
    </Router>
  );
}

export default App;
