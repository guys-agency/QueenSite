import React, { useState, useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Router, Route, Switch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import api from "./comp/api";
import LoginSchema from "./schemas/loginSchema";

import MenuPoints from "./comp/MenuPoints";
import Filters from "./comp/Filters";
import ProductCardContainer from "./comp/ProductCardContainer";
import CartPage from "./comp/CartPage";
import CardView from "./comp/CardView";
import MainPage from "./comp/MainPage";

import Profile from "./comp/Profile";

import Collections from "./comp/Collections";
import Collection from "./comp/Collection";

import Actions from "./comp/Actions";
import Action from "./comp/Action";

import Shops from "./comp/Shops";
import ShopsMap from "./comp/ShopsMap";

import Help from "./comp/Help";

import Swiper from "react-id-swiper";

const { Component } = React;

const MainScreen = observer(
  class MainScreen extends Component {
    state = {
      cardRender: false,
    };

    cardContainer = [];

    // clickHandler = (data) => {
    //   // this.cardContainer = <CardView data={data} store={this.props.store} />;
    //   navigate(`/product/${data.slug}`, false, { data });
    //   this.props.store.productPage = true;
    //   this.props.store.cartPage = false;
    // };

    chooseMenuPoint = (nameMainCat, nameSecondCat, start, stop) => {
      const testContainer = [];
      // this.props.store.nameMainCat = nameMainCat;
      // this.props.store.nameSecondCat = nameSecondCat;
      // this.props.store.cleaningActiveFilters();
      // fetch("http://127.0.0.1:3010", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     start,
      //     stop,
      //     "categories.name": nameMainCat,
      //     "categories.childs": nameSecondCat,
      //   }),
      // })
      //   .then((res) => {
      //     console.log("res", res);
      //     return res.json();
      //   })
      //   .then((data) => {
      //     console.log("data", data);
      //     console.log("object", Object.keys(data));
      //     Object.keys(data).forEach((element) => {
      //       testContainer.push(
      //         <ProductCard key={data[element].slug} data={data[element]} />
      //       );
      //     });
      //     this.props.store.productsToRender = testContainer;
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //   });

      // fetch("http://134.122.81.119/sort-names", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     "categories.name": nameMainCat,
      //     "categories.childs": nameSecondCat,
      //   }),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     const sortData = {};

      //     Object.keys(data).forEach((name) => {
      //       if (name !== "_id") sortData[name] = data[name].sort();
      //     });

      //     this.props.store.categoryFilter = sortData;
      //     this.props.store.createFilterPointsContainers(sortData);
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //   });
    };

    render() {
      return (
        <>
          <MenuPoints
            store={this.props.store}
            chooseMenuPoint={this.chooseMenuPoint}
          />

          <Switch>
            <Route
              path="/"
              exact
              render={(routProps) => <MainPage store={this.props.store} />}
            />
            <Route
              path={["/catalog/:parentName/:childName", "/catalog"]}
              render={(routProps) => (
                (this.props.store.nameMainCat =
                  routProps.match.params.parentName),
                (this.props.store.nameSecondCat =
                  routProps.match.params.childName),
                this.props.store.cleaningActiveFilters(),
                this.props.store.filtration(),
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row catalog">
                        <div className="col col-3">
                          <Filters
                            store={this.props.store}
                            parentName={routProps.match.params.parentName}
                            childName={routProps.match.params.childName}
                          />
                        </div>
                        <ProductCardContainer
                          store={this.props.store}
                          parentName={routProps.match.params.parentName}
                          childName={routProps.match.params.childName}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            />
            <Route
              path="/cart"
              render={() => (
                <div
                  className="main-screen"
                  onClick={(e) => {
                    e.stopPropagation();

                    var container = document.querySelector(".city__drop");
                    if (!container.contains(e.target)) {
                      document
                        .querySelector(".city__btn")
                        .classList.remove("active");
                      document
                        .querySelector(".city__drop")
                        .classList.remove("active");
                    }
                  }}
                >
                  <CartPage store={this.props.store} />
                </div>
              )}
            />
            <Route
              path="/product/:id"
              render={(propsRout) => (
                <div className="main-screen">
                  <CardView
                    store={this.props.store}
                    data={this.props.store.cardContainer}
                    sku={propsRout.match.params.id}
                  />
                </div>
              )}
            />

            <Route
              path="/profile"
              render={() => (
                <div className="main-screen">
                  <Profile store={this.props.store} />
                </div>
              )}
            />

            <Route
              path="/collections"
              render={() => (
                <div className="main-screen">
                  <Collections />
                </div>
              )}
            />

            <Route
              path="/collection"
              render={() => (
                <div className="main-screen">
                  <Collection />
                </div>
              )}
            />

            <Route
              path="/actions"
              render={() => (
                <div className="main-screen">
                  <Actions />
                </div>
              )}
            />

            <Route
              path="/action"
              render={() => (
                <div className="main-screen">
                  <Action />
                </div>
              )}
            />

            <Route
              path="/shops"
              render={() => (
                <div className="main-screen">
                  <Shops />
                </div>
              )}
            />

            <Route
              path="/shops-map"
              render={() => (
                <div className="main-screen">
                  <ShopsMap />
                </div>
              )}
            />

            <Route
              path="/help"
              render={() => (
                <div className="main-screen">
                  <Help />
                </div>
              )}
            />
          </Switch>
          {/* {(this.props.store.productPage && this.props.store.cardContainer) ||
              (!this.props.store.productPage && !this.props.store.cartPage && (
                <>
                  <Filters store={this.props.store} />
                  <ProductCardContainer
                    store={this.props.store}
                    ch={this.clickHandler}
                  />
                </>
              )) ||
              (this.props.store.cartPage && (
                <CartPage store={this.props.store} />
              ))} */}

          <div className="footer">
            <div className="container">
              <div className="footer__row">
                <div className="footer__column">
                  <h4 className="white">Наши новости</h4>
                  <div className="social">
                    <a className="ic i_fb" href=""></a>
                    <a className="ic i_inst" href=""></a>
                  </div>
                  <a href="/" className="logo logo_sq">
                    <span className="i_queen"></span>
                    <span className="i_of"></span>
                    <span className="i_line-h"></span>
                    <span className="i_bohemia"></span>
                    <span className="i_qr"></span>
                  </a>
                </div>
                <div className="footer__column">
                  <h4 className="white">Категории</h4>
                  <div className="footer__links-column">
                    <ul className="footer__links">
                      <li>
                        <a href="">Каталог</a>
                      </li>
                      <li>
                        <a href="">Коллекции</a>
                      </li>
                      <li>
                        <a href="">Интерьр</a>
                      </li>
                      <li>
                        <a href="">Подарки</a>
                      </li>
                    </ul>
                    <ul className="footer__links">
                      <li>
                        <a href="">Premium</a>
                      </li>
                      <li>
                        <a href="">Милениум</a>
                      </li>
                      <li>
                        <a href="">Акции</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer__column">
                  <h4 className="white">Сервис</h4>
                  <div className="footer__links-column">
                    <ul className="footer__links">
                      <li>
                        <a href="">О нас</a>
                      </li>
                      <li>
                        <a href="">Доставка</a>
                      </li>
                      <li>
                        <a href="">Оплата</a>
                      </li>
                    </ul>
                    <ul className="footer__links">
                      <li>
                        <a href="">Возврат</a>
                      </li>
                      <li>
                        <a href="">Бонусы</a>
                      </li>
                      <li>
                        <a href="">Публичная оферта</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="footer__column">
                  <h4 className="white">+7 495 744-00-50</h4>
                  <button className="link dotted ask">Задать вопрос</button>
                  <div>
                    <a className="underline" href="mailto:info@queenbohemia.ru">
                      info@queenbohemia.ru
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer__row">
                <div className="footer__column">
                  <p>queenbohemia.ru © 1993 – 2020. Все права защищены</p>
                </div>
                <div className="footer__column">
                  <p>
                    105082, г. Москва, Переведёновский переулок, д. 13, стр. 18
                  </p>
                </div>
                <div
                  onLoad={() => {
                    console.log("test");
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
);

class LoginAuth extends Component {
  state = {};
  render() {
    return <div className="log-auth"></div>;
  }
}

export { MainScreen };
