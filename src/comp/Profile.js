import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import api from "./api";

import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
import moment from "moment";
import "moment/locale/ru";

const { Component } = React;

const Profile = observer(
  class Profile extends Component {
    state = { ready: false, fav: false };
    data = {};
    orders = [];
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
              this.data = data;
              this.props.store.userData = data;
              this.setState({ ready: true });
            })
            .catch((err) => {
              console.log("err :>> ", err);
            });
        } else {
          if (data !== undefined && this.orders.length === 0) {
            data.orders.forEach((order) => {
              const prodCon = [];
              Object.keys(order.products).forEach((prod) => {
                prodCon.push(
                  <div className="item">
                    <span className="name">{order.products[prod].name}</span>
                    <span className="price">
                      {order.products[prod].sale
                        ? order.products[prod].sale_price.toLocaleString()
                        : order.products[
                            prod
                          ].regular_price.toLocaleString()}{" "}
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
                    <div className="date">
                      {moment(order.date).format("DD.MM.YYYY")}
                    </div>
                  </div>
                  <div className="orders-item__desc">
                    <div className="status">
                      {orderStatus[order.status] !== undefined
                        ? orderStatus[order.status]
                        : order.status}
                    </div>
                    <button
                      className="link dotted"
                      onClick={(e) => {
                        e.target.classList.toggle("active");
                        e.target
                          .closest(".orders-item")
                          .classList.toggle("active");
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
        if (Object.keys(this.props.store.fullCats).length !== 0) {
          this.props.history.push("/#profile");
        }
      }
      return (
        Object.keys(data).length !== 0 && (
          <div className="profile-p">
            <ul className="small-nav">
              <div className="container container_f">
                <li>
                  <a
                    className={
                      "small-nav__btn " + (this.state.fav ? "" : " active")
                    }
                    href=""
                    onClick={(e) => {
                      this.setState({ fav: false });
                      e.preventDefault();
                    }}
                  >
                    <span className="ic i_user"></span>Профиль
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className={
                      "small-nav__btn " + (this.state.fav ? " active" : "")
                    }
                    onClick={(e) => {
                      const testContainer = [];
                      this.props.store.likeData.forEach((element) => {
                        testContainer.push(
                          <div className="col col-4 col-s-6" key={element.slug}>
                            <ProductCard
                              data={element}
                              store={this.props.store}
                            />
                          </div>
                        );
                      });
                      this.props.store.productsToRender = testContainer;
                      this.setState({ fav: true });
                      e.preventDefault();
                    }}
                  >
                    <span className="ic i_fav"></span>Избранное
                  </a>
                </li>
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
                  <div className="col col-7 col-s-12">
                    <h4>Последние заказы</h4>
                    <div className="orders">{this.orders}</div>
                  </div>
                  <div className="col col-1 hide-s">
                    <div className="profile-p__divider"></div>
                  </div>
                  <div className="col col-4 col-s-12">
                    <div className="profile-p__side">
                      <h4>Данные</h4>
                      <div className="profile-p__card">
                        <div className="user__name">{data.user.name}</div>
                        <div className="user__contact">
                          {data.user.tel !== undefined ? (
                            <div className="user__phone">{data.user.tel}</div>
                          ) : null}
                          <div className="user__mail">{data.user.email}</div>
                        </div>
                        <div className="user__edit">
                          <button
                            className="link dotted"
                            onClick={() => {
                              document
                                .querySelector(".sidebar-overlay")
                                .classList.add("active");

                              document
                                .querySelector("body")
                                .classList.add("no-scroll");

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
                                <img
                                  src={
                                    "/image/items/" +
                                    this.props.store.likeData[
                                      Object.keys(this.props.store.likeData)[0]
                                    ].path_to_photo[0]
                                  }
                                />
                              </div>
                            </div>
                            <div className="product__info">
                              <Link
                                to={
                                  "/product/" +
                                  this.props.store.likeData[
                                    Object.keys(this.props.store.likeData)[0]
                                  ].slug
                                }
                                className="product__name"
                              >
                                {
                                  this.props.store.likeData[
                                    Object.keys(this.props.store.likeData)[0]
                                  ].name
                                }
                              </Link>
                              {this.props.store.likeData[
                                Object.keys(this.props.store.likeData)[0]
                              ].sale ? (
                                <div
                                  className={
                                    "product__price product__price_disc"
                                  }
                                >
                                  <span className="old">
                                    {this.props.store.likeData[
                                      Object.keys(this.props.store.likeData)[0]
                                    ].regular_price.toLocaleString()}{" "}
                                    ₽
                                  </span>{" "}
                                  {this.props.store.likeData[
                                    Object.keys(this.props.store.likeData)[0]
                                  ].sale_price.toLocaleString()}{" "}
                                  ₽{" "}
                                  <span className="disc_perc">
                                    {(
                                      (this.props.store.likeData[
                                        Object.keys(
                                          this.props.store.likeData
                                        )[0]
                                      ].sale_price /
                                        this.props.store.likeData[
                                          Object.keys(
                                            this.props.store.likeData
                                          )[0]
                                        ].regular_price -
                                        1) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </span>
                                </div>
                              ) : (
                                <div className={"product__price"}>
                                  {this.props.store.likeData[
                                    Object.keys(this.props.store.likeData)[0]
                                  ].regular_price.toLocaleString()}{" "}
                                  ₽{" "}
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
