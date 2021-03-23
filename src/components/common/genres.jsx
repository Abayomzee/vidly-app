import React from "react";

const Genres = ({
  items,
  onItemsSelect,
  selectedItems,
  keyProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group">
      {items.map((genre) => (
        <li
          key={genre[keyProperty]}
          onClick={() => onItemsSelect(genre)}
          className={
            selectedItems === genre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[keyProperty]}
        </li>
      ))}
    </ul>
  );
};

Genres.defaultProps = {
  keyProperty: "name",
  valueProperty: "_id",
};

export default Genres;
