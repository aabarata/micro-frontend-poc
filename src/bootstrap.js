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

const router = ({eventType, baseData}) => createBrowserRouter([
  {
    path: "*",
    element: <App eventType={eventType} baseData={baseData} />,
  },
]);

let root;

const mount = (el, {eventType, baseData }) => {
  setTimeout(() => {
    root = ReactDOM.createRoot(document.getElementById(el));
    root.render(
      <React.StrictMode>
        <RouterProvider router={router({eventType, baseData})} />
      </React.StrictMode>
    );
  }, 0);
};

const unmount = () => {
  root.unmount();
};

/*if (process.env.NODE_ENV === "development") {
  mount("root");
}*/

export { mount, unmount };
