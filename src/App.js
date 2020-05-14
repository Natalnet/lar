import React from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import "./config/ReactotronConfig";

import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";
import history from "./services/history";

import { store, persistor } from "./store";

import "./styles/global.scss";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <ToastContainer autoClose={3500} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
