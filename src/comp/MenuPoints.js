import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import { Dropdown, Menu, Checkbox } from "semantic-ui-react";
import Cart from "./Cart";
import { cities, SERVER_URL } from "../constants";
import api from "./api";
import { Formik, Field, Form } from "formik";
import RegistrationSchema from "../schemas/registrationSchema";
import LoginSchema from "../schemas/loginSchema";
import LikeSidebar from "./LikeSidebar";
import AuthSidebar from "./AuthSidebar";
import CartSidebar from "./CartSidebar";
import localStorage from "mobx-localstorage";
import { withRouter } from "react-router";
const { Component } = React;

const MenuPoints = observer(
  class MenuPoints extends Component {
    state = {
      cities: [],
      ready: false,
      popreg: false,
      popLike: false,
      popCart: false,
    };

    menuContainer = [];

    reglog = () => {};
    timeout = null;
    test1 = "";
    test2 = "";

    toggleMenu = (e) => {
      e.stopPropagation();
      $(".menu_sub").removeClass("visible");
      $(".menu_mega").toggleClass("visible");
    };

    toggleHeader = (e) => {
      e.stopPropagation();
      $(".menu_mega").removeClass("visible");
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
      $(".header__drop").removeClass("visible");
      $(".header__btn").removeClass("active");

      $(e.target).parent().find(".header__drop").addClass("visible");
      $(e.target).toggleClass("active");
    };

    offDrop = () => {
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
    };

    toggleDrop = (e) => {
      e.preventDefault();
      $(".menu_mega").removeClass("visible");
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
      $(".header__drop").removeClass("visible");
      $(".header__btn").removeClass("active");

      $(e.target).addClass("active");
      $(e.target).parent().find(".menu_sub").addClass("visible");
    };

    offDrop = () => {
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
    };

    closeAll = (e) => {
      e.stopPropagation();
      $(".menu_mega").removeClass("visible");
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
      $(".header__btn").removeClass("active");
      var container = $(".header__drop");
      if (container.has(e.target).length === 0) {
        container.removeClass("visible");
      }

      var mega = $(".menu_mega");
      if (mega.has(e.target).length === 0) {
        mega.removeClass("visible");
      }
      // $(".header__drop").removeClass("visible");
    };

    hoverMenuBtn = () => {
      $(".menu-point").removeClass("active");
      $(".menu_sub").removeClass("visible");
      $(".header__drop").removeClass("visible");
      $(".header__btn").removeClass("active");
    };

    scrollNav = () => {
      var scroll = $(window).scrollTop();
      if (scroll > 55) {
        $(".header__drop").removeClass("visible");
        $(".header").addClass("header_scroll");
        $(".navigation").addClass("navigation_scroll");
      }
      if (scroll < 55) {
        $(".header").removeClass("header_scroll");
        $(".navigation").removeClass("navigation_scroll");
      }
    };

    componentDidMount() {
      this.createMenu();
    }

    componentDidUpdate() {
      $(".header__btn").off("click", this.toggleHeader);
      $(".header__btn").on("click", this.toggleHeader);

      $(".btn-menu").off("click", this.toggleMenu);
      $(".btn-menu").on("click", this.toggleMenu);
      $(".btn-menu").off("mouseenter", this.hoverMenuBtn);
      $(".btn-menu").on("mouseenter", this.hoverMenuBtn);

      $(".menu-point").off("mouseenter", this.toggleDrop);
      $(".menu-point").on("mouseenter", this.toggleDrop);
      $(".menu_sub").off("mouseleave", this.offDrop);
      $(".menu_sub").on("mouseleave", this.offDrop);

      $(document).off("click", this.closeAll);
      $(document).on("click", this.closeAll);

      $(window).off("scroll", this.scrollNav);
      $(window).on("scroll", this.scrollNav);
    }

    createMenu = () => {
      fetch(SERVER_URL + "/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const menu = {};
          data.forEach((elem, i) => {
            const childsPoints = [];

            elem.childs.sort((prev, next) => {
              if (prev.name < next.name) return -1;
              if (prev.name < next.name) return 1;
            });
            elem.childs.sort().forEach((child, iCh) => {
              //убрать tr, так как будут поля с транскрипцией в бд
              childsPoints.push(
                <li key={child.name}>
                  <NavLink to={`/catalog/${elem.slug}/${child.slug}`}>
                    {child.name}
                  </NavLink>
                </li>
              );
            });
            if (elem.name === "Сервировка стола") {
              menu[0] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Для приготовления") {
              menu[1] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Напитки") {
              menu[2] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Кофе и чай") {
              menu[3] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Аксесуары для стола") {
              menu[4] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Интерьер") {
              menu[5] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Наборы") {
              menu[6] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            } else if (elem.name === "Сервизы") {
              menu[7] = (
                <div>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            }

            // this.menuContainer.push(
            //   <Dropdown key={i} text={elem.name} pointing className="link item">
            //     <Dropdown.Menu>{childsPoints}</Dropdown.Menu>
            //   </Dropdown>
            // );
          });
          for (let index = 0; index < Object.keys(menu).length; index += 2) {
            this.menuContainer.push(
              <div className="column" key={index}>
                {menu[index]}
                {menu[index + 1]}
              </div>
            );
          }

          this.setState({ ready: true });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    focusHandler = (e) => {
      $(e.target).parent().find("label").addClass("active");
    };

    blurHandler = (e) => {
      if (e.target.value === "") {
        $(e.target).parent().find("label").removeClass("active");
      }
    };

    closeSidebar = () => {
      this.setState({
        popreg: false,
        popCart: false,
        popLike: false,
      });
      document.querySelector(".sidebar-overlay").classList.remove("active");
    };

    render() {
      return (
        this.state.ready && (
          <>
            {/* <Menu>{this.menuContainer}</Menu> */}
            <div className="header">
              <div className="container container_f">
                <div className="header__left">
                  <Link to="">О нас</Link>
                  <Link to="/shops">Магазины</Link>
                  <span>
                    <span className="link header__btn">
                      Помощь <span className="ic i_drop"></span>
                    </span>
                    <div className="header__drop">
                      <ul>
                        <li>
                          <a href="">Доставка</a>
                        </li>
                        <li>
                          <a href="">Оплата</a>
                        </li>
                        <li>
                          <a href="">Возврат</a>
                        </li>
                        <li>
                          <a href="">Публичная оферта</a>
                        </li>
                      </ul>
                    </div>
                  </span>
                  <a href="">Бонусы</a>
                  <span>
                    <button className="link dotted header__btn">
                      {this.props.store.city}{" "}
                      <span className="ic i_drop"></span>
                    </button>
                    <form className="header__drop header__drop_city">
                      <div className="input-field">
                        <label className="active" htmlFor="citySearch">
                          Ваш город
                        </label>
                        <input
                          id="citySearch"
                          placeholder="Поиск"
                          type="text"
                          onInput={(e) => {
                            if (e.target.value.length >= 3) {
                              console.log(
                                "e.target.value.length :>> ",
                                e.target.value.length
                              );
                              const rigthCities = [];
                              cities.some((el) => {
                                if (rigthCities.length < 3) {
                                  if (
                                    el
                                      .toLowerCase()
                                      .indexOf(e.target.value.toLowerCase()) !==
                                    -1
                                  ) {
                                    rigthCities.push(el);
                                  }
                                  return false;
                                } else {
                                  return true;
                                }
                              });
                              const renderCities = [];
                              for (let index = 0; index < 3; index++) {
                                console.log("object :>> ", rigthCities);
                                renderCities.push(
                                  <li>
                                    <button
                                      type="submit"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        localStorage.set("city", {
                                          name: rigthCities[index],
                                          sourse: "U",
                                        });
                                      }}
                                    >
                                      {rigthCities[index]}
                                    </button>
                                  </li>
                                );
                              }
                              this.setState({ cities: renderCities });
                            }
                          }}
                          onFocus={(e) => {
                            $(e.target)
                              .parent()
                              .find("label")
                              .addClass("active");
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              // $(e.target).parent().find('label').removeClass('active');
                            }
                          }}
                        />
                      </div>
                      <ul>
                        {this.state.cities}
                        {/* <li>
                          <button type="submit">Казань</button>
                        </li>
                        <li>
                          <button type="submit">Калининград</button>
                        </li>
                        <li>
                          <button type="submit">Кабанск</button>
                        </li> */}
                      </ul>
                    </form>
                  </span>
                </div>
                {/* <Link className="logo" to="/">

                  <img src="/image/logo.svg" />
                </Link> */}
                <Link className="logo logo_vl" to="/">
                  <span className="i_queen"></span>
                  <span className="i_of"></span>
                  <span className="i_bohemia"></span>
                  <span className="i_qd"></span>
                </Link>

                <div className="header__right">
                  <button className="link dotted ask">Задать вопрос</button>
                  <a href="tel:+78008085878" className="phone">
                    +7 800 808-58-78
                  </a>
                </div>
              </div>
            </div>
            <div className="navigation">
              <div className="container container_f">
                <div className="navigation__left">
                  <button className="btn btn_primary btn-menu">
                    {" "}
                    <span className="ic i_menu"></span> Каталог
                  </button>
                  <span className="menu__sub ">
                    <Link to="/collections" className="menu-point">
                      Коллекции
                    </Link>
                    <div className="menu menu_sub menu_collection">
                      <div className="container container_f">
                        <div className="column">
                          <ul>
                            <li>
                              <a href="">Тест</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span>

                  <span className="menu__drop">
                    <Link className="menu-point">Премиум</Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <div className="column">
                          <ul>
                            <li>
                              <a href="">Тест</a>
                            </li>
                            <li>
                              <a href="">Тест</a>
                            </li>
                            <li>
                              <a href="">Тест</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span>

                  {/* <span className="menu__drop">
                    <Link className="menu-point">Милениум</Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <div className="column">
                          <ul>
                            <li><a href="">Тест 2</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span> */}

                  <span className="menu__drop">
                    <Link className="menu-point">Интерьер</Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <div className="column">
                          <ul>
                            <li>
                              <a href="">Тест</a>
                            </li>
                            <li>
                              <a href="">Тест</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span>

                  <span className="menu__sub">
                    <Link className="menu-point">Подарки</Link>
                    <div className="menu menu_sub menu_gift">
                      <div className="container container_f">
                        <div className="column">
                          <ul>
                            <li>
                              <a href="">Тест 2</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span>

                  <span className="menu__drop">
                    <Link to="/actions" className="menu-point sale-point">
                      Акции
                    </Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <div className="column">
                          <ul>
                            <li>
                              <a href="">Распродажа</a>
                            </li>
                            <li>
                              <a href="/actions">Акции</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
                <div className="navigation__right">
                  <form className="search-wrp">
                    <input
                      type="text"
                      className="search"
                      placeholder="Поиск"
                    ></input>
                    <button className="ic i_search"></button>
                  </form>
                  <button
                    className="liked ic i_fav"
                    onClick={() => {
                      document
                        .querySelector(".sidebar-overlay")
                        .classList.add("active");

                      this.setState({ popLike: true });
                    }}
                  ></button>
                  <button
                    className="cart ic i_bag"
                    onClick={() => {
                      document
                        .querySelector(".sidebar-overlay")
                        .classList.add("active");

                      this.setState({ popCart: true });
                    }}
                  ></button>
                  <button
                    className="profile ic i_user"
                    onClick={() => {
                      if (this.props.store.auth) {
                        this.props.history.push("/profile");
                      } else {
                        document
                          .querySelector(".sidebar-overlay")
                          .classList.add("active");

                        this.setState({ popreg: true });
                      }
                    }}
                  ></button>
                </div>
                <div className="menu menu_mega">
                  <div className="container container_f">
                    {this.menuContainer}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                "sidebar" +
                (this.state.popreg || this.state.popCart || this.state.popLike
                  ? " visible"
                  : "")
              }
            >
              <button className="btn btn-head" onClick={this.closeSidebar}>
                Свернуть
              </button>
              {!this.state.popreg && (
                <button
                  className="btn btn-head"
                  onClick={() => {
                    if (this.state.popLike) {
                      this.props.store.likeContainer = [];
                      this.props.store.addToLike();
                    } else {
                      this.props.store.productInCartList = {};
                      this.props.store.addtoCart(true);
                    }
                  }}
                >
                  Очистить
                </button>
              )}
              {this.state.popLike && (
                <LikeSidebar
                  store={this.props.store}
                  closeSidebar={this.closeSidebar}
                />
              )}
              {this.state.popreg && (
                <AuthSidebar closeSidebar={this.closeSidebar} />
              )}
              {this.state.popCart && (
                <CartSidebar
                  store={this.props.store}
                  closeSidebar={this.closeSidebar}
                />
              )}
            </div>

            <div
              className="sidebar-overlay"
              onClick={(e) => {
                this.setState({
                  popreg: false,
                  popCart: false,
                  popLike: false,
                });

                e.target.classList.remove("active");
                document.querySelector(".sidebar").classList.remove("visible");
              }}
            ></div>
          </>
        )
      );
    }

    componentDidMount() {
      this.createMenu();
    }
  }
);

export default withRouter(MenuPoints);
