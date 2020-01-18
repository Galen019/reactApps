import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  /**
   * Calls the content function of the column, if it exists
   */
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    // Get the property from item with the name in column,path - item."column.path"
    return _.get(item, column.path);
  };

  render() {
    // destructuring
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
