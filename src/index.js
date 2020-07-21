import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "swiper/css/swiper.css";
import "./test.scss";
import { MainScreen } from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./MobxStore";
import { BrowserRouter } from "react-router-dom";
// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
window.dataLayer = window.dataLayer || [];
console.log("process.env.REACT_APP_TYPE :>> ", process.env.REACT_APP_TYPE);
if (process.env.REACT_APP_TYPE === "prod") {
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  window.ym(65097901, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
  });
}

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
