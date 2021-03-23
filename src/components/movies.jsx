import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { pagination } from "../utils/pagination";
import Genres from "./common/genres";
import MoviesTable from "./moviesTable";
import SearchBar from "./common/searchBar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    console.log("Movies - Component Mounting");

    const { data: allGenres } = await getGenres();
    const { data: movies } = await getMovies();

    const genres = [{ name: "All movies" }, ...allGenres];
    this.setState({
      movies,
      genres,
    });
  }

  handleLikes = (movie) => {
    const movies = this.state.movies;
    const selectedMovie = movies.find((m) => m === movie);
    const index = movies.indexOf(selectedMovie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenres = (genre) => {
    const selectedGenre = genre;
    this.setState({ selectedGenre, searchQuery: "", currentPage: 1 });
  };

  handleAllMovies = () => {
    const currentGenre = [...this.state.movies];
    const currentGenreName = "all";
    this.setState({ currentGenre, currentGenreName });
  };

  handleDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== movieId);
    this.setState({ movies });

    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movies: originalMovies });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = pagination(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    console.log("Movies - Rendering");

    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { user } = this.props;

    const moviesCount = allMovies.length;
    if (moviesCount === 0)
      return (
        <div className="container py-5">
          <p className="pt-3"> There are no movies in the database </p>
        </div>
      );

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 mr-3">
            <Genres
              onItemsSelect={this.handleGenres}
              items={genres}
              selectedItems={selectedGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-3">
                New Movie
              </Link>
            )}
            <p className="">Showing {totalCount} movies in the database</p>
            <SearchBar onChange={this.handleSearch} value={searchQuery} />
            <MoviesTable
              movies={movies}
              handleLikes={this.handleLikes}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
