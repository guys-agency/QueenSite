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
window.dataLayerYA = window.dataLayerYA || [];
window._tmr = window._tmr || [];
console.log("> ", process.env.REACT_APP_TYPE.charAt(0));
if (process.env.REACT_APP_TYPE === "prod") {
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
    ecommerce: "dataLayerYA",
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

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

if (getCookie("BFcheck2021") === "true" || getCookie("BFcheck2021") === true) localStorage.setItem("BF2021Check", true);
else if (localStorage.getItem("BF2021Check"))
  setCookie("BFclose", "true", { secure: true, "max-age": 3600000 * 24 * 30, domain: ".queenbohemia.ru" });
// } else if (localStorage.getItem("BF2021Check") !== null) {
//   localStorage.removeItem("BF2021Check");
// }

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
