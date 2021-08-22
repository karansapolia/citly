import React, { useState, useEffect } from "react";
import { setAuthHeaders } from "./apis/axios";
import { initializeLogger } from "./common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    logger.info("Never use console.log");
    // logger.error("Never use console.error");
  });

  return <div>App.jsx</div>;
};

export default App;
