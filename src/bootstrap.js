import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/use_cases/:uuid",
    element: <App />,
  },
]);

const mount = (el) => {
  const root = ReactDOM.createRoot(document.getElementById(el));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

/*if (process.env.NODE_ENV === "development") {
  mount("root");
}*/

export { mount };
