import { observer } from "mobx-react";
import React from "react";
// import StickySidebar from "sticky-sidebar";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import $ from "jquery";
import Fade from "react-reveal/Fade";
const { Component } = React;

const Filters = observer(
  class Filters extends Component {
    state = {
      min: this.props.store.minPrice,
      max: this.props.store.maxPrice,
      categoriesWindow: false,
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

    typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    checkBoxHandler = (name, value) => {
      const { activeFilters, filtration, searchText } = this.props.store;
      // console.log("value :>> ", value);
      if (value) {
        // console.log(" :>> test");
        if (name !== "premium") {
          if (!activeFilters.attr.includes(name)) {
            activeFilters.attr.push(name);
            activeFilters.choosePoint.push("attr");
          }
        } else {
          activeFilters.premium = !activeFilters.premium;
          activeFilters.choosePoint.push("premium");
        }
      } else {
        // console.log(
        //   "activeFilters.attr.includes(name) :>> ",
        //   activeFilters.attr.includes(name)
        // );
        if (name !== "premium") {
          if (activeFilters.attr.includes(name)) {
            activeFilters.attr.splice(activeFilters.attr.indexOf(name), 1);
            activeFilters.choosePoint.splice(activeFilters.choosePoint.indexOf("attr"), 1);
          }
        } else {
          activeFilters.premium = !activeFilters.premium;
          activeFilters.choosePoint.splice("premium", 1);
        }
      }
      let searchQt = "";
      console.log("searchText :>> ", searchText);
      if (searchText.length) {
        searchQt = "search=" + encodeURIComponent(searchText);
      }
      activeFilters.choosePoint.forEach((filterName) => {
        if (filterName !== "choosePoint") {
          if (filterName !== "measure") {
            if (filterName === "maxPrice" || filterName === "minPrice") {
              if (!searchQt.length) {
                searchQt = filterName + "=" + activeFilters[filterName];
              } else {
                searchQt += "&&" + filterName + "=" + activeFilters[filterName];
              }
            } else {
              if (name !== "premium") {
                if (activeFilters[filterName].length) {
                  if (!searchQt.length) {
                    searchQt = filterName + "=" + activeFilters[filterName].join();
                  } else {
                    searchQt += "&&" + filterName + "=" + activeFilters[filterName].join();
                  }
                }
              } else {
                if (!searchQt.length) {
                  searchQt = filterName + "=" + activeFilters[filterName];
                } else {
                  searchQt += "&&" + filterName + "=" + activeFilters[filterName];
                }
              }
            }
          } else {
            if (Object.keys(activeFilters[filterName]).length) {
              Object.keys(activeFilters[filterName]).forEach((ind) => {
                // console.log("ind :>> ", activeFilters[filterName][ind]);
                if (!searchQt.length) {
                  searchQt = filterName + "=" + ind + "!~" + activeFilters[filterName][ind].join(",");
                } else {
                  searchQt += "&&" + filterName + "=" + ind + "!~" + activeFilters[filterName][ind].join(",");
                }
              });
            }
          }
        }
      });
      // console.log("searchQt :>> ", searchQt);
      this.props.history.replace({ search: searchQt });
    };

    subCat = (e) => {
      e.target.classList.toggle("active");
      e.target.nextElementSibling.classList.toggle("visible");
    };

    setCats = (main, child, choose) => {
      let searchQt = window.location.href.split("?")[1];
      if (searchQt !== "undefined" && searchQt !== "" && searchQt !== undefined) {
        if (searchQt.includes("page=")) {
          const searchQtParts = searchQt.split("page=" + this.props.store.startPag / 42);

          searchQt = searchQtParts[0] + `page=0` + searchQtParts[1];
        }

        this.props.history.replace({ search: searchQt });
      }
      if (choose) {
        this.props.store.nameMainCat = "";
        this.props.store.nameSecondCat = "";
        this.props.store.startPag = 0;
        this.props.store.stopPag = 42;
        this.props.store.filtration();
      } else {
        this.props.store.nameMainCat = main;
        this.props.store.nameSecondCat = child;
        this.props.store.startPag = 0;
        this.props.store.stopPag = 42;
        this.props.store.filtration();
      }
    };

    componentWillUnmount() {
      $(".head_filter").removeClass("visible");
    }

    priceFilter = () => {
      const { activeFilters } = this.props.store;
      if (+activeFilters.minPrice > 0) {
        activeFilters.choosePoint.push("minPrice");
        activeFilters.count += 1;
      } else {
        if (activeFilters.choosePoint.includes("minPrice")) {
          activeFilters.choosePoint.splice(activeFilters.choosePoint.indexOf("minPrice"), 1);
        }
      }
      if (+activeFilters.maxPrice > 0) {
        // console.log("2 :>> ", 2);
        activeFilters.choosePoint.push("maxPrice");
        activeFilters.count += 1;
      } else {
        if (activeFilters.choosePoint.includes("maxPrice")) {
          activeFilters.choosePoint.splice(activeFilters.choosePoint.indexOf("maxPrice"), 1);
        }
      }

      let searchQt = "";
      activeFilters.choosePoint.forEach((filterName) => {
        if (filterName !== "choosePoint") {
          if (filterName !== "measure") {
            if (filterName === "maxPrice" || filterName === "minPrice") {
              if (!searchQt.length) {
                searchQt = filterName + "=" + activeFilters[filterName];
              } else {
                searchQt += "&&" + filterName + "=" + activeFilters[filterName];
              }
            } else {
              if (activeFilters[filterName].length) {
                if (!searchQt.length) {
                  searchQt = filterName + "=" + activeFilters[filterName].join();
                } else {
                  searchQt += "&&" + filterName + "=" + activeFilters[filterName].join();
                }
              }
            }
          } else {
            if (Object.keys(activeFilters[filterName]).length) {
              Object.keys(activeFilters[filterName]).forEach((ind) => {
                // console.log(
                //   "ind :>> ",
                //   activeFilters[filterName][ind]
                // );
                if (!searchQt.length) {
                  searchQt = filterName + "=" + ind + "!~" + activeFilters[filterName][ind].join(",");
                } else {
                  searchQt += "&&" + filterName + "=" + ind + "!~" + activeFilters[filterName][ind].join(",");
                }
              });
            }
          }
        }
      });
      this.props.history.replace({ search: searchQt });
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
        prodCats,
      } = this.props.store;

      const { parentName, childName } = this.props;
      const { categoriesWindow } = this.state;
      const pathname = window.location.pathname;
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

        // elem.childs.sort((prev, next) => {
        //   if (prev.name < next.name) return -1;
        //   if (prev.name < next.name) return 1;
        // });
        elem.childs.forEach((child, iCh) => {
          //убрать tr, так как будут поля с транскрипцией в бд
          childsPoints.push(
            <li key={child.name} className={child.slug === childName ? "active" : ""}>
              {prodCats.length ? (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    const hasActive = e.target.classList.contains("active");
                    $(".categories-block__child").find(".active").removeClass("active");

                    this.setCats(elem.slug, child.slug, hasActive);
                    if (!hasActive) {
                      e.target.classList.toggle("active");
                    }

                    this.setState({ categoriesWindow: false });
                  }}
                >
                  {child.name}
                </a>
              ) : (
                <NavLink
                  to={`/catalog/${elem.slug}/${child.slug}`}
                  onClick={() => {
                    this.setState({ categoriesWindow: false });
                  }}
                >
                  {child.name}
                </NavLink>
              )}
              {/* <NavLink
                to={`/catalog/${elem.slug}/${child.slug}`}
                onClick={()=>{
                  this.setCats(elem.slug, child.slug)
                }}
              >
                {child.name}
              </NavLink> */}
            </li>
          );
        });
        if (elem.name === "Сервировка стола") {
          menu[0] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Для приготовления") {
          menu[1] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name} <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Напитки") {
          menu[2] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name} <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Кофе и чай") {
          menu[3] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Аксесуары для стола") {
          menu[4] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Интерьер") {
          menu[5] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Наборы") {
          menu[6] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
            </li>
          );
        } else if (elem.name === "Сервизы") {
          menu[7] = (
            <li key={elem.name} className="categories-mob-block">
              <h5 className={pathname.includes(elem.slug) ? "categories-block__name active" : "categories-block__name"} onClick={this.subCat}>
                {elem.name}
                <span className="ic i_drop"></span>
              </h5>

              <ul className={pathname.includes(elem.slug) ? "categories-block__child visible" : "categories-block__child"}>{childsPoints}</ul>
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
          <div className="filters-top">
            {categoriesWindow && (
              <span
                className="ic i_drop"
                onClick={() => {
                  this.setState({ categoriesWindow: false });
                }}
              ></span>
            )}
            <p>{!categoriesWindow ? "Фильтры" : "Категории"}</p>
            <button
              className="ic i_close"
              onClick={() => {
                if (document.querySelector(".catalog__bar")) {
                  document.querySelector(".catalog__bar").classList.remove("visible");
                }
                document.querySelector(".sidebar-overlay").classList.remove("active");
                document.querySelector("body").classList.remove("no-scroll");
                document.querySelector(".i_filter").classList.remove("active");
              }}
            ></button>
          </div>
          {/* {!categoriesWindow ? ( */}
          <Fade distance="50px" duration={300} opposite right when={this.state.categoriesWindow}>
            <div className={`sidebar__inner sidebar__inner_cats ${this.state.categoriesWindow && "active"}`}>
              <div className="categories-block">
                <ul>{menu}</ul>
              </div>
            </div>
          </Fade>
          <Fade distance="50px" duration={300} opposite right when={!this.state.categoriesWindow}>
            <div className="sidebar__inner">
              {this.typeDevice ? (
                <button
                  className="filters-btn categories-name"
                  onClick={() => {
                    this.setState({ categoriesWindow: true });
                  }}
                >
                  Категория <p>{this.props.store.menuAccor[this.props.store.nameSecondCat]}</p>
                  <div className="ic i_drop"></div>
                </button>
              ) : (
                <div className="categories-block">
                  <ul>{menu}</ul>
                </div>
              )}
              <div className="filters-block">
                <div className="main-filers-block price">
                  <h5>Цена</h5>
                  <div>
                    <p>от </p>
                    <input
                      placeholder={minPrice}
                      name="min"
                      type="number"
                      value={activeFilters.minPrice.length > 0 ? activeFilters.minPrice : null}
                      onBlur={() => {
                        $("#priceBtn").addClass("close");
                      }}
                      onFocus={() => {
                        $("#priceBtn").removeClass("close");
                      }}
                      onChange={(e) => {
                        if (e.target.value < maxPrice) activeFilters.minPrice = e.target.value;
                        // if (e.target.value.length > 0) {
                        //   $("#priceBtn").removeClass("close");
                        // } else if (
                        //   activeFilters.maxPrice.length === 0 &&
                        //   activeFilters.minPrice.length === 0
                        // ) {
                        //   $("#priceBtn").addClass("close");
                        // }
                      }}
                    ></input>
                    <p> до </p>
                    <input
                      placeholder={maxPrice}
                      name="max"
                      type="number"
                      value={activeFilters.maxPrice.length > 0 ? activeFilters.maxPrice : null}
                      onBlur={() => {
                        $("#priceBtn").addClass("close");
                      }}
                      onFocus={() => {
                        $("#priceBtn").removeClass("close");
                      }}
                      onChange={(e) => {
                        if (e.target.value > minPrice && e.target.value < maxPrice) {
                          activeFilters.maxPrice = e.target.value;
                        } else {
                          activeFilters.maxPrice = maxPrice;
                        }
                        // if (e.target.value.length > 0) {
                        //   $("#priceBtn").removeClass("close");
                        // } else if (
                        //   activeFilters.maxPrice.length === 0 &&
                        //   activeFilters.minPrice.length === 0
                        // ) {
                        //   $("#priceBtn").addClass("close");
                        // }
                      }}
                    ></input>
                    <p>₽</p>
                    <button className="btn close" id="priceBtn" onClick={this.priceFilter}>
                      Применить
                    </button>
                  </div>
                </div>
                <div className="main-filers-block">
                  <h5 className="main-filers-block_name">Фильтры</h5>
                  <div>{filterPointsContainers}</div>
                </div>
                {measurePointsContainers.length > 0 && (
                  <div className="main-filers-block">
                    <h5>Размеры</h5>
                    <div>{measurePointsContainers}</div>
                  </div>
                )}
                {(optPointsContainers.length || this.props.store.canHit || this.props.store.canPremium || this.props.store.canSale) && (
                  <div className="main-filers-block">
                    <h5>Дополнительно</h5>
                    <div>{optPointsContainers}</div>
                    <div>
                      {!window.location.pathname.includes("hits") && this.props.store.canHit && (
                        <label className={`checkbox ${activeFilters.attr.includes("hit") ? "checkbox_active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={activeFilters.attr.includes("hit")}
                            onChange={(e) => {
                              // console.log(
                              //   "e.target.value",
                              //   $(e.target).is(":checked")
                              // );

                              this.checkBoxHandler("hit", $(e.target).is(":checked"));
                            }}
                          />
                          <span className="checkbox-btn"></span>
                          <i>Хиты продаж</i>
                        </label>
                      )}

                      {!window.location.pathname.includes("premium") && this.props.store.canPremium && (
                        <label
                          className={`checkbox checkbox_margin
                              ${activeFilters.premium === "true" ? "checkbox_active" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.premium === "true"}
                            onChange={(e) => {
                              // console.log(
                              //   "e.target.value",
                              //   $(e.target).is(":checked")
                              // );

                              this.checkBoxHandler("premium", $(e.target).is(":checked"));
                            }}
                          />
                          <span className="checkbox-btn"></span>
                          <i>Премиум</i>
                        </label>
                      )}
                      {!window.location.pathname.includes("sale") && this.props.store.canSale && (
                        <label
                          className={`checkbox checkbox_margin
                            ${activeFilters.attr.includes("sale") ? "checkbox_active" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.attr.includes("sale")}
                            onChange={(e) => {
                              // console.log(
                              //   "e.target.value",
                              //   $(e.target).is(":checked")
                              // );

                              this.checkBoxHandler("sale", $(e.target).is(":checked"));
                            }}
                          />
                          <span className="checkbox-btn"></span>
                          <i>Со скидкой</i>
                        </label>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Fade>
          {/* ) : ( */}
          {!this.state.categoriesWindow && (
            <div className="filters__btn-cont">
              <button
                className="btn btn_yellow"
                onClick={() => {
                  if (document.querySelector(".catalog__bar")) {
                    document.querySelector(".catalog__bar").classList.remove("visible");
                  }
                  document.querySelector(".sidebar-overlay").classList.remove("active");
                  document.querySelector("body").classList.remove("no-scroll");
                  document.querySelector(".i_filter").classList.remove("active");
                  this.priceFilter();
                }}
              >
                Применить
              </button>
            </div>
          )}
          {/* )} */}
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
export default withRouter(Filters);
