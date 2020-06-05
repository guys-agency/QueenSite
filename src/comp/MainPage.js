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

const { Component } = React;

const MainPage = observer(
  class MainPage extends Component {
    state = {
      hitCont: [],
      newCont: [],
      allCont: [],
      ready: false,
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
          console.log("data :>> ", data);
          Object.keys(data[0].hit).forEach((element, i) => {
            hitContTime.push(
              <div
                className="swiper-slide col col-3 col-t-4 col-s-6"
                key={data[0].hit[element].slug}
              >
                <ProductCard
                  data={data[0].hit[element]}
                  store={this.props.store}
                />
              </div>
            );
          });
          Object.keys(data[0].new).forEach((element) => {
            newContTime.push(
              <div
                className="swiper-slide col col-3 col-t-4 col-s-6"
                key={data[0].new[element].slug}
              >
                <ProductCard
                  data={data[0].new[element]}
                  store={this.props.store}
                />
              </div>
            );
          });
          Object.keys(data[0].all).forEach((element) => {
            allContTime.push(
              <div
                className="col col-3 col-t-4 col-s-6"
                key={data[0].all[element].slug}
              >
                <ProductCard
                  data={data[0].all[element]}
                  store={this.props.store}
                />
              </div>
            );
          });
          this.setState({
            hitCont: hitContTime,
            newCont: newContTime,
            allCont: allContTime,
            ready: true,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    render() {
      const { hitCont, newCont, allCont } = this.state;
      const { bannersData } = this.props.store;
      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const mainBanners = [];
      const collLast = [];
      const saleCont = [];
      const ideasCon = [];
      if (bannersData.main !== undefined) {
        bannersData.main.forEach((elem) => {
          mainBanners.push(
            <Link
              className="head-banner"
              to={"/main/" + elem.slug}
              style={{
                backgroundImage: `url(/image/banners/${
                  typeDevice
                    ? elem["image-mob-large"]
                    : elem["image-desc-large"]
                })`,
              }}
            ></Link>
          );
        });

        collLast.push(
          <div className="row">
            <div className="col col-7 col-s-12">
              <Link
                to={"collections/" + bannersData.collections[0].slug}
                className="banner banner_overlay main"
                style={{
                  backgroundImage: `url(/image/banners/${
                    typeDevice
                      ? bannersData.collections[0]["image-mob-small"]
                      : bannersData.collections[0]["image-desc-small"]
                  })`,
                }}
              >
                <div className="banner__desc">
                  {bannersData.collections[0].name}
                </div>
              </Link>
            </div>
            <div className="items col col-5 col-s-12">
              <div className="row row_inner">
                <div className="col col-12">
                  <Link
                    to={"collections/" + bannersData.collections[1].slug}
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? bannersData.collections[1]["image-mob-small"]
                          : bannersData.collections[1]["image-desc-small"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">
                      {bannersData.collections[1].name}
                    </div>
                  </Link>
                </div>
                <div className="col col-12">
                  <Link
                    to={"collections/" + bannersData.collections[2].slug}
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? bannersData.collections[2]["image-mob-small"]
                          : bannersData.collections[2]["image-desc-small"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">
                      {bannersData.collections[2].name}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );

        saleCont.push(
          <div className="actions">
            <div className="action">
              <div className="head head_sm head_list">
                <Link
                  to={"/actions/" + bannersData.sale[0].slug}
                  className="head-banner head-banner_action"
                  style={{
                    backgroundImage: `url(/image/banners/${
                      typeDevice
                        ? bannersData.sale[0]["image-mob-large"]
                        : bannersData.sale[0]["image-desc-large"]
                    })`,
                  }}
                >
                  <div className="text">
                    <div className="label">Акция</div>
                    <h1>
                      {bannersData.sale[0].name}{" "}
                      <span className="ic i_right"></span>
                    </h1>
                    <p>{bannersData.sale[0].description}</p>
                  </div>
                </Link>
              </div>
              <div className="container container_f">
                <div className="row">{allCont}</div>
                <Link
                  to={"/actions/" + bannersData.sale[0].slug}
                  className="btn btn_primary"
                >
                  Посмотреть еще
                </Link>
              </div>
            </div>
          </div>
        );

        ideasCon.push(
          <div className="row ideas-block">
            <div className="col col-5 col-t-12">
              <Link
                to={"/ideas/" + bannersData.ideas[0].slug}
                href="#"
                className="banner banner_overlay main-idea"
                style={{
                  backgroundImage: `url(/image/banners/${
                    typeDevice
                      ? bannersData.ideas[0]["image-mob-large"]
                      : bannersData.ideas[0]["image-desc-large"]
                  })`,
                }}
              >
                <div className="banner__desc">{bannersData.ideas[0].name}</div>
              </Link>
            </div>
            <div className="ideas col col-7 col-t-12">
              <div className="row row_inner">
                <div className="col col-6 col-s-12">
                  <Link
                    to={"/ideas/" + bannersData.ideas[1].slug}
                    href="#"
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? bannersData.ideas[1]["image-mob-large"]
                          : bannersData.ideas[1]["image-desc-large"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">
                      {bannersData.ideas[1].name}
                    </div>
                  </Link>
                </div>
                <div className="col col-6 col-s-12">
                  <Link
                    to={"/ideas/" + bannersData.ideas[2].slug}
                    href="#"
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? bannersData.ideas[2]["image-mob-large"]
                          : bannersData.ideas[2]["image-desc-large"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">
                      {bannersData.ideas[2].name}
                    </div>
                  </Link>
                </div>
                <div className="col col-12 col-s-12">
                  <Link
                    to={"/ideas/" + bannersData.ideas[3].slug}
                    href="#"
                    className="banner banner_overlay large"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? bannersData.ideas[3]["image-mob-large"]
                          : bannersData.ideas[3]["image-desc-large"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">
                      {bannersData.ideas[3].name}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }

      const headCar = {
        slidesPerView: 1,
        effect: "fade",
        speed: 500,
        draggable: true,
        autoplay: {
          delay: 5000,
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
          <div className="head head_big">
            <div className="head-car">
              {mainBanners.length ? (
                <Swiper {...headCar}>{mainBanners}</Swiper>
              ) : null}
            </div>
          </div>
          <div className="carousel carousel_product">
            <div className="container">
              <div className="title">
                <Link to="/hits">
                  <h2 className="tilda">
                    Хиты продаж{" "}
                    <span className="link">
                      <span className="hide-s">Ко всем хитам </span>{" "}
                      <span className="ic i_right"></span>
                    </span>
                  </h2>
                </Link>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>
            </div>
            <div className="container container_s">
              <div className="slider-cont">
                {/* <Slider {...settingsMulti}>{hitCont}</Slider> */}

                {hitCont.length !== 0 && (
                  <Swiper {...productCar}>{hitCont}</Swiper>
                )}
              </div>
            </div>
          </div>

          <div className="carousel carousel_brand">
            <div className="container">
              <div className="title">
                <h2>Бренды</h2> 
              </div>

              <div className="slider-cont slider-cont_brand">
                <Swiper {...brandCar}>
                  <Link
                    to="/catalog/?brand=Bohemia%20Crystall"
                    className="slider-brand"
                  >
                    <img src="/image/logos/Bohemia Crystall.png" />
                  </Link>
                  <Link
                    to="/catalog/?brand=Aurum%20Crystal"
                    className="slider-brand"
                  >
                    <img src="/image/logos/Aurum design.jpg" />
                  </Link>
                  <Link
                    to="/catalog/?brand=Crystal%20Art"
                    className="slider-brand"
                  >
                    <img src="/image/logos/Crystal Art.JPG" />
                  </Link>
                  <Link
                    to="/catalog/?brand=Porcelaine%20Czech%20Gold%20Hands"
                    className="slider-brand"
                  >
                    <img src="/image/logos/Czech_Gold_Hands_Logo_1(1).jpg" />
                  </Link>
                  <Link to="/catalog/?brand=Diva" className="slider-brand">
                    <img src="/image/logos/diva.jpg" />
                  </Link>
                  <Link to="/catalog/?brand=Easy%20Life" className="slider-brand">
                    <img src="/image/logos/easylife logo.jpg" />
                  </Link>
                  <Link to="/catalog/?brand=G.Benedikt" className="slider-brand">
                    <img src="/image/logos/G. Benedikt logo white on color.png" />
                  </Link>
                  <Link to="/catalog/?brand=Lilien" className="slider-brand">
                    <img src="/image/logos/Lilien Austria logo white on color.png" />
                  </Link>
                  <Link to="/catalog/?brand=Stara%20Role" className="slider-brand">
                    <img src="/image/logos/MZ logo.jpg" />
                  </Link>
                  <Link to="/catalog/?brand=Queen%20Anne" className="slider-brand">
                    <img src="/image/logos/queen anne.jpg" />
                  </Link>
                  <Link to="/catalog/?brand=Queen%20of%20Bohemia" className="slider-brand">
                    <img src="/image/logos/Queen of Bohemia NEW.jpg" />
                  </Link>
                  <Link to="/catalog/?brand=http://127.0.0.1:3000/catalog/?brand=Langenthal" className="slider-brand">
                    <img src="/image/logos/Suisse Lagenthal logo white on color.png" />
                  </Link>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="main-background">
            <div className="container">
              <div className="title">
                <h2 className="tilda">Идеи</h2>
              </div>
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
                <h2>Подарки</h2>
              </div>
              <div className="gifts row">
                <Swiper {...giftCar}>
                  <div className="col col-4 col-t-5 col-s-9">
                    <a
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/1.png" + ")",
                      }}
                    >
                      <div className="banner__desc">До 500₽</div>
                    </a>
                  </div>

                  <div className="col col-4 col-t-5 col-s-9">
                    <a
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/2.png" + ")",
                      }}
                    >
                      <div className="banner__desc">До 1 000₽</div>
                    </a>
                  </div>

                  <div className="col col-4 col-t-5 col-s-9">
                    <a
                      className="banner"
                      style={{
                        backgroundImage: "url(" + "/image/gifts/3.png" + ")",
                      }}
                    >
                      <div className="banner__desc">До 2 000₽</div>
                    </a>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="carousel carousel_product">
            <div className="container">
              <div className="title">
                <a href="">
                  <h2 className="tilda">
                    Новинки{" "}
                    <span className="link">
                      <span className="hide-s">Все новинки</span>{" "}
                      <span className="ic i_right"></span>
                    </span>
                  </h2>
                </a>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>
            </div>
            <div className="container container_s">
              <div className="slider-cont">
                {newCont.length && <Swiper {...newCar}>{newCont}</Swiper>}
              </div>
            </div>
          </div>

          <div className="collections-h">
            <div className="container">
              <div className="title">
                <Link to="/collections">
                  <h2 className="dib">
                    Новые коллекции{" "}
                    <span className="link">
                      <span className="hide-s">Все коллекции</span>{" "}
                      <span className="ic i_right"></span>
                    </span>
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
                  <p>
                    <b>Скидка 5%</b> на первую покупку
                  </p>
                  <form className="row row_inner col-bottom">
                    <div className="col col-7 col-s-12">
                      <div className="input-field">
                        <label className="required" htmlFor="emailSubs">
                          E-mail
                        </label>
                        <input
                          id="emailSubs"
                          name="email"
                          type="text"
                          onFocus={(e) => {
                            $(e.target)
                              .parent()
                              .find("label")
                              .addClass("active");
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              $(e.target)
                                .parent()
                                .find("label")
                                .removeClass("active");
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-4 col-s-12">
                      <button className="btn btn_primary btn_wide">
                        Подписаться
                      </button>
                    </div>
                  </form>
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
    }
  }
);

export default MainPage;
