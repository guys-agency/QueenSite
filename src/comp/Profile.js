import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import api from "./api";
import localStorage from "mobx-localstorage";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
import moment from "moment";
import "moment/locale/ru";

const { Component } = React;

const Profile = observer(
  class Profile extends Component {
    state = { ready: false, fav: false, bonus: false };
    data = {};
    orders = [];
    bonus = [];
    render() {
      // const { ready } = this.state;
      const orderStatus = {
        cancel: "Отменен",
        paid: "Оплачен",
        Created: "Ожидает оплаты",
      };

      const orderStatusColor = {};

      const data = this.props.store.userData;
      if (this.props.store.auth) {
        if (Object.keys(data).length === 0) {
          api
            .getUserData()
            .then((data) => {
              // this.props.store.addToLike(true);
              if (data.status === 404) {
                localStorage.removeItem("auth");
              } else {
                this.data = data;
                this.props.store.userData = data;
                this.setState({ ready: true });
              }
            })
            .catch((err) => {
              console.log("err :>> ", err);
              localStorage.removeItem("auth");
              window.location.replace("/login");
            });
        } else {
          if (data !== undefined && this.orders.length === 0) {
            if (data.bonus.bonusUseWithOrder.length) {
              data.bonus.bonusUseWithOrder.forEach((el) => {
                el.use = true;
                data.bonus.bonusWithOrder.push(el);
              });
            }
            if (data.bonus.bonusWithOrder.length) {
              data.bonus.bonusWithOrder.sort((a, b) => {
                if (a.use && b.use === undefined) {
                  const d = moment(b.dateOfReceipt).add(14, "days").toISOString();
                  if (a.date > d) {
                    return -1;
                  }
                  if (a.date < d) {
                    return 1;
                  }
                  return 0;
                } else if (a.use === undefined && b.use) {
                  const d = moment(a.dateOfReceipt).add(14, "days").toISOString();
                  if (a.date < d) {
                    return -1;
                  }
                  if (a.date > d) {
                    return 1;
                  }
                  return 0;
                } else if (a.use && b.use) {
                  if (a.date > b.date) {
                    return -1;
                  }
                  if (a.date < b.date) {
                    return 1;
                  }
                  return 0;
                } else if (a.use === undefined && b.use === undefined) {
                  if (a.dateOfReceipt > b.dateOfReceipt) {
                    return -1;
                  }
                  if (a.dateOfReceipt < b.dateOfReceipt) {
                    return 1;
                  }
                  return 0;
                }
              });

              data.bonus.bonusWithOrder.forEach((ord) => {
                if (ord.use) {
                  this.bonus.push(
                    <div className="orders-item">
                      <div className="orders-item__head">
                        <h4>
                          Списание{" "}
                          <b className="red">
                            {ord.useBonusValue.toLocaleString()} <p className="i_coin red"></p>
                          </b>
                        </h4>

                        <div className="date">{moment(ord.date).format("DD.MM.YYYY")}</div>
                      </div>
                      <div className="orders-item__desc">
                        Заказ №{ord.dbid} на сумму {ord.sum.toLocaleString()}₽
                      </div>
                    </div>
                  );
                } else {
                  const prodCon = [];
                  Object.keys(ord.products).forEach((prod) => {
                    if (!ord.products[prod].sale) {
                      prodCon.push(
                        <div className="item">
                          <span className="name">{ord.products[prod].name}</span>
                          <span className="price">
                            {Math.round(ord.products[prod].regular_price * 0.1).toLocaleString()} <p className="i_coin" />
                          </span>
                        </div>
                      );
                    }
                  });
                  this.bonus.push(
                    <div className="orders-item">
                      <div className="orders-item__head">
                        <h4>
                          Зачисление{" "}
                          <b style={{ color: "#219653" }}>
                            {Math.round(ord.noSaleSum * 0.1).toLocaleString()} <p className="i_coin" style={{ color: "#219653" }}></p>
                          </b>
                        </h4>
                        <div className="date">{moment(ord.date).format("DD.MM.YYYY")}</div>
                      </div>
                      <div className="orders-item__desc">
                        Заказ №{ord.dbid} на сумму {ord.sum.toLocaleString()}₽
                        <button
                          className="link dotted"
                          onClick={(e) => {
                            e.target.classList.toggle("active");
                            e.target.closest(".orders-item").classList.toggle("active");
                          }}
                        >
                          состав заказа <span className="ic i_drop"></span>
                        </button>
                      </div>
                      <div className="orders-item__products">{prodCon}</div>
                    </div>
                  );
                }
              });
            }

            data.orders.forEach((order) => {
              const prodCon = [];
              Object.keys(order.products).forEach((prod) => {
                prodCon.push(
                  <div className="item">
                    <span className="name">{order.products[prod].name}</span>
                    <span className="price">
                      {order.products[prod].sale
                        ? order.products[prod].sale_price.toLocaleString()
                        : order.products[prod].regular_price.toLocaleString()}{" "}
                      ₽
                    </span>
                  </div>
                );
              });
              this.orders.push(
                <div className="orders-item">
                  <div className="orders-item__head">
                    <h4>
                      Заказ №{order.dbid} на сумму {order.sum.toLocaleString()}₽
                    </h4>
                    <div className="date">{moment(order.date).format("DD.MM.YYYY")}</div>
                  </div>
                  <div className="orders-item__desc">
                    <div className="status">{orderStatus[order.status] !== undefined ? orderStatus[order.status] : order.status}</div>
                    <button
                      className="link dotted"
                      onClick={(e) => {
                        e.target.classList.toggle("active");
                        e.target.closest(".orders-item").classList.toggle("active");
                      }}
                    >
                      состав заказа <span className="ic i_drop"></span>
                    </button>
                  </div>
                  <div className="orders-item__products">{prodCon}</div>
                </div>
              );
            });
          }
        }
      } else {
        // if (Object.keys(this.props.store.fullCats).length !== 0) {
        window.location.replace("/login");
        // }
      }

      const doubleBonusDate = moment("11.01.2021", "DD.MM.YYYY").isSameOrBefore(moment()) && moment("01.02.2021", "DD.MM.YYYY").isAfter(moment());

      return (
        Object.keys(data).length !== 0 && (
          <div className="profile-p">
            <ul className="small-nav">
              <div className="container container_f">
                <li>
                  <a
                    className={"small-nav__btn " + (!this.state.fav && !this.state.bonus ? " active" : "")}
                    href=""
                    onClick={(e) => {
                      this.setState({ fav: false, bonus: false });
                      e.preventDefault();
                    }}
                  >
                    <span className="ic i_user"></span>Профиль
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className={"small-nav__btn " + (this.state.fav ? " active" : "")}
                    onClick={(e) => {
                      const testContainer = [];
                      this.props.store.likeData.forEach((element) => {
                        testContainer.push(
                          <div className="col col-4 col-s-6" key={element.slug}>
                            <ProductCard data={element} store={this.props.store} />
                          </div>
                        );
                      });
                      this.props.store.productsToRender = testContainer;
                      this.setState({ fav: true, bonus: false });
                      e.preventDefault();
                    }}
                  >
                    <span className="ic i_fav"></span>Избранное
                  </a>
                </li>
                {data.bonus.bonusWithOrder.length !== 0 && (
                  <li>
                    <a
                      href=""
                      className={"small-nav__btn " + (this.state.bonus ? " active" : "")}
                      onClick={(e) => {
                        const testContainer = [];
                        this.props.store.likeData.forEach((element) => {
                          testContainer.push(
                            <div className="col col-4 col-s-6" key={element.slug}>
                              <ProductCard data={element} store={this.props.store} />
                            </div>
                          );
                        });
                        this.props.store.productsToRender = testContainer;
                        this.setState({ fav: false, bonus: true });
                        e.preventDefault();
                      }}
                    >
                      <span className="ic i_coin"></span>История бонусов
                    </a>
                  </li>
                )}
                <li>
                  <button
                    href=""
                    className="small-nav__btn"
                    onClick={(e) => {
                      e.preventDefault();
                      api
                        .logout()
                        .then((ok) => {
                          if (ok.ok) {
                            return ok.json();
                          }
                          return Promise.reject(ok);
                        })
                        .then((data) => {
                          this.props.store.auth = false;
                          localStorage.removeItem("auth");
                          this.props.history.push("/");
                        })
                        .catch((err) => {
                          console.log("err", err);
                        });
                    }}
                  >
                    Выход
                  </button>
                </li>
              </div>
            </ul>
            {this.state.fav ? (
              <div className="main-screen">
                <div className="container">
                  <div className="row"></div>
                  <div className="row catalog">
                    <ProductCardContainer
                      store={this.props.store}
                      // parentName={routProps.match.params.parentName}
                      // childName={routProps.match.params.childName}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  {this.state.bonus ? (
                    <div className="col col-7 col-s-12">
                      <h4>История бонусов:</h4>
                      <div className="orders">{this.bonus}</div>
                    </div>
                  ) : (
                    <div className="col col-7 col-s-12">
                      <h4>Последние заказы</h4>
                      <div className="orders">{this.orders}</div>
                    </div>
                  )}
                  <div className="col col-1 hide-s">
                    <div className="profile-p__divider"></div>
                  </div>
                  <div className="col col-4 col-s-12">
                    <div className="profile-p__side">
                      <div className="profile-p__bonus-total">
                        <div>
                          <p>Бонусные баллы</p>
                          <p>
                            {(doubleBonusDate
                              ? data.bonus.bonusSum - data.bonus.useBonusValue
                              : moment("01.02.2021", "DD.MM.YYYY").isSameOrBefore(moment())
                              ? data.bonus.bonusSumDouble < data.bonus.useBonusSumDouble
                                ? data.bonus.bonusSum - data.bonus.useBonusValue - (data.bonus.useBonusSumDouble - data.bonus.bonusSumDouble)
                                : data.bonus.bonusSum - data.bonus.useBonusValue
                              : data.bonus.bonusSum - data.bonus.useBonusValue
                            ).toLocaleString()}{" "}
                            <p className="i_coin"></p>
                          </p>{" "}
                        </div>
                        {doubleBonusDate && data.bonus.bonusSumDouble > data.bonus.useBonusSumDouble && (
                          <div>
                            <p style={{ color: "#BA250D" }}>Удвоение до 1.02</p>
                            <p style={{ color: "#BA250D" }}>
                              {Math.floor(data.bonus.bonusSumDouble - data.bonus.useBonusSumDouble).toLocaleString()}{" "}
                              <p className="i_coin" style={{ color: "#BA250D" }}></p>
                            </p>{" "}
                          </div>
                        )}
                        {doubleBonusDate && data.bonus.bonusSumDouble > data.bonus.useBonusSumDouble && (
                          <div>
                            <p>Итого</p>
                            <p>
                              {Math.floor(
                                doubleBonusDate
                                  ? data.bonus.bonusSum - data.bonus.useBonusValue + data.bonus.bonusSumDouble
                                  : moment("01.02.2021", "DD.MM.YYYY").isSameOrBefore(moment())
                                  ? data.bonus.bonusSumDouble < data.bonus.useBonusSumDouble
                                    ? data.bonus.bonusSum - data.bonus.useBonusValue - (data.bonus.useBonusSumDouble - data.bonus.bonusSumDouble)
                                    : data.bonus.bonusSum - data.bonus.useBonusValue
                                  : data.bonus.bonusSum - data.bonus.useBonusValue
                              ).toLocaleString()}{" "}
                              <p className="i_coin"></p>
                            </p>{" "}
                          </div>
                        )}
                        {data.bonus.bonusToBe ? (
                          <>
                            {doubleBonusDate && (
                              <div
                                style={{ width: "100%", height: "1px", borderBottom: "1px solid #DAB958", marginTop: "0px", marginBottom: "8px" }}
                              ></div>
                            )}
                            <div>
                              <p>К зачислению:</p>
                              <p>
                                {data.bonus.bonusToBe.toLocaleString()} <p className="i_coin"></p>
                              </p>{" "}
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className="profile-p__card">
                        <div className="user__name">{data.user.name}</div>
                        <div className="user__contact">
                          {data.user.tel !== undefined ? <div className="user__phone">{data.user.tel}</div> : null}
                          <div className="user__mail">{data.user.email}</div>
                        </div>
                        <div className="user__edit">
                          <button
                            className="link dotted"
                            onClick={() => {
                              document.querySelector(".sidebar-overlay").classList.add("active");

                              document.querySelector("body").classList.add("no-scroll");

                              this.props.store.changeSide = true;
                            }}
                          >
                            Редактировать
                          </button>
                        </div>
                      </div>
                      {Object.keys(this.props.store.likeData).length > 0 && (
                        <>
                          <h4>Избранное</h4>
                          <div className="product product_h">
                            <div className="product__image">
                              <div className="product__image-wrp">
                                <img src={"/image/items/" + this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].path_to_photo[0]} />
                              </div>
                            </div>
                            <div className="product__info">
                              <Link
                                to={"/product/" + this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].slug}
                                className="product__name"
                              >
                                {this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].name}
                              </Link>
                              {this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].sale ? (
                                <div className={"product__price product__price_disc"}>
                                  <span className="old">
                                    {this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].regular_price.toLocaleString()} ₽
                                  </span>{" "}
                                  {this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].sale_price.toLocaleString()} ₽{" "}
                                  <span className="disc_perc">
                                    {(
                                      (this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].sale_price /
                                        this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].regular_price -
                                        1) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </span>
                                </div>
                              ) : (
                                <div className={"product__price"}>
                                  {this.props.store.likeData[Object.keys(this.props.store.likeData)[0]].regular_price.toLocaleString()} ₽{" "}
                                </div>
                              )}
                              <button className="ic i_close"></button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      );
    }
  }
);

export default withRouter(Profile);
