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
    }).then((res) => {
      return res.json();
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
      return res.json();
    });
  }

  getCertData(certificateCode) {
    return fetch(SERVER_URL + "/get-cert", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: certificateCode }),
    }).then((res) => {
      return res.json();
    });
  }

  coupon(data) {
    return fetch(SERVER_URL + "/pr", {
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

  changeData(data) {
    return fetch(SERVER_URL + "/change-data", {
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

  changePassword(data) {
    return fetch(SERVER_URL + "/change-password", {
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
      return res.json();
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
      return res.json();
    });
  }

  //типы cart, like, view
  updateCountStats(id, typeStats) {
    return fetch(SERVER_URL + "/update-stats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, typeStats }),
    }).then((res) => {
      return res.json();
    });
  }

  updateCart(cart) {
    return fetch(SERVER_URL + "/user-cart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart }),
    }).then((res) => {
      return res.json();
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

  cancelOrder(data) {
    return fetch(SERVER_URL + "/cancel-order", {
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

  getPVZ(data) {
    return fetch(SERVER_URL + "/pvz-data", {
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

  deliveryVar(data) {
    return fetch(SERVER_URL + "/del-var", {
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

  createDeliveryOrder(data) {
    return fetch(SERVER_URL + "/test", {
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

  addToSubscription(data) {
    return fetch(SERVER_URL + "/add-subscription", {
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

  getHits() {
    return fetch(SERVER_URL + "/hits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
  }
}

const api = new Api();

export default api;
