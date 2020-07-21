import { observer } from "mobx-react";
import React from "react";
import { createBrowserHistory } from "history";
import localStorage from "mobx-localstorage";
import Swiper from "react-id-swiper";
import Drift from "drift-zoom";
import ProductCard from "./ProductCard";
import Gallery from "./Gallery";
import { SERVER_URL } from "../constants";
import api from "./api";
import moment from "moment";
import num2str from "../ulits/nm2wrd";
import { Link } from "react-router-dom";
import Breadcrumbs from "./breadcrumbs";
import $ from "jquery";

const { Component } = React;
const historyAll = createBrowserHistory();

//TODO: исправить вывод стоимости во время скидки
const CardView = observer(
  class CardView extends Component {
    state = {
      countInCart: 1,
      timeDelivery: "",
    };

    fetchReady = false;

    inCart = false;
    inFav = false;

    with = [];
    like = [];
    count = true;
    drafts = [];

    inLike = this.props.store.likeContainer.length
      ? this.props.store.likeContainer.indexOf(
          String(this.props.store.cardContainer.slug)
        )
      : -1;

    inCart = Object.keys(this.props.store.productInCartList).length
      ? Object.keys(this.props.store.productInCartList).indexOf(
          String(this.props.store.cardContainer.slug)
        )
      : -1;

    clickHandler = (e) => {
      const { store } = this.props;
      // e.target.textContent = "Добавлено в корзину";
      e.target.classList.toggle("active");
      const data = store.cardContainer;

      const { productInCartList, addtoCart } = store;

      const inCart = Object.keys(this.props.store.productInCartList).length
        ? Object.keys(this.props.store.productInCartList).indexOf(
            String(this.props.store.cardContainer.slug)
          )
        : -1;
      if (inCart !== -1) {
        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);

        $(".tooltip_cart").find(".ic").removeClass("i_fav");
        $(".tooltip_cart").find(".ic").removeClass("i_plus");
        $(".tooltip_cart").find(".ic").addClass("i_minus");

        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);

        delete productInCartList[data.slug];
        window.dataLayer.push({
          ecommerce: {
            remove: {
              products: [
                {
                  id: data.slug,
                  name: data.name,
                  price: data.price,
                  brand: data.brand,
                },
              ],
            },
          },
        });
      } else {
        $(".tooltip_cart").find(".ic").removeClass("i_fav-f");
        $(".tooltip_cart").find(".ic").removeClass("i_minus");
        $(".tooltip_cart").find(".ic").addClass("i_plus");

        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);

        productInCartList[data.slug] = store.countInProdPage;
        window.dataLayer.push({
          ecommerce: {
            add: {
              products: [
                {
                  id: data.slug,
                  name: data.name,
                  price: data.price,
                  brand: data.brand,
                  quantity: store.countInProdPage,
                },
              ],
            },
          },
        });
      }
      addtoCart(true);

      // const cardData = Object.assign(this.props.data, {
      //   countInCart: this.props.store.countInProdPage,
      // });

      // if (
      //   localStorage.get("productInCart") &&
      //   Object.keys(localStorage.get("productInCart")).length
      // ) {
      //   console.log("object :>> 123123123123123");
      //   const pc = localStorage.get("productInCart");
      //   console.log(
      //     "Object.keys(pc).includes(this.cardData.slug) :>> ",
      //     Object.keys(pc).includes(this.cardData.slug)
      //   );
      //   if (Object.keys(pc).includes(this.cardData.slug)) {
      //     console.log("object :>> ");
      //     pc[this.cardData.slug].countInCart += 1;
      //   } else {
      //     pc[this.cardData.slug] = this.cardData;
      //   }
      //   localStorage.setItem("productInCart", pc);
      // } else
      //   localStorage.setItem("productInCart", {
      //     [this.cardData.slug]: this.cardData,
      //   });
      // if (!this.inCart) {
      //   store.productInCart.push(this.cardData);
      //   this.inCart = true;
      // } else {
      //   this.cardData.countInCart += 1;
      // }
      // store.cartCount += 1;
    };

    clickFav = (e) => {
      const { store } = this.props;
      const data = store.cardContainer;

      const { likeContainer, addToLike } = store;
      const inLike = this.props.store.likeContainer.length
        ? this.props.store.likeContainer.indexOf(
            String(this.props.store.cardContainer.slug)
          )
        : -1;

      e.target.classList.toggle("active");
      if (inLike !== -1) {
        likeContainer.splice(inLike, 1);

        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);

        $(".tooltip_cart").find(".ic").removeClass("i_fav-f");
        $(".tooltip_cart").find(".ic").removeClass("i_plus");
        $(".tooltip_cart").find(".ic").addClass("i_minus");
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);
      } else {
        likeContainer.unshift(String(data.slug));

        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);

        $(".tooltip_cart").find(".ic").removeClass("i_plus");
        $(".tooltip_cart").find(".ic").removeClass("i_minus");
        $(".tooltip_cart").find(".ic").addClass("i_fav-f");
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);
      }
      addToLike();
    };

    close = () => {
      historyAll.goBack();
      this.props.store.productPage = false;
    };

    clickPlus = () => {
      const data = this.props.store.cardContainer;
      if (this.props.store.countInProdPage < data.stock_quantity) {
        this.props.store.countInProdPage += 1;
      }
    };

    clickMinus = () => {
      if (this.props.store.countInProdPage > 1) {
        this.props.store.countInProdPage -= 1;
      }
    };

    render() {
      const data = this.props.store.cardContainer;

      const { timeDelivery } = this.state;

      const {
        dontSaleProdCount,
        lastSeenProdsData,
        lastSeenProds,
        withProds,
        likeProds,
      } = this.props.store;

      if (data.slug === +this.props.sku && this.count) {
        if (
          timeDelivery === "" &&
          localStorage.get("city") !== null &&
          localStorage.get("city") !== undefined
        ) {
          this.count = false;

          const dataDeliv = {
            senderId: 500001936,
            from: {
              geoId: 213,
            },
            to: {
              geoId: localStorage.get("city").geoId,
            },
            dimensions: {
              length: +data.dimensions.length,
              width: +data.dimensions.width,
              height: +data.dimensions.height,
              weight: +data.weight,
            },
            deliveryType: "COURIER",
          };

          api
            .timeDelivery({ data: dataDeliv })
            .then((ok) => {
              // console.log("ok :>> ", ok);
              ok.forEach((del) => {
                if (del.tags.includes("FASTEST")) {
                  const time = moment(
                    del.delivery.calculatedDeliveryDateMin
                  ).diff(moment(), "days");
                  this.setState({ timeDelivery: time + 1 });
                  return;
                }
              });
            })
            .catch((err) => {
              console.log("err :>> ", err);
            });
        }
      }

      if (data.slug !== +this.props.sku) {
        this.fetchReady = false;
      } else {
        this.fetchReady = true;
      }

      const relativeCar = {
        slidesPerView: "auto",
        slidesPerGroup: 2,
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
        breakpoints: {
          760: {
            slidesPerGroup: 3,
          },
          951: {
            slidesPerGroup: 4,
          },
        },
      };

      const sameCar = {
        slidesPerView: "auto",
        slidesPerGroup: 2,
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
        breakpoints: {
          760: {
            slidesPerGroup: 3,
          },
          951: {
            slidesPerGroup: 4,
          },
        },
      };

      const storesAvali = [];

      if (data.slug === +this.props.sku) {
        data.stores.forEach((el) => {
          if (+el.count > 0) {
            storesAvali.push(
              <div className="drop_shop-list" key={el.name}>
                <div>
                  <b>{el.name}:</b> {el.address}
                </div>
                <a href={"tel:" + el.tel}>{el.tel}</a>{" "}
                <a className="underline" href={"mailto:" + el.email}>
                  {el.email}
                </a>
              </div>
            );
          }
        });
      }

      const inLike = this.props.store.likeContainer.length
        ? this.props.store.likeContainer.indexOf(
            String(this.props.store.cardContainer.slug)
          )
        : -1;

      const inCart = Object.keys(this.props.store.productInCartList).length
        ? Object.keys(this.props.store.productInCartList).indexOf(
            String(this.props.store.cardContainer.slug)
          )
        : -1;

      // if (data.slug === +this.props.sku) {
      //   if (!this.props.store.seenProd.includes(data.slug)) {
      //     this.props.store.seenProd.unshift(data);
      //   }
      // }

      return (
        data.slug === +this.props.sku && (
          <div
            className="card-view-container"
            onClick={(e) => {
              e.stopPropagation();

              var container = document.querySelector(".drop");
              if (container !== null) {
                if (!container.contains(e.target)) {
                  document
                    .querySelector(".drop_shop-btn")
                    .classList.remove("active");
                  document.querySelector(".drop").classList.remove("visible");
                }
              }
            }}
          >
            <div className="container">
              <div>
                <Breadcrumbs
                  name={
                    this.props.store.firstBread === ""
                      ? data.categories[0].slugName
                      : this.props.store.firstBread
                  }
                  child={
                    this.props.store.firstBread === "ideas"
                      ? ""
                      : this.props.store.secondBread === ""
                      ? data.categories[0].childsSlug[0]
                      : this.props.store.secondBread
                  }
                  prod={data.name}
                  prodSlug={data.slug}
                  store={this.props.store}
                />

                <button className="link dotted" onClick={this.close}>
                  <span className="ic i_left"></span> Вернуться назад
                </button>
                <div
                  className={
                    "row product-p " + (data.description ? "" : "no-desc")
                  }
                >
                  <div className="col col-6 col-t-5 col-s-12">
                    <Gallery path={data.path_to_photo} key={data.slug} />
                  </div>
                  <div className="col col-6 col-t-7 col-s-12">
                    <div className="product-p__description">
                      <div className="product-p__head">
                        <h4 className="product-p__name">{data.name}</h4>
                        <div className="product-p__article">
                          {"Артикул: " + data.slug}
                          <Link
                            className="underline"
                            to={"/catalog?brand=" + data.brand}
                          >
                            {data.brand}
                          </Link>
                        </div>
                        {data.sale ? (
                          <div className={"product__price product__price_disc"}>
                            <span className="old">
                              {data.regular_price.toLocaleString()} ₽
                            </span>{" "}
                            {data.sale_price.toLocaleString()} ₽{" "}
                            <span className="disc_perc">
                              {(
                                (data.sale_price / data.regular_price - 1) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        ) : (
                          <div className={"product__price"}>
                            {data.regular_price.toLocaleString()} ₽{" "}
                          </div>
                        )}
                      </div>

                      {data.description && (
                        <p className="product-p__info">{data.description}</p>
                      )}
                      {dontSaleProdCount !== 0 &&
                      dontSaleProdCount % 3 !== 0 &&
                      !data.sale ? (
                        <Link to="/main/1+13" className="one-plus-one">
                          Добавьте еще{" "}
                          {3 * (Math.floor(dontSaleProdCount / 3) + 1) -
                            dontSaleProdCount}{" "}
                          {num2str(
                            3 * (Math.floor(dontSaleProdCount / 3) + 1) -
                              dontSaleProdCount,
                            ["товар", "товара", "товаров"]
                          )}{" "}
                          из акции <p className="disc_perc">1 + 1 = 3</p>
                        </Link>
                      ) : null}
                      <div className="product-p__control">
                        <div className="product-p__buttons">
                          <button
                            className={
                              "btn btn_primary" +
                              (data.stock_quantity ? "" : " btn_dis")
                            }
                            onClick={this.clickHandler}
                          >
                            <span
                              className={
                                "ic i_bag " + (inCart === -1 ? "" : " active")
                              }
                            ></span>{" "}
                            {inCart === -1 ? "В корзину" : " В корзинe"}
                          </button>
                          <div className="product__counter">
                            <button
                              className="ic i_minus"
                              onClick={this.clickMinus}
                            ></button>
                            <input
                              min="1"
                              max="100"
                              type="number"
                              value={this.props.store.countInProdPage}
                            />
                            <button
                              className="ic i_plus"
                              onClick={this.clickPlus}
                            ></button>
                          </div>
                          <button
                            className={
                              "ic i_fav" + (inLike === -1 ? "" : " active")
                            }
                            onClick={this.clickFav}
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
                            Доставка от{" "}
                            <b>
                              {timeDelivery}{" "}
                              {num2str(timeDelivery, ["дня", "дней", "дней"])}
                            </b>
                          </span>
                          {storesAvali.length > 0 && (
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
                                Есть в {storesAvali.length}{" "}
                                {num2str(storesAvali.length, [
                                  "магазине",
                                  "магазинах",
                                  "магазинах",
                                ])}{" "}
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
                              {data.color !== "" && <li>{data.color}</li>}
                              {data.material && <li>{data.material}</li>}
                              {$(window).width() <= 760 && (
                                <>
                                  <li>
                                    {data.dimensions.length.toLocaleString() +
                                      " x " +
                                      data.dimensions.width.toLocaleString() +
                                      " x " +
                                      data.dimensions.height.toLocaleString() +
                                      "см"}
                                  </li>
                                  <li>{data.country}</li>
                                  {data.attributes.length !== 0 && (
                                    <li>
                                      {data.attributes[0].name}:{" "}
                                      {data.attributes[0].value +
                                        data.attributes[0].unit}
                                    </li>
                                  )}
                                </>
                              )}
                            </ul>
                            {$(window).width() >= 760 && (
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
                                {data.attributes.length !== 0 && (
                                  <li>
                                    {data.attributes[0].name}:{" "}
                                    {data.attributes[0].value +
                                      data.attributes[0].unit}
                                  </li>
                                )}
                                {/* <li>{data.brand}</li> */}
                              </ul>
                            )}
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
            {withProds.length !== 0 && (
              <div className="carousel carousel_product">
                <div className="container">
                  <div className="title">
                    <h3>С этим товаром покупают</h3>
                  </div>
                </div>
                <div className="container container_s">
                  <div className="slider-cont">
                    <Swiper {...relativeCar}>
                      {withProds.map((el) => {
                        return (
                          <div
                            className="col col-3 col-t-4 col-s-6"
                            key={el.slug}
                          >
                            <ProductCard
                              key={el.slug}
                              data={el}
                              store={this.props.store}
                            />
                          </div>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            )}

            {likeProds.length !== 0 && (
              <div className="carousel carousel_product">
                <div className="container">
                  <div className="title">
                    <h3 className="tilda">Похожие товары</h3>
                  </div>
                </div>
                <div className="container container_s">
                  <div className="slider-cont">
                    <Swiper {...sameCar}>
                      {likeProds.map((el) => {
                        return (
                          <div
                            className="col col-3 col-t-4 col-s-6"
                            key={el.slug}
                          >
                            <ProductCard
                              key={el.slug}
                              data={el}
                              store={this.props.store}
                            />
                          </div>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            )}
            {Object.keys(lastSeenProdsData).length !== 0 && (
              <div className="carousel carousel_product">
                <div className="container">
                  <div className="title">
                    <h3>Вы недавно просматривали</h3>
                  </div>
                </div>
                <div className="container container_s">
                  <div className="slider-cont">
                    <Swiper {...relativeCar}>
                      {lastSeenProds.map((el, i) => {
                        if (lastSeenProdsData[el] !== undefined) {
                          return (
                            <div className="col col-3 col-t-4 col-s-6" key={el}>
                              <ProductCard
                                key={el}
                                data={lastSeenProdsData[el]}
                                store={this.props.store}
                              />
                            </div>
                          );
                        }
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      );
    }

    componentDidUpdate() {
      if (document.querySelector(".drift") !== null) {
        this.drafts.forEach((el) => {
          el.disable();
        });
        console.log(
          'document.querySelector(".drift") :>> ',
          document.querySelector(".drift").getAttribute("data-zoom")
        );
        var driftImgs = document.querySelectorAll(".drift");
        var pane = document.querySelector(".product-p__description");
        driftImgs.forEach((img) => {
          const d = new Drift(img, {
            paneContainer: pane,
            inlinePane: true,
            hoverDelay: 200,
          });
          this.drafts.push(d);
        });
      }
    }
  }
);

export default CardView;
