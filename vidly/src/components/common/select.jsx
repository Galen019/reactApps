import React from "react";

/**
 * Controlled component - drop down html input with a label
 *
 * @param {*} props - passed from parent (the controller), then destructured
 */
const Select = ({ name, label, options, error, ...rest }) => {
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

      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
