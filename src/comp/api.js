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
        return res.json();
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  restorePass(data) {
    return fetch(SERVER_URL + "/restore-pass", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  updateLike(like) {
    return fetch(SERVER_URL + "/user-like", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: like }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
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

  setOrderData(data) {
    return fetch(SERVER_URL + "/create-order", {
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

  getAllCollections() {
    return fetch(SERVER_URL + "/collections", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  getCollection(banner) {
    return fetch(SERVER_URL + "/collection", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(banner),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  getActions() {
    return fetch(SERVER_URL + "/actions", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  search(value) {
    return fetch(SERVER_URL + "/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  getCity(city) {
    return fetch(SERVER_URL + "/city", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  timeDelivery(data) {
    return fetch(SERVER_URL + "/time-delivery", {
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

  getFinishData(id) {
    return fetch(SERVER_URL + "/finish/" + id, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(res.json());
    });
  }

  sendQestion(data) {
    return fetch(SERVER_URL + "/question", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
  }
}

const api = new Api();

export default api;
