import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { Router, Route, Switch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { navigate } from "hookrouter";
import MenuPoints from "./comp/MenuPoints";
import Filters from "./comp/Filters";
import ProductCardContainer from "./comp/ProductCardContainer";
import CartPage from "./comp/CartPage";
import CardView from "./comp/CardView";
import MainPage from "./comp/MainPage";

const { Component } = React;

const MainScreen = observer(
  class MainScreen extends Component {
    state = {
      cardRender: false,
    };

    cardContainer = [];

    clickHandler = (data) => {
      // this.cardContainer = <CardView data={data} store={this.props.store} />;
      navigate(`/product/${data.slug}`, false, { data });
      this.props.store.productPage = true;
      this.props.store.cartPage = false;
    };

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

      fetch("http://134.122.81.119/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "categories.name": nameMainCat,
          "categories.childs": nameSecondCat,
        }),
      })
        .then((res) => {
          console.log("res", res);
          return res.json();
        })
        .then((data) => {
          console.log("first Filter", data);
          const sortData = {};

          Object.keys(data).forEach((name) => {
            if (name !== "_id") sortData[name] = data[name].sort();
          });

          this.props.store.categoryFilter = sortData;
          this.props.store.createFilterPointsContainers(sortData);
        })
        .catch((err) => {
          console.log("err", err);
        });
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
                (
                  <div className="main-screen">
                    <Filters
                      store={this.props.store}
                      parentName={routProps.match.params.parentName}
                      childName={routProps.match.params.childName}
                    />
                    <ProductCardContainer
                      store={this.props.store}
                      parentName={routProps.match.params.parentName}
                      childName={routProps.match.params.childName}
                    />
                  </div>
                )
              )}
            />
            <Route
              path="/cart"
              render={() => (
                <div className="main-screen">
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
