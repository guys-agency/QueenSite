class Api {
  constructor() {}

  regist(data) {
    fetch("http://127.0.0.1:3010/registration", {
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
    fetch("http://127.0.0.1:3010/login", {
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
}

const api = new Api();

export default api;
