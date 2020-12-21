import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Swiper from "react-id-swiper";
import ProductCard from "./ProductCard";
import { SERVER_URL } from "../constants";
import { Formik } from "formik";
import api from "./api";
import { withRouter } from "react-router";
import SuscribeSchema from "../schemas/suscribeSchema";
import moment from "moment";
import localStorage from "mobx-localstorage";

const { Component } = React;

const MainPage = observer(
  class MainPage extends Component {
    state = {
      hitCont: [],
      newCont: [],
      allCont: [],
      certificate: "",
      ready: false,
      days: "",
      h: "",
      m: "",
      s: "",
    };

    getData = () => {
      const hitContTime = [];
      const newContTime = [];
      const allContTime = [];
      fetch(SERVER_URL + "/main-page", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          Object.keys(data[0].hit).forEach((element, i) => {
            hitContTime.push(
              <div className="swiper-slide col col-3 col-t-4 col-s-6" key={data[0].hit[element].slug}>
                <ProductCard data={data[0].hit[element]} store={this.props.store} />
              </div>
            );
          });
          Object.keys(data[0].new).forEach((element) => {
            newContTime.push(
              <div className="swiper-slide col col-3 col-t-4 col-s-6" key={data[0].new[element].slug}>
                <ProductCard data={data[0].new[element]} store={this.props.store} />
              </div>
            );
          });
          Object.keys(data[0].all).forEach((element) => {
            allContTime.push(
              <div className="col col-3 col-t-4 col-s-6" key={data[0].all[element].slug}>
                <ProductCard data={data[0].all[element]} store={this.props.store} />
              </div>
            );
          });
          // console.log("cert :>> ", this.props.gift);
          if (this.props.gift === undefined) {
            this.setState({
              hitCont: hitContTime,
              newCont: newContTime,
              allCont: allContTime,
              ready: true,
            });
          } else {
            api
              .getCertData(this.props.gift)
              .then((ok) => {
                this.setState({
                  hitCont: hitContTime,
                  newCont: newContTime,
                  allCont: allContTime,
                  certificate: ok.data,
                  ready: true,
                });
              })
              .catch((err) => {
                console.log("err :>> ", err);
              });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    copy = (str) => {
      let tmp = document.createElement("INPUT"), // Создаём новый текстовой input
        focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

      tmp.value = str; // Временному input вставляем текст для копирования

      document.body.appendChild(tmp); // Вставляем input в DOM
      tmp.select(); // Выделяем весь текст в input
      document.execCommand("copy"); // Магия! Копирует в буфер выделенный текст (см. команду выше)
      document.body.removeChild(tmp); // Удаляем временный input
      focus.focus(); // Возвращаем фокус туда, где был
    };

    openLogSide = () => {
      this.props.history.replace({ hash: "" });
      document.querySelector(".sidebar-overlay").classList.add("active");
      document.querySelector("body").classList.add("no-scroll");
      if (!this.props.store.sideLogin) {
        this.props.store.sideLogin = true;
      }
    };
    checkTimer = () => {
      const time = moment("01.12.2020", "DD.MM.YYYY").diff(moment()).toPrecision();
      const dur = moment.duration(time, "milliseconds");

      this.setState({
        days: dur.days(),
        h: dur.hours(),
        m: dur.minutes(),
        s: dur.seconds() + 1,
      });
    };

    render() {
      const { hitCont, newCont, allCont, days, h, m, s } = this.state;
      const { bannersData } = this.props.store;
      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const mainBanners = [];
      const collLast = [];
      const saleCont = [];
      const ideasCon = [];
      const brandCon = [];

      if (bannersData.main !== undefined) {
        // mainBanners.push(
        //   <Link
        //     className="head-banner"
        //     to="catalog/podarki/uchitelyam"
        //     style={{
        //       backgroundImage: `url(/image/banners/${
        //         typeDevice ? "dayTeaMobile" : "dayTea"
        //       }.jpg`,
        //     }}
        //   ></Link>
        // );
        if (moment().utcOffset("+03:00").month() === 10 && moment().utcOffset("+03:00").date() >= 20) {
          mainBanners.push(
            <Link
              key="0"
              className="head-banner"
              to={`${localStorage.getItem("BFcheck") === true || localStorage.getItem("BFcheck") === "true" ? "/close-sale" : "/black-friday"}`}
              style={{
                backgroundImage: `url(/image/BF/${this.typeDevice ? "BF-pl-m" : "BF-pl"}.jpg)`,
              }}
            ></Link>
          );
        }
        bannersData.main.forEach((elem) => {
          mainBanners.push(
            <Link
              key={elem.slug}
              className="head-banner"
              onClick={() => {
                this.props.store.dataColl = [elem];
              }}
              to={"/main/" + elem.slug}
              style={{
                backgroundImage: `url(/image/banners/${typeDevice ? elem["image-mob-large"] : elem["image-desc-large"]})`,
              }}
            ></Link>
          );
        });

        bannersData.brand.forEach((elem, i) => {
          brandCon.push(
            <Link
              onClick={() => {
                this.props.store.dataColl = [elem];
              }}
              to={"/brand/" + elem.slug}
              className="slider-brand"
              key={i}
            >
              <img src={"/image/brends/" + elem["image-mob-large"]} />
            </Link>
          );
        });

        collLast.push(
          <div className="row" key={bannersData.collections[0].slug}>
            <div className="col col-7 col-s-12">
              <Link
                onClick={() => {
                  this.props.store.dataColl = [bannersData.collections[0]];
                }}
                to={"collections/" + bannersData.collections[0].slug}
                className="banner banner_overlay main"
                style={{
                  backgroundImage: `url(/image/banners/${
                    typeDevice ? bannersData.collections[0]["image-mob-small"] : bannersData.collections[0]["image-desc-small"]
                  })`,
                }}
              >
                <div className="banner__desc">{bannersData.collections[0].name}</div>
              </Link>
            </div>
            <div className="items col col-5 col-s-12">
              <div className="row row_inner">
                <div className="col col-12">
                  <Link
                    onClick={() => {
                      this.props.store.dataColl = [bannersData.collections[1]];
                    }}
                    to={"collections/" + bannersData.collections[1].slug}
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice ? bannersData.collections[1]["image-mob-small"] : bannersData.collections[1]["image-desc-small"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">{bannersData.collections[1].name}</div>
                  </Link>
                </div>
                <div className="col col-12">
                  <Link
                    onClick={() => {
                      this.props.store.dataColl = [bannersData.collections[2]];
                    }}
                    to={"collections/" + bannersData.collections[2].slug}
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice ? bannersData.collections[2]["image-mob-small"] : bannersData.collections[2]["image-desc-small"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">{bannersData.collections[2].name}</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );

        // console.log("bannersData.sale :>> ", bannersData.sale);

        saleCont.push(
          <div className="actions" key={bannersData.sale[0].slug}>
            <div className="action">
              <div className="head head_sm head_list">
                <Link
                  onClick={() => {
                    this.props.store.dataColl = [bannersData.sale[0]];
                  }}
                  to={"/actions/" + bannersData.sale[0].slug}
                  className="head-banner head-banner_action"
                  style={{
                    backgroundImage: `url(/image/banners/${
                      typeDevice ? bannersData.sale[0]["image-mob-large"] : bannersData.sale[0]["image-desc-large"]
                    })`,
                  }}
                >
                  <div className="text">
                    <div className="label">Акция</div>
                    <h1>
                      {bannersData.sale[0].name} <span className="ic i_right"></span>
                    </h1>
                    <p>{bannersData.sale[0].description}</p>
                  </div>
                </Link>
              </div>
              <div className="container container_f">
                <div className="row">{allCont}</div>
                <Link to={"/actions/" + bannersData.sale[0].slug} className="btn btn_primary">
                  Посмотреть еще
                </Link>
              </div>
            </div>
          </div>
        );

        // ideasCon.push(
        //   <div className="row ideas-block" key={bannersData.ideas[0].slug}>
        //     <div className="col col-5 col-t-12">
        //       <Link
        //         to={"/ideas/" + bannersData.ideas[0].slug}
        //         className="banner banner_overlay main-idea"
        //         style={{
        //           backgroundImage: `url(/image/banners/${
        //             typeDevice
        //               ? bannersData.ideas[0]["image-mob-main"]
        //               : bannersData.ideas[0]["image-desc-main"]
        //           })`,
        //         }}
        //       >
        //         <div className="banner__desc">{bannersData.ideas[0].name}</div>
        //       </Link>
        //     </div>
        //     <div className="ideas col col-7 col-t-12">
        //       <div className="row row_inner">
        //         <div className="col col-6 col-s-12">
        //           <Link
        //             to={"/ideas/" + bannersData.ideas[1].slug}
        //             className="banner banner_overlay small"
        //             style={{
        //               backgroundImage: `url(/image/banners/${
        //                 typeDevice
        //                   ? bannersData.ideas[1]["image-mob-main"]
        //                   : bannersData.ideas[1]["image-desc-main"]
        //               })`,
        //             }}
        //           >
        //             <div className="banner__desc">
        //               {bannersData.ideas[1].name}
        //             </div>
        //           </Link>
        //         </div>
        //         <div className="col col-6 col-s-12">
        //           <Link
        //             to={"/ideas/" + bannersData.ideas[2].slug}
        //             className="banner banner_overlay small"
        //             style={{
        //               backgroundImage: `url(/image/banners/${
        //                 typeDevice
        //                   ? bannersData.ideas[2]["image-mob-main"]
        //                   : bannersData.ideas[2]["image-desc-main"]
        //               })`,
        //             }}
        //           >
        //             <div className="banner__desc">
        //               {bannersData.ideas[2].name}
        //             </div>
        //           </Link>
        //         </div>
        //         <div className="col col-12 col-s-12">
        //           <Link
        //             to={"/ideas/" + bannersData.ideas[3].slug}
        //             className="banner banner_overlay large"
        //             style={{
        //               backgroundImage: `url(/image/banners/${
        //                 typeDevice
        //                   ? bannersData.ideas[3]["image-mob-main"]
        //                   : bannersData.ideas[3]["image-desc-main"]
        //               })`,
        //             }}
        //           >
        //             <div className="banner__desc">
        //               {bannersData.ideas[3].name}
        //             </div>
        //           </Link>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // );
      }

      const headCar = {
        slidesPerView: 1,
        effect: "fade",
        speed: 1000,
        draggable: true,
        autoplay: {
          delay: 7500,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };

      const productCar = {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        speed: 800,
        draggable: true,
        preventClicksPropagation: false,
        preventClicks: false,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          760: {
            slidesPerGroup: 3,
          },
          951: {
            slidesPerGroup: 4,
          },
        },
      };

      const newCar = {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        speed: 800,
        draggable: true,
        preventClicksPropagation: false,
        preventClicks: false,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          760: {
            slidesPerGroup: 3,
          },
          951: {
            slidesPerGroup: 4,
          },
        },
      };

      const brandCar = {
        slidesPerView: "auto",
        speed: 500,
        draggable: true,
        preventClicksPropagation: false,
        preventClicks: false,
        autoplay: {
          delay: 4000,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };

      const giftCar = {
        slidesPerView: "auto",
        speed: 500,
        draggable: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };

      return (
        <div className="main-page">
          {window.location.pathname.includes("/gift/") ? (
            <div className="head head_big gift">
              <img className="gift__img" src={`/image/items/${this.state.certificate.sum}cert.png`}></img>
              <div className="gift__desc">
                <p>{this.state.certificate.message}</p>
                <div className="gift__code-cont">
                  <p>Промокод:</p>
                  <div className="gift__code">
                    <p>{this.state.certificate.coupon}</p>
                    <button
                      className="btn btn_primary"
                      id="gift-copy"
                      onClick={() => {
                        try {
                          this.copy(`${this.state.certificate.coupon}`);
                          $("#gift-copy").css("border", "1px solid lightgreen");
                          setTimeout(() => {
                            $("#gift-copy").css("border", "");
                          }, 3000);
                        } catch {
                          $("#gift-copy").css("border", "1px solid rgb(235, 87, 87)");
                          setTimeout(() => {
                            $("#gift-copy").css("border", "");
                          }, 3000);
                        }
                      }}
                    >
                      Скопировать
                    </button>
                  </div>
                </div>
                <p className="gift__ps">
                  Примените промокод во время оформления заказа. При стоимости заказа более суммы сертификата вы можете доплатить разницу наличными
                  или банковской картой. Срок действия — 1 год.
                </p>
              </div>
            </div>
          ) : (
            <div className="head head_big">
              <div className="head-car">{mainBanners.length ? <Swiper {...headCar}>{mainBanners}</Swiper> : null}</div>
            </div>
          )}

          {/* {localStorage.getItem("BFcheck") !== true && localStorage.getItem("BFcheck") !== "true" && (
            <div
              className="container"
              style={{
                paddingTop: typeDevice ? "10px" : "105px",
                borderRadius: "5px",
              }}
            >
              <div className="subscribe subscribe_bf-main">
                <div className="container">
                  <div className="row">
                    <div className="col col-6 col-s-12 col-middle subscribe__form">
                      <h3>Доступ в закрытый раздел</h3>
                      <p>
                        Закрытый раздел на <b>286 товаров</b> со <b>скидками до 78%</b>
                        <br /> для наших подписчиков!
                      </p>
                      <Formik
                        //инициализируем значения input-ов
                        initialValues={{
                          email: "",
                          acceptedTerms: true,
                        }}
                        //подключаем схему валидации, которую описали выше
                        validationSchema={SuscribeSchema}
                        //определяем, что будет происходить при вызове onsubmit
                        onSubmit={(values, { setSubmitting }) => {
                          $("#subscription").addClass("deactive");
                          $("#subscription").text("Загрузка");
                          api
                            .addSubs({
                              email: values.email.toLowerCase(),
                            })
                            .then((data) => {
                              $("#subscription").removeClass("deactive");
                              $("#subscription").text(data.message);
                              if (data.status === 200) {
                                $("#subscription").addClass("success");
                              } else {
                                $("#subscription").addClass("error");
                              }
                              setTimeout(() => {
                                $("#subscription").removeClass("success");
                                $("#subscription").removeClass("error");
                                $("#subscription").text("Подписаться");
                                if (data.bfok !== undefined && data.bfok) {
                                  localStorage.setItem("BFcheck", true);
                                  window.location.replace("/close-sale");
                                }
                              }, 3000);
                            });
                        }}
                        //свойство, где описывыем нашу форму
                        //errors-ошибки валидации формы
                        //touched-поля формы, которые мы "затронули",
                        //то есть, в которых что-то ввели
                      >
                        {({ errors, touched, handleSubmit, isSubmitting, values, handleChange }) => (
                          <form className="row row_inner col-bottom" onSubmit={handleSubmit}>
                            <div className="col col-12 col-s-12">
                              <div className="row row_inner">
                                <div className="col col-6 col-s-12">
                                  <div className="input-field">
                                    <label className="required" htmlFor="emailSubs">
                                      E-mail
                                    </label>
                                    <input
                                      id="emailSubs"
                                      name="email"
                                      type="text"
                                      value={values.email}
                                      onFocus={(e) => {
                                        $(e.target).parent().find("label").addClass("active");
                                      }}
                                      onBlur={(e) => {
                                        if (e.target.value === "") {
                                          $(e.target).parent().find("label").removeClass("active");
                                        }
                                      }}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="field-error">{errors.email}</div>
                                </div>

                                <div className="col col-4 col-s-12">
                                  <button className="btn btn_primary btn_wide" type="submit" id="subscription">
                                    Получить доступ
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col col-12 col-s-12">
                              <label className="checkbox checkbox_margin">
                                <input
                                  type="checkbox"
                                  name="acceptedTerms"
                                  id=""
                                  value={values.acceptedTerms}
                                  onChange={handleChange}
                                  checked={values.acceptedTerms}
                                />
                                <span className="checkbox-btn"></span>
                                <i>
                                  Согласен с{" "}
                                  <Link className="underline" to="/help/offer">
                                    "Публичной офертой"
                                  </Link>{" "}
                                  и{" "}
                                  <Link className="underline" to="/help/cppd">
                                    "Обработкой персональных данных"
                                  </Link>
                                </i>
                              </label>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
                <div
                  className="subscribe__img"
                  // style={{
                  //   backgroundImage: "url(" + "/image/plate.png" + ")",
                  // }}
                >
                  <h3>До завершения акции</h3>
                  <div className="black-friday__timer">
                    <div className="days">
                      <p className="num">{days}</p>
                      <p className="str">дней</p>
                    </div>
                    <div className="hours">
                      <p className="num">{h}</p>
                      <p className="str">часов</p>
                    </div>
                    <div className="minuts">
                      <p className="num">{m}</p>
                      <p className="str">минут</p>
                    </div>
                    <div className="sec">
                      <p className="num">{s}</p>
                      <p className="str">секунд</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          <div className="carousel carousel_product">
            <div className="container">
              <div className="title">
                <Link to="/hits">
                  <h2 className="tilda">
                    Хиты продаж <button className="btn btn_primary btn_in-main-page">Все хиты</button>
                  </h2>
                </Link>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>
            </div>
            <div className="container container_s">
              <div className="slider-cont">
                {/* <Slider {...settingsMulti}>{hitCont}</Slider> */}

                {hitCont.length !== 0 && <Swiper {...productCar}>{hitCont}</Swiper>}
              </div>
            </div>
          </div>

          {brandCon.length !== 0 && (
            <div className="carousel carousel_brand">
              <div className="container">
                <div className="title">
                  <h2>Бренды</h2>
                </div>

                <div className="slider-cont slider-cont_brand">
                  <Swiper {...brandCar}>{brandCon}</Swiper>
                </div>
              </div>
            </div>
          )}

          <div className="main-background">
            <div className="container">
              {ideasCon.length > 0 && (
                <div className="title">
                  {/* <h2 className="tilda">Идеи</h2> */}
                  <Link to="/ideas">
                    <h2 className="tilda">
                      Идеи <button className="btn btn_primary btn_in-main-page">Все хиты</button>
                    </h2>
                  </Link>
                </div>
              )}
              {ideasCon}
              {/* <div className="row ideas-block">
                <div className="col col-5 col-t-12">
                  <a
                    href="#"
                    className="banner banner_overlay main-idea"
                    style={{
                      backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                    }}
                  >
                    <div className="banner__desc">Вкусное вино</div>
                  </a>
                </div>
                <div className="ideas col col-7 col-t-12">
                  <div className="row row_inner">
                    <div className="col col-6 col-s-12">
                      <a
                        href="#"
                        className="banner banner_overlay small"
                        style={{
                          backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                        }}
                      >
                        <div className="banner__desc">Виски</div>
                      </a>
                    </div>
                    <div className="col col-6 col-s-12">
                      <a
                        href="#"
                        className="banner banner_overlay small"
                        style={{
                          backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                        }}
                      >
                        <div className="banner__desc">Кружки со смыслом</div>
                      </a>
                    </div>
                    <div className="col col-12 col-s-12">
                      <a
                        href="#"
                        className="banner banner_overlay large"
                        style={{
                          backgroundImage: "url(" + "/image/ideas/4.jpg" + ")",
                        }}
                      >
                        <div className="banner__desc">На вечеринку</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="title">
                <Link to="/gifts">
                  <h2 className="dib">
                    Подарки <button className="btn btn_primary btn_in-main-page">Все подарки</button>
                  </h2>
                </Link>
              </div>
              <div className="gifts row gifts_price">
                <Swiper {...giftCar}>
                  {/* <div className="col col-4 col-t-6 col-s-9">
                    <Link
                      to="/catalog/podarki/uchitelyam"
                      className="banner banner_overlay"
                      style={{
                        backgroundImage:
                          "url(" + "/image/gifts/dayTeaMainPage.jpg" + ")",
                      }}
                    >
                      <div className="banner__desc">Для учителей</div>
                    </Link>
                  </div> */}
                  <div className="col col-4 col-t-6 col-s-9">
                    <Link
                      to="catalog/podarki/sertificats"
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/certMainPage.png" + ")",
                      }}
                    >
                      <div className="banner__desc">Сертификаты</div>
                    </Link>
                  </div>
                  <div className="col col-4 col-t-6 col-s-9">
                    <Link
                      to="/catalog/podarki/podarki_do_500_russian_ruble"
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/1.png" + ")",
                      }}
                    >
                      <div className="banner__desc">До 500₽</div>
                    </Link>
                  </div>

                  <div className="col col-4 col-t-6 col-s-9">
                    <Link
                      to="/catalog/podarki/podarki_do_1000_russian_ruble"
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/2.png" + ")",
                      }}
                    >
                      <div className="banner__desc">До 1 000₽</div>
                    </Link>
                  </div>

                  <div className="col col-4 col-t-6 col-s-9">
                    <Link
                      to="/catalog/podarki/podarki_do_2000_russian_ruble"
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/3.png" + ")",
                      }}
                    >
                      <div className="banner__desc">До 2 000₽</div>
                    </Link>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>

          {newCont.length !== 0 && (
            <div className="carousel carousel_product carousel_product-new">
              <div className="container">
                <div className="title">
                  <Link to="/new">
                    <h2 className="tilda">
                      Новинки <button className="btn btn_primary btn_in-main-page">Все новинки</button>
                    </h2>
                  </Link>
                  <p className="subtitle">Сложно определиться? Мы поможем</p>
                </div>
              </div>
              <div className="container container_s">
                <div className="slider-cont">
                  <Swiper {...newCar}>{newCont}</Swiper>
                </div>
              </div>
            </div>
          )}

          <div className="collections-h">
            <div className="container">
              <div className="title">
                <Link to="/collections">
                  <h2 className="dib">
                    Новые коллекции <button className="btn btn_primary btn_in-main-page">Все коллекции</button>
                  </h2>
                </Link>
                <p className="subtitle">Готовые решения для вашего дома</p>
              </div>
              {collLast}
              {/* <div className="row">
                <div className="col col-7 col-s-12">
                  <a
                    href="#"
                    className="banner banner_overlay main"
                    style={{
                      backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                    }}
                  >
                    <div className="banner__desc">Индиго</div>
                  </a>
                </div>
                <div className="items col col-5 col-s-12">
                  <div className="row row_inner">
                    <div className="col col-12">
                      <a
                        href="#"
                        className="banner banner_overlay small"
                        style={{
                          backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                        }}
                      >
                        <div className="banner__desc">Натура</div>
                      </a>
                    </div>
                    <div className="col col-12">
                      <a
                        href="#"
                        className="banner banner_overlay small"
                        style={{
                          backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                        }}
                      >
                        <div className="banner__desc">Пасха</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className="actions">
            <div className="action">
              <div className="head head_sm head_list"> */}
          {saleCont}
          {/* <a
                  href="#"
                  className="head-banner head-banner_action"
                  style={{
                    backgroundImage: "url(" + "/image/actions/1.jpg" + ")",
                  }}
                >
                  <div className="text">
                    <div className="label">Акция</div>
                    <h1>
                      Пасха <span className="ic i_right"></span>
                    </h1>
                    <p>Подготовьтесь к любимому семейному празднику.</p>
                  </div>
                </a> */}
          {/* </div> */}
          {/* <div className="actions_banner">
              <div className="banner__desc">
                  Вкусное вино
                </div>
            </div> */}
          {/* <div className="container container_f">
                <div className="row">{allCont}</div>
                <button className="btn btn_primary">Посмотреть еще</button>
              </div>
            </div>
          </div> */}
          <div className="subscribe">
            <div className="container">
              <div className="row">
                <div className="col col-6 col-s-12 col-middle subscribe__form">
                  <h3>Подпишитесь на новости</h3>
                  <p>{/* <b>Скидка 5%</b> на первую покупку */}</p>
                  <Formik
                    //инициализируем значения input-ов
                    initialValues={{
                      email: "",
                      acceptedTerms: true,
                    }}
                    //подключаем схему валидации, которую описали выше
                    validationSchema={SuscribeSchema}
                    //определяем, что будет происходить при вызове onsubmit
                    onSubmit={(values, { setSubmitting }) => {
                      api
                        .addToSubscription({
                          email: values.email.toLowerCase(),
                        })
                        .then((data) => {
                          $("#subscription").text(data.message);
                          if (data.status === 200) {
                            $("#subscription").addClass("success");
                          } else {
                            $("#subscription").addClass("error");
                          }
                          setTimeout(() => {
                            $("#subscription").removeClass("success");
                            $("#subscription").removeClass("error");
                            $("#subscription").text("Подписаться");
                          }, 2000);
                        });
                    }}
                    //свойство, где описывыем нашу форму
                    //errors-ошибки валидации формы
                    //touched-поля формы, которые мы "затронули",
                    //то есть, в которых что-то ввели
                  >
                    {({ errors, touched, handleSubmit, isSubmitting, values, handleChange }) => (
                      <form className="row row_inner col-bottom" onSubmit={handleSubmit}>
                        <div className="col col-7 col-s-12">
                          <div className="input-field">
                            <label className="required" htmlFor="emailSubs">
                              E-mail
                            </label>
                            <input
                              id="emailSubs"
                              name="email"
                              type="text"
                              value={values.email}
                              onFocus={(e) => {
                                $(e.target).parent().find("label").addClass("active");
                              }}
                              onBlur={(e) => {
                                if (e.target.value === "") {
                                  $(e.target).parent().find("label").removeClass("active");
                                }
                              }}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="field-error">{errors.email}</div>
                        </div>
                        <div className="col col-4 col-s-12">
                          <button className="btn btn_primary btn_wide" type="submit" id="subscription">
                            Подписаться
                          </button>
                        </div>
                        <div className="col col-12 col-s-12">
                          <label className="checkbox checkbox_margin">
                            <input
                              type="checkbox"
                              name="acceptedTerms"
                              id=""
                              value={values.acceptedTerms}
                              onChange={handleChange}
                              checked={values.acceptedTerms}
                            />
                            <span className="checkbox-btn"></span>
                            <i>
                              Согласен с{" "}
                              <Link className="underline" to="/help/offer">
                                "Публичной офертой"
                              </Link>{" "}
                              и{" "}
                              <Link className="underline" to="/help/cppd">
                                "Обработкой персональных данных"
                              </Link>
                            </i>
                          </label>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div
              className="subscribe__img"
              style={{
                backgroundImage: "url(" + "/image/subs/1.jpg" + ")",
              }}
            ></div>
          </div>
        </div>
      );
    }
    componentDidMount() {
      this.getData();
      if (this.props.location.hash.includes("profile")) {
        this.openLogSide();
      }
      this.checkTimer();
      window.timerInt = setInterval(() => {
        this.checkTimer();
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(window.timerInt);
    }
  }
);

export default withRouter(MainPage);
