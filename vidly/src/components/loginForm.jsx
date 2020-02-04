import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

/**
 * Form component used in /login
 */
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  /**
   * Validation schema used by Joi, requires username and password
   */
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server to log in
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

          {/* set input type to "password" for password input */}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
