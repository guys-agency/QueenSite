  import { observer } from "mobx-react";
import React from "react";
import { createBrowserHistory } from "history";
import localStorage from "mobx-localstorage";
import Swiper from "react-id-swiper";
import Drift from "drift-zoom";
import ProductCard from "./ProductCard";
import { SERVER_URL } from "../constants";

const { Component } = React;
const historyAll = createBrowserHistory();

//TODO: исправить вывод стоимости во время скидки
const CardView = observer(
  class CardView extends Component {
    state = {};

    fetchReady = false;

    countInCart = 1;
    inCart = false;

    cardData = Object.assign(this.props.data, {
      countInCart: this.countInCart,
    });

    with = [];
    like = [];

    clickHandler = () => {
      const { data, store } = this.props;
      console.log(
        'localStorage.get("productInCart") 123:>> ',
        localStorage.get("productInCart")
      );
      if (
        localStorage.get("productInCart") &&
        Object.keys(localStorage.get("productInCart")).length
      ) {
        console.log("object :>> 123123123123123");
        const pc = localStorage.get("productInCart");
        console.log(
          "Object.keys(pc).includes(this.cardData.slug) :>> ",
          Object.keys(pc).includes(this.cardData.slug)
        );
        if (Object.keys(pc).includes(this.cardData.slug)) {
          console.log("object :>> ");
          pc[this.cardData.slug].countInCart += 1;
        } else {
          pc[this.cardData.slug] = this.cardData;
        }
        localStorage.setItem("productInCart", pc);
      } else
        localStorage.setItem("productInCart", {
          [this.cardData.slug]: this.cardData,
        });
      // if (!this.inCart) {
      //   store.productInCart.push(this.cardData);
      //   this.inCart = true;
      // } else {
      //   this.cardData.countInCart += 1;
      // }
      // store.cartCount += 1;
    };

    close = () => {
      historyAll.goBack();
      this.props.store.productPage = false;
    };

    render() {
      const data = this.props.store.cardContainer;
      console.log("data120 :>> ", data);

      if (!this.fetchReady && data !== undefined) {
        fetch(SERVER_URL + "/product/" + this.props.sku, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        })
          .then((res) => {
            console.log("res", res);
            return res.json();
          })
          .then((data) => {
            console.log("datasto :>> ", data);

            this.with = data.addProd[0].with;
            this.like = data.addProd[0].like;
            console.log("this.like :>> ", this.like);
            this.props.store.cardContainer = data.product[0];
            this.fetchReady = true;
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        this.fetchReady = true;
      }

      const imgProduct = {
        // getSwiper: this.state.getGallerySwiper,
        slidesPerView: 1,
        speed: 800,
        effect: "fade",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };

      const imgProducts = {
        // getSwiper: this.state.getThumbnailSwiper,
        slidesPerView: "auto",
        speed: 800,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };

      const relativeCar = {
        slidesPerView: "auto",
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

      const sameCar = {
        slidesPerView: "auto",
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

      const storesAvali = [];

      if (this.fetchReady) {
        data.stores.forEach((el) => {
          if (+el.count > 0) {
            storesAvali.push(
              <div className="drop_shop-list">
                <div>
                  <b>{el.name}:</b> {el.address}
                </div>
                <a href={"tel:" + el.tel}>{el.tel}</a>{" "}
                <a className="underline" href="">
                  belayadacha@queenbohemia.ru
                </a>
              </div>
            );
          }
        });
      }

      return (
        this.fetchReady && (
          <div
            className="card-view-container"
            onClick={(e) => {
              e.stopPropagation();

              var container = document.querySelector(".drop");
              if (!container.contains(e.target)) {
                document
                  .querySelector(".drop_shop-btn")
                  .classList.remove("active");
                document.querySelector(".drop").classList.remove("visible");
              }
            }}
          >
            <div className="container">
              <div>
                <button className="btn" onClick={this.close}>
                  Вернуться назад
                </button>
                <div
                  className={
                    "row product-p " + (data.description ? "" : "no-desc")
                  }
                >
                  <div className="col col-6 col-t-5 col-s-12">
                    <div className="product-p__image-block">
                      <div className="main">
                        {/* <div className="main-img">
                          <img className="drift" src="/image/testbig.jpg" data-zoom="/image/testbig.jpg"alt="" />
                        </div> */}

                        <Swiper {...imgProduct}>
                          <div className="main-img">
                            <img
                              className="drift"
                              src="/image/testbig.jpg"
                              data-zoom="/image/testbig.jpg"
                              alt=""
                            />
                          </div>

                          <div className="main-img">
                            <img
                              className="drift"
                              src="/image/testbig.jpg"
                              data-zoom="/image/testbig.jpg"
                              alt=""
                            />
                          </div>

                          <div className="main-img">
                            <img
                              className="drift"
                              src="/image/testbig.jpg"
                              data-zoom="/image/testbig.jpg"
                              alt=""
                            />
                          </div>
                        </Swiper>
                      </div>
                      <div className="thumb">
                        <Swiper {...imgProducts}>
                          <div className="thumb-img">
                            <img src="/image/testbig.jpg" alt="" />
                          </div>

                          <div className="thumb-img">
                            <img src="/image/testbig.jpg" alt="" />
                          </div>

                          <div className="thumb-img">
                            <img src="/image/testbig.jpg" alt="" />
                          </div>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                  <div className="col col-6 col-t-7 col-s-12">
                    <div className="product-p__description">
                      <div className="product-p__head">
                        <h4 className="product-p__name">{data.name}</h4>
                        <div className="product-p__article">
                          {"Артикул: " + data.slug}
                          <a className="underline" href="">
                            {data.brand}
                          </a>
                        </div>
                        <div className="product__price">
                          {data.regular_price.toLocaleString() + " ₽"}
                        </div>
                      </div>
                      {data.description && (
                        <p className="product-p__info">{data.description}</p>
                      )}

                      <div className="product-p__control">
                        <div className="product-p__buttons">
                          <button
                            className="btn btn_primary"
                            onClick={this.clickHandler}
                          >
                            <span className="ic i_bag"></span> В корзину
                          </button>
                          <div className="product__counter">
                            <button className="ic i_minus"></button>
                            <input
                              min="1"
                              max="100"
                              type="number"
                              value={this.countInCart}
                            />
                            <button className="ic i_plus"></button>
                          </div>
                          <button
                            className="ic i_fav"
                            onClick={(e) => {
                              e.target.classList.toggle("active");
                            }}
                          ></button>
                        </div>
                        <div className="product-p__available">
                          <span
                            className={
                              "product-p__stock " +
                              (data.stock_quantity ? "" : "un-stock")
                            }
                          >
                            {data.stock_quantity
                              ? "Есть на складе"
                              : "Нет на складе"}
                          </span>
                          <span className="product-p__delivery">
                            Доставка <b>3-4 дня</b>
                          </span>
                          {storesAvali.length && (
                            <>
                              <button
                                className="link dotted drop_shop-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.target.classList.toggle("active");
                                  var drop = document.querySelector(
                                    ".drop_shop"
                                  );
                                  drop.classList.toggle("visible");
                                }}
                              >
                                Есть в {storesAvali.length} магазинах{" "}
                                <span className="ic i_drop"></span>
                              </button>
                              <div className="drop drop_shop">
                                {storesAvali}
                                {/* <div className="drop_shop-list">
                              <div>
                                <b>ТРЦ OUTLET Белая дача:</b> Новорязанское
                                шоссе 8, Котельники, Московская область
                              </div>
                              <a href="">+7 926 897-54-43</a>{" "}
                              <a className="underline" href="">
                                belayadacha@queenbohemia.ru
                              </a>
                            </div>

                            <div className="drop_shop-list">
                              <div>
                                <b>ТРЦ Орджоникидзе 11:</b> ул. Орджоникидзе,
                                11, стр. 1А, Москва
                              </div>
                              <a href="">+7 985 417-58-38</a>{" "}
                              <a className="underline" href="">
                                o11@queenbohemia.ru
                              </a>
                            </div>

                            <div className="drop_shop-list">
                              <div>
                                <b>ТРЦ Пушкино парк:</b> Красноармейское шоссе,
                                с104, Пушкино, Московская область
                              </div>
                              <a href="">+7 926 673-37-01</a>{" "}
                              <a className="underline" href="">
                                pushkino@queenbohemia.ru
                              </a>
                            </div>

                            <div className="drop_shop-list">
                              <div>
                                <b>ТРЦ Саларис:</b> Киевское шоссе, 23-й
                                километр, 1 поселение Московский, Москва
                              </div>
                              <a href="">+7 926 567-67-42</a>{" "}
                              <a className="underline" href="">
                                salaris@queenbohemia.ru
                              </a>
                            </div> */}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="product-p__spec">
                        <div>
                          <h5>Детали:</h5>
                          <div className="product-p__spec-detail">
                            <ul>
                              <li>{data.weight + "кг."}</li>
                              <li>{data.color}</li>
                              <li>{data.material}</li>
                            </ul>
                            <ul>
                              <li>
                                {data.dimensions.length.toLocaleString() +
                                  " x " +
                                  data.dimensions.width.toLocaleString() +
                                  " x " +
                                  data.dimensions.height.toLocaleString() +
                                  "см"}
                              </li>
                              <li>{data.country}</li>
                              <li>Объем: 320мл</li>
                              {/* <li>{data.brand}</li> */}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h5>Можно использовать:</h5>
                          <ul>
                            <li>
                              <span className={data.microwave ? "" : "lth"}>
                                в микроволновке
                              </span>
                            </li>
                            <li>
                              <span className={data.pm ? "" : "lth"}>
                                в посудомойке
                              </span>
                            </li>
                            {/* {data.microwave && } */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel carousel_product">
              <div className="container">
                <div className="title">
                  <h3>С этим товаром покупают</h3>
                </div>
              </div>
              <div className="container container_s">
                <div className="slider-cont">
                  {this.with.length && (
                    <Swiper {...relativeCar}>
                      {this.with.map((el) => {
                        return (
                          <div className="col col-3 col-t-4 col-s-6">
                            <ProductCard
                              key={el.slug}
                              data={el}
                              store={this.props.store}
                            />
                          </div>
                        );
                      })}
                    </Swiper>
                  )}
                </div>
              </div>
            </div>

            <div className="carousel carousel_product">
              <div className="container">
                <div className="title">
                  <h3 className="tilda">Похожие товары</h3>
                </div>
              </div>
              <div className="container container_s">
                <div className="slider-cont">
                  {this.like.length && (
                    <Swiper {...sameCar}>
                      {this.like.map((el) => {
                        return (
                          <div className="col col-3 col-t-4 col-s-6">
                            <ProductCard
                              key={el.slug}
                              data={el}
                              store={this.props.store}
                            />
                          </div>
                        );
                      })}
                    </Swiper>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
    driftInit = false;

    componentDidUpdate() {
      console.log(document.querySelector(".drift"));
      if (document.querySelector(".drift") !== null && !this.driftInit) {
        var driftImgs = document.querySelectorAll(".drift");
        var pane = document.querySelector(".product-p__description");
        driftImgs.forEach((img) => {
          new Drift(img, {
            paneContainer: pane,
            inlinePane: true,
            hoverDelay: 200,
          });
        });
        this.driftInit = true;
      }
    }
  }
);

export default CardView;
