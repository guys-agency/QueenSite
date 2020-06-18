import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "swiper/css/swiper.css";
import "./test.scss";
import { MainScreen } from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./MobxStore";
import { BrowserRouter } from "react-router-dom";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <MainScreen store={store} />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
