import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "./apis/axios";
import { initializeLogger } from "./common/logger";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  });

  return (
    <>
      <ToastContainer />
      <Dashboard />
    </>
  );
};

export default App;
