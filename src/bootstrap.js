import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

axios.defaults.baseURL = "http://localhost:3035/api";
axios.defaults.withCredentials = true;
if (localStorage.getItem("development_bosCurrentJWT")) {
  axios.defaults.headers.common.Authorization = localStorage.getItem(
    "development_bosCurrentJWT"
  );
} else {
  console.error("You need to set a token to use the flow builder");
}

const router = createBrowserRouter([
  /*{
    path: "/use_cases/:uuid",
    element: <App />,
  },*/
  {
    path: "*",
    element: <App />,
  },
]);

let root;

const mount = (el) => {
  root = ReactDOM.createRoot(document.getElementById(el));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const unmount = (el) => {
  root.unmount();
};

/*if (process.env.NODE_ENV === "development") {
  mount("root");
}*/

export { mount, unmount };
