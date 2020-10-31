import { observer } from "mobx-react"
import React from "react"
import { createBrowserHistory } from "history"
import localStorage from "mobx-localstorage"
import Swiper from "react-id-swiper"

import ProductCard from "./ProductCard"
import Gallery from "./Gallery"
import { SERVER_URL } from "../constants"
import api from "./api"
import moment from "moment"
import num2str from "../ulits/nm2wrd"
import { Link, NavLink } from "react-router-dom"
import Breadcrumbs from "./breadcrumbs"
import $ from "jquery"
import Helmet from "react-helmet"
import { withRouter } from "react-router"

const { Component } = React
const historyAll = createBrowserHistory()

//TODO: исправить вывод стоимости во время скидки
const CardView = observer(
  class CardView extends Component {
    state = {
      countInCart: 1,
      timeDelivery: "",
    }

    fetchReady = false

    inCart = false
    inFav = false

    with = []
    like = []
    count = true
    drafts = []

    inLike = this.props.store.likeContainer.length
      ? this.props.store.likeContainer.indexOf(
          String(this.props.store.cardContainer.slug)
        )
      : -1

    inCart = Object.keys(this.props.store.productInCartList).length
      ? Object.keys(this.props.store.productInCartList).indexOf(
          String(this.props.store.cardContainer.slug)
        )
      : -1

    clickHandler = (e) => {
      this.props.store.productInCartList = localStorage.get("productInCart")
      const { store } = this.props
      // e.target.textContent = "Добавлено в корзину";
      e.target.classList.toggle("active")

      const { productInCartList, addtoCart, certInCart } = store

      // this.inCart = Object.keys(this.props.store.productInCartList).length
      //   ? Object.keys(this.props.store.productInCartList).indexOf(
      //       String(this.props.store.cardContainer.slug)
      //     )
      //   : -1;

      // if (Object.keys(this.props.store.productInCartList).length) {
      //   if (data.name === "Электронный подарочный сертификат" && certInCart) {
      //     this.inCart = Object.keys(this.props.store.productInCartList).indexOf(
      //       certInCart
      //     );
      //   }
      // }

      if (this.inCart !== -1) {
        $(".tooltip_cart").addClass("visible")
        $(".tooltip_cart").find(".text").text(this.data.name)

        $(".tooltip_cart").find(".ic").removeClass("i_fav")
        $(".tooltip_cart").find(".ic").removeClass("i_plus")
        $(".tooltip_cart").find(".ic").addClass("i_minus")

        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible")
        }, 2000)
        if (this.data.name === "Электронный подарочный сертификат") {
          delete productInCartList[certInCart]
        } else {
          delete productInCartList[this.data.slug]
        }

        window.dataLayer.push({
          ecommerce: {
            remove: {
              products: [
                {
                  id: this.data.slug,
                  name: this.data.name,
                  price: this.data.price,
                  brand: this.data.brand,
                },
              ],
            },
          },
        })
      } else {
        $(".tooltip_cart").find(".ic").removeClass("i_fav-f")
        $(".tooltip_cart").find(".ic").removeClass("i_minus")
        $(".tooltip_cart").find(".ic").addClass("i_plus")

        $(".tooltip_cart").addClass("visible")
        $(".tooltip_cart").find(".text").text(this.data.name)
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible")
        }, 2000)
        if (this.data.name === "Электронный подарочный сертификат") {
          productInCartList[this.data.slug] = $("#mess").val()
        } else {
          productInCartList[this.data.slug] = store.countInProdPage
        }
        api.updateCountStats(this.data._id, "cart")
        window.dataLayer.push({
          ecommerce: {
            add: {
              products: [
                {
                  id: this.data.slug,
                  name: this.data.name,
                  price: this.data.price,
                  brand: this.data.brand,
                  quantity: store.countInProdPage,
                },
              ],
            },
          },
        })
      }
      addtoCart(true)

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
    }

    clickFav = (e) => {
      const { store } = this.props

      const { likeContainer, addToLike } = store
      this.inLike = this.props.store.likeContainer.length
        ? this.props.store.likeContainer.indexOf(
            String(this.props.store.cardContainer.slug)
          )
        : -1

      e.target.classList.toggle("active")
      if (this.inLike !== -1) {
        likeContainer.splice(this.inLike, 1)

        $(".tooltip_cart").addClass("visible")
        $(".tooltip_cart").find(".text").text(this.data.name)

        $(".tooltip_cart").find(".ic").removeClass("i_fav-f")
        $(".tooltip_cart").find(".ic").removeClass("i_plus")
        $(".tooltip_cart").find(".ic").addClass("i_minus")
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible")
        }, 2000)
      } else {
        likeContainer.unshift(String(this.data.slug))

        $(".tooltip_cart").addClass("visible")
        $(".tooltip_cart").find(".text").text(this.data.name)

        $(".tooltip_cart").find(".ic").removeClass("i_plus")
        $(".tooltip_cart").find(".ic").removeClass("i_minus")
        $(".tooltip_cart").find(".ic").addClass("i_fav-f")
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible")
        }, 2000)
        api.updateCountStats(this.data._id, "like")
      }
      addToLike()
    }

    close = () => {
      historyAll.goBack()
      this.props.store.productPage = false
    }

    clickPlus = () => {
      if (this.props.store.countInProdPage < this.data.stock_quantity) {
        if (this.inCart !== -1) {
          this.props.store.productInCartList[this.data.slug] += 1
          this.props.store.addtoCart(false)
        }
        this.props.store.countInProdPage += 1
      }
    }

    clickMinus = () => {
      if (this.props.store.countInProdPage > 1) {
        if (this.inCart !== -1) {
          this.props.store.productInCartList[this.data.slug] -= 1
          this.props.store.addtoCart(false)
        }
        this.props.store.countInProdPage -= 1
      }
    }

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
    }

    data = ""

    render() {
      if (
        this.props.store.productInCartList[this.props.sku] !== undefined &&
        this.props.store.countInProdPage !==
          this.props.store.productInCartList[this.props.sku]
      ) {
        this.props.store.countInProdPage = this.props.store.productInCartList[
          this.props.sku
        ]
      }

      if (
        this.data === "" ||
        +this.props.sku === this.props.store.cardContainer.slug
      ) {
        this.data = this.props.store.cardContainer
      }

      const itsSert = this.data.name === "Электронный подарочный сертификат"

      const { timeDelivery } = this.state

      const {
        dontSaleProdCount,
        lastSeenProdsData,
        lastSeenProds,
        withProds,
        likeProds,
        certInCart,
        brandSlugs,
      } = this.props.store

      if (this.data.slug === +this.props.sku && this.count) {
        if (
          timeDelivery === "" &&
          localStorage.get("city") !== null &&
          localStorage.get("city") !== undefined
        ) {
          // console.log("11 :>> ", 11);
          this.count = false

          const dataDeliv = {
            senderId: 500001936,
            from: {
              geoId: 213,
            },
            to: {
              geoId: localStorage.get("city").geoId,
            },
            dimensions: {
              length: +this.data.dimensions.length,
              width: +this.data.dimensions.width,
              height: +this.data.dimensions.height,
              weight: +this.data.weight,
            },
            deliveryType: "COURIER",
          }

          api
            .timeDelivery({ data: dataDeliv })
            .then((ok) => {
              // console.log("ok :>> ", ok);
              ok.forEach((del) => {
                if (del.tags.includes("FASTEST")) {
                  const time = moment(
                    del.delivery.calculatedDeliveryDateMin
                  ).diff(moment(), "days")
                  this.setState({ timeDelivery: time + 1 })
                  return
                }
              })
              if (this.state.timeDelivery === "") {
                const time = moment(
                  ok[0].delivery.calculatedDeliveryDateMin
                ).diff(moment(), "days")
                this.setState({ timeDelivery: time + 1 })
              }
            })
            .catch((err) => {
              console.log("err :>> ", err)
            })
        }
      }

      if (this.data.slug !== +this.props.sku) {
        this.fetchReady = false
      } else {
        this.fetchReady = true
      }

      const storesAvali = []

      if (this.data.slug === +this.props.sku) {
        if (this.data.stores !== undefined) {
          this.data.stores.forEach((el) => {
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
              )
            }
          })
        }

        this.inLike = this.props.store.likeContainer.length
          ? this.props.store.likeContainer.indexOf(String(this.data.slug))
          : -1

        this.inCart = Object.keys(this.props.store.productInCartList).length
          ? Object.keys(this.props.store.productInCartList).indexOf(
              String(this.data.slug)
            )
          : -1
      }

      if (Object.keys(this.props.store.productInCartList).length) {
        if (
          this.data.name === "Электронный подарочный сертификат" &&
          certInCart
        ) {
          this.inCart = Object.keys(this.props.store.productInCartList).indexOf(
            certInCart
          )
        }
      }

      // if (data.slug === +this.props.sku) {
      //   if (!this.props.store.seenProd.includes(data.slug)) {
      //     this.props.store.seenProd.unshift(data);
      //   }
      // }
      let lastSeenProdsRender
      if (Object.keys(lastSeenProdsData).length) {
        lastSeenProdsRender = Object.keys(lastSeenProdsData).map((el, i) => {
          if (lastSeenProdsData[el] !== undefined) {
            return (
              <div className="col col-3 col-t-4 col-s-6" key={el}>
                <ProductCard
                  key={el}
                  data={lastSeenProdsData[el]}
                  store={this.props.store}
                />
              </div>
            )
          }
          return null
        })
      }

      return (
        this.data.slug === +this.props.sku && (
          <div
            className="card-view-container"
            onClick={(e) => {
              e.stopPropagation()

              var container = document.querySelector(".drop")
              if (container !== null) {
                if (
                  !container.contains(e.target) &&
                  document.querySelector(".drop_shop-btn")
                ) {
                  document
                    .querySelector(".drop_shop-btn")
                    .classList.remove("active")
                  document.querySelector(".drop").classList.remove("visible")
                }
              }
            }}
          >
            <Helmet
              title={this.data.name + " - Queen of Bohemia"}
              meta={[
                { name: "description", content: this.data.description },
                {
                  property: "og:image",
                  content: `https://queenbohemia.ru/image/items/${this.data.path_to_photo[0]}`,
                },
              ]}
            />
            <div className="container">
              <div>
                <Breadcrumbs
                  name={
                    this.props.store.firstBread === ""
                      ? this.data.categories[0].slugName
                      : this.props.store.firstBread
                  }
                  child={
                    this.props.store.firstBread === "ideas"
                      ? ""
                      : this.props.store.secondBread === ""
                      ? this.data.categories[0].childsSlug[0]
                      : this.props.store.secondBread
                  }
                  prod={this.data.name}
                  prodSlug={this.data.slug}
                  store={this.props.store}
                />

                <button className="link dotted" onClick={this.close}>
                  <span className="ic i_left"></span> Вернуться назад
                </button>
                <div
                  className={
                    "row product-p " + (this.data.description ? "" : "no-desc")
                  }
                >
                  <div className="col col-6 col-t-5 col-s-12">
                    <Gallery
                      path={this.data.path_to_photo}
                      key={this.data.slug}
                      video={this.data.video}
                    />
                  </div>
                  <div className="col col-6 col-t-7 col-s-12">
                    <div className="product-p__description">
                      <div className="product-p__head">
                        <h4 className="product-p__name">{this.data.name}</h4>
                        {!itsSert && (
                          <div className="product-p__article">
                            <p>{"Артикул: " + this.data.slug}</p>
                            <Link
                              className="underline"
                              to={
                                Object.keys(brandSlugs).includes(
                                  this.data.brand
                                )
                                  ? `/brand/${brandSlugs[this.data.brand]}`
                                  : `/catalog?brand=${this.data.brand}`
                              }
                            >
                              {this.data.brand}
                            </Link>
                          </div>
                        )}
                        {this.data.sale ? (
                          <div className={"product__price product__price_disc"}>
                            <span className="old">
                              {this.data.regular_price.toLocaleString()} ₽
                            </span>{" "}
                            {this.data.sale_price.toLocaleString()} ₽{" "}
                            <span className="disc_perc">
                              {(
                                (this.data.sale_price /
                                  this.data.regular_price -
                                  1) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        ) : (
                          <div className={"product__price"}>
                            {this.data.regular_price.toLocaleString()} ₽{" "}
                            <div
                              className="product__bonus"
                              onClick={() => {
                                this.props.history.push("/help/bonus")
                              }}
                            >
                              <p className="i_coin"></p>
                              <p>
                                +{" "}
                                {Math.round(
                                  this.data.regular_price * 0.1
                                ).toLocaleString()}{" "}
                                {num2str(
                                  Math.round(this.data.regular_price * 0.1),
                                  [
                                    "бонусный балл",
                                    "бонусных баллов",
                                    "бонусных баллов",
                                  ]
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {itsSert ? (
                        <>
                          <p className="product-p__info">
                            Подарочные карты - отличный и модный подарок , когда
                            есть повод, а вы не знаете, что подарить. Подарите
                            своим близким и знакомым радость выбора с
                            подарочными картами магазина «Queen of Bohemia»!
                            <br />
                            <br />
                            Ссылка на подарочную страницу будет сгенерирована
                            сразу после покупки и продублируется вам на почту.
                            <br />
                            <br />
                            <Link to="/help/certificate" className="underline">
                              Подробнее об условиях
                            </Link>
                          </p>
                          <div className="product-p__message input-field">
                            <label className="required" for="mess">
                              Текст сообщения
                            </label>
                            <textarea
                              name="mess"
                              id="mess"
                              onFocus={(e) => {
                                $(e.target)
                                  .parent()
                                  .find("label")
                                  .addClass("active")
                              }}
                            ></textarea>
                          </div>
                        </>
                      ) : (
                        this.data.description && (
                          <p className="product-p__info">
                            {this.data.description}
                          </p>
                        )
                      )}

                      {this.data.kit !== undefined &&
                        this.data.kit.length !== 0 && (
                          <>
                            <button
                              className="link dotted drop_kit-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                e.target.classList.toggle("active")
                                var drop = document.querySelector(".drop_kit")
                                $(".drop_kit").offset({
                                  top:
                                    $(".drop_kit-btn").offset().top +
                                    $(".drop_kit-btn").height() +
                                    12,
                                  left: $(".drop_kit-btn").offset().left,
                                })
                                // $(".drop_shop").width(
                                //   $(".drop_kit-btn").width()
                                // );

                                drop.classList.toggle("visible")
                              }}
                            >
                              Комплектация
                              <span className="ic i_drop"></span>
                            </button>
                            <div className="drop drop_kit">
                              {this.data.kit.map((el) => {
                                return (
                                  <div className="drop_shop-list" key={el}>
                                    <p>
                                      {el.substr(0, 1).toUpperCase() +
                                        el.substr(1)}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        )}

                      {!itsSert &&
                      dontSaleProdCount !== 0 &&
                      dontSaleProdCount % 3 !== 0 &&
                      !this.data.sale ? (
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
                        <div
                          className={
                            "product-p__buttons " +
                            (itsSert ? " gift__buttons" : "")
                          }
                        >
                          <button
                            className={
                              "btn btn_yellow btn_primary " +
                              (this.data.stock_quantity ? "" : " btn_dis")
                            }
                            onClick={this.clickHandler}
                          >
                            <span
                              className={
                                "ic i_bag " +
                                (this.inCart === -1 ? "" : " active")
                              }
                            ></span>{" "}
                            {this.inCart === -1 ? "В корзину" : " В корзинe"}
                          </button>
                          {!itsSert ? (
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
                          ) : (
                            <>
                              <div
                                className="product__counter gift__drop-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  e.target.classList.toggle("active")
                                  var drop = document.querySelector(
                                    ".drop_shop"
                                  )

                                  $(".drop_shop").offset({
                                    top:
                                      $(".gift__drop-btn").offset().top +
                                      $(".gift__drop-btn").height() +
                                      12,
                                    left: $(".gift__drop-btn").offset().left,
                                  })
                                  $(".drop_shop").width(
                                    $(".gift__drop-btn").width()
                                  )
                                  drop.classList.toggle("visible")
                                }}
                              >
                                <p>
                                  Номинал{" "}
                                  {this.data.regular_price.toLocaleString()} ₽
                                </p>
                                <img src="/image/>.svg"></img>
                              </div>
                              <div className="drop drop_shop">
                                <div className="drop_shop-list">
                                  <NavLink
                                    className="gift__link"
                                    to="/product/1111"
                                  >
                                    Номинал 1 000 ₽
                                  </NavLink>
                                  <NavLink
                                    className="gift__link"
                                    to="/product/1112"
                                  >
                                    Номинал 3 000 ₽
                                  </NavLink>
                                  <NavLink
                                    className="gift__link"
                                    to="/product/1113"
                                  >
                                    Номинал 5 000 ₽
                                  </NavLink>
                                  <NavLink
                                    className="gift__link"
                                    to="/product/1114"
                                  >
                                    Номинал 10 000 ₽
                                  </NavLink>
                                </div>
                              </div>
                            </>
                          )}
                          <button
                            className={
                              "ic i_fav" + (this.inLike === -1 ? "" : " active")
                            }
                            onClick={this.clickFav}
                          ></button>
                        </div>
                        {!itsSert && (
                          <div className="product-p__available">
                            <span
                              className={
                                this.data.stock_quantity
                                  ? "product-p__stock "
                                  : "product-p__un-stock"
                              }
                            >
                              {this.data.stock_quantity
                                ? "Есть на складе"
                                : "Нет на складе"}
                            </span>
                            {this.data.stock_quantity ? (
                              <span className="product-p__delivery">
                                Доставка от{" "}
                                <b>
                                  {timeDelivery}{" "}
                                  {num2str(timeDelivery, [
                                    "дня",
                                    "дней",
                                    "дней",
                                  ])}
                                </b>
                              </span>
                            ) : null}
                            {storesAvali.length > 0 && (
                              <>
                                <button
                                  className="link dotted drop_shop-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    e.target.classList.toggle("active")
                                    var drop = document.querySelector(
                                      ".drop_shop"
                                    )
                                    drop.classList.toggle("visible")
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
                        )}
                      </div>

                      {!itsSert && (
                        <div className="product-p__spec">
                          <div>
                            <h5>Детали:</h5>
                            <div className="product-p__spec-detail">
                              <ul>
                                <li>{this.data.weight + "кг."}</li>
                                {this.data.color !== undefined &&
                                  this.data.color !== "" && (
                                    <li>{this.data.color}</li>
                                  )}
                                {this.data.material && (
                                  <li>{this.data.material}</li>
                                )}
                                {$(window).width() <= 760 && (
                                  <>
                                    <li>
                                      {this.data.dimensions.length.toLocaleString() +
                                        " x " +
                                        this.data.dimensions.width.toLocaleString() +
                                        " x " +
                                        this.data.dimensions.height.toLocaleString() +
                                        "см"}
                                    </li>
                                    <li>{this.data.country}</li>
                                    {this.data.attributes.length !== 0 && (
                                      <li>
                                        {this.data.attributes[0].name}:{" "}
                                        {this.data.attributes[0].value +
                                          this.data.attributes[0].unit}
                                      </li>
                                    )}
                                  </>
                                )}
                              </ul>
                              {$(window).width() >= 760 && (
                                <ul>
                                  <li>
                                    {this.data.dimensions.length.toLocaleString() +
                                      " x " +
                                      this.data.dimensions.width.toLocaleString() +
                                      " x " +
                                      this.data.dimensions.height.toLocaleString() +
                                      "см"}
                                  </li>
                                  <li>{this.data.country}</li>
                                  {this.data.attributes.length !== 0 && (
                                    <li>
                                      {this.data.attributes[0].name}:{" "}
                                      {this.data.attributes[0].value +
                                        this.data.attributes[0].unit}
                                    </li>
                                  )}
                                  {/* <li>{this.data.brand}</li> */}
                                </ul>
                              )}
                            </div>
                          </div>
                          <div>
                            <h5>Можно использовать:</h5>
                            <ul>
                              <li>
                                <span
                                  className={this.data.microwave ? "" : "lth"}
                                >
                                  в микроволновке
                                </span>
                              </li>
                              <li>
                                <span className={this.data.pm ? "" : "lth"}>
                                  в посудомойке
                                </span>
                              </li>
                              {/* {this.data.microwave && } */}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {withProds !== undefined && withProds.length !== 0 && (
              <div className="carousel carousel_product">
                <div className="container">
                  <div className="title">
                    <h3>С этим товаром покупают</h3>
                  </div>
                </div>
                <div className="container container_s">
                  <div className="slider-cont">
                    <Swiper {...this.relativeCar}>
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
                        )
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            )}

            {likeProds !== undefined && likeProds.length !== 0 && (
              <div className="carousel carousel_product">
                <div className="container">
                  <div className="title">
                    <h3 className="tilda">Похожие товары</h3>
                  </div>
                </div>
                <div className="container container_s">
                  <div className="slider-cont">
                    <Swiper {...this.relativeCar}>
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
                        )
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            )}
            {lastSeenProdsRender !== undefined &&
              lastSeenProdsRender !== null &&
              lastSeenProdsRender.length !== 0 && (
                <div className="carousel carousel_product">
                  <div className="container">
                    <div className="title">
                      <h3>Вы недавно просматривали</h3>
                    </div>
                  </div>
                  <div className="container container_s">
                    <div className="slider-cont">
                      <Swiper {...this.relativeCar}>
                        {lastSeenProdsRender}
                      </Swiper>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )
      )
    }

    componentDidUpdate() {
      // console.log("$(window).width :>> ", $(window).width());
    }
  }
)

export default withRouter(CardView)
