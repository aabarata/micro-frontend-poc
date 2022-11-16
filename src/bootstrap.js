import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

const mount = (el) => {
  console.log(el);
  const root = ReactDOM.createRoot(document.getElementById(el));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

/*if (process.env.NODE_ENV === "development") {
  mount("root");
}*/

export { mount };
