import { observer } from "mobx-react";
import React from "react";
import StickySidebar from "sticky-sidebar";
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

    checkBoxHandler = (name, value) => {
      const { activeFilters } = this.props.store;
      console.log("value :>> ", value);
      if (value) {
        console.log(" :>> test");
        if (!activeFilters.attr.includes(name)) {
          activeFilters.attr.push(name);
        }
      } else {
        console.log(
          "activeFilters.attr.includes(name) :>> ",
          activeFilters.attr.includes(name)
        );
        if (activeFilters.attr.includes(name)) {
          activeFilters.attr.splice(activeFilters.attr.indexOf(name), 1);
        }
      }
    };

    render() {
      const {
        filterPointsContainers,
        measurePointsContainers,
        optPointsContainers,
        activeFilters,
        minPrice,
        maxPrice,
        filtration,
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
        <div id="sidebar" className="">
          <div className="sidebar__inner">
            <div className="categories-block">
              <ul>
                <li>
                  <h5>Кофе и чай <span className="ic i_drop"></span></h5>
                  <ul>
                    <li>Чайная пара</li>
                    <li>Кофейная пара</li>
                  </ul>
                </li>

                <li>
                  <h5>Кофе и чай <span className="ic i_drop"></span></h5>
                  <ul>
                    <li>Чайная пара</li>
                    <li>Кофейная пара</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="filters-block">
              <div className="main-filers-block price">
                <h5>Цена</h5>
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
                      filtration();
                    }}
                  >
                    ok
                  </button>
                </div>
              </div>
              <div className="main-filers-block">
                <h5>Фильтры</h5>
                <div>{filterPointsContainers}</div>
              </div>
              <div className="main-filers-block">
                <h5>Размеры</h5>
                <div>{measurePointsContainers}</div>
              </div>
              <div className="main-filers-block">
                <h5>Дополнительно</h5>
                <div>{optPointsContainers}</div>
                <div>
                  <label className="checkbox">
                    <input type="checkbox" onChange={this.handleChange} />
                    <span className="checkbox-btn"></span>
                    <i>Хиты продаж</i>
                  </label>
                  <label className="checkbox checkbox_margin">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        e.target.value = !e.target.value;
                        this.checkBoxHandler("new", e.target.value);
                      }}
                    />
                    <span className="checkbox-btn"></span>
                    <i>Премиум</i>
                  </label>
                  <label className="checkbox checkbox_margin">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        console.log("e.target.value", e.target.value);
                        e.target.value = !e.target.value;
                        this.checkBoxHandler("sale", 1);
                      }}
                    />
                    <span className="checkbox-btn"></span>
                    <i>Со скидкой</i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    sideInit = false;

    componentDidMount() {
      // if (document.querySelector("#sidebar") !== null && !this.sideInit) {
      //   new StickySidebar('#sidebar', {
      //     containerSelector: '.catalog',
      //     innerWrapperSelector: '.sidebar__inner',
      //     topSpacing: 20,
      //     bottomSpacing: 20
      //   });
      //   this.sideInit = true;
      // }
    }
  }
);
export default Filters;
