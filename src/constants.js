//https://api.queenbohemia.ru
//http://127.0.0.1:3010

const SERVER_URL =
  process.env.REACT_APP_TYPE === "prod"
    ? "https://api.queenbohemia.ru"
    : process.env.REACT_APP_TYPE === "superDev"
    ? "https://api-dev.queenbohemia.ru"
    : "http://127.0.0.1:3050";
// : "http://127.0.0.1:3010";

export { SERVER_URL };
