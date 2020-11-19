import React, { Suspense } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Router, Route, Switch, Redirect } from "react-router";

import api from "./comp/api";

import { SERVER_URL } from "./constants";

import MenuPoints from "./comp/MenuPoints";
import Filters from "./comp/Filters";
import ProductCardContainer from "./comp/ProductCardContainer";
import Search from "./comp/Search";

import CardView from "./comp/CardView";
import MainPage from "./comp/MainPage";

import Collections from "./comp/Collections";
import Collection from "./comp/Collection";

import GiftsPage from "./comp/GiftsPage";

import Actions from "./comp/Actions";

import Footer from "./comp/Footer";
import Shops from "./comp/Shops";
import ShopsMap from "./comp/ShopsMap";
import StartLoader from "./comp/Loader";
import PageNotFound from "./comp/404";
import BlackFriday from "./comp/BlackFriday";
import { Link } from "react-router-dom";

import Breadcrumbs from "./comp/breadcrumbs";
import localStorage from "mobx-localstorage";
import $ from "jquery";
import { withRouter } from "react-router";
import getCookie from "./ulits/getCookie";
const CartPage = React.lazy(() => import("./comp/CartPage"));
const Finish = React.lazy(() => import("./comp/Finish"));
const Profile = React.lazy(() => import("./comp/Profile"));

const Help = React.lazy(() => import("./comp/Help"));
const About = React.lazy(() => import("./comp/About"));

// const CartPage = lazy(() => import("./comp/CartPage"));
// const CardView = lazy(() => import("./comp/CardView"));
// const Profile = lazy(() => import("./comp/Profile"));
// const Collections = lazy(() => import("./comp/Collections"));
// const Actions = lazy(() => import("./comp/Actions"));
// const Shops = lazy(() => import("./comp/Shops"));
// const ShopsMap = lazy(() => import("./comp/ShopsMap"));
// const Help = lazy(() => import("./comp/Help"));
// const About = lazy(() => import("./comp/About"));

const { Component } = React;

const MainScreen = observer(
  class MainScreen extends Component {
    state = {
      cardRender: false,
      loginDev:
        localStorage.get("dev-login") === undefined ||
        localStorage.get("dev-login") === null
          ? false
          : localStorage.get("dev-login"),
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
    addToLastSeenProd = (slug, k) => {
      const { lastSeenProds } = this.props.store;

      fetch(SERVER_URL + "/product/" + slug + "#" + k, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // console.log("res", res);
          return res.json();
        })
        .then((data) => {
          if (+slug !== this.props.store.cardContainer.slug) {
            this.props.store.cardContainer = data.product[0];
          }
          this.props.store.withProds = data.addProd[0].with;
          this.props.store.likeProds.replace(data.addProd[0].like);

          api.updateCountStats(data.product[0]._id, "view");

          let timeLastSeenProds = lastSeenProds.slice();
          // console.log("object :>> ", this.props.store.lastSeenProds.values());

          if (!lastSeenProds.includes(slug)) {
            timeLastSeenProds.unshift(slug);
            // this.props.store.lastSeenProds = timeLastSeenProds;
          } else {
            const posSlug = lastSeenProds.indexOf(slug);

            timeLastSeenProds.splice(posSlug, 1);
            timeLastSeenProds.unshift(slug);
            // this.props.store.lastSeenProds = timeLastSeenProds;
          }

          if (timeLastSeenProds.length > 16) {
            timeLastSeenProds = timeLastSeenProds.slice(0, 16);
            // console.log("object :>> ", timeLastSeenProds.length);
            // console.log("object :>> ", timeLastSeenProds.slice());
            this.props.store.lastSeenProds = timeLastSeenProds.slice();
          } else {
            this.props.store.lastSeenProds = timeLastSeenProds.slice();
            // console.log("object :>> ", timeLastSeenProds.slice());
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.props.history.replace("/");
        });

      this.props.store.countInProdPage = 1;
    };

    chekFinishDelete = () => {
      if (localStorage.get("deleteCart") === true) {
        this.props.store.productInCartList = {};
        this.props.store.addtoCart(false);
        if (process.env.REACT_APP_TYPE === "prod") {
          window.ym(65097901, "reachGoal", "Checkout");
        }
        localStorage.removeItem("deleteCart");
        if (localStorage.get("sendDeliveryPickUp") === true) {
          function t(w) {
            function start() {
              w.removeEventListener("YaDeliveryLoad", start);
              w.YaDelivery.createWidget({
                containerId: "yaDeliveryWidget",
                type: "deliveryCart",
                params: {
                  // Нужно указать те же значения, что и при первом создании
                  apiKey: process.env.REACT_APP_SECRET_CODE_YA_WID, // Авторизационный ключ
                  senderId: 500001936,
                },
              })
                .then((widget) => widget.createOrder())
                .catch(failureCallback);

              function failureCallback(error) {
                // Эта функция будет вызвана, если при создании виджета произошли ошибки.
              }
            }
            w.YaDelivery
              ? start()
              : w.addEventListener("YaDeliveryLoad", start);
          }
          t(window);
          localStorage.removeItem("sendDeliveryPickUp");
        }
      }
    };
    itsSuperDev = process.env.REACT_APP_TYPE === "superDev";
    itsDev = process.env.REACT_APP_TYPE === "dev";

    checkSuperDevLogin = (e) => {
      e.preventDefault();
      console.log("test :>> ");
      console.log("object :>> ", $("#login-dev").val());
      console.log('$("#password-dev").val() :>> ', $("#password-dev").val());
      if ($("#login-dev").val() === process.env.REACT_APP_SUPER_DEV_LOGIN) {
        if (
          $("#password-dev").val() === process.env.REACT_APP_SUPER_DEV_PASSWORD
        ) {
          localStorage.set("dev-login", true);
          this.setState({ loginDev: true });
        } else {
          localStorage.set("dev-login", false);
        }
      } else {
        localStorage.set("dev-login", false);
      }
    };

    render() {
      console.log("bfcheck :>> ", getCookie("BFclose"));
      return (
        <>
          {!this.itsDev && <StartLoader store={this.props.store} />}
          <MenuPoints
            store={this.props.store}
            chooseMenuPoint={this.chooseMenuPoint}
          />
          <div
            id="yaDeliveryWidget"
            style={{ width: "0px", height: "0px" }}
          ></div>

          <Switch>
            {this.itsSuperDev && !this.state.loginDev && (
              <Route
                path="/"
                onEnter={this.checkSuperDevLogin}
                render={(routProps) => (
                  console.log("object"),
                  (
                    <div className="dev-login__form">
                      <form>
                        <label for="login-dev">Логин</label>
                        <input id="login-dev"></input>
                        <label for="password-dev">Пароль</label>
                        <input id="password-dev"></input>
                        <button
                          onClick={(e) => {
                            this.checkSuperDevLogin(e);
                          }}
                        >
                          Вход
                        </button>
                      </form>
                    </div>
                  )
                )}
              />
            )}
            <Route
              path="/"
              exact
              render={(routProps) => (
                this.props.store.cleaningActiveFilters(),
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Queen of Bohemia"),
                (<MainPage store={this.props.store} />)
              )}
            />
            <Route
              path="/gift/:id"
              exact
              render={(routProps) => (
                this.props.store.cleaningActiveFilters(),
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Queen of Bohemia"),
                (
                  <MainPage
                    store={this.props.store}
                    gift={routProps.match.params.id}
                  />
                )
              )}
            />
            <Route
              path={[
                "/catalog/:parentName/:childName",
                "/catalog/:parentName",
                "/catalog",
              ]}
              render={(routProps) => (
                this.props.store.nameMainCat !==
                  routProps.match.params.parentName ||
                this.props.store.nameSecondCat !==
                  routProps.match.params.childName
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                this.props.store.nameMainCat !==
                  routProps.match.params.parentName ||
                this.props.store.nameSecondCat !==
                  routProps.match.params.childName
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                (this.props.store.nameMainCat =
                  routProps.match.params.parentName),
                (this.props.store.nameSecondCat =
                  routProps.match.params.childName),
                this.props.store.filtration(),
                (this.props.store.activeCats = this.props.store.fullCats),
                this.props.store.menuAccor[
                  routProps.match.params.parentName
                ] !== undefined
                  ? routProps.match.params.childName
                    ? (document.title =
                        this.props.store.menuAccor[
                          routProps.match.params.childName
                        ] + " - Queen of Bohemia")
                    : (document.title =
                        this.props.store.menuAccor[
                          routProps.match.params.parentName
                        ] + " - Queen of Bohemia")
                  : (document.title = "Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row">
                        <div className="col col-12">
                          <Breadcrumbs
                            name={routProps.match.params.parentName}
                            child={routProps.match.params.childName}
                            store={this.props.store}
                          />
                          <h3 className="catalog-title">
                            {routProps.match.params.childName
                              ? this.props.store.menuAccor[
                                  routProps.match.params.childName
                                ]
                              : this.props.store.menuAccor[
                                  routProps.match.params.parentName
                                ]}
                          </h3>
                        </div>
                      </div>
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
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Корзина - Queen of Bohemia"),
                (
                  <div
                    className="main-screen"
                    // onClick={(e) => {
                    //   e.stopPropagation();

                    //   var container = document.querySelector(".city__drop");
                    //   if (!container.contains(e.target)) {
                    //     document
                    //       .querySelector(".city__btn")
                    //       .classList.remove("active");
                    //     document
                    //       .querySelector(".city__drop")
                    //       .classList.remove("active");
                    //   }
                    // }}
                  >
                    <Suspense fallback={<div></div>}>
                      <CartPage store={this.props.store} />
                    </Suspense>
                  </div>
                )
              )}
            />
            <Route
              path="/black-friday"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                $("#root").addClass("black-friday"),
                (document.title = "Черная пятница - Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <BlackFriday store={this.props.store} />
                  </div>
                )
              )}
            />

            {getCookie("BFcheck") !== undefined && (
              <Route
                path="/close-sale"
                render={(propsRout) => (
                  (this.props.store.nameMainCat = ""),
                  (this.props.store.nameSecondCat = ""),
                  this.props.store.bannerFilter.slug !==
                  propsRout.match.params.slug
                    ? this.props.store.cleaningActiveFilters()
                    : null,
                  this.props.store.bannerFilter.slug !==
                  propsRout.match.params.slug
                    ? $("html, body").animate({ scrollTop: 0 }, 500)
                    : null,
                  (this.props.store.bannerFilter = {
                    type: "closeBanner",
                    slug: "chernaya_pyatnica_2020",
                  }),
                  this.props.store.filtration(),
                  (
                    <div className="main-screen">
                      <Collection
                        store={this.props.store}
                        slug={propsRout.match.params.slug}
                      />
                    </div>
                  )
                )}
              />
            )}
            <Route
              path={["/product/:id&:t", "/product/:id"]}
              render={(propsRout) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                console.log("object", propsRout.match.params.t),
                (this.addToLastSeenProd(
                  propsRout.match.params.id,
                  propsRout.match.params.t
                ),
                (
                  <div className="main-screen">
                    <CardView
                      store={this.props.store}
                      data={this.props.store.cardContainer}
                      sku={propsRout.match.params.id}
                    />
                  </div>
                ))
              )}
            />

            <Route
              path="/profile"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Профиль - Queen of Bohemia"),
                (
                  <Suspense fallback={<div></div>}>
                    <div className="main-screen">
                      <Profile store={this.props.store} />
                    </div>
                  </Suspense>
                )
              )}
            />

            <Route
              path="/collections/:slug"
              render={(propsRout) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                (this.props.store.bannerFilter = {
                  type: "collections",
                  slug: propsRout.match.params.slug,
                }),
                this.props.store.filtration(),
                (
                  <div className="main-screen">
                    <Collection
                      store={this.props.store}
                      slug={propsRout.match.params.slug}
                    />
                  </div>
                )
              )}
            />

            <Route
              path="/brand/:slug"
              render={(propsRout) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                (this.props.store.bannerFilter = {
                  type: "brend",
                  slug: propsRout.match.params.slug,
                }),
                this.props.store.filtration(),
                (
                  <div className="main-screen">
                    <Collection
                      store={this.props.store}
                      slug={propsRout.match.params.slug}
                    />
                  </div>
                )
              )}
            />

            <Route
              path="/collections"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Коллекции - Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <Collections store={this.props.store} />
                  </div>
                )
              )}
            />
            <Route
              path="/gifts"
              exact
              render={(routProps) => (
                this.props.store.cleaningActiveFilters(),
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Подарки - Queen of Bohemia"),
                (<GiftsPage store={this.props.store} />)
              )}
            />

            <Route
              path="/main/:slug"
              render={(propsRout) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                (this.props.store.bannerFilter = {
                  type: "main",
                  slug: propsRout.match.params.slug,
                }),
                this.props.store.filtration(),
                (
                  <div className="main-screen">
                    <Collection
                      store={this.props.store}
                      slug={propsRout.match.params.slug}
                    />
                  </div>
                )
              )}
            />

            <Route
              path="/ideas/:slug"
              render={(propsRout) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                (this.props.store.bannerFilter = {
                  type: "ideas",
                  slug: propsRout.match.params.slug,
                }),
                this.props.store.filtration(),
                (
                  <div className="main-screen">
                    <Collection
                      store={this.props.store}
                      slug={propsRout.match.params.slug}
                    />
                  </div>
                )
              )}
            />

            <Route
              path="/ideas"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <Collections store={this.props.store} />
                  </div>
                )
              )}
            />

            <Route
              path="/hits"
              render={(routProps) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                $("html, body").animate({ scrollTop: 0 }, 500),
                this.props.store.pathS !== "hits"
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                (this.props.store.pathS = "hits"),
                this.props.store.filtration(),
                (document.title = "Хиты - Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row">
                        <div className="col col-12">
                          <h3 className="catalog-title">Хиты</h3>
                        </div>
                      </div>
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
              path="/new"
              render={(routProps) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                $("html, body").animate({ scrollTop: 0 }, 500),
                this.props.store.pathS !== "new"
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                (this.props.store.pathS = "new"),
                (this.props.store.sortInProd = "Сначала новые"),
                this.props.store.filtration(),
                (document.title = "Новинки - Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row">
                        <div className="col col-12">
                          <h3 className="catalog-title">Новинки</h3>
                        </div>
                      </div>
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
              path="/closeout"
              render={(routProps) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                this.props.store.pathS !== "closeout"
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                this.props.store.pathS !== "closeout"
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                (this.props.store.pathS = "closeout"),
                this.props.store.filtration(),
                (document.title = "Расспродажа - Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row">
                        <div className="col col-12">
                          <Breadcrumbs store={this.props.store} />
                          <h3 className="catalog-title">Распродажа</h3>
                        </div>
                      </div>
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
              path="/actions/:slug"
              render={(propsRout) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                this.props.store.bannerFilter.slug !==
                propsRout.match.params.slug
                  ? $("html, body").animate({ scrollTop: 0 }, 500)
                  : null,
                (this.props.store.bannerFilter = {
                  type: "sale",
                  slug: propsRout.match.params.slug,
                }),
                this.props.store.filtration(),
                (
                  <div className="main-screen">
                    <Collection
                      store={this.props.store}
                      slug={propsRout.match.params.slug}
                      sale={true}
                    />
                  </div>
                )
              )}
            />

            <Route
              path="/actions"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Акции - Queen of Bohemia"),
                (
                  <div className="main-screen">
                    <Actions store={this.props.store} />
                  </div>
                )
              )}
            />

            <Route
              path="/search"
              render={(routProps) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                $("html, body").animate({ scrollTop: 0 }, 500),
                this.props.store.pathS !== "search"
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                (this.props.store.pathS = "search"),
                this.props.store.filtration(),
                (document.title = "Поиск - Queen of Bohemia"),
                (
                  <Search
                    store={this.props.store}
                    parentName={routProps.match.params.parentName}
                    childName={routProps.match.params.childName}
                  />
                )
              )}
            />

            <Route
              path="/shops"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Магазины - Queen of Bohemia"),
                (
                  <Suspense fallback={<div></div>}>
                    <div className="main-screen">
                      <Shops store={this.props.store} />
                    </div>
                  </Suspense>
                )
              )}
            />

            <Route
              path="/shops-map"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Магазины - Queen of Bohemia"),
                (
                  <Suspense fallback={<div></div>}>
                    <div className="main-screen">
                      <ShopsMap store={this.props.store} />
                    </div>
                  </Suspense>
                )
              )}
            />

            <Route
              path={["/help/:options"]}
              render={(routProps) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Помощь - Queen of Bohemia"),
                (
                  <Suspense fallback={<div>Loading...</div>}>
                    <div className="main-screen">
                      <Help path={routProps.match.params.options} />
                    </div>
                  </Suspense>
                )
              )}
            />

            <Route
              path="/about"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "О нас - Queen of Bohemia"),
                (
                  <Suspense fallback={<div></div>}>
                    <div className="main-screen">
                      <About store={this.props.store} />
                    </div>
                  </Suspense>
                )
              )}
            />

            <Route
              path="/finish/:id"
              render={(routProps) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                this.chekFinishDelete(),
                (document.title = "Поздравляем с покупкой - Queen of Bohemia"),
                (
                  <Suspense fallback={<div></div>}>
                    <div className="main-screen">
                      <Finish
                        id={routProps.match.params.id}
                        store={this.props.store}
                      />
                    </div>
                  </Suspense>
                )
              )}
            />
            <Route
              path="/.well-known/apple-developer-merchantid-domain-association"
              render={() => {
                const a = document.createElement("a");
                a.download = "apple-developer-merchantid-domain-association";
                a.href =
                  "/.well-known/apple-developer-merchantid-domain-association1/merchant.ru.yandex.kassa";
                // console.log("a", a);
                a.click();
              }}
            />

            <Route
              path="/yandex-market.yml"
              render={() => {
                const a = document.createElement("a");
                a.download = "yandex-market.yml";
                a.href = "/yandex-market.yml";
                // console.log("a", a);
                a.click();
              }}
            />
            <Route
              path="/google-market.xml"
              render={() => {
                const a = document.createElement("a");
                a.download = "google-market.xml";
                a.href = "/google-market.xml";
                // console.log("a", a);
                a.click();
              }}
            />

            <Route
              path="*"
              render={(routProps) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                $("html, body").animate({ scrollTop: 0 }, 500),
                (document.title = "Страница не найдена - Queen of Bohemia"),
                (<PageNotFound store={this.props.store} />)
              )}
            />
            <Route onEnter={() => window.location.reload()} />
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
          <Footer store={this.props.store} />
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
export default withRouter(MainScreen);
// export { MainScreen };
