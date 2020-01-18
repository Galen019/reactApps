import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ match }) => {
  return (
    <ul>
      <li>
        <Link to="/admin/posts">Posts</Link>
      </li>
      <li>
        <Link to="/admin/users">Users</Link>
      </li>
    </ul>
  );
};

export default SideBar;
