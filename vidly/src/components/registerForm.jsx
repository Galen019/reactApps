import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

/**
 * Form component used in /register
 */
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  /**
   * Validation schema used by Joi, requires username, password, and name
   */
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    // Call the server to register a user
    console.log("Submitted");
  };

  render() {
    /*
     * Two Input components - username and password
     * Login button that's disabled based on validation
     */
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}

          {/* set input type to "password" for password input, this obfuscates the text of the input */}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
