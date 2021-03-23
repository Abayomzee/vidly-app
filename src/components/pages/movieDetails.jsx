import React, { Component } from "react";

class MovieDetails extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };

  render() {
    const { match } = this.props;

    return (
      <div className="container mt-4">
        <h1> Movie from {match.params.id} </h1>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
