import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
import LikeSidebar from "./LikeSidebar";
import AuthSidebar from "./AuthSidebar";
import AskSidebar from "./AskSidebar";
import CartSidebar from "./CartSidebar";
import GiftSidebar from "./GiftSidebar";
import { withRouter } from "react-router";
import { SERVER_URL } from "../constants";
import ChangeSidebar from "./ChangeProfileData";
import CityCh from "./CityCh";
import api from "./api";
import localStorage from "mobx-localstorage";
import store from "../MobxStore";
import moment from "moment";
import Swiper from "react-id-swiper";

const { Component } = React;

const MenuPoints = observer(
  class MenuPoints extends Component {
    state = {
      cities: [],
      ready: false,
      popreg: false,

      reg: false,
      log: false,
      login: "",
      password: "",
      name: "",
    };

    menuContainer = [];
    premium = [];
    gifts = [];
    interier = [];

    reglog = () => {};
    timeout = null;
    test1 = "";
    test2 = "";

    phone = (
      <div className="header__right">
        {/* <button
          className="link dotted ask"
          onClick={() => {
            document.querySelector(".sidebar-overlay").classList.add("active");

            document.querySelector("body").classList.add("no-scroll");

            this.props.store.sideAsk = true;
          }}
        >
          Задать вопрос
        </button> */}
        <CityCh store={this.props.store} />
        <a href="tel:88006003421" className="phone">
          8 800 600-34-21
        </a>
      </div>
    );

    typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    service = (
      <div className="header__drop" style={{ width: "160px" }}>
        <button
          className="btn btn_wide vis-s"
          onClick={(e) => {
            $(".header__drop").removeClass("visible");
          }}
        >
          <span className="ic i_left"></span> Назад
        </button>
        <ul>
          {/* <li>
            <Link to="/help/delivery" onClick={this.closeNav}>
              Доставка
            </Link>
          </li>
          <li>
            <Link to="/help/payment" onClick={this.closeNav}>
              Оплата
            </Link>
          </li>
          <li>
            <Link to="/help/garantie" onClick={this.closeNav}>
              Гарантия
            </Link>
          </li> */}
          <li>
            <Link to="/help/garantie" onClick={this.closeNav}>
              Гарантия
            </Link>
          </li>
          <li>
            <Link to="/help/return" onClick={this.closeNav}>
              Возврат
            </Link>
          </li>
          <li>
            <Link to="/shops" onClick={this.closeNav}>
              Магазины
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={this.closeNav}>
              О нас
            </Link>
          </li>
          <li>
            <Link to="/help/offer" onClick={this.closeNav}>
              Публичная оферта
            </Link>
          </li>
          <li>
            <Link to="/help/policy" onClick={this.closeNav}>
              Конфиденциальность
            </Link>
          </li>
          {/* <li>
            <Link to="/help/cppd" onClick={this.closeNav}>
              Согласие на обработку персональных данных
            </Link>
          </li> */}
          <li>
            <Link to="/help/certificate" onClick={this.closeNav}>
              Сертификат
            </Link>
          </li>
          <li>
            <Link to="/help/bonus" onClick={this.closeNav}>
              Бонусы
            </Link>
          </li>
          <li>
            <Link to="/help/vacancy" onClick={this.closeNav}>
              Вакансии
            </Link>
          </li>

          {/* <li>
            <Link to="/help/bonus">Бонусы</Link>
          </li> */}
        </ul>
      </div>
    );

    searchValue = "";

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
      // e.preventDefault();
      if (!this.typeDevice) {
        $(".menu_mega").removeClass("visible");
      }

      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
      $(".header__drop").removeClass("visible");
      $(".header__btn").removeClass("active");
      $(e.target).toggleClass("active");
      $(e.target).parent().find(".menu_sub").toggleClass("visible");
      if ($(window).width() <= 760) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    offDrop = () => {
      $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
    };

    closeNav = (e) => {
      $("body").removeClass("no-scroll");
      $(".navigation").removeClass("visible");
      $(".sidebar-overlay").removeClass("active");
      $(".menu-point").removeClass("active");
      $(".header__btn").removeClass("active");
      var mega = $(".menu");
      var trgClass = $(e.target).hasClass("menu");
      if (!trgClass) {
        mega.removeClass("visible");
      }
    };

    closeAll = (e) => {
      e.stopPropagation();
      // $(".menu_mega").removeClass("visible");
      // $(".menu_sub").removeClass("visible");
      $(".menu-point").removeClass("active");
      $(".header__btn").removeClass("active");
      var container = $(".header__drop");
      if (container.has(e.target).length === 0) {
        container.removeClass("visible");
      }

      var mega = $(".menu");
      var trgClass =
        $(e.target).is(
          ".menu, .container_f, .swiper-container, .swiper-wrapper, .swiper-slide, .colors-in-menu, .column, .swiper-button-color-next, .swiper-button-color-prev"
        ) || $(e.target).parent().hasClass(".swiper-slide");
      if (!trgClass && !this.typeDevice) {
        mega.removeClass("visible");
      }

      // if ($(window).width() < 760) {

      // }

      // var mega = $(".menu");
      // if (mega.has(e.target).length === 0) {
      //   console.log(1);

      //   mega.removeClass("visible");
      // } else {

      // }
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
      } else if (scroll < 55) {
        $(".header").removeClass("header_scroll");
        $(".navigation").removeClass("navigation_scroll");
      }
    };

    componentDidMount() {
      this.createMenu();
      if (this.props.store.auth) {
        api
          .getUserData()
          .then((data) => {
            // this.props.store.addToLike(true);
            if (data.status === 404 || data.status === 401) {
              localStorage.removeItem("auth");
              api
                .logout()
                .then(() => {})
                .catch((err) => {
                  console.log("err :>> ", err);
                });
            } else {
              this.props.store.userData = data;
            }

            // console.log(
            //   "this.props.store.userData :>> ",
            //   this.props.store.userData
            // );
          })
          .catch((err) => {
            // localStorage.removeItem("auth");
            // this.auth = false;
            console.log("err :>> ", err);
          });
      }
    }

    componentDidUpdate() {
      $(".header__btn").off("click", this.toggleHeader);
      $(".header__btn").on("click", this.toggleHeader);

      $(".btn-menu").off("click", this.toggleMenu);
      $(".btn-menu").on("click", this.toggleMenu);

      var self = this;
      $(window).off("resize");
      $(window)
        .on("resize", function () {
          if ($(window).width() > 760) {
            $(".btn-menu").off("mouseenter", self.hoverMenuBtn);
            $(".btn-menu").on("mouseenter", self.hoverMenuBtn);
            // $(".menu-point_gifts").on("click", (e) => {
            //   console.log(
            //     "object :>> ",
            //     $(e.target).parent().find(".menu_sub").hasClass("visible")
            //   );
            //   if ($(e.target).parent().find(".menu_sub").hasClass("visible")) {
            //     self.offDrop();
            //   }
            // });

            $(".menu-point").off("mouseenter", self.toggleDrop);
            $(".menu-point").on("mouseenter", self.toggleDrop);
            $(".menu-point_news").off("mouseenter", self.toggleDrop);
            $(".menu_sub").off("mouseleave", self.offDrop);
            $(".menu_sub").on("mouseleave", self.offDrop);

            // $(".menu-point_gifts").off("mouseenter", self.toggleDrop);
            // $(".menu_gift").off("mouseleave", self.offDrop);
            // $(e.target).parent().find(".menu_sub").toggleClass("visible");
          } else {
            $(".btn-menu").off("mouseenter", self.hoverMenuBtn);
            $(".menu-point").off("mouseenter", self.toggleDrop);
            $(".menu_sub").off("mouseleave", self.offDrop);
            // $(".menu-point_gifts").off("click", self.toggleDrop);

            $(".menu-point").off("click", self.toggleDrop);
            $(".menu-point").on("click", self.toggleDrop);
            $(".menu-point_news").off("click", self.toggleDrop);
            $(".menu-point_news").on("click", self.closeNav);
            $(".menu-point_collections").off("click", self.toggleDrop);
            $(".menu-point_collections").on("click", self.closeNav);
            $(".menu-point_gifts").off("click", self.toggleDrop);
            $(".menu-point_gifts").on("click", self.closeNav);
            $(".sale-point").off("click", self.toggleDrop);
            $(".sale-point").on("click", self.closeNav);
            $(".menu_sub").off("click", self.toggleDrop);
            if (
              document.body.clientWidth < 760 &&
              localStorage.getItem("city") !== null &&
              localStorage.getItem("city") !== undefined &&
              document.querySelector(".sidebar-overlay") !== null &&
              localStorage.getItem("city").sourse === "Y"
            ) {
              document.querySelector(".sidebar-overlay").classList.add("active");
              document.querySelector(".sidebar-overlay").classList.add("city");
              document.querySelector("body").classList.add("no-scroll");
            }
          }
        })
        .resize();

      // if ($(".sort").length) {
      //   $(".head_filter").addClass("visible");
      // }

      $(document).off("click", this.closeAll);
      $(document).on("click", this.closeAll);

      $(window).off("scroll", this.scrollNav);
      $(window).on("scroll", this.scrollNav);

      var scroll = $(window).scrollTop();
      if (scroll > 55) {
        $(".header__drop").removeClass("visible");
        $(".header").addClass("header_scroll");
        $(".navigation").addClass("navigation_scroll");
      }
    }

    loaderIncPlus = () => {
      const intLoader = setInterval(() => {
        // console.log(
        //   "this.props.store.loaderPercent :>> ",
        //   this.props.store.loaderPercent
        // );
        if (this.props.store.loaderPercent <= this.props.store.loaderInc + 1) {
          this.props.store.loaderPercent += 3;
        }
        if (this.props.store.loaderPercent >= 100) {
          $(".loader-page").addClass("deact");
          this.props.store.loaderPercent = 0;
          // $(".loader-page").remove();
          // $("body").addClass("no-scroll");
          // $("body").removeClass("no-scroll");
          clearInterval(intLoader);
        }
      }, 50);

      // if (this.props.store.loaderPercent <= this.props.store.loaderInc) {
      //   this.props.store.loaderPercent += 1;
      //   setTimeout(() => {
      //     this.loaderIncPlus();
      //   }, this.props.store.loaderPercent * 500);
      // }
    };

    createMenu = () => {
      this.props.store.loaderInc = 50;
      if (
        window.location.pathname.includes("/cart") ||
        window.location.pathname.includes("/finish/")
        // ||
        // window.location.pathname.includes("/product/")
      ) {
        this.props.store.loaderPercent = 100;
      }

      //http://127.0.0.1:3000/product/5637281928

      // if (
      //   window.location.pathname.includes("/product/") &&
      //   window.location.pathname.includes("&")
      // ) {
      //   console.log("12312 :>> ", 12312);
      //   fetch(
      //     SERVER_URL + "/prodbfcheck/" + window.location.pathname.split("&")[1],
      //     {
      //       method: "GET",
      //       credentials: "include",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //     .then((res) => {
      //       return res.json();
      //     })
      //     .then((s) => {
      //       console.log("s :>> ", s);
      //       if (s.stasus === 201) {
      //         this.props.history.push(
      //           "/product/" +
      //             window.location.pathname.split("&")[0].split("/product/")[1]
      //         );
      //       }
      //     })
      //     .catch((err) => console.log("err", err));
      // }

      this.loaderIncPlus();
      fetch(SERVER_URL + "/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((dataObj) => {
          const data = dataObj.cats;

          dataObj.colors.sort((prev, next) => {
            if (prev < next) return -1;
            if (prev > next) return 1;
            return 1;
          });
          const menu = {};
          // console.log("data :>> ", data);

          data.forEach((elem, i) => {
            const childsPoints = [];
            if (elem.name === "Подарки") {
              elem.childs.push({
                name: "Сертификаты",
                slug: "sertificats",
              });
            }

            this.props.store.menuAccor[elem.slug] = elem.name;

            elem.childs.sort((prev, next) => {
              if (prev.name.includes(" до ") && next.name.includes(" до ")) {
                if (+prev.name.split(" до ")[1].split(" ")[0] < +next.name.split(" до ")[1].split(" ")[0]) return -1;
                if (+prev.name.split(" до ")[1].split(" ")[0] > +next.name.split(" до ")[1].split(" ")[0]) return 1;
                return 1;
              } else {
                if (prev.name < next.name) return -1;
                if (prev.name > next.name) return 1;
                return 1;
              }
            });
            const firstName = ["Учителям", "Влюбленным", "Женщинам", "Мужчинам", "Родителям"];
            const first = [];

            elem.childs.forEach((child, iCh) => {
              this.props.store.menuAccor[child.slug] = child.name;
              //убрать tr, так как будут поля с транскрипцией в бд
              if (elem.name === "Подарки" && firstName.includes(child.name)) {
                first.push(
                  <li key={child.name}>
                    <NavLink to={`/catalog/${elem.slug}/${child.slug}`} onClick={this.closeNav}>
                      {child.name}
                    </NavLink>
                  </li>
                );
              } else {
                childsPoints.push(
                  <li key={child.name}>
                    <NavLink to={`/catalog/${elem.slug}/${child.slug}`} onClick={this.closeNav}>
                      {child.name}
                    </NavLink>
                  </li>
                );
              }
            });

            const menuElem = () => {
              if (this.typeDevice) {
                return (
                  <span className="menu__drop" key={elem.name}>
                    <Link className="menu-point">{elem.name}</Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <button
                          className="btn btn_prev"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.target.closest(".menu_sub").classList.remove("visible");
                          }}
                        >
                          <span className="ic i_left"></span> Назад
                        </button>
                        <div className="column">{<ul>{childsPoints}</ul>}</div>
                      </div>
                    </div>
                  </span>
                );
              }
              return (
                <div key={elem.name}>
                  <h5>{elem.name}</h5>
                  <ul>{childsPoints}</ul>
                </div>
              );
            };

            if (elem.name === "Сервизы") {
              childsPoints.unshift(
                <li key={"Собрать сервиз"}>
                  <NavLink to={`/sborka-serviza`} onClick={this.closeNav}>
                    Собрать сервиз
                  </NavLink>
                </li>
              );
              menu[0] = menuElem();
            } else if (elem.name === "Сервировка стола") {
              menu[1] = menuElem();
            } else if (elem.name === "Для приготовления") {
              menu[2] = menuElem();
            } else if (elem.name === "Напитки") {
              menu[3] = menuElem();
            } else if (elem.name === "Кофе и чай") {
              menu[4] = menuElem();
            } else if (elem.name === "Аксессуары для стола") {
              menu[5] = menuElem();
            } else if (elem.name === "Интерьер") {
              menu[6] = menuElem();
              this.interier.push(<ul key={elem.name}>{childsPoints}</ul>);
            } else if (elem.name === "Наборы") {
              menu[7] = menuElem();
            } else if (elem.name === "Premium") {
              this.premium.push(<ul key={elem.name}>{childsPoints}</ul>);
            } else if (elem.name === "Подарки") {
              let ind = 0;
              let sum = 0;
              let key = 1;
              let timeCont = [];

              // childsPoints.sort((prev, next) => {
              //   console.log("object :>> ", prev, next);
              //   if (prev.name.includes(" до ") && next.name.includes(" до ")) {
              //     if (+prev.name.split(" до ")[1] < +next.name.split(" до ")[1])
              //       return -1;
              //     if (prev.name < next.name) return 1;
              //     return 1;
              //   } else {
              //     if (prev.name < next.name) return -1;
              //     if (prev.name > next.name) return 1;
              //     return 1;
              //   }
              // });
              if (first.length) {
                this.gifts.push(
                  <div className="column" key="0">
                    <ul>{first}</ul>
                  </div>
                );
              }
              childsPoints.forEach((elem) => {
                if (ind < 4 && sum < childsPoints.length - 1) {
                  timeCont.push(elem);
                  ind += 1;
                  sum += 1;
                } else {
                  timeCont.push(elem);
                  this.gifts.push(
                    <div className="column" key={key}>
                      <ul>{timeCont}</ul>
                    </div>
                  );
                  key += 1;
                  timeCont = [];
                  ind = 0;
                  sum += 1;
                }
              });
            }

            const headCar = {
              direction: "vertical",
              slidesPerGroup: 7,
              slidesPerView: 7,

              preventClicksPropagation: true,
              preventClicks: true,
              mousewheel: true,
              draggable: true,
              height: 210,
              navigation: {
                nextEl: ".swiper-button-color-next",
                prevEl: ".swiper-button-color-prev",
              },
            };

            if (this.typeDevice) {
              menu[8] = (
                <span className="menu__drop" key="colors">
                  <Link className="menu-point">Цвета</Link>
                  <div className="menu menu_sub">
                    <div className="container container_f">
                      <button
                        className="btn btn_prev"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.target.closest(".menu_sub").classList.remove("visible");
                        }}
                      >
                        <span className="ic i_left"></span> Назад
                      </button>
                      <div className="column">
                        {
                          <ul>
                            {dataObj.colors.map((el) => {
                              return (
                                <li key={el}>
                                  <NavLink to={`/colors/${el}`} onClick={this.closeNav}>
                                    {el}
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        }
                      </div>
                    </div>
                  </div>
                </span>
              );
            } else {
              menu[8] = (
                <div key="colors" className="colors-in-menu">
                  <h5>Цвета</h5>
                  <Swiper {...headCar}>
                    {dataObj.colors.map((el) => {
                      return (
                        <div>
                          <NavLink to={`/colors/${el}`} onClick={this.closeNav}>
                            {el}
                          </NavLink>
                        </div>
                      );
                    })}
                  </Swiper>
                </div>
              );
            }

            // this.menuContainer.push(
            //   <Dropdown key={i} text={elem.name} pointing className="link item">
            //     <Dropdown.Menu>{childsPoints}</Dropdown.Menu>
            //   </Dropdown>
            // );
          });

          this.props.store.fullCats = data;
          if (this.typeDevice) {
            this.menuContainer = Object.values(menu);
          } else {
            for (let index = 0; index < Object.keys(menu).length; index += 2) {
              if (index === 2) {
                this.menuContainer.push(
                  <div className="column" key={index}>
                    {menu[index]}
                    {menu[index + 1]}
                    {menu[index + 2]}
                  </div>
                );
                index += 1;
              } else {
                this.menuContainer.push(
                  <div className="column" key={index}>
                    {menu[index]}
                    {menu[index + 1]}
                  </div>
                );
              }
            }
          }

          this.props.store.loaderInc = 100;

          // this.loaderIncPlus();
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
      this.props.store.sideAsk = false;
      this.props.store.sideLogin = false;
      this.props.store.sideGift = false;
      this.props.store.changeSide = false;
      document.querySelector(".sidebar-overlay").classList.remove("active");
      $("body").removeClass("no-scroll");
      $(".navigation").removeClass("visible");
    };

    hideSidebar = (e) => {
      if (!$(".navigation").hasClass("visible")) {
        document.querySelector(".sidebar-overlay").classList.remove("active");
        $("body").removeClass("no-scroll");
      }

      this.setState({
        popreg: false,
        popCart: false,
        popLike: false,
      });
    };

    render() {
      const { collInMenu, onePlusOneSlug, oneEqTwo } = this.props.store;

      const inBF = moment().utcOffset("+03:00").month() === 0 && moment().utcOffset("+03:00").date() >= 24;
      const inVD = moment().utcOffset("+03:00").month() === 1 && moment().utcOffset("+03:00").date() <= 14;

      // const { store } = this.props;
      // const { collectionsData } = store;
      // if (collectionsData.length) {
      //   collectionsData.forEach((el, i) => {
      //     if (i === 0) {
      //       mainBan.push(
      //         <Link
      //           className="head-banner"
      //           style={{
      //             backgroundImage: `url(/image/banners/${
      //               typeDevice ? el["image-mob-large"] : el["image-desc-large"]
      //             })`,
      //           }}
      //           to={"collections/" + el.slug}
      //         ></Link>
      //       );
      //     } else {
      //       renderColl.push(
      //         <div className="col" key={el.name}>
      //           <Link
      //             href="#"
      //             className="banner banner_overlay main"
      //             to={"collections/" + el.slug}
      //             style={{
      //               backgroundImage: `url(/image/banners/${
      //                 typeDevice
      //                   ? el["image-mob-small"]
      //                   : el["image-desc-small"]
      //               })`,
      //             }}
      //           >
      //             <div className="banner__desc">{el.name}</div>
      //           </Link>
      //         </div>
      //       );
      //     }
      //   });

      return (
        this.state.ready && (
          <>
            {moment("01.02.2021", "DD.MM.YYYY").isAfter(moment()) && !this.props.location.pathname.includes("/cart") && (
              <div className="ny-warning">
                <p>Баланс бонусов удвоен до 01.02</p>
              </div>
            )}
            {/* <Menu>{this.menuContainer}</Menu> */}
            <div
              className={
                "header " +
                (this.props.location.pathname.includes("/catalog") ||
                this.props.location.pathname.includes("/profile") ||
                this.props.location.pathname.includes("/about") ||
                this.props.location.pathname.includes("/product") ||
                this.props.location.pathname.includes("/closeout") ||
                this.props.location.pathname.includes("/sets") ||
                this.props.location.pathname.includes("/colors") ||
                this.props.location.pathname.includes("/ideas") ||
                this.props.location.pathname.includes("/hits") ||
                (this.props.location.pathname.includes("/new") && !this.props.location.pathname.includes("/new-")) ||
                this.props.location.pathname.includes("/help") ||
                this.props.location.pathname.includes("/search")
                  ? "header_w "
                  : " ") +
                (this.props.location.pathname.includes("/finish") || this.props.location.pathname.includes("/cart") ? "header_dn " : " ")
              }
            >
              <div className="container container_f">
                <button
                  className="ic i_menu mobile-menu"
                  onClick={() => {
                    $("body").toggleClass("no-scroll");
                    $(".navigation").toggleClass("visible");
                    $(".sidebar-overlay").toggleClass("active");
                  }}
                ></button>
                <Link className="logo logo_vl" to="/">
                  <span className="i_queen"></span>
                  <span className="i_of"></span>
                  <span className="i_bohemia"></span>
                  <span className="i_qd"></span>
                </Link>
                <div className="header__left">
                  <Link to="/help/delivery" onClick={this.closeNav}>
                    Доставка
                  </Link>
                  <Link to="/help/payment" onClick={this.closeNav}>
                    Оплата
                  </Link>
                  <Link to="/help/garantie" onClick={this.closeNav}>
                    Гарантия
                  </Link>
                  <Link to="/help/return" onClick={this.closeNav}>
                    Возврат
                  </Link>

                  <Link to="/shops" onClick={this.closeNav}>
                    Магазины
                  </Link>
                  {$(window).width() > 760 ? (
                    <span>
                      <span className="link header__btn">
                        Еще <span className="ic i_drop"></span>
                      </span>
                      {this.service}
                    </span>
                  ) : (
                    <Link to="/help/payment" onClick={this.closeNav}>
                      Помощь
                    </Link>
                  )}
                  {/* <span>
                    <span className="link header__btn">
                      Помощь <span className="ic i_drop"></span>
                    </span>
                    {this.service}
                  </span> */}
                  {/* <Link className="header__left-bonus" to="/help/bonus">
                    Бонусы
                  </Link> */}
                </div>
                {/* <Link className="logo" to="/">

                  <img src="/image/logo.svg" />
                </Link> */}
                {/* <Link className="logo logo_vl" to="/">
                  <span className="i_queen"></span>
                  <span className="i_of"></span>
                  <span className="i_bohemia"></span>
                  <span className="i_qd"></span>
                </Link> */}

                {this.phone}

                {/* <button
                  className={
                    "ic i_filter head_filter vis-s " +
                    (this.props.location.pathname.includes("catalog") ||
                    this.props.location.pathname.includes("collections/") ||
                    this.props.location.pathname.includes("actions/") ||
                    this.props.location.pathname.includes("main/") ||
                    this.props.location.pathname.includes("/closeout") ||
                    this.props.location.pathname.includes("/ideas") ||
                    this.props.location.pathname.includes("/hits") ||
                    this.props.location.pathname.includes("/brand/") ||
                    this.props.location.pathname.includes("/new")
                      ? "visible "
                      : " ")
                  }
                  onClick={(e) => {
                    e.target.classList.toggle("active");
                    document
                      .querySelector(".catalog__bar")
                      .classList.toggle("visible");
                    document
                      .querySelector(".sidebar-overlay")
                      .classList.add("active");
                  }}
                ></button> */}

                <button
                  className="cart ic i_bag"
                  onClick={() => {
                    document.querySelector(".sidebar-overlay").classList.add("active");

                    document.querySelector("body").classList.add("no-scroll");

                    this.setState({ popCart: true });
                  }}
                >
                  {this.props.store.cartCount !== 0 && (
                    <span className="i_bag__counter">
                      {this.props.store.cartCount > 9 ? 9 : this.props.store.cartCount === 0 ? "" : this.props.store.cartCount}
                    </span>
                  )}
                </button>

                <div className="tooltip tooltip_cart">
                  <div className="tooltip__content">
                    <span className="ic i_plus"></span>
                    <div className="text">Кружка 370 мл Модерн, черная матовая</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "navigation " +
                (this.props.location.pathname.includes("/catalog") ||
                this.props.location.pathname.includes("/profile") ||
                this.props.location.pathname.includes("/about") ||
                this.props.location.pathname.includes("/product") ||
                this.props.location.pathname.includes("/closeout") ||
                this.props.location.pathname.includes("/colors") ||
                this.props.location.pathname.includes("/ideas") ||
                this.props.location.pathname.includes("/hits") ||
                (this.props.location.pathname.includes("/new") && !this.props.location.pathname.includes("/new-")) ||
                this.props.location.pathname.includes("/help")
                  ? "navigation_w "
                  : " ") +
                (this.props.location.pathname.includes("/finish") || this.props.location.pathname.includes("/cart") ? "navigation_dn " : " ")
              }
            >
              <div className="container container_f">
                <div className="navigation__city-ch">
                  <h5>Населенный пункт:</h5>
                  <CityCh store={this.props.store} />
                  {this.phone}
                </div>
                <div className="navigation__left">
                  <Link to="/" className="ic i_qd"></Link>
                  <button className="btn btn_primary btn-menu">
                    {" "}
                    <span className="ic i_menu"></span> Каталог
                  </button>
                  <span className="menu__sub ">
                    <Link to="/collections" className="menu-point menu-point_collections">
                      Коллекции
                    </Link>
                    <div className="menu menu_sub menu_collection">
                      <div className="container container_f">
                        <button
                          className="btn btn_prev"
                          onClick={(e) => {
                            e.target.closest(".menu").classList.remove("visible");
                          }}
                        >
                          <span className="ic i_left"></span> Назад
                        </button>
                        {collInMenu}
                      </div>
                    </div>
                  </span>

                  {/* <span className="menu__drop">
                    <Link to="/catalog/premium" className="menu-point">
                      Премиум
                    </Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <button
                          className="btn btn_prev"
                          onClick={(e) => {
                            e.target.closest(".menu").classList.remove("visible");
                            $(".navigation").scrollTop(0);
                          }}
                        >
                          <span className="ic i_left"></span> Назад
                        </button>
                        <div className="column">{this.premium}</div>
                      </div>
                    </div>
                  </span> */}

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
                    <Link to="/catalog/interer" className="menu-point">
                      Интерьер
                    </Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <button
                          className="btn btn_prev"
                          onClick={(e) => {
                            e.target.closest(".menu").classList.remove("visible");
                          }}
                        >
                          <span className="ic i_left"></span> Назад
                        </button>
                        <div className="column">{this.interier}</div>
                      </div>
                    </div>
                  </span>

                  <span className="menu__sub">
                    <Link
                      to="/gifts"
                      className="menu-point menu-point_gifts"
                      onClick={(e) => {
                        // this.toggleDrop(e);
                        // e.preventDefault();
                      }}
                    >
                      Подарки
                    </Link>
                    <div className="menu menu_sub menu_gift">
                      <div className="container container_f">
                        <button
                          className="btn btn_prev"
                          onClick={(e) => {
                            e.target.closest(".menu").classList.remove("visible");
                          }}
                        >
                          <span className="ic i_left"></span> Назад
                        </button>
                        {this.gifts}
                      </div>
                    </div>
                  </span>

                  {$(window).width() > 840 && (
                    <span className="menu__drop">
                      <Link to="/new" className="menu-point menu-point_news">
                        Новинки
                      </Link>
                    </span>
                  )}

                  {/* <span className="menu__drop">
                    <Link to="/catalog/interer" className="menu-point">
                      Интерьер
                    </Link>
                    <div className="menu menu_sub">
                      <div className="container container_f">
                        <button
                          className="btn btn_prev"
                          onClick={(e) => {
                            e.target.closest(".menu").classList.remove("visible");
                          }}
                        >
                          <span className="ic i_left"></span> Назад
                        </button>
                        <div className="column">{this.interier}</div>
                      </div>
                    </div>
                  </span> */}

                  {!inBF && (
                    <span className="menu__drop">
                      <Link
                        to="/actions"
                        className="menu-point"
                        onClick={(e) => {
                          // this.toggleDrop(e);
                          // e.preventDefault();
                        }}
                      >
                        Акции
                      </Link>
                      <div className="menu menu_sub">
                        <div className="container container_f">
                          <button
                            className="btn btn_prev"
                            onClick={(e) => {
                              e.target.closest(".menu").classList.remove("visible");
                            }}
                          >
                            <span className="ic i_left"></span> Назад
                          </button>
                          <div className="column">
                            <ul>
                              <li>
                                <NavLink to="/closeout" onClick={this.closeNav}>
                                  Распродажа
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/actions" onClick={this.closeNav}>
                                  Акции
                                </NavLink>
                              </li>
                              {onePlusOneSlug && (
                                <li>
                                  <NavLink to={`/main/${onePlusOneSlug}`} onClick={this.closeNav}>
                                    1 + 1 = 3
                                  </NavLink>
                                </li>
                              )}
                              {oneEqTwo && (
                                <li>
                                  <NavLink to={`/sets`} onClick={this.closeNav}>
                                    1 = 2
                                  </NavLink>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </span>
                  )}

                  {inBF && (
                    <span className="menu__drop">
                      {localStorage.getItem("CMcheck") === true || localStorage.getItem("CMcheck") === "true" ? (
                        <Link to="/close-sale" className="menu-point menu-point_news" style={{ color: "#BA250D", fontWeight: "600" }}>
                          Закрытая распродажа
                        </Link>
                      ) : (
                        <Link to="/cyber-monday" className="menu-point menu-point_news" style={{ color: "#BA250D", fontWeight: "600" }}>
                          КиберПонедельник
                        </Link>
                      )}
                    </span>
                  )}
                  {inVD && (
                    <span className="menu__drop">
                      <Link to="/main/podarki_vlyublennym" className="menu-point menu-point_news" style={{ color: "#BA250D", fontWeight: "600" }}>
                        День Валентина
                      </Link>
                    </span>
                  )}
                </div>
                <div className="search-pos">
                  <form className="search-wrp">
                    <input
                      type="text"
                      className="search"
                      placeholder="Поиск"
                      defaultValue={this.props.store.searchText}
                      onChange={(e) => {
                        this.searchValue = e.target.value;
                      }}
                    ></input>
                    <button
                      className="ic i_search"
                      onClick={(e) => {
                        // this.props.store.searchText = this.searchValue;

                        if (!window.location.pathname.includes("search")) {
                          this.props.store.productsToRender = [];
                        }

                        this.props.history.push(`/search?search=${encodeURIComponent(this.searchValue)}`);

                        e.preventDefault();
                        this.closeNav(e);
                      }}
                    ></button>
                  </form>
                </div>
                <div className="navigation__buttons">
                  <button
                    className="liked ic i_fav"
                    onClick={() => {
                      document.querySelector(".sidebar-overlay").classList.add("active");

                      document.querySelector("body").classList.add("no-scroll");

                      this.setState({ popLike: true });
                    }}
                  >
                    <span className="vis-s">Избранное</span>
                  </button>

                  <div className="tooltip tooltip_cart">
                    <div className="tooltip__content">
                      <span className="ic i_plus"></span>
                      <div className="text">Кружка 370 мл Модерн, черная матовая</div>
                    </div>
                  </div>
                  <button
                    className="profile ic i_user"
                    onClick={() => {
                      if (this.props.store.auth) {
                        this.props.history.push("/profile");
                      } else {
                        document.querySelector(".sidebar-overlay").classList.add("active");

                        document.querySelector("body").classList.add("no-scroll");

                        this.props.store.sideLogin = true;
                      }
                    }}
                  >
                    <span className="vis-s">Войти</span>
                  </button>
                  <button
                    className="cart ic i_bag"
                    onClick={() => {
                      document.querySelector(".sidebar-overlay").classList.add("active");

                      document.querySelector("body").classList.add("no-scroll");

                      this.setState({ popCart: true });
                    }}
                  >
                    {this.props.store.cartCount !== 0 && (
                      <span className="i_bag__counter">
                        {this.props.store.cartCount > 9 ? 9 : this.props.store.cartCount === 0 ? "" : this.props.store.cartCount}
                      </span>
                    )}
                  </button>
                </div>
                <div className="navigation__service">
                  <Link to="/help/delivery" onClick={this.closeNav}>
                    Доставка
                  </Link>
                  <Link to="/help/payment" onClick={this.closeNav}>
                    Оплата
                  </Link>
                  <Link to="/help/garantie" onClick={this.closeNav}>
                    Гарантия
                  </Link>
                  <Link to="/help/return" onClick={this.closeNav}>
                    Возврат
                  </Link>

                  <Link to="/shops" onClick={this.closeNav}>
                    Магазины
                  </Link>

                  <Link to="/about" onClick={this.closeNav}>
                    О нас
                  </Link>

                  <Link to="/help/offer" onClick={this.closeNav}>
                    Публичная оферта
                  </Link>

                  <Link to="/help/certificate" onClick={this.closeNav}>
                    Сертификат
                  </Link>

                  <Link to="/help/bonus" onClick={this.closeNav}>
                    Бонусы
                  </Link>

                  {$(window).width() > 760 ? (
                    <span>
                      <span className="link header__btn">
                        Помощь <span className="ic i_drop"></span>
                      </span>
                      {this.service}
                    </span>
                  ) : null}
                  {/* <span>
                    <span className="link header__btn">
                      Помощь <span className="ic i_drop"></span>
                    </span>
                    {this.service}
                  </span> */}
                  {/* <Link className="header__left-bonus" to="/help/bonus">
                    Бонусы
                  </Link> */}
                </div>
                <div className="menu menu_mega">
                  <div className="container container_f">
                    <button
                      className="btn btn_prev"
                      onClick={(e) => {
                        e.target.closest(".menu").classList.remove("visible");
                      }}
                    >
                      <span className="ic i_left"></span> Назад
                    </button>
                    {this.menuContainer}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                "sidebar" +
                (this.props.store.sideLogin ||
                this.props.store.sideGift ||
                this.state.popCart ||
                this.state.popLike ||
                this.props.store.sideAsk ||
                this.props.store.changeSide
                  ? " visible"
                  : "")
              }
            >
              <div className="sidebar__head">
                <button className="btn btn-head" onClick={this.closeSidebar}>
                  Свернуть
                </button>
                {(this.state.popLike || this.state.popCart) && (
                  <button
                    className="link dotted"
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
              </div>
              {this.state.popLike && <LikeSidebar store={this.props.store} closeSidebar={this.closeSidebar} />}
              {this.props.store.sideAsk && <AskSidebar store={this.props.store} closeSidebar={this.closeSidebar} />}
              {this.props.store.changeSide && <ChangeSidebar store={this.props.store} closeSidebar={this.closeSidebar} />}
              {this.props.store.sideLogin && <AuthSidebar closeSidebar={this.closeSidebar} store={this.props.store} />}
              {this.props.store.sideGift && <GiftSidebar closeSidebar={this.closeSidebar} store={this.props.store} />}
              {this.state.popCart && <CartSidebar store={this.props.store} closeSidebar={this.closeSidebar} />}
            </div>

            <div
              className={"sidebar-overlay" + (this.props.store.sideLogin ? " active" : "")}
              onClick={(e) => {
                this.setState({
                  popCart: false,
                  popLike: false,
                });

                this.props.store.sideLogin = false;
                this.props.store.sideAsk = false;
                this.props.store.sideGift = false;
                this.props.store.changeSide = false;
                $("body").removeClass("no-scroll");
                $(".navigation").removeClass("visible");
                $(".header__drop_city").removeClass("active");
                $(".city__btn").removeClass("active");
                e.target.classList.remove("active");
                document.querySelector(".sidebar").classList.remove("visible");
                if (document.querySelector(".catalog__bar")) {
                  document.querySelector(".catalog__bar").classList.remove("visible");
                  document.querySelector(".i_filter").classList.remove("active");
                }
              }}
            ></div>

            {document.body.clientWidth < 760 &&
              localStorage.getItem("city") !== null &&
              localStorage.getItem("city") !== undefined &&
              localStorage.getItem("city").sourse === "Y" && (
                <div
                  className="city-check"
                  onClick={(e) => {
                    if (e.target.classList.contains("city-check")) {
                      const cityData = localStorage.getItem("city");
                      cityData.sourse = "U";
                      document.querySelector(".sidebar-overlay").classList.remove("active");
                      document.querySelector(".sidebar-overlay").classList.remove("city");
                      document.querySelector("body").classList.remove("no-scroll");
                      localStorage.setItem("city", cityData);
                    }
                  }}
                >
                  <div className="header__drop header__drop_city-check">
                    <p>
                      {" "}
                      Регион доставки:
                      <b> {this.props.store.city} ?</b>
                    </p>
                    <div>
                      <button
                        className="btn"
                        onClick={() => {
                          $(".header__drop_city-check").addClass("deactiv");
                          $(".header__drop_city-overlay").addClass("vis");
                        }}
                      >
                        Выбрать другой
                      </button>
                      <button
                        className=" btn_yellow btn"
                        onClick={() => {
                          const cityData = localStorage.getItem("city");
                          cityData.sourse = "U";
                          document.querySelector(".sidebar-overlay").classList.remove("active");
                          document.querySelector(".sidebar-overlay").classList.remove("city");
                          document.querySelector("body").classList.remove("no-scroll");
                          localStorage.setItem("city", cityData);
                        }}
                      >
                        Да
                      </button>
                    </div>
                  </div>
                  <form className="header__drop header__drop_city header__drop_city-overlay">
                    <div className="input-field">
                      <label className="active" htmlFor="citySearch">
                        Населенный пункт
                      </label>
                      <input
                        id="citySearch"
                        placeholder="Поиск"
                        type="text"
                        onInput={(e) => {
                          if (e.target.value.length >= 3) {
                            const renderCities = [];
                            api
                              .getCity(e.target.value)
                              .then((c) => {
                                c.forEach((one) => {
                                  if (one.addressComponents.length <= 6) {
                                    renderCities.push(
                                      <li key={one.geoId}>
                                        <button
                                          type="submit"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            $(".header__drop").removeClass("visible");
                                            document.querySelector(".sidebar-overlay").classList.remove("active");
                                            document.querySelector(".sidebar-overlay").classList.remove("city");
                                            document.querySelector("body").classList.remove("no-scroll");
                                            localStorage.setItem("city", {
                                              name: one.addressComponents[one.addressComponents.length - 1].name,
                                              geoId: one.geoId,
                                              region: one.addressComponents[2].name,
                                              sourse: "U",
                                            });
                                          }}
                                        >
                                          {one.addressComponents[one.addressComponents.length - 2].name +
                                            ", " +
                                            one.addressComponents[one.addressComponents.length - 1].name}
                                        </button>
                                      </li>
                                    );
                                  }
                                });
                                this.setState({
                                  cities: renderCities,
                                });
                              })
                              .catch((err) => {
                                console.log("err :>> ", err);
                              });
                          }
                        }}
                        onFocus={(e) => {
                          $(e.target).parent().find("label").addClass("active");
                        }}
                        onBlur={(e) => {
                          if (e.target.value === "") {
                            // $(e.target).parent().find('label').removeClass('active');
                          }
                        }}
                      />
                    </div>
                    <ul>{this.state.cities}</ul>
                  </form>
                </div>
              )}

            <div className="bottom-fix">
              {!this.props.store.auth && !window.location.pathname.includes("/cart") && !window.location.pathname.includes("/finish/") && (
                <div
                  className="discond-fix"
                  onClick={() => {
                    document.querySelector(".sidebar-overlay").classList.add("active");

                    document.querySelector("body").classList.add("no-scroll");

                    this.props.store.sideLogin = true;
                  }}
                >
                  <img src="/image/button/icon/gift.svg"></img>
                </div>
              )}

              {(localStorage.getItem("cookie-close") === undefined || localStorage.getItem("cookie-close") === null) && (
                <div className="cookie-message">
                  <p>Наш сайт использует cookie</p>
                  <button
                    className="ic i_close"
                    onClick={() => {
                      $(".bottom-fix").addClass("hide");
                      setTimeout(() => {
                        localStorage.setItem("cookie-close", "true");
                      }, 1000);
                    }}
                  ></button>
                </div>
              )}
            </div>
          </>
        )
      );
    }

    componentWillMount() {
      if (!Object.keys(this.props.store.bannersData).length) {
        this.props.store.getCollections();
      }
      //   if (
      //     document.body.clientWidth < 760 &&
      //     (localStorage.get("city") !== null &&
      //       localStorage.get("city") !== undefined) &&
      //     localStorage.get("city").sourse === "Y"
      //   ) {

      //   }
    }
  }
);

export default withRouter(MenuPoints);
