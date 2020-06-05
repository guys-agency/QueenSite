import React, { useState, useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Router, Route, Switch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import api from "./comp/api";
import LoginSchema from "./schemas/loginSchema";
import getCookie from "./ulits/getCookie";

import MenuPoints from "./comp/MenuPoints";
import Filters from "./comp/Filters";
import ProductCardContainer from "./comp/ProductCardContainer";
import CartPage from "./comp/CartPage";
import Finish from "./comp/Finish";

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
import About from "./comp/About";
import Footer from "./comp/Footer";
import querySearch from "stringquery";
import $ from "jquery";

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
              render={(routProps) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (<MainPage store={this.props.store} />)
              )}
            />
            <Route
              path={[
                "/catalog/:parentName/:childName",
                "/catalog/:parentName",
                "/catalog",
              ]}
              render={(routProps) => (
                console.log(
                  "querySearch(routProps.location.search)",
                  querySearch(routProps.location.search)
                ),
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
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row">
                        <div className="col col-12">
                          <h3 className="catalog-title">Каталог товаров</h3>
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
                (
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
                )
              )}
            />
            <Route
              path="/product/:id"
              render={(propsRout) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (this.props.store.countInProdPage = 1),
                (
                  <div className="main-screen">
                    <CardView
                      store={this.props.store}
                      data={this.props.store.cardContainer}
                      sku={propsRout.match.params.id}
                    />
                  </div>
                )
              )}
            />

            <Route
              path="/profile"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <Profile store={this.props.store} />
                  </div>
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
              path="/collections"
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
              path="/sale"
              render={(routProps) => (
                (this.props.store.nameMainCat = ""),
                (this.props.store.nameSecondCat = ""),
                $("html, body").animate({ scrollTop: 0 }, 500),
                this.props.store.pathS !== "sale"
                  ? this.props.store.cleaningActiveFilters()
                  : null,
                (this.props.store.pathS = "sale"),
                this.props.store.filtration(),
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
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <div className="container">
                      <div className="row">
                        <div className="col col-12">
                          <h3 className="catalog-title">Поиск</h3>
                        </div>
                      </div>
                      <div className="row catalog">
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
              path="/shops"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <Shops />
                  </div>
                )
              )}
            />

            <Route
              path="/shops-map"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <ShopsMap />
                  </div>
                )
              )}
            />

            <Route
              path={["/help/:options"]}
              render={(routProps) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <Help path={routProps.match.params.options} />
                  </div>
                )
              )}
            />

            <Route
              path="/about"
              render={() => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <About />
                  </div>
                )
              )}
            />

            <Route
              path="/finish/:id"
              render={(routProps) => (
                $("html, body").animate({ scrollTop: 0 }, 500),
                (
                  <div className="main-screen">
                    <Finish id={routProps.match.params.id} />
                  </div>
                )
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
          <Footer />
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
