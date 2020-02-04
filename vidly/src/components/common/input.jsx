import React from "react";

/**
 * Controlled component - input with a label
 *
 * @param {*} props - passed from parent (the controller), then destructured
 */
const Input = ({ name, label, error, ...rest }) => {
  /*
   * This spread operator is crazy - it just takes the props defined in the parent and sticks them all
   * into one object, ...rest includes all objects in the props, except for name,label,error which were
   * destructred from the props object
   *
   * ...rest replaces
   * type={type}
   * name={name}
   * onChange={onChange}
   */
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />

      {/* error div only displays if the error variable is truthy */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
