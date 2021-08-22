import React from "react";
import NavBar from "components/NavBar";

import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="px-4 py-2 mx-auto sm:px-6 lg:px-8">
        <div className="mx-auto">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
