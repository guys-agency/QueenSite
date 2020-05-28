import { SERVER_URL } from "../constants";

class Api {
  constructor() {}

  regist(data) {
    return fetch(SERVER_URL + "/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log("dataReg :>> ", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  login(data) {
    return fetch(SERVER_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  logout() {
    return fetch(SERVER_URL + "/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getUserData() {
    return fetch(SERVER_URL + "/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getAnyProd(data) {
    return fetch(SERVER_URL + "/any-prod", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }
}

const api = new Api();

export default api;
