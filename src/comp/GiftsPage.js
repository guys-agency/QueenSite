import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Swiper from "react-id-swiper";
import { withRouter } from "react-router";

const { Component } = React;

const GiftsPage = observer(
  class GiftsPage extends Component {
    state = {
      hitCont: [],
      newCont: [],
      allCont: [],
      certificate: "",
      ready: false,
    };

    render() {
      const { bannersData } = this.props.store;
      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      const ideasCon = [];

      const priceCont = [];
      const mainBanner = [];
      const forTypeData = {
        muzhchinam: "dlya_muzhchin",
        vlyublennym: "dlya_vlyublennyh",
        detyam: "dlya_detej",
        zhenshinam: "dlya_zhenshin",
        roditelyam: "dlya_roditelej",
      };

      const forType = [];
      if (bannersData.main !== undefined) {
        const occasion = [];

        const lastCont = [];

        // mainBanner.push(
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
        mainBanner.push(
          <Link
            className="head-banner"
            to="/catalog/podarki/sertificats"
            style={{
              backgroundImage: `url(/image/banners/${bannersData["podarki_sert"][0]["image-desc-large"]})`,
            }}
          ></Link>
        );

        bannersData.podarki_occasion.forEach((o, i) => {
          if (i > 2) {
            lastCont.push(
              <div className="col col-6 col-s-12 gifts_mob">
                <Link
                  to={"/catalog/podarki/" + o.slug}
                  className="banner banner_overlay large"
                  style={{
                    backgroundImage: `url(/image/banners/${typeDevice ? o["image-mob-large"] : o["image-desc-large"]})`,
                  }}
                >
                  <div className="banner__desc">{o.name}</div>
                </Link>
              </div>
            );
          }
        });

        ideasCon.push(
          <div className="row ideas-block" key={bannersData.podarki_occasion[0].slug}>
            <div className="col col-5 col-t-12">
              <Link
                to={"/catalog/podarki/" + bannersData.podarki_occasion[0].slug}
                className="banner banner_overlay main-idea"
                style={{
                  backgroundImage: `url(/image/banners/${
                    typeDevice ? bannersData.podarki_occasion[0]["image-mob-large"] : bannersData.podarki_occasion[0]["image-desc-large"]
                  })`,
                }}
              >
                <div className="banner__desc">{bannersData.podarki_occasion[0].name}</div>
              </Link>
            </div>
            <div className="ideas col col-7 col-t-12">
              <div className="row row_inner">
                <div className="col col-12 col-s-12">
                  <Link
                    to={"/catalog/podarki/" + bannersData.podarki_occasion[1].slug}
                    className="banner banner_overlay small"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice ? bannersData.podarki_occasion[1]["image-mob-large"] : bannersData.podarki_occasion[1]["image-desc-large"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">{bannersData.podarki_occasion[1].name}</div>
                  </Link>
                </div>
                <div className="col col-12 col-s-12">
                  <Link
                    to={"/catalog/podarki/" + bannersData.podarki_occasion[2].slug}
                    className="banner banner_overlay large"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice ? bannersData.podarki_occasion[2]["image-mob-large"] : bannersData.podarki_occasion[2]["image-desc-large"]
                      })`,
                    }}
                  >
                    <div className="banner__desc">{bannersData.podarki_occasion[2].name}</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="ideas col col-12 col-t-12">
              <div className="row row_inner">{lastCont}</div>
            </div>
          </div>
        );

        bannersData.podarki_dlya.forEach((d) => {
          forType.push(
            <div className="col col-4 col-t-6  col-s-9" key={d.id}>
              <Link
                to={`/catalog/podarki/${d.slug}`}
                className="banner banner_overlay"
                style={{
                  backgroundImage: "url(/image/banners/" + d["image-desc-large"] + ")",
                }}
              >
                <div className="banner__desc" style={{ color: "#fff" }}>
                  {d.name}
                </div>
              </Link>
            </div>
          );
        });

        bannersData.podarki_price.forEach((p) => {
          priceCont.push(
            <div className="col col-4 col-t-6 col-s-9" key={p.id}>
              <Link
                to={`/catalog/podarki/podarki_do_${p.name}_russian_ruble`}
                className="banner"
                style={{
                  backgroundImage: "url(/image/banners/" + p["image-desc-large"] + ")",
                }}
              >
                <div className="banner__desc">До {p.name.toLocaleString()}₽</div>
              </Link>
            </div>
          );
        });
      }

      const productCar = {
        slidesPerView: "auto",
        spaceBetween: 0,
        slidesPerGroup: 2,
        speed: 800,
        draggable: true,
        preventClicksPropagation: false,
        preventClicks: false,
        rebuildOnUpdate: true,
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
          320: {
            slidesPerGroup: 1,
          },
          760: {
            slidesPerGroup: 2,
          },
          951: {
            slidesPerGroup: 4,
          },
        },
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
      };

      return (
        forType.length !== 0 && (
          <div className="main-page">
            <div className="head head_big ">
              <div className="head-car">
                <Swiper {...headCar}>{mainBanner}</Swiper>
                {/* <Link
                  className="head-banner"
                  to="/catalog/podarki/sertificats"
                  style={{
                    backgroundImage: `url(/image/banners/${bannersData["podarki_sert"][0]["image-desc-large"]})`,
                  }}
                ></Link> */}
              </div>
            </div>

            <div className="carousel carousel_product">
              <div className="container container_s">
                <div className="slider-cont">
                  {/* <Slider {...settingsMulti}>{hitCont}</Slider> */}
                  <div className="gifts row">
                    <Swiper {...productCar}>{forType}</Swiper>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-background">
              <div className="container">
                <div className="title">
                  <h2 className="tilda">По случаю</h2>
                </div>
                {ideasCon}

                <div className="title">
                  <h2 className="tilda">По стоимости</h2>
                </div>
                <div className="gifts row gifts_price">
                  <Swiper {...productCar}>{priceCont}</Swiper>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
  }
);

export default withRouter(GiftsPage);
