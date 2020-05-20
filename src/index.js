import React from "react";
import ReactDOM from "react-dom";
import "./test.scss";
import { MainScreen } from "./App";
import * as serviceWorker from "./serviceWorker";
import "./all.csv";
import store from "./MobxStore";
import { BrowserRouter } from "react-router-dom";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// let fileInputName = require("./all.csv");

// let json = csvToJson.fieldDelimiter("~").getJsonFromCsv("all.csv");
// console.log("json", json);

const api = new WooCommerceRestApi({
  url: "http://qsand.guys.agency",
  consumerKey: "ck_940e5ddb20e0679cb240a65585385eee26e776cb",
  consumerSecret: "cs_9d12aa9b415063636cb6b2a4de94bb1c0037254e",
  version: "wc/v3",
});

// api
//   .put("products?filter[q]=red")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// api
//   .post("products", {
//     name: "Premium Quality", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
//     type: "simple",
//     regular_price: "21.99",
//   })
//   .then((response) => {
//     // Successful request
//     console.log("Response Status:", response.status);
//     console.log("Response Headers:", response.headers);
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     console.log("Response Status:", error.response.status);
//     console.log("Response Headers:", error.response.headers);
//     console.log("Response Data:", error.response.data);
//   });

api
  .get("products?category=54")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });

// fetch("http://127.0.0.1:3010", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({}),
// })
//   .then((res) => {
//     console.log("res", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log("data", data);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });

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
