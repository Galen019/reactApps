import React from "react";

// Stateless functional component
const NavBar = props => {
  console.log("NavBar - Rendered");

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge badge-pill badge-secondar">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
