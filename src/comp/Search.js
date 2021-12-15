import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import ProductCardContainer from "./ProductCardContainer";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import Swiper from "react-id-swiper";
import { withRouter } from "react-router";
const { Component } = React;

const Search = observer(
  class Search extends Component {
    state = { hitCont: [] };

    getData = () => {
      const hitContTime = [];

      api
        .getHits()
        .then((data) => {
          Object.keys(data[0].hit).forEach((element, i) => {
            hitContTime.push(
              <div className="swiper-slide col col-3 col-t-4 col-s-6" key={data[0].hit[element].slug}>
                <ProductCard data={data[0].hit[element]} store={this.props.store} />
              </div>
            );
          });

          // console.log("cert :>> ", this.props.gift);

          this.setState({
            hitCont: hitContTime,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    searchValue = "";

    relativeCar = {
      slidesPerView: "auto",
      slidesPerGroup: 2,
      speed: 800,
      draggable: true,
      preventClicksPropagation: false,
      preventClicks: false,
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
      breakpoints: {
        760: {
          slidesPerGroup: 3,
        },
        951: {
          slidesPerGroup: 4,
        },
      },
    };

    componentWillMount() {
      this.getData();
    }

    render() {
      const { hitCont } = this.state;
      const { lastSeenProdsData } = this.props.store;

      let lastSeenProdsRender;
      if (Object.keys(lastSeenProdsData).length) {
        lastSeenProdsRender = Object.keys(lastSeenProdsData).map((el, i) => {
          if (lastSeenProdsData[el] !== undefined) {
            return (
              <div className="col col-3 col-t-4 col-s-6" key={el}>
                <ProductCard key={el} data={lastSeenProdsData[el]} store={this.props.store} />
              </div>
            );
          }
          return null;
        });
      }

      return (
        <div className="main-screen">
          <div className="container">
            <div className="row">
              <div className="col col-12">
                <h1 className="catalog-title h3">Поиск</h1>
              </div>
            </div>
            {this.props.store.productsToRender !== null ? (
              <div className="row catalog">
                <div className="col col-3">
                  <Filters store={this.props.store} parentName={this.props.parentName} childName={this.props.childName} />
                </div>

                <ProductCardContainer store={this.props.store} parentName={this.props.parentName} childName={this.props.childName} />
              </div>
            ) : (
              <div className="row catalog">
                <div className="col col-12 col-t-12">
                  <div className="row row_inner">
                    <div className="col col-12">
                      <div className="search-pos search-pos_mob">
                        <form className="search-wrp">
                          <input
                            type="text"
                            className="search"
                            placeholder="Поиск"
                            key={this.props.store.searchText}
                            defaultValue={this.props.store.searchText}
                            onChange={(e) => {
                              this.searchValue = e.target.value;
                            }}
                          ></input>
                          <button
                            className="ic i_search"
                            onClick={(e) => {
                              // this.props.store.searchText = this.searchValue;

                              this.props.history.push(`/search?search=${this.searchValue}`);

                              e.preventDefault();
                            }}
                          ></button>
                        </form>
                      </div>
                      <div className="search-not-found">
                        <h3>По вашему запросу ничего не найдено</h3>
                        <div className="search-not-found__call">
                          <p>
                            Не можете найти интересующий товар на сайте?
                            <br />
                            Свяжитесь с нами!
                            <br />
                            <br />
                            Телефон: <a href="tel:88006003421">8 800 600-34-21</a>
                            <br />
                            E-mail:{" "}
                            <a href="mailto:info@queenbohemia.ru" className="underline">
                              info@queenbohemia.ru
                            </a>
                          </p>
                        </div>
                        {lastSeenProdsRender !== undefined && lastSeenProdsRender !== null && lastSeenProdsRender.length !== 0 && (
                          <div className="carousel carousel_product">
                            <div className="container">
                              <div className="title">
                                <h3>Вы недавно просматривали</h3>
                              </div>
                            </div>
                            <div className="container container_s">
                              <div className="slider-cont">
                                <Swiper {...this.relativeCar}>{lastSeenProdsRender}</Swiper>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="carousel carousel_product">
                          <div className="container">
                            <div className="title">
                              <h3>Хиты продаж</h3>
                            </div>
                          </div>
                          <div className="container container_s">
                            <div className="slider-cont">
                              {/* <Slider {...settingsMulti}>{hitCont}</Slider> */}

                              {hitCont.length !== 0 && <Swiper {...this.relativeCar}>{hitCont}</Swiper>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
);

export default withRouter(Search);
