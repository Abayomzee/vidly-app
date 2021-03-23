import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import { login } from "./../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    error: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    console.log("LoginForm - Component Mounting");
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.username = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    console.log("LoginForm - Rendering");

    return (
      <div className="container mt-4">
        <h1> Login </h1>

        <div className="mt-4">
          <form action="" onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
