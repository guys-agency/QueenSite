import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swiper from "react-id-swiper";
import ProductCard from "./ProductCard";

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
      fetch("http://134.122.81.119/main-page", {
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
              <div className="swiper-slide col col-3" key={i}>
                <ProductCard
                  key={data[0].hit[element].slug}
                  data={data[0].hit[element]}
                />
              </div>
            );
          });
          Object.keys(data[0].new).forEach((element) => {
            newContTime.push(
              <div className="col col-3 col-t-4 col-s-6">
                <ProductCard
                  key={data[0].new[element].slug}
                  data={data[0].new[element]}
                /
                >
              </div>
            );
          });
          Object.keys(data[0].all).forEach((element) => {
            allContTime.push(
              <ProductCard
                key={data[0].all[element].slug}
                data={data[0].all[element]}
              />
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
      const { hitCont, newCont, allCont, ready } = this.state;
      //   this.getData();
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      const settingsMulti = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // appendDots: (dots) => (
        //   <div
        //     style={{
        //       backgroundColor: "#ddd",
        //       borderRadius: "10px",
        //       padding: "10px",
        //     }}
        //   >
        //     <ul style={{ margin: "0px" }}> {dots} </ul>
        //   </div>
        // ),
      };
      const settingsBrand = {
        className: "slider variable-width",
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 6,
        variableWidth: true,
      };

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
        spaceBetween: 20,
      };

      const productCar = {
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        speed: 800,
        draggable: true,
        // autoplay: {
        //   delay: 4000,
        // },
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


      const newCar = {
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        speed: 800,
        draggable: true,
        // autoplay: {
        //   delay: 4000,
        // },
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

      return (
        <div className="main-page">
          {!ready && (
            <div className="slider-cont">
              <Slider {...settings}></Slider>
            </div>
          )}
          <div className="head head_big">
            <div className="head-car">
              <Swiper {...headCar}>
                <Link
                  className="head-banner"
                  style={{
                    backgroundImage: "url(" + "/image/hb/1.jpg" + ")",
                  }}
                ></Link>
                <Link
                  className="head-banner"
                  style={{
                    backgroundImage: "url(" + "/image/hb/2.jpg" + ")",
                  }}
                ></Link>
              </Swiper>
            </div>
          </div>
          <div className="carousel carousel_product">
            <div className="container">
              <div className="title">
                <a href="">
                  <h2 className="tilda">
                    Хиты продаж{" "}
                    <span className="link">
                      Ко всем хитам <span className="ic i_right"></span>
                    </span>
                  </h2>
                </a>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>
            </div>
            <div className="container container_s">
              <div className="slider-cont">
                {/* <Slider {...settingsMulti}>{hitCont}</Slider> */}

                {hitCont.length && <Swiper {...productCar}>{hitCont}</Swiper>}
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
                  <Link className="slider-brand">
                    <img src="/image/logos/Bohemia Crystall.png" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/Aurum design.jpg" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/Crystal Art.JPG" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/Czech_Gold_Hands_Logo_1(1).jpg" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/diva.jpg" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/easylife logo.jpg" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/G. Benedikt logo white on color.png" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/Lilien Austria logo white on color.png" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/MZ logo.jpg" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/queen anne.jpg" />
                  </Link>
                  <Link className="slider-brand">
                    <img src="/image/logos/Queen of Bohemia NEW.jpg" />
                  </Link>
                  <Link className="slider-brand">
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
              <div className="row ideas-block">
                  <div className="col col-5">
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
                <div className="ideas col col-7">
                 <div className="row row_inner">
                    <div className="col col-6">
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
                    <div className="col col-6">
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
                    <div className="col col-12">
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
              </div>
              <div className="title">
                <h2>Подарки</h2>
              </div>
              <div className="gifts row">
                <div className="col col-4">
                  <a
                    className="banner"
                    style={{
                      backgroundImage: "url(" + "/image/gifts/1.jpg" + ")",
                    }}
                  >
                    <div className="banner__desc">До 500₽</div>
                  </a>
                </div>

                <div className="col col-4">
                  <a
                    className="banner"
                    style={{
                      backgroundImage: "url(" + "/image/gifts/2.jpg" + ")",
                    }}
                  >
                    <div className="banner__desc">До 1 000₽</div>
                  </a>
                </div>

               <div className="col col-4">
                  <a
                    className="banner"
                    style={{
                      backgroundImage: "url(" + "/image/gifts/3.jpg" + ")",
                    }}
                  >
                    <div className="banner__desc">До 2 000₽</div>
                  </a>
               </div>
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
                      Все новинки <span className="ic i_right"></span>
                    </span>
                  </h2>
                </a>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>
            </div>
            <div className="container container_s">
              <div className="slider-cont">
                {hitCont.length && <Swiper {...newCar}>{hitCont}</Swiper>}
              </div>
            </div>
          </div>
                  

          <div className="collections-h">
            <div className="container">
              <div className="title">
                <a href="">
                  <h2 className="dib">
                    Новые коллекции{" "}
                    <span className="link">
                      Все новинки <span className="ic i_right"></span>
                    </span>
                  </h2>
                </a>
                <p className="subtitle">Готовые решения для вашего дома</p>
              </div>


              <div className="row">
                <div className="col col-7">
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
                <div className="items col col-5">
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
              </div>
            </div>
          </div>

          <div className="actions">
            <div className="action">
              <div className="head head_sm head_list">
                <a
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
                </a>
              </div>
              {/* <div className="actions_banner">
              <div className="banner__desc">
                  Вкусное вино
                </div>
            </div> */}
              <div className="container container_f">
                <div className="row">
                  {newCont}
                </div>
                <button className="btn btn_primary">Посмотреть еще</button>
              </div>
            </div>
          </div>
          <div className="subscribe">
            <div className="container">
              <div className="row">

                <div className="col col-6 col-middle subscribe__form">
                  <h3>Подпишитесь на новости</h3>
                  <p>
                    <b>Скидка 5%</b> на первую покупку
                  </p>
                  <form className="row row_inner col-bottom">
                    <div className="col col-7">
                      <div className="input-field">
                        <label className="required" htmlFor="emailSubs">
                          E-mail
                      </label>
                        <input
                          id="emailSubs"
                          name="email"
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
                        />
                      </div>
                    </div>
                    <div className="col col-4">
                      <button className="btn btn_primary">
                        Подписаться
                        </button>
                    </div>
                  </form>
                </div>  
              </div> 
            </div>
            <div className="subscribe__img" style={{
              backgroundImage: "url(" + "/image/subs/1.jpg" + ")",
            }}></div>
          </div>
        </div>
      );
    }
    componentWillMount() {
      this.getData();
    }
  }
);

export default MainPage;
