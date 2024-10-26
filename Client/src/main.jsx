import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import '@mantine/dropzone/styles.css';
import { Provider } from "react-redux";
import store from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <Provider store={store}>
    <MantineProvider>
      <App />
      <Notifications />
    </MantineProvider>
  </Provider>
  </>
);
