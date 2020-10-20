import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { SERVER_URL } from "../constants";
import { Link } from "react-router-dom";
import ProductCardContainer from "./ProductCardContainer";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import Swiper from "react-id-swiper";
const { Component } = React;

const PageNotFound = observer(
  class PageNotFound extends Component {
    state = { hitCont: [] };

    getData = () => {
      const hitContTime = [];

      api
        .getHits()
        .then((data) => {
          Object.keys(data[0].hit).forEach((element, i) => {
            if (i <= 7) {
              hitContTime.push(
                <div
                  className="col col-3 col-t-4 col-s-6"
                  key={data[0].hit[element].slug}
                >
                  <ProductCard
                    data={data[0].hit[element]}
                    store={this.props.store}
                  />
                </div>
              );
            }
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

      return (
        <div className="main-screen">
          <div className="container">
            <div className="row">
              <div className="col col-12">
                <h3 className="catalog-title">Страница не найдена</h3>
                <p>Но мы нашли, товары, которые могут вам быть интересны!</p>
              </div>
            </div>

            <div className="row catalog">
              <div className="col col-12 col-t-12">
                <div className="row row_inner">
                  <div className="col col-12">
                    <div className="page-not-found">
                      <div className="carousel carousel_product">
                        <div className="container">
                          <div className="title">
                            <h3>Хиты продаж</h3>
                          </div>
                        </div>
                        <div className="actions">
                          {hitCont.length !== 0 && (
                            <div className="action">
                              <div className="container container_f">
                                <div className="row">{hitCont}</div>
                                <Link to="/hits" className="btn btn_primary">
                                  Посмотреть еще
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default PageNotFound;
