import { observer } from "mobx-react";
import React from "react";
import StickySidebar from "sticky-sidebar";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
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
      const { activeFilters, filtration } = this.props.store;
      console.log("value :>> ", value);
      if (value) {
        console.log(" :>> test");
        if (!activeFilters.attr.includes(name)) {
          activeFilters.attr.push(name);
          filtration();
        }
      } else {
        console.log(
          "activeFilters.attr.includes(name) :>> ",
          activeFilters.attr.includes(name)
        );
        if (activeFilters.attr.includes(name)) {
          activeFilters.attr.splice(activeFilters.attr.indexOf(name), 1);
          filtration();
        }
      }
    };

    subCat = (e) => {
      e.target.classList.toggle("active");
      e.target.nextElementSibling.classList.toggle("visible");
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
        activeCats,
      } = this.props.store;

      const { parentName, childName } = this.props;
      // let minPriceLocal = 0;
      // let maxPriceLocal = 0;
      // if () {
      //   console.log("parentName", parentName);

      //   this.props.store.nameMainCat = parentName;
      //   this.props.store.nameSecondCat = childName;
      // }
      const menu = [];
      activeCats.forEach((elem, i) => {
        const childsPoints = [];

        elem.childs.sort((prev, next) => {
          if (prev.name < next.name) return -1;
          if (prev.name < next.name) return 1;
        });
        elem.childs.sort().forEach((child, iCh) => {
          //убрать tr, так как будут поля с транскрипцией в бд
          childsPoints.push(
            <li key={child.name}>
              <NavLink
                to={`/catalog/${elem.slug}/${child.slug}`}
                onClick={this.closeNav}
              >
                {child.name}
              </NavLink>
            </li>
          );
        });
        if (elem.name === "Сервировка стола") {
          menu[0] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Для приготовления") {
          menu[1] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Напитки") {
          menu[2] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Кофе и чай") {
          menu[3] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Аксесуары для стола") {
          menu[4] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Интерьер") {
          menu[5] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Наборы") {
          menu[6] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Сервизы") {
          menu[7] = (
            <li>
              <h5 className="categories-block__name" onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>
              <ul className="categories-block__child">{childsPoints}</ul>
            </li>
          );
        }

        // this.menuContainer.push(
        //   <Dropdown key={i} text={elem.name} pointing className="link item">
        //     <Dropdown.Menu>{childsPoints}</Dropdown.Menu>
        //   </Dropdown>
        // );
      });

      return (
        <div id="sidebar" className="catalog__bar">
          <div className="sidebar__inner">
            <div className="categories-block">
              <ul>{menu}</ul>
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
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        console.log(
                          "e.target.value",
                          $(e.target).is(":checked")
                        );

                        this.checkBoxHandler("hit", $(e.target).is(":checked"));
                      }}
                    />
                    <span className="checkbox-btn"></span>
                    <i>Хиты продаж</i>
                  </label>
                  <label className="checkbox checkbox_margin">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        console.log(
                          "e.target.value",
                          $(e.target).is(":checked")
                        );

                        this.checkBoxHandler("new", $(e.target).is(":checked"));
                      }}
                    />
                    <span className="checkbox-btn"></span>
                    <i>Премиум</i>
                  </label>
                  <label className="checkbox checkbox_margin">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        console.log(
                          "e.target.value",
                          $(e.target).is(":checked")
                        );

                        this.checkBoxHandler(
                          "sale",
                          $(e.target).is(":checked")
                        );
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
