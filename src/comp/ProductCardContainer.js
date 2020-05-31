import { observer } from "mobx-react";
import React from "react";
import ProductCard from "./ProductCard";
import Paginat from "./paginat";

const ProductCardContainer = observer(
  class ProductCardContainer extends React.Component {
    state = { 
      ready: false,
      sortLabel: "Сначала новые"
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

      e.target.classList.toggle('active');

      this.setState({ sortLabel : e.target.textContent }); 

      document.querySelector(".dropdown__list").classList.remove('visible')
      document.querySelector(".dropdown__label").classList.remove('active')
    }

    createProductContainer = () => {
      fetch("http://127.0.0.1:3010", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start: 0, stop: 50 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          Object.keys(data).forEach((element) => {
            this.testContainer.push(
              <ProductCard
                key={data[element].slug}
                data={data[element]}
                store={this.props.store}
              />
            );
          });
          this.props.store.productsToRender = this.testContainer;
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch("http://127.0.0.1:3010/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.props.store.createFilterPointsContainers(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    render() {
      return (
        <div className="col col-9 col-t-12">
          <div className="row row_inner">
            <div className="col col-12">
              <div className="sort">
              <div className="dropdown">
                  <button className="dropdown__label" onClick={(e)=>{
                    e.target.classList.toggle('active');
                    e.target.nextElementSibling.classList.toggle('visible');
                  }}>
                    {this.state.sortLabel}
                  </button>
                  <div className="dropdown__list">
                    <button className="dropdown__list-item item" onClick={this.sortClick}>Сначала новые</button>
                    <button className="dropdown__list-item item" onClick={this.sortClick}>Сначала старые</button>
                    <button className="dropdown__list-item item" onClick={this.sortClick}>Сначала подороже</button>
                    <button className="dropdown__list-item item" onClick={this.sortClick}>Сначала подешевле</button>
                  </div>
                </div>
                <button className="ic i_filter" onClick={(e)=>{
                  e.target.classList.toggle("active");
                  document.querySelector(".catalog__bar").classList.toggle('visible')
                }}></button>
              </div>
            </div>
            {this.props.store.productsToRender}
            {this.props.store.paginatCont}
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
