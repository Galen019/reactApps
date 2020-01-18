import React, { Component } from "react";
import Like from "./common/like";
import { Link } from "react-router-dom";
import Table from "./common/table";

/**
 * Table displaying movies data
 */
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",

      // Functions can be passed around like objects, this is called from tableBody
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",

      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",

      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  /**
   * Pass in movies from props, pass to Table as the data propery
   */
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
