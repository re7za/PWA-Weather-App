import React from "react";
import ReactDom from "react-dom";

import "./App.css";

const Offline = () => {
  return (
    <div className="offline-container">
      <div>Oh you are so offline..</div>
    </div>
  );
};

ReactDom.render(<Offline />, document.getElementById("offline-root"));
