import React from "react";

const SearchBar = ({ onChange, value }) => {
  return (
    <div className="form-group">
      <input
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
        type="text"
        className="form-control"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
