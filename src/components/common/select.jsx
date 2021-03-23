import React from "react";

const Select = ({ name, label, options, value, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <select
        name={name}
        value={value}
        className="form-control"
        id={name}
        {...rest}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
