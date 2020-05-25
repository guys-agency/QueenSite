import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import { Dropdown, Menu } from "semantic-ui-react";
import Cart from "./Cart";
import api from "./api";
const { Component } = React;

const MenuPoints = observer(
  class MenuPoints extends Component {
    state = {
      ready: false,
      popreg: false,
      reg: false,
      log: true,
      login: "",
      password: "",
      name: "",
    };

    menuContainer = [];

    reglog = () => {};

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
      $(e.target).addClass("active");
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
      fetch("http://134.122.81.119/categories", {
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
                <li>
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
              <div className="column">
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

    render() {
      return (
        this.state.ready && (
          <>
            {/* <Menu>{this.menuContainer}</Menu> */}
            <div className="header">
              <div className="container container_f">
                <div className="header__left">
                  <Link>О нас</Link>
                  <Link>Магазины</Link>
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
                  <Link>Бонусы</Link>
                  <span>
                    <button className="link dotted header__btn">
                      Москва <span className="ic i_drop"></span>
                    </button>
                    <form className="header__drop header__drop_city">
                      <div className="input-field">
                        <label className="active" htmlFor="citySearch">
                          Ваш город
                        </label>
                        <input
                          id="citySearch"
                          value="Ка"
                          placeholder="Поиск"
                          type="text"
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
                        <li>
                          <button type="submit">Казань</button>
                        </li>
                        <li>
                          <button type="submit">Калининград</button>
                        </li>
                        <li>
                          <button type="submit">Кабанск</button>
                        </li>
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
                  <a href="tel:+7 495 744-00-50" className="phone">
                    +7 495 744-00-50
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
                    <Link className="menu-point">Коллекции</Link>
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
                    <Link className="menu-point sale-point">Акции</Link>
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
                  <button className="liked ic i_fav"></button>
                  <LikeButton
                    classNameProp="cart ic i_bag"
                    to="/cart"
                  ></LikeButton>
                  <button
                    className="profile ic i_user"
                    onClick={() => {
                      document
                        .querySelector(".sidebar-overlay")
                        .classList.add("active");
                      this.setState({ reg: false });
                      this.setState({ popreg: true });
                      this.setState({ log: true });
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

            <div className={"sidebar" + (this.state.popreg ? " visible" : "")}>
              <button
                className="btn btn-head"
                onClick={() => {
                  this.setState({ popreg: false });
                  document
                    .querySelector(".sidebar-overlay")
                    .classList.remove("visible");
                }}
              >
                Свернуть
              </button>

              <div className="tumbler">
                <button
                  className={this.state.log ? " active" : ""}
                  onClick={() => {
                    this.setState({ reg: false, log: true });
                  }}
                >
                  Вход
                </button>
                <button
                  className={this.state.reg ? " active" : ""}
                  onClick={() => {
                    this.setState({ reg: true, log: false });
                  }}
                >
                  Регистрация
                </button>
              </div>

              <form className={this.state.log ? " visible" : ""}>
                <div className="input-field">
                  <label className="required" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ login: e.target.value });
                    }}
                  />
                </div>

                <div className="input-field">
                  <label className="required" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    id="password"
                    type="password"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ login: e.target.value });
                    }}
                  />
                </div>

                <button
                  className="btn btn_primary"
                  onClick={(e) => {
                    e.preventDefault();
                    api.login({
                      email: this.state.login,

                      password: this.state.password,
                    });
                  }}
                >
                  Войти
                </button>
                <button className="link dotted forgot-btn">
                  Забыли пароль?
                </button>
              </form>
              <form className={this.state.reg ? " visible" : ""}>
                <div className="input-field">
                  <label className="required" htmlFor="name">
                    Имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </div>

                <div className="input-field">
                  <label className="required" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="text"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ login: e.target.value });
                    }}
                  />
                </div>

                <div className="input-field">
                  <label className="required" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    id="password"
                    type="password"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </div>

                <div className="input-field">
                  <label className="required" htmlFor="password_confirm">
                    Пароль еще раз
                  </label>
                  <input
                    id="password_confirm"
                    type="password"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      // this.setState({ password: e.target.value });
                    }}
                  />
                </div>
                <button
                  className="btn btn_primary"
                  onClick={(e) => {
                    e.preventDefault();
                    api.regist({
                      email: this.state.login,
                      name: this.state.name,
                      password: this.state.password,
                    });
                  }}
                >
                  Регистрация
                </button>
              </form>
            </div>

            <div
              className="sidebar-overlay"
              onClick={(e) => {
                this.setState({ reg: false });
                this.setState({ popreg: false });
                this.setState({ log: true });

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

export default MenuPoints;