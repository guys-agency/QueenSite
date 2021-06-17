import React from "react";
import ReactDOM from "react-dom";
// import "semantic-ui-css/semantic.min.css";
import "swiper/css/swiper.min.css";
import "./test.scss";
import MainScreen from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./MobxStore";
import getCookie from "./ulits/getCookie";
import { BrowserRouter } from "react-router-dom";
import localStorage from "mobx-localstorage";
// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
if (process.env.REACT_APP_TYPE === "prod" && typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
}
window.dataLayer = window.dataLayer || [];
window._tmr = window._tmr || [];
console.log("> ", process.env.REACT_APP_TYPE.charAt(0));
if (process.env.REACT_APP_TYPE === "prod") {
  // console.log("123123 :>> ", 123123);
  //YANDEX
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
    trackHash: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
  });

  //MAIL.RU
  window._tmr.push({ id: "3202464", type: "pageView", start: new Date().getTime(), pid: "USER_ID" });
  (function (d, w, id) {
    if (d.getElementById(id)) return;
    var ts = d.createElement("script");
    ts.type = "text/javascript";
    ts.async = true;
    ts.id = id;
    ts.src = "https://top-fwz1.mail.ru/js/code.js";
    var f = function () {
      var s = d.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(ts, s);
    };
    if (w.opera == "[object Opera]") {
      d.addEventListener("DOMContentLoaded", f, false);
    } else {
      f();
    }
  })(document, window, "topmailru-code");
}

if (getCookie("BFcheck") === "true" || getCookie("BFcheck") === true) {
  localStorage.setItem("CMcheck", true);
} else if (localStorage.getItem("CMcheck") !== null) {
  localStorage.removeItem("CMcheck");
}

// var _tmr = window._tmr || (window._tmr = []);
//       _tmr.push({
//         type: "itemView",
//         productid: "VALUE",
//         pagetype: "VALUE",
//         list: "VALUE",
//         totalvalue: "VALUE",
//       });

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
