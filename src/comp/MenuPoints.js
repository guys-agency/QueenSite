import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
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
      $(".menu_sub").removeClass('visible');
      $(".menu_mega").toggleClass("visible");
    };

    toggleDrop = (e) => {
      e.preventDefault();
      $(".menu_mega").removeClass("visible");
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
      $(e.target).addClass("active");
      $(e.target).parent().find(".menu_sub").addClass("visible");
    }

    offDrop = () => {
      $(".menu_sub").removeClass('visible');
      $(".menu-point").removeClass("active");
    }

    closeAll = (e) => {
      $(".menu_mega").removeClass("visible");
      $(".menu_sub").removeClass("visible")
    };

    hoverMenuBtn = (e) => {
      $(".menu-point").removeClass("active");
      $(".menu_sub").removeClass("visible")
    };

    scrollNav = (e) =>{
      var scroll = $(window).scrollTop();
      if (scroll > 55) {
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
      $(".btn-menu").off("click", this.toggleMenu);
      $(".btn-menu").on("click", this.toggleMenu);
      $(".btn-menu").off("mouseenter", this.hoverMenuBtn);
      $(".btn-menu").on("mouseenter", this.hoverMenuBtn);

      $(".menu-point").off("mouseenter", this.toggleDrop);
      $(".menu-point").on("mouseenter", this.toggleDrop);
      $(".menu_sub").off("mouseleave", this.offDrop);
      $(".menu_sub").on("mouseleave", this.offDrop);

      $("html").off("click", this.closeAll);
      $("html").on("click", this.closeAll);

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
          console.log("res", res);
          return res.json();
        })
        .then((data) => {
          console.log("dataCat", data);
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

            menu[i] = (
              <div>
                <h5>{elem.name}</h5>
                <ul>{childsPoints}</ul>
              </div>
            );

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
          console.log("this.menuContainer :>> ", this.menuContainer);
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
                  <Link>
                    Помощь <span className="ic i_drop"></span>
                  </Link>
                  <Link>Бонусы</Link>
                  <button className="link dotted">
                    Москва <span className="ic i_drop"></span>
                  </button>
                </div>
                <Link className="logo" to="/">
                  <img src="/image/logo.svg" />
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
                            <li><a href="">Тест</a></li>
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
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
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
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
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
                            <li><a href="">Тест 2</a></li>
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
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
                <div className="navigation__right">
                  <input className="search" placeholder="Поиск"></input>
                  <button className="liked ic i_fav"></button>
                  <button className="cart ic i_bag"></button>
                  <button
                    className="profile ic i_user"
                    onClick={() => {
                      this.setState({ popreg: true });
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
            {this.state.popreg && (
              <div>
                <h2>test login</h2>
                <button>log</button>
                <button
                  onClick={() => {
                    this.setState({ reg: true, log: false });
                  }}
                >
                  reg
                </button>
                {this.state.log && (
                  <form>
                    <label>login</label>
                    <input
                      onChange={(e) => {
                        this.setState({ login: e.target.value });
                      }}
                    ></input>
                    <label>password</label>
                    <input
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    ></input>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        api.login({
                          email: this.state.login,

                          password: this.state.password,
                        });
                      }}
                    >
                      ok
                    </button>
                  </form>
                )}
                {this.state.reg && (
                  <form>
                    <label>name</label>
                    <input
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    ></input>
                    <label>login</label>
                    <input
                      onChange={(e) => {
                        this.setState({ login: e.target.value });
                      }}
                    ></input>
                    <label>password</label>
                    <input
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    ></input>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        api.regist({
                          email: this.state.login,
                          name: this.state.name,
                          password: this.state.password,
                        });
                      }}
                    >
                      ok
                    </button>
                  </form>
                )}
              </div>
            )}
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
