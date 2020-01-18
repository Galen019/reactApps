import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

/**
 * Common form component, validates input data using Joi
 */
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  /**
   * Validates inputs using Joi
   */
  validate = () => {
    // Tell Joi to validate all fields, instaed of aborting early on the first error
    const options = {
      abortEarly: false
    };

    /*
     * Destructure the object returned from Joi.validate, only need error
     * Log the returned object if you want to what Joi actually returns
     */
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errorMessages = {};
    console.log(Joi.validate(this.state.data, this.schema, options));

    /*
     * Iterate over the details array in the error object, and fill the errorMessages object with the messages
     * path is a single element array containing the name of the input
     * Can use a map, or a for loop
     */
    error.details.map(item => (errorMessages[item.path[0]] = item.message));
    // for (let item of error.details) errorMessages[item.path[0]] = item.message;

    return errorMessages;
  };

  /**
   * Validates a property using Joi
   *
   * name - name of the property (username, or password)
   */
  validateProperty = ({ name, value }) => {
    /*
     * Create an object with the property dynamically set to the name parameter (this is called computed properties in ES6)
     * and the value being the value parameter
     */
    const obj = { [name]: value };

    /*
     * Create a schema with only one property, the one passed in as a parameter
     * The value is re-used from the schema field in this class
     */
    const schema = {
      [name]: this.schema[name]
    };

    /*
     * Destructure the Joi object, if error is defined, return the message from the details, null otherwise
     */
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  /**
   * Handler function for form submit
   *
   * @param {*} event - the event from form submit
   */
  handleSubmit = event => {
    // Prevent the default form submit behavior (reloading the page)
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // doSubmit is implemented by subclass
    this.doSubmit();
  };

  /**
   * Handler function for onChange on the Input component
   * Validates onChange
   */
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    // Display error if it exists for the given input
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };

    /*
     * Use bracket notation passing in the name property
     * of the object to handle multiple inputs from the
     * username and password inputs
     *
     * This is called computed property in es6
     */
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  /**
   * Render a button that calls validate
   * @param {string} label - text of button
   */
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  /**
   * Renders an Input component
   * @param {string} name
   * @param {string} label
   * @param {string} type - default value of "text"
   */
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
