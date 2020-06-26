import { observer } from "mobx-react";
import React from "react";
import ProductCard from "./ProductCard";

import Paginat from "./paginat";

const ProductCardContainer = observer(
  class ProductCardContainer extends React.Component {
    state = {
      ready: false,
      sortLabel: "По умолчанию",
    };

    testContainer = [];

    test = (data) => {
      this.props.ch(data);
    };

    sortClick = (e) => {
      var elems = document.querySelectorAll(".dropdown__list-item");
      [].forEach.call(elems, function (el) {
        el.classList.remove("active");
      });

      e.target.classList.toggle("active");
      this.props.store.sortInProd = e.target.textContent;
      this.props.store.filtration();
      this.setState({ sortLabel: e.target.textContent });

      document.querySelector(".dropdown__list").classList.remove("visible");
      document.querySelector(".dropdown__label").classList.remove("active");
    };

    render() {
      const { searchQ } = this.props.store;
      // console.log(
      //   "decodeURIComponent :>> ",
      //   decodeURIComponent(this.props.history.location.search),
      //   searchQ
      // );
      // this.props.history.replace({ search: searchQ });
      // if (
      //   decodeURIComponent(this.props.history.location.search) !==
      //   "?" + searchQ
      // ) {
      //   this.props.history.replace({ search: searchQ });
      // }

      return (
        <div className="col col-9 col-t-12">
          <div className="row row_inner">
            <div className="col col-12">
              {!window.location.pathname.includes("profile") && (
                <div className="sort">
                  <div className="dropdown">
                    <button
                      className="dropdown__label"
                      onClick={(e) => {
                        e.target.classList.toggle("active");
                        e.target.nextElementSibling.classList.toggle("visible");
                      }}
                    >
                      {this.state.sortLabel}
                    </button>
                    <div className="dropdown__list">
                      {/* <button
                      className="dropdown__list-item item"
                      onClick={this.sortClick}
                    >
                      Сначала новые
                    </button> */}
                      <button
                        className="dropdown__list-item item"
                        onClick={this.sortClick}
                      >
                        По умолчанию
                      </button>
                      <button
                        className="dropdown__list-item item"
                        onClick={this.sortClick}
                      >
                        Сначала дороже
                      </button>
                      <button
                        className="dropdown__list-item item"
                        onClick={this.sortClick}
                      >
                        Сначала дешевле
                      </button>
                      <button
                        className="dropdown__list-item item"
                        onClick={this.sortClick}
                      >
                        Сначала акционные
                      </button>
                    </div>
                  </div>
                  <button
                    className="ic i_filter"
                    onClick={(e) => {
                      e.target.classList.toggle("active");
                      document
                        .querySelector(".catalog__bar")
                        .classList.toggle("visible");
                    }}
                  ></button>
                </div>
              )}
            </div>
            {this.props.store.productsToRender}
            {window.location.pathname.includes("profile")
              ? null
              : this.props.store.paginatCont}
          </div>
        </div>
      );
    }

    // componentDidMount() {
    //   this.createProductContainer();
    // }
  }
);

export default ProductCardContainer;
