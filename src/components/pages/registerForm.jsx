import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { register } from "./../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    error: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  componentDidMount() {
    console.log("RegisterForm - Component Mounting");
  }

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.username = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    console.log("RegisterForm - Rendering");

    return (
      <div className="container mt-4">
        <h1> Register </h1>

        <div className="mt-4">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
