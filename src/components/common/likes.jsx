import React from "react";

const Likes = ({ onClick, movie }) => {
  return (
    <i
      onClick={() => onClick(movie)}
      className={movie.liked ? "fas fa-heart" : "far fa-heart"}
    ></i>
  );
};

export default Likes;
