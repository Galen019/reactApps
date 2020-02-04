import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";
import { saveMovie } from "./../services/fakeMovieService";

/**
 * Form component used in /login
 */
class MovieForm extends Form {
  state = {
    // The data represents a Movie object
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },

    // Genres gotten from server
    genres: [],

    // Errors from Joi
    errors: {}
  };

  /**
   * Validation schema used by Joi
   */
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("NumberInStock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    // Set genre choices from genreService
    const genres = getGenres();
    this.setState({ genres });

    // Get the movieId from the props.match object (which parses url parmeters into a JavaScript object)
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    /*
     * Get movie from moveService, if it doesn't exist, re-route to not-found page
     * Use replace, not push here, because push creates an infinite loop which disables the back button
     *
     * Having a return statement here prevents the rest of the code from executing
     * not having the return statement will still redirect the user, but unnecessary code will execute
     */
    const movie = getMovie(movieId);
    console.log(movie);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  /**
   * Deconstructs movie object and returns object with fields relevant to this component
   *
   * @param {object} movie - object returned from moveieService
   */
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  /**
   * Save the new movie
   * Redirect user to /movies
   */
  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    /*
     * Two Input components - username and password
     * Login button that's disabled based on validation
     */
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "NumberInStock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
