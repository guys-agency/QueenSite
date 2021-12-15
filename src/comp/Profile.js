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

    bonusLevelsData = {
      1: {
        toNext: 10000,
        lines: [<p>Доступ в закрытый раздел</p>, <p>Предложения на e-mail</p>],
      },
      2: {
        toNext: 30000,
        lines: [<p>Доступ в закрытый раздел</p>, <p>Предложения на e-mail</p>],
      },
      3: {
        toNext: 50000,
        lines: [
          <p>Доступ в закрытый раздел</p>,
          <p>
            <b>Персональные</b> предложения
          </p>,
        ],
      },
      4: {
        toNext: 80000,
        lines: [
          <p>Доступ в закрытый раздел</p>,
          <p>
            <b>Персональные</b> предложения
          </p>,
        ],
      },
      5: {
        toNext: 100000,
        lines: [
          <p>Доступ в закрытый раздел</p>,
          <p>
            <b>Продвинутые</b> персональные предложения
          </p>,
        ],
      },
      6: {
        lines: [
          <p>Доступ в закрытый раздел</p>,
          <p>
            <b>Продвинутые</b> персональные предложения
          </p>,
          <p>Рассылка товаров, которые скоро поступят в продажу</p>,
        ],
      },
    };

    bonusBalance = 0;
    bonusDoubleBalance = 0;
    bonusToBeBalance = 0;
    bonusDouble = {};
    orderCloseSum = 0;

    render() {
      // const { ready } = this.state;
      const orderStatus = {
        cancel: "Отменен",
        paid: "Оплачен",
        Created: "Ожидает оплаты",
      };

      const orderStatusColor = {};
      // let bonusBalance = 0;
      // let bonusDoubleBalance = 0;
      // let bonusDouble = {};

      const data = this.props.store.userData;
      if (this.props.store.auth) {
        if (Object.keys(data).length === 0) {
          api
            .getUserData()
            .then((data) => {
              // console.log("data :>> ", data);
              // this.props.store.addToLike(true);

              if (data.status === 404 || data.status === 401) {
                localStorage.removeItem("auth");
              } else {
                this.data = data;
                this.props.store.userData = data;
                this.setState({ ready: true });
              }
            })
            .catch((err) => {
              console.log("err :>> ", err);

              // api
              //   .logout()
              //   .then(() => {})
              //   .catch((err) => {
              //     console.log("err :>> ", err);
              //   });
              // localStorage.removeItem("auth");
              // this.auth = false;
              window.location.replace("/login");
            });
        } else {
          if (data !== undefined && this.orders.length === 0) {
            // if (data.bonus.bonusUseWithOrder.length) {
            //   data.bonus.bonusUseWithOrder.forEach((el) => {
            //     el.use = true;
            //     data.bonus.bonusWithOrder.push(el);
            //   });
            // }
            const bonusHistory = [...data.user.bonusHistory];
            if (data.user.bonusHistory.length) {
              bonusHistory.sort((a, b) => {
                if (a.date > b.date) {
                  return -1;
                }
                if (a.date < b.date) {
                  return 1;
                }
                return 0;
              });
              this.bonus = [];
              this.bonusBalance = 0;
              this.bonusDoubleBalance = 0;
              this.bonusDouble = {};
              bonusHistory.forEach((bon) => {
                if (bon.activeGift) {
                  this.bonusDouble = { ...bon };
                  this.bonusDoubleBalance = bon.value;
                }
              });

              bonusHistory.forEach((bon) => {
                if (bon.head) {
                  if (!bon.activeGift) {
                    if (bon.plus) {
                      this.bonusBalance += bon.value;
                    } else {
                      this.bonusBalance -= bon.value;
                    }
                  }
                  this.bonus.push(
                    <div className="orders-item">
                      <div className="orders-item__head">
                        <h4>
                          {bon.head}
                          {bon.plus ? (
                            <b style={{ color: "#219653" }}>
                              {bon.value.toLocaleString()} <p className="i_coin" style={{ color: "#219653" }}></p>
                            </b>
                          ) : (
                            <b className="red">
                              {bon.value.toLocaleString()} <p className="i_coin red"></p>
                            </b>
                          )}
                        </h4>
                        <div className="date">{moment(bon.date).format("DD.MM.YYYY")}</div>
                      </div>
                      <div className="orders-item__desc">{bon.desc}</div>
                    </div>
                  );
                } else {
                  if (bon.plus) {
                    this.bonusBalance += bon.value;
                    const prodCon = [];
                    Object.keys(bon.order.products).forEach((prod) => {
                      if (bon.old) {
                        if (!bon.order.products[prod].sale) {
                          prodCon.push(
                            <div className="item">
                              <span className="name">{bon.order.products[prod].name}</span>
                              <span className="price">
                                {Math.round(bon.order.products[prod].regular_price * 0.1).toLocaleString()} <p className="i_coin" />
                              </span>
                            </div>
                          );
                        }
                      } else {
                        prodCon.push(
                          <div className="item">
                            <span className="name">{bon.order.products[prod].name}</span>
                            <span className="price">
                              {Math.round(
                                bon.order.products[prod].sale
                                  ? bon.order.products[prod].sale_price
                                  : bon.order.products[prod].regular_price * bon.percent
                              ).toLocaleString()}{" "}
                              <p className="i_coin" />
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
                              {bon.value.toLocaleString()} <p className="i_coin" style={{ color: "#219653" }}></p>
                            </b>
                          </h4>
                          <div className="date">{moment(bon.date).format("DD.MM.YYYY")}</div>
                        </div>
                        <div className="orders-item__desc">
                          Заказ №{bon.orderDBid} на сумму {bon.order.sum.toLocaleString()}₽
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
                  } else {
                    if (this.bonusDoubleBalance && this.bonusDouble.date < bon.date) {
                      this.bonusDoubleBalance -= bon.value;
                    } else {
                      this.bonusBalance -= bon.value;
                    }

                    this.bonus.push(
                      <div className="orders-item">
                        <div className="orders-item__head">
                          <h4>
                            Списание{" "}
                            <b className="red">
                              {bon.value.toLocaleString()} <p className="i_coin red"></p>
                            </b>
                          </h4>

                          <div className="date">{moment(bon.date).format("DD.MM.YYYY")}</div>
                        </div>
                        <div className="orders-item__desc">
                          Заказ №{bon.orderDBid} на сумму {bon.order.sum.toLocaleString()}₽
                        </div>
                      </div>
                    );
                  }
                }
              });
            }

            if (data.user.bonusToBe.length) {
              this.bonusToBeBalance = 0;
              data.user.bonusToBe.forEach((bonTo) => {
                this.bonusToBeBalance += bonTo.value;
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
          if (this.bonusDoubleBalance < 0) {
            this.bonusBalance += this.bonusDoubleBalance;
            this.bonusDoubleBalance = 0;
          }

          if (data.user.orderCloseSum) {
            this.orderCloseSum = data.user.orderCloseSum;
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
                {data.user.bonusHistory.length !== 0 && (
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
                      <div className="profile-p__bonus-info">
                        <div className="profile-p__bonus-level">
                          <div className="profile-p__bonus-level-head">
                            <h5>{data.user.numLoyal} уровень</h5>
                            {data.user.numLoyal < 6 && (
                              <>
                                <div className="profile-p__bonus-level-line">
                                  <div style={{ width: `${(this.orderCloseSum / this.bonusLevelsData[data.user.numLoyal].toNext) * 100}%` }}></div>
                                </div>
                                <div className="profile-p__bonus-level-link">
                                  <p>До перехода: {(this.bonusLevelsData[data.user.numLoyal].toNext - this.orderCloseSum).toLocaleString()} ₽</p>
                                  <Link className="link" to="/help/bonus">
                                    Подробнее
                                  </Link>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="profile-p__bonus-level-desc">
                            <p>
                              Начисление за покупку: <b>{data.user.percentLoyal * 100}%</b>
                            </p>
                            {this.bonusLevelsData[data.user.numLoyal].lines}
                          </div>
                        </div>
                        <div className="profile-p__bonus-total">
                          <div>
                            <p>Бонусные баллы</p>
                            <p>
                              {this.bonusBalance.toLocaleString()} <p className="i_coin"></p>
                            </p>{" "}
                          </div>
                          {Object.keys(this.bonusDouble).length !== 0 && (
                            <div>
                              <p style={{ color: "#BA250D" }}>Подарочные бонусы до {this.bonusDouble.dateDouble}</p>
                              <p style={{ color: "#BA250D" }}>
                                {this.bonusDoubleBalance.toLocaleString()} <p className="i_coin" style={{ color: "#BA250D" }}></p>
                              </p>{" "}
                            </div>
                          )}
                          {Object.keys(this.bonusDouble).length !== 0 && (
                            <div>
                              <p>Итого</p>
                              <p>
                                {(this.bonusDoubleBalance + this.bonusBalance).toLocaleString()} <p className="i_coin"></p>
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
                                  {this.bonusToBeBalance.toLocaleString()} <p className="i_coin"></p>
                                </p>{" "}
                              </div>
                            </>
                          ) : null}
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
                              <button
                                className="ic i_close"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const { likeContainer, addToLike } = this.props.store;
                                  likeContainer.splice(0, 1);
                                  addToLike();
                                }}
                              ></button>
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
