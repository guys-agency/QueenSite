import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import "suggestions-jquery";
import { withRouter } from "react-router";
import localStorage from "mobx-localstorage";
import moment from "moment";
import "moment/locale/ru";
import ProductList from "./ProductList";
import api from "./api";
import num2str from "../ulits/nm2wrd";
import Inputmask from "inputmask";
import Fade from "react-reveal/Fade";
import "../blocks/dadata.scss";

const { Component } = React;
const momLoc = moment();
momLoc.locale("ru");

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
          ? this.props.store.userData.user.tel.substr(1)
          : "",
      delChoose: true,
      pickUpChoose: false,
      pickUpStoreChoose: false,
      payment: "",
      pickUpStore: "",
      coupon: { count: 0, type: "", code: "", id: "" },
      delVar: [],
    };

    deliveryOrderData = {};
    deliverySend = {};
    dimensionsApi = {};
    totalPrice = 0;
    // pickUpStore = "";

    order = {};

    stores = {
      "ТРЦ Орджоникидзе 11": {
        name: "ТЦ ОРДЖОНИКИДЗЕ 11",
        address: "Москва, ул. Орджоникидзе 11, стр.1А, 4 линия",
        coor: "55.707791,37.595806",
        aval: true,
      },
      // "OV БЕЛАЯ ДАЧА": {
      //   name: "OV БЕЛАЯ ДАЧА",
      //   address: "Московская область, Котельники, Новорязанское шоссе, 8",
      //   coor: "55.661176,37.880312",
      //   aval: true,
      // },
      "ТРЦ CАЛАРИС": {
        name: "ТРЦ САЛАРИС",
        address: "Москва, Киевское шоссе, 23-й километр, 1",
        coor: "55.623788,37.422027",
        aval: true,
      },
      "ТРЦ Пушкино парк": {
        name: "ТРЦ ПУШКИНО ПАРК",
        address: "Московская область, Пушкино, Красноармейское шоссе, 1, 104",
        coor: "56.013291,37.888010",
        aval: true,
      },
      "ТРЦ Афимолл": {
        name: "ТРЦ АФИМОЛЛ",
        address: "Москва, Пресненская наб., д.2, А-65",
        coor: "55.749299, 37.539644",
        aval: true,
      },
    };

    deteleProduct = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      delete productInCartList[el];
      addtoCart(true);
    };

    choosePickUpPoint = (e, name) => {
      document.querySelectorAll("#store").forEach((elem) => {
        elem.classList.remove("active");
      });
      $(e.currentTarget).addClass("active");
      this.setState({ pickUpStore: name });
      // this.pickUpStore = name;
    };

    setDeliveryData = (e, data) => {
      if (e !== undefined) {
        document.querySelectorAll("#delivery").forEach((elem) => {
          elem.classList.remove("active");
        });
        $(e.currentTarget).addClass("active");
      }

      this.setState({
        deliveryData: {
          ...data,
          time:
            data.delivery.calculatedDeliveryDateMax ===
            data.delivery.calculatedDeliveryDateMin
              ? moment(data.delivery.calculatedDeliveryDateMax).diff(
                  moment(),
                  "days"
                ) + 2
              : moment(data.delivery.calculatedDeliveryDateMin).diff(
                  moment(),
                  "days"
                ) +
                2 +
                "-" +
                (moment(data.delivery.calculatedDeliveryDateMax).diff(
                  moment(),
                  "days"
                ) +
                  2),
        },
      });
    };

    choosePaymentType = (e, type) => {
      if (e !== undefined) {
        document.querySelectorAll("#payment").forEach((elem) => {
          elem.classList.remove("active");
        });
        $(e.currentTarget).addClass("active");
      }

      function getMaxValue(array) {
        var max = array[0]; // берем первый элемент массива
        for (var i = 0; i < array.length; i++) {
          // переберем весь массив
          // если элемент больше, чем в переменной, то присваиваем его значение переменной
          if (max < array[i]) max = array[i];
        }
        // возвращаем максимальное значение
        return max;
      }

      const { productInCart, productInCartList } = this.props.store;

      let sum = this.totalPrice;
      const lengths = [];
      const widths = [];

      let heightSumm = 0;
      let weightSumm = 0;

      Object.keys(productInCart).forEach((el, i) => {
        lengths.push(parseInt(productInCart[el].dimensions.length, 10));
        widths.push(parseInt(productInCart[el].dimensions.width, 10));
        heightSumm +=
          parseInt(productInCart[el].dimensions.height, 10) *
          productInCartList[el];
        weightSumm += +productInCart[el].weight * productInCartList[el];
      });

      let lengthMax = getMaxValue(lengths);
      let widthMax = getMaxValue(widths);

      if (heightSumm > 150) {
        heightSumm = Math.ceil(heightSumm / 2);
        if (widthMax < lengthMax) {
          widthMax *= 2;
        } else {
          lengthMax *= 2;
        }
      }

      weightSumm = Math.ceil(weightSumm);

      const order = {
        cost: {
          paymentMethod: type,
          assessedValue: Math.floor(sum),
          fullyPrepaid: type === "PREPAID",
          itemsSum: Math.floor(sum),
          // manualDeliveryForCustomer: 0,
        },
      };

      this.dimensionsApi = {
        length: lengthMax,
        width: widthMax,
        height: heightSumm,
        weight: weightSumm,
      };
      console.log("moment :>> ", moment().hour());
      console.log("object :>> ", moment().add(1, "days").format("YYYY-MM-DD"));

      api
        .deliveryVar({
          senderId: 500001936,
          from: {
            geoId: 213,
          },
          to: {
            geoId: localStorage.get("city").geoId,
          },
          dimensions: this.dimensionsApi,
          deliveryType: "COURIER",
          cost: order.cost,
          shipment: {
            date:
              moment().hour() > 14
                ? moment().add(1, "days").format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD"),
            type: "WITHDRAW",
            includeNonDefault: false,
          },
        })
        .then((d) => {
          this.setState({ payment: type, delVar: d });
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    };

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

    clearDeliveryData = () => {
      document.querySelectorAll("#delivery").forEach((elem) => {
        elem.classList.remove("active");
      });
      this.choosePaymentType(undefined, this.state.payment);
      this.setState({ deliveryData: {} });
    };

    dadataInit = false;
    tokenDa = "bb2ff0528fa21286110aa5d28409ab10c5a2f287";
    typeDa = "ADDRESS";
    // componentDidUpdate() {
    //   $(".city__btn").off("click", this.toggleCity);
    //   $(".city__btn").on("click", this.toggleCity);
    // };

    componentDidUpdate(prevProps, prevState) {
      if (this.state.deliveryData.deliveryType === "COURIER") {
        const $street = $("#address");
        const $house = $("#flat");
        if (!this.dadataInit) {
          this.dadataInit = true;
          const that = this;

          $street.suggestions({
            token: this.tokenDa,
            type: this.typeDa,
            noSuggestionsHint: false,
            bounds: "street",
            constraints: {
              // ограничиваем поиск
              locations: {
                city: this.props.store.city,
              },
            },
            restrict_value: true,
            count: 10,
            onSelect: function (suggestion, changed) {
              that.setState({ adress: suggestion.value });
            },
          });

          $house.suggestions({
            token: this.tokenDa,
            type: this.typeDa,
            hint: false,
            noSuggestionsHint: false,
            bounds: "house",
            constraints: $street,
            onSelect: function (suggestion, changed) {
              that.setState({ house: suggestion.value });
            },
          });
        }
        // !ПЕРЕПИСАТЬ ЭТУ ЕРУНДУ
        // if (
        //   $street.val().length > this.state.adress.length ||
        //   $house.val().length > this.state.house.length
        // ) {
        //   console.log("this.props.store.city :>> ", localStorage.get("city"));
        //   this.setState({ adress: $street.val(), house: $house.val() });
        // }
      }
    }

    cancelPay = (e) => {
      if (
        e.target.className.includes("sidebar-overlay") ||
        e.target.className.includes("btn")
      ) {
        $(".sidebar-overlay").removeClass("active");
        $(".sidebar-cart").removeClass("visible");
        $("body").removeClass("no-scroll");
        localStorage.removeItem("deleteCart");
        $("#payment-form").empty();
        $(".btn_yellow").text("Оплата отменена");
        setTimeout(() => {
          $(".btn_yellow").removeClass("deactive");
          $(".btn_yellow").text("Заказать");
        }, 1000);
      }
    };

    render() {
      if (!Object.keys(localStorage.get("productInCart")).length) {
        this.props.history.push("/");
      }

      const { productInCart, productInCartList } = this.props.store;
      const { deliveryData, coupon, delVar } = this.state;
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const productList = [];
      this.totalPrice = 0;
      let totalSale = 0;
      let totalFullprice = 0;
      let address = "";

      const delVarRender = [];
      const htmlStore = [];

      if (delVar.length) {
        delVar.forEach((el) => {
          const time = moment(
            el.delivery.calculatedDeliveryDateMax,
            "YYYY-MM-DD"
          );
          time.locale("ru");
          delVarRender.push(
            <div
              id="delivery"
              onClick={(e) => {
                this.setDeliveryData(e, el);
              }}
            >
              <b>{el.delivery.partner.name}</b> <br />{" "}
              {el.cost.deliveryForCustomer !== 0
                ? `${Math.ceil(el.cost.deliveryForCustomer)} ₽`
                : "Бесплатно"}{" "}
              <br />
              <p style={{ color: "#747498", fontSize: "14px" }}>
                {time.format("DD") +
                  "-" +
                  time.add(1, "days").format("DD MMMM")}
              </p>
            </div>
          );
        });
      } else {
        delVarRender.push(
          <div
            id="delivery"
            onClick={(e) => {
              $("html, body").animate(
                {
                  scrollTop:
                    $("#paymentMethod").offset().top -
                    $(".navigation").height(),
                },
                500
              );
              document.querySelectorAll("#payment").forEach((elem) => {
                elem.classList.add("cart-page__list-elem_red");
                setTimeout(() => {
                  elem.classList.remove("cart-page__list-elem_red");
                }, 1500);
              });
            }}
          >
            <b>Выберите способ оплаты</b>
          </div>
        );
      }

      if (Object.keys(productInCart).length) {
        Object.keys(productInCart).forEach((el) => {
          productList.push(
            <ProductList
              key={el}
              data={productInCart[el]}
              el={el}
              store={this.props.store}
              cart={true}
              clearDeliveryData={this.clearDeliveryData}
            />
          );

          this.totalPrice += productInCart[el].sale
            ? productInCartList[el] * productInCart[el].sale_price
            : productInCartList[el] * productInCart[el].regular_price;

          totalSale += productInCart[el].sale
            ? (productInCart[el].regular_price - productInCart[el].sale_price) *
              productInCartList[el]
            : 0;
          totalFullprice +=
            productInCartList[el] * productInCart[el].regular_price;
        });
      }

      console.log("moment().hour() :>> ", moment().hour());

      const { adress, flat, house, name, secondName, email, tel } = this.state;

      Object.keys(productInCart).forEach((slug) => {
        productInCart[slug].stores.forEach((str) => {
          // console.log("str.name :>> ", str.name);
          if (
            str.name !== "ТРЦ OUTLET Белая дача" &&
            this.stores[str.name].aval
          ) {
            if (+str.count > 0) {
              this.stores[str.name].aval = true;
            } else {
              this.stores[str.name].aval = false;
            }
          }
        });
      });

      Object.keys(this.stores).forEach((st) => {
        let dateInStore = "";
        if (this.stores[st].aval) {
          dateInStore += moment().add(0, "days").format("DD.MM") + " ";
          dateInStore += "— " + moment().add(1, "days").format("DD.MM");
        } else {
          dateInStore += moment().add(1, "days").format("DD.MM");
        }
        htmlStore.push(
          <div
            className="cart-page__list-elem"
            id="store"
            onClick={(e) => {
              this.choosePickUpPoint(e, st);
            }}
          >
            <div className="cart-page__store-info">
              <p className="cart-page__store-name">{this.stores[st].name}</p>
              <div className="cart-page__store-adress">
                {/* <span className="old">152 ₽</span> 152 ₽{" "}
                              <span className="disc_perc">-20%</span> */}
                <p>{this.stores[st].address}</p>
              </div>
            </div>
            <div className="cart-page__store-date">
              <p>{dateInStore}</p> <p className="separator">|</p>
              <p>10:00 — 22:00</p>
            </div>
            <a
              href={`https://yandex.ru/maps/?rtext=~${this.stores[st].coor}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-page__store-link"
            >
              Маршрут на Яндекс.Картах
            </a>
          </div>
        );
      });

      let coupDisc = 0;
      if (coupon.count > 0) {
        if (coupon.type === "percent") {
          coupDisc = Math.round(this.totalPrice * (+coupon.count / 100));
        } else if (coupon.type === "fixed_cart") {
          coupDisc = +coupon.count;
        }
      }

      this.totalPrice -= coupDisc;

      return (
        <div className="cart-page">
          <div className="sidebar-overlay" onClick={this.cancelPay}></div>
          <div className="sidebar sidebar-cart">
            <div className="sidebar__head">
              <div className="btn" onClick={this.cancelPay}>
                Отменить оплату
              </div>
            </div>

            <div id="payment-form"></div>
          </div>
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

                  <div className="cart__list">{productList}</div>
                </div>

                <div className="cart-page__delivery" id="paymentMethod">
                  <h3 className="tilda">Оплата</h3>
                  {/* <div className="cart__tumbler">
                    <div className="tumbler" id="paymentTumbler">
                      <button
                        className={
                          "tumb " +
                          (this.state.payment === "PREPAID" ? "active" : "")
                        }
                        onClick={() => {
                          if (this.state.payment !== "PREPAID")
                            this.setState({
                              payment: "PREPAID",
                            });
                        }}
                      >
                        Онлайн оплата
                      </button>
                      <button
                        className={
                          "tumb " +
                          (this.state.payment === "CARD" ? "active" : "")
                        }
                        onClick={() => {
                          if (this.state.payment !== "CARD")
                            this.setState({
                              payment: "CARD",
                            });
                        }}
                      >
                        Картой при получении
                      </button>
                    </div>
                  </div> */}
                  <div className="cart__list cart-page__list">
                    <div
                      className="cart-page__list-elem"
                      id="payment"
                      onClick={(e) => {
                        this.choosePaymentType(e, "CARD");
                      }}
                    >
                      <div className="cart-page__store-info">
                        <p className="cart-page__store-name">
                          Картой при получении
                        </p>
                        <div className="cart-page__store-adress">
                          <p>
                            При оплате банковской картой, Вы получите квитанцию
                            об оплате на указанный e-mail адрес.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="cart-page__list-elem"
                      id="payment"
                      onClick={(e) => {
                        this.choosePaymentType(e, "CASH");
                      }}
                    >
                      <div className="cart-page__store-info">
                        <p className="cart-page__store-name">
                          Наличными при получении
                        </p>
                        <div className="cart-page__store-adress">
                          <p>
                            Мы свяжемся с вами для уточнения понадобится ли
                            курьеру сдача.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="cart-page__list-elem"
                      id="payment"
                      onClick={(e) => {
                        this.choosePaymentType(e, "PREPAID");
                      }}
                    >
                      <div className="cart-page__store-info">
                        <p className="cart-page__store-name">Онлайн</p>
                        <div className="cart-page__store-adress">
                          <p>
                            Банковскими картами Visa, Mastercard, Maestro, Мир,
                            JCB. Apple Pay и Google Pay. Картой рассрочки Халва.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-page__delivery" id="deliveryBlock">
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
                                                  this.dadataInit = false;
                                                  this.choosePaymentType(
                                                    undefined,
                                                    this.state.payment
                                                  );
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

                  <div className="cart__tumbler">
                    <div className="tumbler">
                      <button
                        className={
                          "tumb " + (this.state.delChoose ? "active" : "")
                        }
                        onClick={() => {
                          if (!this.state.delChoose)
                            this.setState({
                              delChoose: true,
                              pickUpChoose: false,
                              pickUpStoreChoose: false,
                              deliveryData: {},
                            });
                        }}
                      >
                        Курьером
                      </button>
                      <button
                        className={
                          "tumb " + (this.state.pickUpChoose ? "active" : "")
                        }
                        onClick={() => {
                          if (!this.state.pickUpChoose)
                            this.setState({
                              delChoose: false,
                              pickUpChoose: true,
                              pickUpStoreChoose: false,
                              deliveryData: {},
                            });
                        }}
                      >
                        Пункт выдачи
                      </button>
                      {(localStorage.get("city").geoId === 213 ||
                        localStorage.get("city").region ===
                          "Московская область") && (
                        <button
                          className={
                            "tumb " +
                            (this.state.pickUpStoreChoose ? "active" : "")
                          }
                          onClick={() => {
                            if (!this.state.pickUpStoreChoose)
                              this.setState({
                                delChoose: false,
                                pickUpChoose: false,
                                pickUpStoreChoose: true,
                                deliveryData: {},
                              });
                          }}
                        >
                          Самовывоз из магазина
                        </button>
                      )}
                    </div>
                  </div>

                  {this.state.delChoose && (
                    <Fade distance="50px" duration={500}>
                      <>
                        <div className="cart-page__delivery-details">
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
                                    this.setState({
                                      adress: e.target.value,
                                    });
                                  }}
                                  // onChange={(e) => {
                                  //   this.setState({ adress: e.target.value });
                                  // }}
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
                                    this.setState({
                                      house: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col col-3 col-s-6">
                              <div className="input-field">
                                <label htmlFor="porch">Кв/Офис</label>
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
                          <br />
                          <br />
                          <div className="cart__list cart-page__list ">
                            {localStorage.get("city").geoId === 213 && (
                              <div
                                className="cart-page__list-elem cart-page__list-elem_delivery"
                                onClick={(e) => {
                                  // this.choosePickUpPoint(e, st);
                                }}
                              >
                                <div className="cart-page__store-info">
                                  <p className="cart-page__store-name">
                                    Экспресс
                                  </p>
                                  <div className="cart-page__store-adress">
                                    {/* <span className="old">152 ₽</span> 152 ₽{" "}
                              <span className="disc_perc">-20%</span> */}
                                    <p>
                                      Возможна проверка заказа и частичный
                                      отказ.
                                      <br />
                                      <b>Бесплатно</b> при заказе от{" "}
                                      <b>20 000 ₽</b>.
                                    </p>
                                  </div>
                                </div>
                                <div className="cart-page__list-choose">
                                  <div
                                    id="delivery"
                                    className={
                                      moment().hour() > 16 ? "deactive" : ""
                                    }
                                    onClick={(e) => {
                                      document
                                        .querySelectorAll("#delivery")
                                        .forEach((elem) => {
                                          elem.classList.remove("active");
                                        });
                                      $(e.currentTarget).addClass("active");
                                      this.setState({
                                        deliveryData: {
                                          type: "express",
                                          cost: 1000,
                                          time: 0,
                                        },
                                      });
                                    }}
                                  >
                                    Сегодня — 1 000 ₽
                                    {moment().hour() > 16 && (
                                      <p
                                        style={{
                                          color: "#747498",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Доступно до 17:00
                                      </p>
                                    )}
                                  </div>
                                  <div
                                    id="delivery"
                                    onClick={(e) => {
                                      document
                                        .querySelectorAll("#delivery")
                                        .forEach((elem) => {
                                          elem.classList.remove("active");
                                        });
                                      $(e.currentTarget).addClass("active");
                                      this.setState({
                                        deliveryData: {
                                          type: "express",
                                          cost: 500,
                                          time: 1,
                                        },
                                      });
                                    }}
                                  >
                                    Завтра — 500 ₽
                                  </div>
                                </div>
                              </div>
                            )}

                            <div
                              className="cart-page__list-elem cart-page__list-elem_delivery"
                              onClick={(e) => {
                                // this.choosePickUpPoint(e, st);
                              }}
                            >
                              <div className="cart-page__store-info">
                                <p className="cart-page__store-name">
                                  Курьерскими службами
                                </p>
                                <div className="cart-page__store-adress">
                                  {/* <span className="old">152 ₽</span> 152 ₽{" "}
                              <span className="disc_perc">-20%</span> */}
                                  <p>
                                    Боксберри, Стриж, СДЭК. Возможна проверка
                                    заказа, частичный отказ <b>недоступен</b>.
                                    Бесплатно при заказе от 1 000 ₽ по Москве.
                                  </p>
                                </div>
                              </div>
                              <div className="cart-page__list-choose">
                                {delVarRender}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </Fade>
                  )}
                  {this.state.pickUpChoose && (
                    <Fade distance="50px" duration={500}>
                      <>
                        {Object.keys(deliveryData).length !== 0 && (
                          <div className="cart-page__delivery-details">
                            <div className="row">
                              <div className="items col col-12">
                                <div className="item">
                                  <h5>Тип доставки:</h5>
                                  <span>
                                    "Пункт выдачи"
                                    {deliveryData.deliveryService !== undefined
                                      ? " (" +
                                        deliveryData.deliveryService.name +
                                        ")"
                                      : deliveryData.deliveryOption.name !==
                                        null
                                      ? "( " +
                                        deliveryData.deliveryOption.name +
                                        ")"
                                      : null}
                                  </span>
                                </div>

                                <div className="item">
                                  <h5>Стоимость и сроки:</h5>
                                  <span>
                                    {localStorage.get("city").geoId === 213 &&
                                    (this.totalPrice >= 1000 ||
                                      (Object.keys(productInCart).length ===
                                        1 &&
                                        productInCart[
                                          Object.keys(productInCart)[0]
                                        ].slug === 5637285331))
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
                                      {
                                        deliveryData.pickupPoint.address
                                          .addressString
                                      }
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {this.state.pickUpChoose &&
                          Object.keys(this.state.deliveryData).length === 0 && (
                            <div
                              className="btn btn_primary"
                              onClick={() => {
                                if (this.state.payment === "") {
                                  $("html, body").animate(
                                    {
                                      scrollTop:
                                        $("#paymentMethod").offset().top -
                                        $(".navigation").height(),
                                    },
                                    500
                                  );
                                  $("#paymentTumbler").addClass("tumbler_red");
                                  setTimeout(() => {
                                    $("#paymentTumbler").removeClass(
                                      "tumbler_red"
                                    );
                                  }, 1500);
                                } else {
                                  this.startYaDeliv(
                                    this.totalPrice,
                                    productInCartList
                                  );
                                }
                              }}
                            >
                              {this.state.payment === ""
                                ? "Выберите способ оплаты"
                                : "Выбрать доставку"}
                            </div>
                          )}
                        {Object.keys(deliveryData).length !== 0 && (
                          <div
                            className="btn"
                            onClick={() => {
                              this.startYaDeliv(
                                this.totalPrice,
                                productInCartList
                              );
                            }}
                          >
                            Изменить способ доставки
                          </div>
                        )}
                        <div className="Ya-block" id="yaDeliveryWidget"></div>
                      </>
                    </Fade>
                  )}
                  {this.state.pickUpStoreChoose && (
                    <div className="cart__list cart-page__list">
                      {htmlStore}
                    </div>
                  )}
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
                              ? this.totalPrice.toLocaleString()
                              : deliveryData.type === "express"
                              ? this.totalPrice > 20000
                                ? this.totalPrice.toLocaleString()
                                : (
                                    deliveryData.cost + this.totalPrice
                                  ).toLocaleString()
                              : localStorage.get("city").geoId === 213 &&
                                (this.totalPrice >= 1000 ||
                                  (Object.keys(productInCart).length === 1 &&
                                    productInCart[Object.keys(productInCart)[0]]
                                      .slug === 5637285331))
                              ? this.totalPrice.toLocaleString()
                              : deliveryData.deliveryOption === undefined
                              ? (
                                  deliveryData.cost.deliveryForCustomer +
                                  this.totalPrice
                                ).toLocaleString()
                              : (
                                  deliveryData.deliveryOption.cost
                                    .deliveryForCustomer + this.totalPrice
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

                        {coupDisc > 0 && (
                          <div>
                            <span>Промокод</span>{" "}
                            <span className="red">{coupDisc} ₽</span>
                          </div>
                        )}

                        {Object.keys(deliveryData).length !== 0 && (
                          <div>
                            <span>Доставка</span>{" "}
                            <span>
                              {deliveryData.type === "express"
                                ? deliveryData.cost + " ₽ "
                                : localStorage.get("city").geoId === 213 &&
                                  (this.totalPrice >= 1000 ||
                                    (Object.keys(productInCart).length === 1 &&
                                      productInCart[
                                        Object.keys(productInCart)[0]
                                      ].slug === 5637285331))
                                ? "Бесплатно"
                                : deliveryData.deliveryOption === undefined
                                ? deliveryData.cost.deliveryForCustomer.toLocaleString() +
                                  " ₽ "
                                : deliveryData.deliveryOption.cost.deliveryForCustomer.toLocaleString() +
                                  " ₽ "}{" "}
                              /{" "}
                              <span className="b_gray">
                                {" "}
                                {deliveryData.time === 0
                                  ? "сегодня"
                                  : deliveryData.time === 1
                                  ? "завтра"
                                  : deliveryData.time +
                                    " " +
                                    num2str(deliveryData.time, [
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

                    {Object.keys(deliveryData).length !== 0
                      ? (deliveryData.delivery !== undefined ||
                          address !== "") && (
                          <div className="cart-page__result-address">
                            {deliveryData.delivery === undefined
                              ? deliveryData.pickupPoint.address.addressString
                              : address}
                          </div>
                        )
                      : null}

                    <button
                      className="btn btn_yellow"
                      id="createOrder"
                      onClick={(e) => {
                        //NEN

                        const {
                          flat,
                          house,
                          adress,
                          delChoose,
                          pickUpChoose,
                          pickUpStoreChoose,
                          payment,
                        } = this.state;
                        if (payment === "") {
                          $("html, body").animate(
                            {
                              scrollTop:
                                $("#paymentMethod").offset().top -
                                $(".navigation").height(),
                            },
                            500
                          );
                          document
                            .querySelectorAll("#payment")
                            .forEach((elem) => {
                              elem.classList.add("cart-page__list-elem_red");
                              setTimeout(() => {
                                elem.classList.remove(
                                  "cart-page__list-elem_red"
                                );
                              }, 1500);
                            });
                          // $("#payment").addClass("cart-page__list-elem_red");
                          // setTimeout(() => {
                          //   $("#payment").removeClass(
                          //     "cart-page__list-elem_red"
                          //   );
                          // }, 1500);
                          return;
                        }
                        if (delChoose) {
                          if (
                            Object.keys(this.state.deliveryData).length === 0 ||
                            house === "" ||
                            adress === ""
                          ) {
                            $("html, body").animate(
                              {
                                scrollTop:
                                  $("#deliveryBlock").offset().top -
                                  $(".navigation").height(),
                              },
                              500
                            );
                            if (
                              Object.keys(this.state.deliveryData).length === 0
                            ) {
                              document
                                .querySelectorAll("#delivery")
                                .forEach((elem) => {
                                  elem.classList.add("red");
                                  setTimeout(() => {
                                    elem.classList.remove("red");
                                  }, 1500);
                                });
                            } else if (house === "" || adress === "") {
                            }
                            return;
                          }
                        } else if (pickUpChoose) {
                          if (
                            this.deliveryOrderData.deliveryOption === undefined
                          ) {
                            $("html, body").animate(
                              {
                                scrollTop:
                                  $("#deliveryBlock").offset().top -
                                  $(".navigation").height(),
                              },
                              500
                            );
                            console.log("testtt :>> ");
                            this.startYaDeliv(
                              this.totalPrice,
                              productInCartList
                            );
                            return;
                          }
                        } else {
                          if (this.state.pickUpStore === "") {
                            $("html, body").animate(
                              {
                                scrollTop:
                                  $("#deliveryBlock").offset().top -
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

                        $(e.target).addClass("deactive");
                        $(e.target).text("Создаем заказ");
                        // console.log("productInCart", productInCart);
                        const senderId = 500001936;
                        const cityLoc = localStorage.get("city");
                        // console.log("cityLoc", cityLoc);

                        const dataToSend = {
                          prod: {},
                        };
                        const ecomProd = [];
                        const productForYA = [];
                        let totalProductSum = 0;

                        Object.keys(productInCart).forEach((el) => {
                          ecomProd.push({
                            id: productInCart[el].sale,
                            name: productInCart[el].name,
                            price: productInCart[el].price,
                            brand: productInCart[el].brand,

                            quantity: productInCartList[el],
                          });
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

                          productForYA.push({
                            externalId: String(productInCart[el].slug),
                            name: productInCart[el].name,
                            count: productInCartList[el],
                            price: Math.floor(
                              productInCart[el].sale
                                ? productInCart[el].sale_price === 0
                                  ? 1
                                  : productInCart[el].sale_price
                                : productInCart[el].regular_price
                            ),
                            assessedValue: Math.floor(
                              productInCart[el].sale
                                ? productInCart[el].sale_price === 0
                                  ? productInCart[el].regular_price
                                  : productInCart[el].sale_price
                                : productInCart[el].regular_price
                            ),
                            tax: "NO_VAT",
                            dimensions: {
                              length: +productInCart[el].dimensions.length,
                              height: +productInCart[el].dimensions.height,
                              width: +productInCart[el].dimensions.width,
                              weight: productInCart[el].weight,
                            },
                          });
                          totalProductSum +=
                            Math.floor(
                              productForYA[productForYA.length - 1].price
                            ) * productForYA[productForYA.length - 1].count;
                        });

                        if (coupon.count > 0) {
                          totalProductSum = 0;
                          let couponC = +coupon.count;
                          productForYA.forEach((el, i) => {
                            if (el.price > 1) {
                              if (coupon.type === "percent") {
                                productForYA[i].price *= 0.9;
                              } else if (coupon.type === "fixed_cart") {
                                if (couponC > 0) {
                                  if (el.price - couponC >= 1) {
                                    productForYA[i].price -= couponC;
                                    couponC = 0;
                                  } else {
                                    productForYA[i].price = 1;
                                    couponC -= productForYA[i].price - 1;
                                  }
                                }
                              }
                            }
                            totalProductSum += productForYA[i].price;
                          });
                        }

                        if (totalProductSum !== this.totalPrice) {
                          let totalDeff = totalProductSum - this.totalPrice;
                          let i = 0;
                          while (totalDeff > 0) {
                            if (i < productForYA.length) {
                              if (productForYA[i].price > 1) {
                                if (
                                  productForYA[i].price -
                                    totalDeff / productForYA[i].count >
                                  1
                                ) {
                                  productForYA[i].price =
                                    productForYA[i].price -
                                    totalDeff / productForYA[i].count;
                                  totalDeff = 0;
                                } else {
                                  totalDeff -=
                                    productForYA[i].price *
                                    productForYA[i].count;
                                  productForYA[i].price = 1;
                                  i += 1;
                                }
                              } else {
                                i += 1;
                              }
                            } else {
                              break;
                            }
                          }
                        }

                        dataToSend.sum = this.totalPrice;
                        dataToSend.email = this.state.email.toLowerCase();
                        dataToSend.firstName = name;
                        dataToSend.lastName = secondName;
                        dataToSend.phone = String(tel);
                        dataToSend.payment = this.state.payment;
                        dataToSend.coupon = this.state.coupon;

                        if (delChoose || pickUpChoose) {
                          const recipient = {
                            firstName: name,

                            lastName: secondName,
                            email: email.toLowerCase(),
                          };

                          const addressData = {
                            geoId: localStorage.get("city").geoId,
                            country: "Россия",
                            region: cityLoc.region,
                            locality: cityLoc.name,
                            street: adress,
                            house: house,

                            apartment: flat,
                          };
                          const contacts = [
                            {
                              type: "RECIPIENT",
                              phone: String(tel),

                              firstName: name,

                              lastName: secondName,
                            },
                          ];

                          // window.widget.setOrderInfo(this.order);
                          // window.widget.createOrder();
                          let deliveryOrderData;

                          if (deliveryData.deliveryOption !== undefined) {
                            const cost = {
                              paymentMethod: this.state.payment,
                              assessedValue: +this.totalPrice,
                              fullyPrepaid: this.state.payment === "PREPAID",
                              manualDeliveryForCustomer:
                                localStorage.get("city").geoId === 213 &&
                                (this.totalPrice >= 1000 ||
                                  (Object.keys(productInCart).length === 1 &&
                                    productInCart[Object.keys(productInCart)[0]]
                                      .slug === 5637285331))
                                  ? 0
                                  : deliveryData.deliveryOption.cost
                                      .deliveryForCustomer,
                            };

                            this.order = {
                              recipient: recipient,
                              address: addressData,
                              cost: cost,
                              contacts: contacts,
                            };

                            deliveryOrderData = Object.assign(
                              { ...this.deliveryOrderData.deliveryOption.cost },
                              this.deliveryOrderData
                            );
                            deliveryOrderData.deliveryOption.partnerId = this.deliveryOrderData.deliveryOption.partner;
                            deliveryOrderData.deliveryOption.delivery = this.deliveryOrderData.deliveryOption.cost.delivery;
                            deliveryOrderData.deliveryOption.deliveryForCustomer =
                              cost.manualDeliveryForCustomer;
                            deliveryOrderData.deliveryOption.deliveryForSender =
                              deliveryOrderData.deliveryOption.cost.deliveryForSender;
                            deliveryOrderData.shipment = {
                              date:
                                deliveryOrderData.deliveryOption.shipments[0]
                                  .date,
                              type: "WITHDRAW",
                              fromWarehouseId: 10001568252,
                              toPartnerId:
                                deliveryOrderData.deliveryOption.shipments[0]
                                  .partner.id,
                            };
                            this.deliverySend.cost.fullyPrepaid =
                              dataToSend.payment === "PREPAID";
                          } else {
                            this.deliverySend = {
                              ...deliveryData,

                              dimensions: this.dimensionsApi,
                            };
                          }
                          this.deliverySend.productForYA = productForYA;

                          // this.deliverySend.cost.fullyPrepaid = dataToSend.payment === "PREPAID";
                          const delivery = {
                            ...this.deliverySend,
                            address: addressData,
                            recipient,
                            contacts,
                            senderId,
                            ...deliveryOrderData,
                          };

                          // console.log("object :>> ", delivery, dataToSend);
                          if (process.env.REACT_APP_TYPE === "prod") {
                            window.ym(65097901, "reachGoal", "Checkout");
                          }

                          // api
                          //   .createDeliveryOrder({ delivery, dataToSend })
                          //   .then((ok) => {
                          //     console.log("ok :>> ", ok);
                          //   })
                          //   .catch((err) => {
                          //     console.log("err :>> ", err);
                          //   });

                          api
                            .setOrderData({
                              delivery,
                              dataToSend,
                            })
                            .then((data) => {
                              if (process.env.REACT_APP_TYPE === "prod") {
                                window.dataLayer.push({
                                  ecommerce: {
                                    purchase: {
                                      actionField: {
                                        id: String(data.orderId),
                                      },
                                      products: ecomProd,
                                    },
                                  },
                                });
                              }
                              localStorage.set("deleteCart", true);

                              if (dataToSend.payment === "PREPAID") {
                                const checkout = new window.YandexCheckout({
                                  confirmation_token: data.confirmationToken, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
                                  return_url: data.return, //Ссылка на страницу завершения оплаты
                                  embedded_3ds: true, // Способ прохождения аутентификации 3-D Secure — во всплывающем окне
                                  error_callback(error) {
                                    console.log("error :>> ", error);
                                  },
                                });

                                checkout.render("payment-form");

                                $(".sidebar-overlay").addClass("active");
                                $(".sidebar-cart").addClass("visible");

                                $("body").addClass("no-scroll");
                                if (
                                  deliveryData.deliveryOption !== undefined &&
                                  deliveryData.type === undefined
                                ) {
                                  localStorage.set("sendDeliveryPickUp", true);
                                  window.widget.setOrderInfo({
                                    ...this.order,
                                    externalId: String(data.orderId),
                                  });
                                }
                              } else {
                                if (
                                  deliveryData.deliveryOption !== undefined &&
                                  deliveryData.type === undefined
                                ) {
                                  localStorage.set("sendDeliveryPickUp", true);
                                  window.widget
                                    .setOrderInfo({
                                      ...this.order,
                                      externalId: String(data.orderId),
                                    })
                                    .then(() => {
                                      window.location.href = data.return;
                                    })
                                    .catch((err) => {
                                      console.log("err", err);
                                    });
                                } else {
                                  window.location.href = data.return;
                                }
                              }

                              // window.widget
                              //   .createOrder()
                              //   .then((ok) => {

                              //   })
                              //   .catch((err) => {
                              //     console.log("err :>> ", err);

                              //   });
                              // this.props.store.productInCartList = {};
                              // this.props.store.addtoCart(false);
                              // window.location.href = data.link;
                            })
                            .catch((err) => {
                              console.log("err :>> ", err);
                              $("#createOrder").text("Произошла ошибка");
                              setTimeout(() => {
                                $("#createOrder").text("Заказать");
                              }, 3000);
                            })
                            .finally(() => {
                              $(e.target).removeClass("deactive");
                              $(e.target).text("Заказать");
                            });
                        } else if (pickUpStoreChoose) {
                          dataToSend.pickUpChoose = true;

                          dataToSend.address = this.stores[
                            this.state.pickUpStore
                          ].address;
                          dataToSend.city = "Москва";
                          dataToSend.store = this.state.pickUpStore;

                          api
                            .setOrderData({
                              delivery: {
                                pickUpChoose: true,
                                payment: this.state.payment,
                                store: this.state.pickUpStore,
                                deliveryForCustomer: 0,
                                address: {
                                  locality: this.stores[this.state.pickUpStore]
                                    .address,
                                },
                                productForYA,
                              },
                              dataToSend,
                            })
                            .then((data) => {
                              if (process.env.REACT_APP_TYPE === "prod") {
                                window.dataLayer.push({
                                  ecommerce: {
                                    purchase: {
                                      actionField: {
                                        id: String(data.orderId),
                                      },
                                      products: ecomProd,
                                    },
                                  },
                                });
                              }

                              localStorage.set("deleteCart", true);

                              if (dataToSend.payment !== "CARD") {
                                const checkout = new window.YandexCheckout({
                                  confirmation_token: data.confirmationToken, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
                                  return_url: data.return, //Ссылка на страницу завершения оплаты
                                  embedded_3ds: true, // Способ прохождения аутентификации 3-D Secure — во всплывающем окне
                                  error_callback(error) {
                                    console.log("error :>> ", error);
                                  },
                                });

                                checkout.render("payment-form");

                                localStorage.set("deleteCart", true);

                                $(".sidebar-overlay").addClass("active");
                                $(".sidebar-cart").addClass("visible");

                                $("body").addClass("no-scroll");

                                // window.widget.setOrderInfo({
                                //   ...this.order,
                                //   externalId: String(data.orderId),
                                // });
                              } else {
                                window.location.href = data.return;
                              }

                              // window.widget
                              //   .createOrder()
                              //   .then((ok) => {

                              //   })
                              //   .catch((err) => {
                              //     console.log("err :>> ", err);

                              //   });
                              // this.props.store.productInCartList = {};
                              // this.props.store.addtoCart(false);
                              // window.location.href = data.link;
                            })
                            .catch((err) => {
                              console.log("err :>> ", err);
                              $("#createOrder").text("Произошла ошибка");
                              setTimeout(() => {
                                $("#createOrder").text("Заказать");
                              }, 3000);
                            })
                            .finally(() => {
                              $(e.target).removeClass("deactive");
                              $(e.target).text("Заказать");
                            });
                        }
                      }}
                    >
                      {this.state.payment === ""
                        ? "Выбрать способ оплаты"
                        : this.state.delChoose &&
                          ((this.state.deliveryData.delivery === undefined &&
                            this.state.deliveryData.type === undefined) ||
                            adress.length === 0 ||
                            house.length === 0)
                        ? "Выбрать доставку"
                        : (this.state.pickUpChoose &&
                            Object.keys(deliveryData).length === 0) ||
                          (this.state.pickUpStoreChoose &&
                            this.state.pickUpStore === "")
                        ? "Выбрать пункт самовывоза"
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
                  <div className="cart-page__promo">
                    <input
                      className="def"
                      id="coup"
                      placeholder="Промокод"
                      type="text"
                    />{" "}
                    <button
                      onClick={() => {
                        if ($("#coup").val() !== "") {
                          api
                            .coupon({ code: $("#coup").val().toLowerCase() })
                            .then((d) => {
                              if (d.status === 200) {
                                $(".cart-page__promo").addClass("green");

                                this.setState({
                                  coupon: {
                                    count: d.data.amount,
                                    type: d.data.discount_type,
                                    code: d.data.code,
                                    id: d.data.id,
                                  },
                                });
                              } else {
                                $(".cart-page__promo").removeClass("green");
                                $(".cart-page__promo").addClass("deactive");
                                setTimeout(() => {
                                  $(".cart-page__promo").removeClass(
                                    "deactive"
                                  );
                                }, 4000);
                              }
                            });
                        }
                      }}
                    >
                      Активировать
                    </button>
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
      // получение максимального элемента массива
      function getMaxValue(array) {
        var max = array[0]; // берем первый элемент массива
        for (var i = 0; i < array.length; i++) {
          // переберем весь массив
          // если элемент больше, чем в переменной, то присваиваем его значение переменной
          if (max < array[i]) max = array[i];
        }
        // возвращаем максимальное значение
        return max;
      }

      // получение минимального элемента массива
      function getMinValue(array) {
        var min = array[0];
        for (var i = 0; i < array.length; i++) {
          if (min > array[i]) min = array[i];
        }
        return min;
      }
      const { productInCart, city } = this.props.store;
      const items = [];
      let sum = fullPrice;
      const lengths = [];
      const widths = [];

      let heightSumm = 0;
      let weightSumm = 0;
      let prodSumm = 0;

      Object.keys(productInCart).forEach((el, i) => {
        lengths.push(parseInt(productInCart[el].dimensions.length, 10));
        widths.push(parseInt(productInCart[el].dimensions.width, 10));
        heightSumm += parseInt(productInCart[el].dimensions.height, 10);
        weightSumm += +productInCart[el].weight;
        items.push({
          externalId: `${productInCart[el].slug}`,
          name: productInCart[el].name,
          count: array[el],
          price: Math.floor(
            productInCart[el].sale
              ? productInCart[el].sale_price === 0
                ? 1
                : productInCart[el].sale_price
              : productInCart[el].regular_price
          ),
          assessedValue: Math.floor(
            productInCart[el].sale
              ? productInCart[el].sale_price !== 0
                ? productInCart[el].sale_price
                : productInCart[el].regular_price
              : productInCart[el].regular_price
          ),
          tax: "NO_VAT",
          dimensions: {
            weight: +productInCart[el].weight,
            length: parseInt(productInCart[el].dimensions.length, 10),
            width: parseInt(productInCart[el].dimensions.width, 10),
            height: parseInt(productInCart[el].dimensions.height, 10),
          },
        });
        prodSumm +=
          Math.floor(items[items.length - 1].price) *
          items[items.length - 1].count;
      });

      const { coupon } = this.state;
      if (coupon.count > 0) {
        prodSumm = 0;
        let couponC = +coupon.count;
        items.forEach((el, i) => {
          if (el.price > 1) {
            if (coupon.type === "percent") {
              items[i].price *= 0.9;
            } else if (coupon.type === "fixed_cart") {
              if (couponC > 0) {
                if (el.price - couponC >= 1) {
                  items[i].price -= couponC;
                  couponC = 0;
                } else {
                  items[i].price = 1;
                  couponC -= items[i].price - 1;
                }
              }
            }
          }
          prodSumm += items[i].price;
        });
      }

      if (prodSumm !== this.totalPrice) {
        let totalDeff = prodSumm - this.totalPrice;
        let i = 0;
        while (totalDeff > 0) {
          if (i < items.length) {
            if (items[i].price > 1) {
              if (items[i].price - totalDeff > 1) {
                items[i].price = items[i].price - totalDeff;
                totalDeff = 0;
              } else {
                totalDeff -= items[i].price;
                items[i].price = 1;
                i += 1;
              }
            } else {
              i += 1;
            }
          } else {
            break;
          }
        }
      }

      let lengthMax = getMaxValue(lengths);
      let widthMax = getMaxValue(widths);

      if (heightSumm > 150) {
        heightSumm = Math.ceil(heightSumm / 2);
        if (widthMax < lengthMax) {
          widthMax *= 2;
        } else {
          lengthMax *= 2;
        }
      }

      weightSumm = Math.ceil(weightSumm);
      const cart = {
        places: [
          {
            dimensions: {
              length: lengthMax,
              width: widthMax,
              height: heightSumm,
              weight: weightSumm,
            },
            items: items,
          },
        ],
        shipment: {
          fromWarehouseId: 10001568252,
        },
        cost: {
          itemsSum: Math.floor(sum), // сумма стоимости товаров в корзине
          assessedValue: Math.floor(sum), // объявленная ценность
          fullyPrepaid: this.state.payment === "PREPAID",
          paymentMethod: this.state.payment,
        },
        deliveryTypes: ["PICKUP"],
      };
      const order = {
        cost: {
          paymentMethod: this.state.payment,
          assessedValue: Math.floor(sum),
          fullyPrepaid: this.state.payment === "PREPAID",
          manualDeliveryForCustomer: 0,
        },
        contacts: [
          {
            type: "RECIPIENT",
          },
        ],
      };

      this.dimensionsApi = {
        length: lengthMax,
        width: widthMax,
        height: heightSumm,
        weight: weightSumm,
      };

      api
        .deliveryVar({
          senderId: 500001936,
          from: {
            geoId: 213,
          },
          to: {
            geoId: localStorage.get("city").geoId,
          },
          dimensions: this.dimensionsApi,
          deliveryType: "COURIER",
          cost: order.cost,
        })
        .then((d) => {
          // console.log("d :>> ", d);
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });

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

          console.log("widget :>> ", widget);

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
            apiKey: process.env.REACT_APP_SECRET_CODE_YA_WID, // Авторизационный ключ
            senderId: 500001936, // Идентификатор магазина
          },
        })
          // Функция createWidget возвращает объект типа Promise. С ним можно
          // продолжить работу с помощью функций-коллбэков, передаваемых в аргументах
          // методов then (при успешном создании виджета) и catch (для обработки ошибок).
          .then(successCallback)
          .catch(failureCallback);

        const callback = (mutation) => {
          console.log("mu :>> ", mutation.attributeName);
        };
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
