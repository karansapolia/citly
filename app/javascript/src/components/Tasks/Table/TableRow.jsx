import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ data }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td
            className="block w-64 px-6 py-4 text-sm font-medium
            leading-8 text-bb-purple capitalize truncate"
          >
            {rowData.title}
          </td>
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-bb-gray whitespace-no-wrap"
          >
            {rowData.user_id}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired
};

export default TableRow;
