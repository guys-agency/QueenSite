import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { withRouter } from "react-router";
import { cities } from "../constants";
import localStorage from "mobx-localstorage";
import { Link } from "react-router-dom";
import moment from "moment";
import ProductList from "./ProductList";
import api from "./api";
import num2str from "../ulits/nm2wrd";
import Inputmask from "inputmask";

const { Component } = React;

//TODO: исправить вывод стоимости во время скидки
const CartPage = observer(
  class CartPage extends Component {
    state = {
      cities: [],
      deliveryData: {},
      adress: "",
      flat: "",
      house: "",
      name:
        this.props.store.userData.user !== undefined
          ? this.props.store.userData.user.name
          : "",
      secondName: "",
      email:
        this.props.store.userData.user !== undefined
          ? this.props.store.userData.user.email
          : "",
      tel:
        this.props.store.userData.user !== undefined
          ? this.props.store.userData.user.tel
          : "",
    };

    deliveryOrderData = {};
    deliverySend = {};

    order = {};

    deteleProduct = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      delete productInCartList[el];
      addtoCart(true);
    };

    // toggleCity = (e) => {
    //   // e.stopPropagation();
    //   // $(".city__drop").addClass("visible");
    //   $(e.target).addClass("active");
    //   console.log(1);

    // };

    closeCart = () => {
      this.props.store.cartPage = false;
    };

    clickPlus = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      productInCartList[el] += 1;
      addtoCart(false);
    };

    clickMinus = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      productInCartList[el] -= 1;
      addtoCart(false);
    };

    // componentDidUpdate() {
    //   $(".city__btn").off("click", this.toggleCity);
    //   $(".city__btn").on("click", this.toggleCity);
    // };

    render() {
      const { productInCart, productInCartList, addtoCart } = this.props.store;
      const { deliveryData } = this.state;
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const productList = [];
      let totalPrice = 0;
      let totalSale = 0;
      let totalFullprice = 0;
      let address = "";
      if (Object.keys(productInCart).length) {
        Object.keys(productInCart).forEach((el) => {
          productList.push(
            <ProductList
              key={el}
              data={productInCart[el]}
              el={el}
              store={this.props.store}
              cart={true}
            />
          );

          totalPrice += productInCart[el].sale
            ? productInCartList[el] * productInCart[el].sale_price
            : productInCartList[el] * productInCart[el].regular_price;

          totalSale += productInCart[el].sale
            ? (productInCart[el].regular_price - productInCart[el].sale_price) *
              productInCartList[el]
            : 0;
          totalFullprice +=
            productInCartList[el] * productInCart[el].regular_price;
        });
      } else {
        this.props.history.push("/");
      }

      const { adress, flat, house, name, secondName, email, tel } = this.state;

      return (
        <div className="cart-page">
          <div className="container">
            <p>
              <a className="btn" onClick={this.props.history.goBack}>
                {" "}
                <span className="ic i_left"></span> Вернуться в магазин
              </a>
            </p>
            <div className="row cart-page__wrp">
              <div className="col col-7 col-s-12">
                <div className="cart-page__cart">
                  <h3>Оформление заказа</h3>

                  <div className="cart__list">
                    {productList}

                    {/* <div className="product product_h">
                      <div className="product__image">
                        <div className="product__image-wrp">
                          <img src="/image/Category/Product-card/Placeholder.png" />
                        </div>
                      </div>
                      <div className="product__info">
                        <Link className="product__name">
                          Кружка 370 мл Модерн, черная матовая
                        </Link>
                        <div className="product__price product__price_disc">
                          <span className="old">152 ₽</span> 152 ₽{" "}
                          <span className="disc_perc">-20%</span>
                        </div>
                        <button className="ic i_close"></button>
                        <div className="product__counter">
                          <button className="ic i_minus"></button>
                          <input min="1" max="100" type="number" value="1" />
                          <button className="ic i_plus"></button>
                        </div>
                      </div>
                    </div>

                    <div className="product product_h">
                      <div className="product__image">
                        <div className="product__image-wrp">
                          <img src="/image/Category/Product-card/Placeholder.png" />
                        </div>
                      </div>
                      <div className="product__info">
                        <Link className="product__name">
                          Кружка 370 мл Модерн, черная матовая
                        </Link>
                        <div className="product__price product__price_disc">
                          <span className="old">152 ₽</span> 152 ₽{" "}
                          <span className="disc_perc">-20%</span>
                        </div>
                        <button className="ic i_close"></button>
                        <div className="product__counter">
                          <button className="ic i_minus"></button>
                          <input min="1" max="100" type="number" value="1" />
                          <button className="ic i_plus"></button>
                        </div>
                      </div>
                    </div>

                    <div className="product product_h">
                      <div className="product__image">
                        <div className="product__image-wrp">
                          <img src="/image/Category/Product-card/Placeholder.png" />
                        </div>
                      </div>
                      <div className="product__info">
                        <Link className="product__name">
                          Кружка 370 мл Модерн, черная матовая
                        </Link>
                        <div className="product__price product__price_disc">
                          <span className="old">152 ₽</span> 152 ₽{" "}
                          <span className="disc_perc">-20%</span>
                        </div>
                        <button className="ic i_close"></button>
                        <div className="product__counter">
                          <button className="ic i_minus"></button>
                          <input min="1" max="100" type="number" value="1" />
                          <button className="ic i_plus"></button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="cart-page__delivery">
                  <h3 className="tilda">
                    Доставка
                    <h5 className="dib">
                      Ваш город:
                      <span>
                        <button
                          className="link dotted city__btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.target.classList.toggle("active");
                            document
                              .querySelector(".city__drop")
                              .classList.toggle("active");

                            if ($(window).width() < 760) {
                              $(".sidebar-overlay").addClass("active");
                            }
                          }}
                        >
                          {this.props.store.city}{" "}
                          <span className="ic i_drop"></span>
                        </button>
                        <form className="city__drop header__drop header__drop_city">
                          <div className="input-field">
                            <label className="active" htmlFor="citySearch">
                              Ваш город
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
                                        if (one.addressComponents.length < 6) {
                                          renderCities.push(
                                            <li key={one.geoId}>
                                              <button
                                                type="submit"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  $(
                                                    ".header__drop"
                                                  ).removeClass("visible");
                                                  localStorage.set("city", {
                                                    name:
                                                      one.addressComponents[
                                                        one.addressComponents
                                                          .length - 1
                                                      ].name,
                                                    geoId: one.geoId,
                                                    region:
                                                      one.addressComponents[2]
                                                        .name,
                                                    sourse: "U",
                                                  });

                                                  document
                                                    .querySelector(".city__btn")
                                                    .classList.remove("active");

                                                  document
                                                    .querySelector(
                                                      ".city__drop"
                                                    )
                                                    .classList.remove("active");

                                                  if ($(window).width() < 760) {
                                                    $(
                                                      ".sidebar-overlay"
                                                    ).removeClass("active");
                                                  }
                                                  this.setState({
                                                    deliveryData: {},
                                                  });
                                                }}
                                              >
                                                {one.addressComponents[
                                                  one.addressComponents.length -
                                                    2
                                                ].name +
                                                  ", " +
                                                  one.addressComponents[
                                                    one.addressComponents
                                                      .length - 1
                                                  ].name}
                                              </button>
                                            </li>
                                          );
                                        }
                                      });
                                      this.setState({ cities: renderCities });
                                    })
                                    .catch((err) => {
                                      console.log("err :>> ", err);
                                    });
                                  // const rigthCities = [];
                                  // cities.some((el) => {
                                  //   if (rigthCities.length < 3) {
                                  //     if (
                                  //       el
                                  //         .toLowerCase()
                                  //         .indexOf(e.target.value.toLowerCase()) !== -1
                                  //     ) {
                                  //       rigthCities.push(el);
                                  //     }
                                  //     return false;
                                  //   } else {
                                  //     return true;
                                  //   }
                                  // });

                                  // for (let index = 0; index < 3; index++) {
                                  //   console.log("object :>> ", rigthCities);
                                  //   renderCities.push(
                                  //     <li>
                                  //       <button
                                  //         type="submit"
                                  //         onClick={(e) => {
                                  //           e.preventDefault();
                                  //           $(".header__drop").removeClass("visible");
                                  //           localStorage.set("city", {
                                  //             name: rigthCities[index],
                                  //             sourse: "U",
                                  //           });
                                  //         }}
                                  //       >
                                  //         {rigthCities[index]}
                                  //       </button>
                                  //     </li>
                                  //   );
                                  // }
                                }
                              }}
                              onFocus={(e) => {
                                $(e.target)
                                  .parent()
                                  .find("label")
                                  .addClass("active");
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
                      </span>
                    </h5>
                  </h3>
                  {Object.keys(deliveryData).length !== 0 && (
                    <div className="cart-page__delivery-details">
                      <div className="row">
                        <div className="items col col-12">
                          <div className="item">
                            <h5>Тип доставки:</h5>
                            <span>
                              {deliveryData.deliveryType === "COURIER"
                                ? "Курьером"
                                : "Пункт выдачи"}{" "}
                              {deliveryData.deliveryService !== undefined
                                ? " (" + deliveryData.deliveryService.name + ")"
                                : deliveryData.deliveryOption.name !== null
                                ? "( " + deliveryData.deliveryOption.name + ")"
                                : null}
                            </span>
                          </div>

                          <div className="item">
                            <h5>Стоимость и сроки:</h5>
                            <span>
                              {localStorage.get("city").geoId === 213 &&
                              totalPrice >= 1000
                                ? "Бесплатно"
                                : deliveryData.deliveryOption.cost
                                    .deliveryForCustomer + " ₽ "}
                              /{" "}
                              <span className="b_gray">
                                {deliveryData.time}{" "}
                                {num2str(deliveryData.time, [
                                  "день",
                                  "дня",
                                  "дней",
                                ])}
                              </span>
                            </span>
                          </div>

                          {deliveryData.deliveryType !== "COURIER" && (
                            <div className="item">
                              <h5>Адрес выдачи:</h5>
                              <span>
                                {deliveryData.pickupPoint.address.addressString}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {deliveryData.deliveryType === "COURIER" && (
                        <form className="row" action="">
                          <div className="col col-6 col-s-12">
                            <div className="input-field">
                              <label className="required" htmlFor="address">
                                Улица
                              </label>
                              <input
                                id="address"
                                type="text"
                                value={adress}
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
                                onInput={(e) => {
                                  this.setState({ adress: e.target.value });
                                }}
                              />
                            </div>
                          </div>

                          <div className="col col-3 col-s-6">
                            <div className="input-field">
                              <label className="required" htmlFor="flat">
                                Дом
                              </label>
                              <input
                                id="flat"
                                type="text"
                                value={house}
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
                                onInput={(e) => {
                                  this.setState({ house: e.target.value });
                                }}
                              />
                            </div>
                          </div>

                          <div className="col col-3 col-s-6">
                            <div className="input-field">
                              <label className="required" htmlFor="porch">
                                Кв/Офис
                              </label>
                              <input
                                id="porch"
                                type="text"
                                value={flat}
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
                                onInput={(e) => {
                                  this.setState({ flat: e.target.value });
                                }}
                              />
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {Object.keys(deliveryData).length === 0 && (
                    <div
                      className="btn btn_primary"
                      onClick={() => {
                        this.startYaDeliv(totalPrice, productInCartList);
                      }}
                    >
                      Выбрать доставку
                    </div>
                  )}
                  {Object.keys(deliveryData).length !== 0 && (
                    <div
                      className="btn"
                      onClick={() => {
                        this.startYaDeliv(totalPrice, productInCartList);
                      }}
                    >
                      Изменить способ доставки
                    </div>
                  )}
                  <div className="Ya-block" id="yaDeliveryWidget"></div>
                </div>

                <div className="cart-page__data">
                  <h3 className="tilda">Данные</h3>
                  {/* <p>Для получения потребуется паспорт с указанными данными</p> */}
                  {!this.props.store.auth && (
                    <p>
                      <a
                        className="link dotted"
                        onClick={(e) => {
                          document
                            .querySelector(".sidebar-overlay")
                            .classList.add("active");

                          document
                            .querySelector("body")
                            .classList.add("no-scroll");

                          this.props.store.sideLogin = true;
                          e.preventDefault();
                        }}
                      >
                        <span className="ic i_user"></span>{" "}
                        <span className="fw_m b_dark">Войдите</span>
                      </a>{" "}
                      <span className="b_gray">
                        (данные подгрузятся автоматически)
                      </span>
                    </p>
                  )}

                  <form className="cart-page__data-form row" action="">
                    <div className="col col-6">
                      <div className="input-field">
                        <label
                          className={
                            name === "" ? "required" : "required active"
                          }
                          htmlFor="firstname"
                        >
                          Имя
                        </label>
                        <input
                          id="firstname"
                          type="text"
                          name="firstname"
                          value={name}
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
                          onInput={(e) => {
                            if (e.target.value === "") {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid #EB5757"
                              );
                            } else {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid lightgreen"
                              );
                            }
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label
                          className={
                            secondName === "" ? "required" : "required active"
                          }
                          htmlFor="lastname"
                        >
                          Фамилия
                        </label>
                        <input
                          id="lastname"
                          name="lastname"
                          type="text"
                          value={secondName}
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
                          onInput={(e) => {
                            if (e.target.value === "") {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid #EB5757"
                              );
                            } else {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid lightgreen"
                              );
                            }
                            this.setState({ secondName: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label
                          className={
                            email === "" ? "required" : "required active"
                          }
                          htmlFor="email"
                        >
                          E-mail
                        </label>
                        <input
                          id="email"
                          type="text"
                          value={email}
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
                          onInput={(e) => {
                            if (!regexEmail.test(e.target.value)) {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid #EB5757"
                              );
                            } else {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid lightgreen"
                              );
                            }
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label
                          className={
                            tel === "" ? "required" : "required active"
                          }
                          htmlFor="phone"
                        >
                          Телефон
                        </label>
                        <input
                          id="phone"
                          type="text"
                          value={tel}
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
                          onInput={(e) => {
                            if (e.target.value.includes("_")) {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid #EB5757"
                              );
                            } else {
                              $(e.target).css(
                                "border-bottom",
                                "1px solid lightgreen"
                              );
                            }
                            this.setState({ tel: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col col-1 hide-s"></div>
              <div className="col col-4 col-s-12">
                <div className="cart-page__result-stick">
                  <div className="cart-page__result">
                    <ul>
                      <li>
                        <div>
                          <span>Итого</span>{" "}
                          <span>
                            {Object.keys(deliveryData).length === 0
                              ? totalPrice.toLocaleString()
                              : localStorage.get("city").geoId === 213 &&
                                totalPrice >= 1000
                              ? totalPrice.toLocaleString()
                              : (
                                  deliveryData.deliveryOption.cost
                                    .deliveryForCustomer + totalPrice
                                ).toLocaleString()}{" "}
                            ₽
                          </span>
                        </div>
                        <div>
                          <span>Стоимость товаров</span>{" "}
                          <span>{totalFullprice.toLocaleString()} ₽</span>
                        </div>
                        <div>
                          <span>Скидка</span>{" "}
                          <span className="red">
                            {totalSale === 0
                              ? totalSale.toLocaleString()
                              : "- " + totalSale.toLocaleString()}{" "}
                            ₽
                          </span>
                        </div>
                        {Object.keys(deliveryData).length !== 0 && (
                          <div>
                            <span>Доставка</span>{" "}
                            <span>
                              {localStorage.get("city").geoId === 213 &&
                              totalPrice >= 1000
                                ? "Бесплатно"
                                : deliveryData.deliveryOption.cost
                                    .deliveryForCustomer + " ₽ "}{" "}
                              /{" "}
                              <span className="b_gray">
                                {" "}
                                {deliveryData.time}{" "}
                                {num2str(deliveryData.time, [
                                  "день",
                                  "дня",
                                  "дней",
                                ])}
                              </span>
                            </span>
                          </div>
                        )}
                      </li>
                    </ul>

                    {Object.keys(deliveryData).length !== 0 &&
                      (deliveryData.deliveryType !== "COURIER" ||
                        address !== "") && (
                        <div className="cart-page__result-address">
                          {deliveryData.deliveryType !== "COURIER"
                            ? deliveryData.pickupPoint.address.addressString
                            : address}
                        </div>
                      )}

                    <button
                      className="btn btn_yellow"
                      id="createOrder"
                      onClick={(e) => {
                        //NEN

                        const { flat, house, adress } = this.state;
                        if (
                          this.deliveryOrderData.deliveryOption === undefined
                        ) {
                          $("html, body").animate(
                            {
                              scrollTop:
                                $(".cart-page__delivery").offset().top -
                                $(".navigation").height(),
                            },
                            500
                          );
                          return;
                        } else {
                          if (
                            this.deliveryOrderData.deliveryType === "COURIER"
                          ) {
                            if (flat === "" || house === "" || adress === "") {
                              $("html, body").animate(
                                {
                                  scrollTop:
                                    $(".cart-page__delivery").offset().top -
                                    $(".navigation").height(),
                                },
                                500
                              );
                              return;
                            }
                          }

                          if (
                            name === "" ||
                            secondName === "" ||
                            email === "" ||
                            tel === "" ||
                            !regexEmail.test(email) ||
                            tel.includes("_")
                          ) {
                            $("html, body").animate(
                              {
                                scrollTop:
                                  $(".cart-page__data").offset().top -
                                  $(".navigation").height(),
                              },
                              500
                            );
                            return;
                          }
                        }

                        $(e.target).addClass("deactive");
                        $(e.target).text("Создаем заказ");
                        // console.log("productInCart", productInCart);
                        const senderId = "500001936";
                        const cityLoc = localStorage.get("city");
                        // console.log("cityLoc", cityLoc);

                        const recipient = {
                          firstName: name,
                          // middleName: "{string}",
                          lastName: secondName,
                          email: email.toLowerCase(),
                          address: {
                            geoId: cityLoc.geoId,
                            country: "Россия",
                            region: cityLoc.region,
                            locality: cityLoc.name,
                            street: adress,
                            house: house,
                            // "housing": "{string}",
                            // "building": "{string}",
                            apartment: flat,
                          },
                          // "pickupPointId": {int}
                        };

                        const cost = {
                          paymentMethod: "CARD",
                          assessedValue: totalPrice,
                          fullyPrepaid: true,
                          manualDeliveryForCustomer:
                            localStorage.get("city").geoId === 213 &&
                            totalPrice >= 1000
                              ? 0
                              : deliveryData.deliveryOption.cost
                                  .deliveryForCustomer,
                        };

                        const addressData = {
                          geoId: localStorage.get("city").geoId,
                          country: "Россия",
                          region: cityLoc.region,
                          locality: cityLoc.name,
                          street: adress,
                          house: house,
                          // "housing": "{string}",
                          // "building": "{string}",
                          apartment: flat,
                        };
                        const contacts = [
                          {
                            type: "RECIPIENT",
                            phone: String(tel),
                            // "additional": "{string}",
                            firstName: name,
                            // "middleName": "{string}",
                            lastName: secondName,
                          },
                        ];

                        this.order = {
                          recipient: recipient,
                          address: addressData,
                          cost: cost,
                          contacts: contacts,
                        };

                        // window.widget.setOrderInfo(this.order);
                        // window.widget.createOrder();
                        const deliveryOrderData = Object.assign(
                          { ...this.deliveryOrderData.deliveryOption.cost },
                          this.deliveryOrderData
                        );
                        deliveryOrderData.deliveryOption.partnerId = this.deliveryOrderData.deliveryOption.partner;
                        deliveryOrderData.deliveryOption.delivery = this.deliveryOrderData.deliveryOption.cost.delivery;
                        deliveryOrderData.deliveryOption.deliveryForCustomer =
                          cost.manualDeliveryForCustomer;
                        this.deliverySend.cost.fullyPrepaid = true;
                        const delivery = {
                          ...this.deliverySend,
                          recipient,
                          contacts,
                          senderId,
                          ...deliveryOrderData,
                        };

                        const dataToSend = {
                          prod: {},
                        };

                        Object.keys(productInCart).forEach((el) => {
                          dataToSend.prod[el] = {
                            countIn: productInCartList[el],
                            sale: productInCart[el].sale,
                            slug: productInCart[el].slug,
                            regular_price: productInCart[el].regular_price,
                            dbid: productInCart[el].dbid,
                            name: productInCart[el].name,
                          };
                          if (productInCart[el].sale) {
                            dataToSend.prod[el].sale_price =
                              productInCart[el].sale_price;
                          }
                        });

                        dataToSend.sum = totalPrice;
                        dataToSend.email = this.state.email.toLowerCase();

                        api
                          .setOrderData({
                            delivery,
                            dataToSend,
                          })
                          .then((data) => {
                            window.widget.setOrderInfo({
                              ...this.order,
                              externalId: String(data.orderId),
                            });
                            window.widget
                              .createOrder()
                              .then((ok) => {
                                // console.log("ok :>> ", ok);
                                this.props.store.productInCartList = {};
                                this.props.store.addtoCart(false);
                                window.location.href = data.link;
                              })
                              .catch((err) => {
                                console.log("err :>> ", err);
                                $("#createOrder").text("Произошла ошибка");
                                setTimeout(() => {
                                  $("#createOrder").text("Заказать");
                                }, 3000);
                              });
                            // window.location.href = data.link;
                          })
                          .catch((err) => {
                            console.log("err :>> ", err);
                          })
                          .finally(() => {
                            $(e.target).removeClass("deactive");
                            $(e.target).text("Заказать");
                          });
                      }}
                    >
                      {Object.keys(deliveryData).length === 0 ||
                      adress.length === 0 ||
                      flat.length === 0 ||
                      house.length === 0
                        ? "Выбрать доставку"
                        : name.length === 0 ||
                          secondName.length === 0 ||
                          email.length === 0 ||
                          tel.length === 0 ||
                          !regexEmail.test(email) ||
                          tel.includes("_")
                        ? "Указать контактные данные"
                        : "Заказать"}
                    </button>
                  </div>
                  {/* <div className="cart-page__promo">
                    <input
                      className="def"
                      placeholder="Сертификат"
                      type="text"
                    />{" "}
                    <button>Активировать</button>
                  </div> */}
                  <div className="cart-page__result-message">
                    Сейчас оплатить заказ можно только онлайн. <br /> Мы
                    работаем над оплатой курьеру при получении. <br />
                    <br />
                    При оплате заказа деньги <b>не списываются</b>, а{" "}
                    <b>блокируются </b>банком у вас на счете <b>на 7 дней</b>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    componentDidMount() {
      const tel = new Inputmask({
        mask: "+7 (999) 999 99 99",
        showMaskOnHover: false,
        // isComplete: function()
      });

      tel.mask($("#phone"));
    }

    startYaDeliv = (fullPrice, array) => {
      const { productInCart, city } = this.props.store;
      const items = [];
      let sum = fullPrice;
      Object.keys(productInCart).forEach((el, i) => {
        items.push({
          externalId: `${productInCart[el].slug}`,
          name: productInCart[el].name,
          count: array[el],
          price: productInCart[el].sale
            ? productInCart[el].sale_price
            : productInCart[el].regular_price,
          assessedValue: productInCart[el].sale
            ? productInCart[el].sale_price
            : productInCart[el].regular_price,
          tax: "NO_VAT",
          dimensions: {
            weight: +productInCart[el].weight,
            length: parseInt(productInCart[el].dimensions.length, 10),
            width: parseInt(productInCart[el].dimensions.width, 10),
            height: parseInt(productInCart[el].dimensions.height, 10),
          },
        });
      });
      const cart = {
        places: [
          {
            items: items,
          },
        ],
        shipment: {
          fromWarehouseId: 10001568252,
        },
      };
      const order = {
        cost: {
          paymentMethod: "CARD",
          assessedValue: sum,
          fullyPrepaid: false,
          manualDeliveryForCustomer: 0,
        },
        contacts: [
          {
            type: "RECIPIENT",
          },
        ],
      };

      this.deliverySend = { ...cart, ...order };
      this.YaDeliveryFunc(window, cart, order, city);
    };

    YaDeliveryFunc = (w, cart, order, city) => {
      const start = () => {
        w.removeEventListener("YaDeliveryLoad", start);
        // console.log("object", document.getElementById("yaDeliveryWidget"));

        const successCallback = (widget) => {
          // После инициализации виджета автоматически определяется регион пользователя.
          // Перед отображением виджета этот регион можно получить методом getRegion...

          // widget.getRegionsByName(city).then((regions) => {
          widget.setRegion({ id: localStorage.get("city").geoId });
          // });

          // ...или изменить, передав идентификатор в аргументе метода setRegion. Узнать
          // идентификатор региона по его названию можно с помощью метода
          // getRegionsByName; он возвращает массив регионов, соответствующих названию.

          // Чтобы виджет отобразился, нужно вызвать метод showDeliveryOptions и передать
          // в его аргументе информацию о товарах в корзине покупателя.
          // Подробнее об объекте cart.
          widget.showDeliveryOptions(cart);

          // Чтобы привязать обработчик к событию submitDeliveryOption (пользователь
          // выбрал вариант доставки), нужно вызвать метод on с двумя аргументами:
          // названием события и функцией-обработчиком.
          widget.on("submitDeliveryOption", (deliveryOption) => {
            // Обработка выбранного пользователем варианта доставки. В параметре deliveryOption
            // содержится информация о способе доставки, сроках, стоимости и т. д.
            const time =
              deliveryOption.deliveryOption.calculatedDeliveryDateMax ===
              deliveryOption.deliveryOption.calculatedDeliveryDateMin
                ? moment(
                    deliveryOption.deliveryOption.calculatedDeliveryDateMax
                  ).diff(moment(), "days") + 2
                : moment(
                    deliveryOption.deliveryOption.calculatedDeliveryDateMin
                  ).diff(moment(), "days") +
                  2 +
                  "-" +
                  (moment(
                    deliveryOption.deliveryOption.calculatedDeliveryDateMax
                  ).diff(moment(), "days") +
                    2);

            this.deliveryOrderData = deliveryOption;
            this.setState({ deliveryData: { ...deliveryOption, time } });
          });

          // Когда пользователь отправит форму выбора условий доставки, нужно сохранить
          // их в куки с помощью метода setOrderInfo, чтобы после оформления заказа вы могли
          // отправить их в Доставку. В аргументе метода нужно передать объект с информацией
          // о заказе. Подробнее об объекте order.
          // const form = document.getElementById("checkout");
          window.widget = widget;
          // $("#createOrder").addEventListener("submit", () =>
          //   setTimeout(() => {
          //     widget.setOrderInfo(this.order);
          //     widget.createOrder();
          //   }, 1000)
          // );
        };

        const failureCallback = (error) => {
          // Эта функция будет вызвана, если при создании виджета произошли ошибки.
          console.log("error", error);
        };

        // Создание виджета
        w.YaDelivery.createWidget({
          // Обязательные параметры
          containerId: "yaDeliveryWidget", // Идентификатор HTML-элемента (контейнера),
          // в котором будет отображаться виджет
          type: "deliveryCart", // Тип виджета - всегда deliveryCart

          params: {
            // Обязательные параметры
            apiKey: "f16336a6-8d98-4f0e-b07f-3969b2384006", // Авторизационный ключ
            senderId: 500001936, // Идентификатор магазина
          },
        })
          // Функция createWidget возвращает объект типа Promise. С ним можно
          // продолжить работу с помощью функций-коллбэков, передаваемых в аргументах
          // методов then (при успешном создании виджета) и catch (для обработки ошибок).
          .then(successCallback)
          .catch(failureCallback);
      };
      w.YaDelivery ? start() : w.addEventListener("YaDeliveryLoad", start);
    };
  }
);

// function YaDeliveryFunc(w, cart, order, city) {
//   function start() {
//     w.removeEventListener("YaDeliveryLoad", start);
//     // console.log("object", document.getElementById("yaDeliveryWidget"));

//     // Создание виджета
//     w.YaDelivery.createWidget({
//       // Обязательные параметры
//       containerId: "yaDeliveryWidget", // Идентификатор HTML-элемента (контейнера),
//       // в котором будет отображаться виджет
//       type: "deliveryCart", // Тип виджета - всегда deliveryCart

//       params: {
//         // Обязательные параметры
//         apiKey: "f16336a6-8d98-4f0e-b07f-3969b2384006", // Авторизационный ключ
//         senderId: 500001936, // Идентификатор магазина
//       },
//     })
//       // Функция createWidget возвращает объект типа Promise. С ним можно
//       // продолжить работу с помощью функций-коллбэков, передаваемых в аргументах
//       // методов then (при успешном создании виджета) и catch (для обработки ошибок).
//       .then(successCallback)
//       .catch(failureCallback);

//     function successCallback(widget) {
//       // После инициализации виджета автоматически определяется регион пользователя.
//       // Перед отображением виджета этот регион можно получить методом getRegion...

//       widget.getRegionsByName(city).then((regions) => {
//         widget.setRegion({ id: regions[0].id });
//       });

//       // ...или изменить, передав идентификатор в аргументе метода setRegion. Узнать
//       // идентификатор региона по его названию можно с помощью метода
//       // getRegionsByName; он возвращает массив регионов, соответствующих названию.

//       // Чтобы виджет отобразился, нужно вызвать метод showDeliveryOptions и передать
//       // в его аргументе информацию о товарах в корзине покупателя.
//       // Подробнее об объекте cart.
//       widget.showDeliveryOptions(cart);

//       // Чтобы привязать обработчик к событию submitDeliveryOption (пользователь
//       // выбрал вариант доставки), нужно вызвать метод on с двумя аргументами:
//       // названием события и функцией-обработчиком.
//       widget.on("submitDeliveryOption", (deliveryOption) => {
//         // Обработка выбранного пользователем варианта доставки. В параметре deliveryOption
//         // содержится информация о способе доставки, сроках, стоимости и т. д.
//         console.log("deliveryOption", deliveryOption);
//       });

//       // Когда пользователь отправит форму выбора условий доставки, нужно сохранить
//       // их в куки с помощью метода setOrderInfo, чтобы после оформления заказа вы могли
//       // отправить их в Доставку. В аргументе метода нужно передать объект с информацией
//       // о заказе. Подробнее об объекте order.
//       // const form = document.getElementById("checkout");
//       // form.addEventListener("submit", () => widget.setOrderInfo(order));
//     }

//     function failureCallback(error) {
//       // Эта функция будет вызвана, если при создании виджета произошли ошибки.
//       console.log("error", error);
//     }
//   }
//   w.YaDelivery ? start() : w.addEventListener("YaDeliveryLoad", start);
// }

export default withRouter(CartPage);
