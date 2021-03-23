import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const option = { abortEarly: false };
    const { error: errors } = Joi.validate(
      this.state.data,
      this.schema,
      option
    );

    if (!errors) return null;

    const error = {};
    for (let err of errors.details) {
      error[err.path] = err.message;
    }

    return Object.keys(error).length === 0 ? null : error;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty(input);
    const error = { [input.name]: errorMessage };
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, error: error || {} });
  };

  renderInput = (name, label, type = "text") => {
    const { data, error } = this.state;

    return (
      <Input
        value={data[name]}
        name={name}
        label={label}
        type={type}
        error={error[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, error } = this.state;

    return (
      <Select
        value={data[name]}
        name={name}
        label={label}
        error={error[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  };

  handleSave = (redirectTo) => {
    if (redirectTo) {
      this.props.history.replace(`/${redirectTo}`);
      // return;
    }
    // return null;
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
