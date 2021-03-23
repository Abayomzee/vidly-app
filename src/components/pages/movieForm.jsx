import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "./../common/form";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    error: {},
    genre: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.string().label("Number in stock"),
    dailyRentalRate: Joi.number().required().label("Rate"),
  };

  async populateGenre() {
    const { data: genre } = await getGenres();
    this.setState({ genre });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    console.log("MovieForm - Component Mounting");
    await this.populateGenre();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status < 500)
        toast.error("Wt*f is happening");
    }

    this.props.history.replace("/movies");
    // console.log("New Movie Created");
  };

  render() {
    console.log("MovieForm - Rendering");
    return (
      <div className="container mt-4">
        <h1> Movies Form </h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genre)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
