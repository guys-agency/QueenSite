import getCookie from "../ulits/getCookie";

class Api {
  constructor() {}

  regist(data) {
    return fetch("http://127.0.0.1:3010/registration", {
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
    return fetch("http://127.0.0.1:3010/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  logout() {
    return fetch("http://127.0.0.1:3010/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log("err", err);
    });
  }
}

const api = new Api();

export default api;
