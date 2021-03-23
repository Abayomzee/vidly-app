import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Likes from "./common/likes";
import auth from "../services/authService";

class MoviesTable extends Component {
  user = auth.getCurrentUser();
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        this.user ? (
          <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
        ) : (
          movie.title
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "likes",
      content: (movie) => (
        <Likes onClick={this.props.handleLikes} id={movie._id} movie={movie} />
      ),
    },
    {
      key: "delete",
      content: (movie) => {
        if (this.user && this.user.isAdmin)
          return (
            <button
              onClick={() => this.props.onDelete(movie._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          );
      },
    },
  ];

  componentDidMount() {
    console.log("MoviesTable- Component Mounting");
  }

  render() {
    console.log("MoviesTable - Rendering");

    const { movies, handleLikes, onDelete, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
        deleteRow={onDelete}
        likeRow={handleLikes}
      />
    );
  }
}

export default MoviesTable;
