//https://api.queenbohemia.ru
//http://127.0.0.1:3010

const SERVER_URL =
  process.env.REACT_APP_TYPE === "dev"
    ? "http://127.0.0.1:3050"
    : process.env.REACT_APP_TYPE === "superDev"
    ? "https://api-dev.queenbohemia.ru"
    : "https://api.queenbohemia.ru";
// : "http://127.0.0.1:3010"; https://api.queenbohemia.ru

export { SERVER_URL };
