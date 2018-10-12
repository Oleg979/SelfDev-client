import React, { Component } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import VerificationPage from "./components/VerificationPage";

class App extends Component {
  render = () => (
    <div>
      <LoginPage />
      <RegisterPage />
      <VerificationPage />
    </div>
  );
}

export default App;
