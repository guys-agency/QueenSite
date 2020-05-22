import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Filters = observer(
  class Filters extends Component {
    state = {
      min: this.props.store.minPrice,
      max: this.props.store.maxPrice,
    };

    activeFilters = {
      brand: [],
      material: [],
      country: [],
      color: [],
      measure: [],
      count: 0,
      choosePoint: [],
    };

    minPriceLocal = 0;
    maxPriceLocal = 0;

    render() {
      const {
        filterPointsContainers,
        measurePointsContainers,
        optPointsContainers,
        activeFilters,
        minPrice,
        maxPrice,
      } = this.props.store;

      const { parentName, childName } = this.props;
      // let minPriceLocal = 0;
      // let maxPriceLocal = 0;
      // if () {
      //   console.log("parentName", parentName);

      //   this.props.store.nameMainCat = parentName;
      //   this.props.store.nameSecondCat = childName;
      // }

      return (
        <div className="filters-block">
          <div className="main-filers-block price">
            <p className="filter-title">Цена</p>
            <div>
              <p>от </p>
              <input
                placeholder={minPrice}
                name="min"
                onChange={(e) => {
                  this.minPriceLocal = e.target.value;
                }}
              ></input>
              <p> до </p>
              <input
                placeholder={maxPrice}
                name="max"
                onChange={(e) => {
                  this.maxPriceLocal = e.target.value;
                }}
              ></input>
              <p>₽</p>
              <button
                onClick={() => {
                  if (this.minPriceLocal) {
                    activeFilters.minPrice = this.minPriceLocal;
                  } else {
                    activeFilters.minPrice = 0;
                  }
                  if (this.maxPriceLocal) {
                    activeFilters.maxPrice = this.maxPriceLocal;
                  } else {
                    activeFilters.maxPrice = 0;
                  }
                }}
              >
                ok
              </button>
            </div>
          </div>
          <div className="main-filers-block">
            <p className="filter-title">Фильтры</p>
            <div>{filterPointsContainers}</div>
          </div>
          <div className="main-filers-block">
            <p className="filter-title">Размеры</p>
            <div>{measurePointsContainers}</div>
          </div>
          <div className="main-filers-block">
            <p className="filter-title">Дополнительно</p>
            <div>{optPointsContainers}</div>
          </div>
        </div>
      );
    }
  }
);

export default Filters;
