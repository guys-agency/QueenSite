import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import "suggestions-jquery";
import { withRouter } from "react-router";
import localStorage from "mobx-localstorage";
import moment from "moment";
import "moment/locale/ru";
import ProductList from "./ProductList";
import MapDel from "./MapForDelivery.js";
import api from "./api";
import num2str from "../ulits/nm2wrd";
import Inputmask from "inputmask";
import Fade from "react-reveal/Fade";
import "../blocks/dadata.scss";
import { Link } from "react-router-dom";

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
      name: this.props.store.userData.user !== undefined ? this.props.store.userData.user.name : "",
      secondName: "",
      email: this.props.store.userData.user !== undefined ? this.props.store.userData.user.email : "",
      tel:
        this.props.store.userData.user !== undefined && this.props.store.userData.user.tel !== undefined
          ? this.props.store.userData.user.tel.substr(2)
          : "",
      acceptedTerms: true,
      delChoose: true,
      pickUpChoose: false,
      pickUpStoreChoose: false,
      payment: "PREPAID",
      pickUpStore: "",
      coupon: { count: 0, type: "", code: "", id: "" },
      delVar: [],
      coupsCont:
        localStorage.getItem("coupsCont") === undefined ||
        localStorage.getItem("coupsCont") === null ||
        localStorage.getItem("coupsCont") === "undefined"
          ? {}
          : localStorage.getItem("coupsCont"),
      bonus: 0,
      useBonus: 0,
      pvzDataCont: [],
    };

    deliveryOrderData = {};
    deliverySend = {};
    dimensionsApi = {};
    totalPrice = 0;
    totalNotSalePrice = 0;
    certInCart = 0;
    priceWithOnline = 0;

    orderCancelID = {};

    pvzCompCont = [];
    pvzDataCont = [];

    mapCoor = [];

    // pickUpStore = "";

    order = {};

    translite = {
      DS: "Dalli-Service",
      SDEK: "СДЭК",
    };

    coupsD = {};

    useUserData = false;

    bonusNextSum = {
      1: 10000,
      2: 30000,
      3: 50000,
      4: 80000,
      5: 100000,
    };

    // BalloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
    //   '<div style="margin: 10px;">' +
    //     "<b>{{properties.name}}</b><br />" +
    //     '<i id="count"></i> ' +
    //     '<button id="counter-button"> +1 </button>' +
    //     "</div>",
    //   {
    //     // Переопределяем функцию build, чтобы при создании макета начинать
    //     // слушать событие click на кнопке-счетчике.

    //     build: function () {
    //       // Сначала вызываем метод build родительского класса.
    //       this.BalloonContentLayout.superclass.build.call(this);
    //       // А затем выполняем дополнительные действия.
    //       $("#counter-button").on("click", this.onCounterClick);
    //     },

    //     // Аналогично переопределяем функцию clear, чтобы снять
    //     // прослушивание клика при удалении макета с карты.
    //     clear: function () {
    //       // Выполняем действия в обратном порядке - сначала снимаем слушателя,
    //       // а потом вызываем метод clear родительского класса.
    //       $("#counter-button").off("click", this.onCounterClick);
    //       this.BalloonContentLayout.superclass.clear.call(this);
    //     },

    //     onCounterClick: function () {
    //       console.log("1 :>> ", 1);
    //     },
    //   }
    // );

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

    setDeliveryData = (e, data, time) => {
      $(".cart-page__list-elem_delivery").find(".alert-message").removeClass("alert-message_active");
      if (e !== undefined) {
        document.querySelectorAll("#delivery").forEach((elem) => {
          elem.classList.remove("active");
        });
        $(e.currentTarget).addClass("active");
      }
      // console.log("data :>> ", data);

      this.setState({
        deliveryData: {
          ...data,
          time,
        },
      });
    };

    choosePaymentType = (e, type) => {
      const { productInCart, productInCartList, certInCart } = this.props.store;
      const cityLocal = localStorage.getItem("city");
      $("#paymentMethod").find(".alert-message").removeClass("alert-message_active");
      if (certInCart && Object.keys(productInCart).length === 1) {
        if (type === "PREPAID") {
          if (e !== undefined) {
            document.querySelectorAll("#payment").forEach((elem) => {
              elem.classList.remove("active");
            });
            $(e.currentTarget).addClass("active");
          }
          this.setState({ payment: type });
        }

        return;
      }
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

      let sum = 0;
      const lengths = [];
      const widths = [];

      let heightSumm = 0;
      let weightSumm = 0;

      Object.keys(productInCart).forEach((el, i) => {
        if (el !== certInCart) {
          lengths.push(parseInt(productInCart[el].dimensions.length, 10));
          widths.push(parseInt(productInCart[el].dimensions.width, 10));
          heightSumm += parseInt(productInCart[el].dimensions.height, 10) * productInCartList[el];
          weightSumm += +productInCart[el].weight * productInCartList[el];
          sum += productInCart[el].sale
            ? productInCart[el].sale_price * productInCartList[el]
            : productInCart[el].regular_price * productInCartList[el];
        } else {
          sum += productInCart[el].sale
            ? productInCart[el].sale_price * productInCartList[el]
            : productInCart[el].regular_price * productInCartList[el];
        }
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

      this.dimensionsApi = {
        length: lengthMax,
        width: widthMax,
        height: heightSumm,
        weight: weightSumm,
      };
      // console.log("moment :>> ", moment().hour());
      // console.log("object :>> ", moment().add(1, "days").format("YYYY-MM-DD"));
      // this.props.store.createOrderData(type)

      //старые данные
      // {
      //   senderId: 500001936,
      //   from: {
      //     geoId: 213,
      //   },
      //   to: {
      //     geoId: localStorage.get("city").geoId,
      //   },
      //   dimensions: this.dimensionsApi,
      //   deliveryType: "COURIER",
      //   cost: order.cost,
      //   shipment: {
      //     date:
      //       moment().hour() > 10
      //         ? moment().add(1, "days").format("YYYY-MM-DD")
      //         : moment().format("YYYY-MM-DD"),
      //     type: "WITHDRAW",
      //     includeNonDefault: false,
      //   },
      // }
      const { geoMap, revertMap, checkData, addObject } = window;
      const inMSC = cityLocal.geoId === 213;

      // this.setState({ deliveryData: {} });
      // $("#map").removeClass("choose");

      if (e === undefined) {
        api
          .deliveryVar({
            to: {
              name: cityLocal.name,
              region: cityLocal.region,
            },
            dimensions: this.dimensionsApi,

            cost: Math.floor(sum),
            payment: type,
          })
          .then((d) => {
            // console.log("d :>> ", d);
            if (Object.keys(d).length) {
              if ((inMSC && this.totalPrice >= 3000) || this.totalPrice === 0) {
                Object.keys(d).forEach((parent) => {
                  d[parent].price = 0;
                });
              }

              if (Object.keys(d).length > 1) {
                this.setState({ payment: type, delVar: d });
              } else {
                const data = d[Object.keys(d)[0]];
                let time = data.delivery_period;
                if (time.includes("-")) {
                  time = +time.split("-")[0];
                } else {
                  time = +time;
                }
                if (moment("31.12.2020", "DD.MM.YYYY").isSame(moment())) {
                  time += 2;
                } else if (moment("01.01.2021", "DD.MM.YYYY").isSame(moment())) {
                  time += 1;
                }
                if (data.msg.match(/\d/) !== null) {
                  time += +data.msg.match(/\d/)[0];
                }
                this.setState({
                  payment: type,
                  deliveryData: this.state.delChoose && !inMSC ? { ...data, time } : {},
                  delVar: { [Object.keys(d)[0]]: { ...data, time } },
                  useBonus: 0,
                });
              }
            } else {
              this.setState({ payment: type, delVar: false });
            }
          })
          .catch((err) => {
            console.log("err :>> ", err);
          });

        if (cityLocal.name !== undefined) {
          api
            .getPVZ({
              city: cityLocal.name,
              region: cityLocal.region,

              dimensions: this.dimensionsApi,
              cost: Math.floor(sum),
              payment: type,
            })
            .then((pvz) => {
              // console.log("pvz :>> ", pvz);
              this.pvzDataCont = [];

              if (
                (cityLocal.geoId === 213 && this.totalPrice >= 3000) ||
                this.totalPrice === 0 ||
                (cityLocal.geoId !== 213 && this.totalPrice >= 20000)
              ) {
                Object.keys(pvz.extra).forEach((parent) => {
                  pvz.extra[parent].price = 0;
                });
              }
              const ttt = new Map();
              pvz.data.forEach((p, i) => {
                if (!this.mapCoor.length) {
                  this.mapCoor = p["GPS"].split(",");
                }
                if (
                  pvz.extra[p.partner] !== undefined &&
                  pvz.extra[p.partner].delivery_period !== "-" &&
                  +p.weightLimit > this.dimensionsApi.weight
                ) {
                  let time = pvz.extra[p.partner].delivery_period;
                  if (time.includes("-")) {
                    time = +time.split("-")[0];
                  } else {
                    time = +time;
                  }
                  if (moment("31.12.2020", "DD.MM.YYYY").isSame(moment())) {
                    time += 2;
                  } else if (moment("01.01.2021", "DD.MM.YYYY").isSame(moment())) {
                    time += 1;
                  }
                  if (pvz.extra[p.partner].msg.match(/\d/) !== null) {
                    time += +pvz.extra[p.partner].msg.match(/\d/)[0];
                  }
                  const timeString = moment().add(time, "days");
                  timeString.locale("ru");
                  // console.log("delVar[el].msg. :>> ", delVar[el].msg.match(/\d/));

                  ttt.set(p.partner);

                  this.pvzDataCont.push({
                    type: "Feature",
                    id: p.partner + " " + i,
                    geometry: {
                      type: "Point",
                      coordinates: p["GPS"].split(","),
                    },
                    properties: {
                      iconContent: (+pvz.extra[p.partner].price).toLocaleString() + " ₽",
                      balloonContentHeader: this.translite[p.partner] !== undefined ? this.translite[p.partner] : p.partner,
                      balloonHeader: `${
                        this.translite[p.partner] !== undefined ? this.translite[p.partner] : p.partner
                      } <button class='ic i_close'></button>`,
                      balloonContent: `<p class='popover-content__adress'>${p.town + ", " + p.addressReduce}</p> 
                    <div class='popover-content__extra'><p>${
                      (+pvz.extra[p.partner].price).toLocaleString() + " ₽"
                    }</p><p class='popover-content__date'>${timeString.format("DD") + "-" + timeString.add(1, "days").format("DD MMMM")}</p></div> 
                    <p class='popover-content__time-name'>Время работы:</p> 
                    <p class='popover-content__time'>${p.workShedule}</p>
                    <a href='https://queenbohemia.ru/help/delivery' target='_blank' class='popover-content__time'>${
                      p.partner === "BOXBERRY" ? "Нельзя проверить заказ" : "Можно проверить заказ"
                    }</a>
                    <button id=${p.id} class='popover-content__btn'>Выбрать</button>
                  `,
                      data: {
                        ...p,
                        price: pvz.extra[p.partner].price,
                        time,
                        msg: pvz.extra[p.partner].msg,
                      },
                    },
                  });
                }

                // this.pvzCompCont.push(
                //   <Placemark
                //     geometry={{
                //       type: "Point",
                //       coordinates: el["GPS"]["_text"].split(","),
                //     }}
                //     properties={{
                //       balloonContentHeader: name,
                //       balloonContentBody: `<strong>Адрес:</strong> ${el.address["_text"]}<br/>
                //       <strong>Описание:</strong> ${el.description["_text"]}<br/>
                //       <strong>Время работы:</strong> ${el.worktime["_text"]}<br/>
                //       <button id=${el["_attributes"].code}>Выбрать</button>
                //     `,
                //     }}
                //   ></Placemark>
                // );
              });
              console.log("ttt :>> ", ttt);

              this.setState({
                pvzDataCont: this.pvzDataCont.length ? this.pvzDataCont : false,
                useBonus: 0,
              });

              if (geoMap !== undefined) {
                // geoMap.destroy();
                // checkData();
                try {
                  geoMap.geoObjects.removeAll();

                  addObject();
                  revertMap();
                } catch {}
              }
            })
            .catch((err) => console.log("err", err));
        }
      } else {
        this.setState({
          payment: type,
        });
      }
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
      this.setState({
        deliveryData: {},
        pvzDataCont: [],
        delVar: [],
      });
      $("#map").removeClass("choose");
      this.choosePaymentType(undefined, this.state.payment);
    };

    setPVZChooseData = (data) => {
      this.setState({ deliveryData: data });
    };

    dadataInit = false;
    tokenDa = "bb2ff0528fa21286110aa5d28409ab10c5a2f287";
    typeDa = "ADDRESS";

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
      if (e.target.className.includes("sidebar-overlay") || e.target.className.includes("btn") || e === undefined) {
        api.cancelOrder({ id: this.orderCancelID });
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

    startCancelPay = (orderID) => {
      api
        .cancelOrder({ id: orderID })
        .then((ok) => {
          const coupsCont = localStorage.getItem("coupsCont");
          // console.log("coupsCont :>> ", coupsCont);

          if (coupsCont !== undefined && coupsCont !== null && coupsCont !== "undefined") {
            Object.keys(coupsCont).forEach((coup) => {
              api.coupon({ code: coup.toLowerCase() }).then((d) => {
                if (d.status === 400) {
                  const newCoupsCont = this.state.coupsCont;

                  delete newCoupsCont[coup];

                  localStorage.setItem("coupsCont", newCoupsCont);

                  this.setState({
                    coupsCont: newCoupsCont,
                  });
                }
              });
            });
          }
        })
        .catch((err) => console.log("err", err));

      localStorage.removeItem("deleteCart");
      localStorage.removeItem("orderID");
    };

    bonusBalance = 0;
    bonusDoubleBalance = 0;
    bonusDouble = {};

    render() {
      if (!Object.keys(localStorage.getItem("productInCart")).length) {
        this.props.history.push("/");
      }

      const { productInCart, productInCartList, certInCart, userData, auth, notSaleSum } = this.props.store;

      const { adress, flat, house, name, secondName, email, tel, coupsCont, useBonus, deliveryData, coupon, delVar, payment } = this.state;

      const cityLocal = localStorage.getItem("city");

      this.props.store.useBonus = useBonus;
      const autnAndUserData = auth && Object.keys(userData).length;

      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.useUserData && autnAndUserData) {
        this.useUserData = true;
        this.bonusBalance = 0;
        this.bonusDoubleBalance = 0;
        userData.user.bonusHistory.forEach((bon) => {
          if (bon.activeGift) {
            this.bonusDouble = { ...bon };
            this.bonusDoubleBalance = bon.value;
          }
        });

        userData.user.bonusHistory.forEach((bon) => {
          if (bon.head) {
            if (!bon.activeGift) {
              if (bon.plus) {
                this.bonusBalance += bon.value;
              } else {
                this.bonusBalance -= bon.value;
              }
            }
          } else {
            if (bon.plus) {
              this.bonusBalance += bon.value;
            } else {
              if (this.bonusDoubleBalance && this.bonusDouble.date < bon.date) {
                this.bonusDoubleBalance -= bon.value;
              } else {
                this.bonusBalance -= bon.value;
              }
            }
          }
        });

        if (this.bonusDoubleBalance < 0) {
          this.bonusBalance += this.bonusDoubleBalance;
          this.bonusDoubleBalance = 0;
        }

        this.setState({
          name: this.props.store.userData.user.name,
          email: this.props.store.userData.user.email,
          tel: this.props.store.userData.user.tel !== undefined ? this.props.store.userData.user.tel.substr(2) : "",
        });
      }
      const productList = [];
      this.totalPrice = 0;
      this.totalNotSalePrice = 0;
      let totalSale = 0;
      let totalFullprice = 0;
      let address = "";
      let coupDisc = 0;
      const typeIsPREPAID = payment === "PREPAID";

      const delVarRender = [];
      const htmlStore = [];
      const inMSC = cityLocal.geoId === 213;

      const chooseCityBtns = (
        <div className="row city-choose_cart">
          <div className="col col-12 col-s-12">
            <p className="city-choose__title">Населенный пункт:</p>

            <div
              className="product__counter gift__drop-btn dropdown__label"
              onClick={(e) => {
                e.stopPropagation();
                e.target.classList.toggle("active");
                const drop = $(".drop_cart");
                const dropBtn = $(".gift__drop-btn");

                drop.offset({
                  top: dropBtn.offset().top + dropBtn.height() + 20,
                  left: dropBtn.offset().left,
                });
                drop.width(dropBtn.width());
                drop.toggleClass("visible");

                if (drop.hasClass("visible")) {
                  setTimeout(() => {
                    drop.find("#citySearch").trigger("focus");
                  }, 250);
                }
              }}
            >
              <p>{cityLocal.name}</p>
            </div>

            <div className="drop drop_cart">
              <form className="city__drop active">
                <div className="input-field">
                  <input
                    id="citySearch"
                    placeholder="Поиск"
                    type="text"
                    autoFocus
                    onInput={(e) => {
                      if (e.target.value.length >= 3) {
                        const renderCities = [];
                        api
                          .getCity(e.target.value)
                          .then((c) => {
                            // console.log("c :>> ", c);
                            c.forEach((one) => {
                              if (one.addressComponents.length <= 6) {
                                renderCities.push(
                                  <li key={one.geoId}>
                                    <button
                                      type="submit"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        $(".header__drop").removeClass("visible");

                                        this.mapCoor = [];

                                        const changeData = {
                                          deliveryData: {},
                                          pvzDataCont: [],
                                        };

                                        if (this.state.pickUpStoreChoose) {
                                          changeData.pickUpStoreChoose = false;
                                          changeData.delChoose = true;
                                        }

                                        this.setState(changeData);

                                        localStorage.setItem("city", {
                                          name: one.addressComponents[one.addressComponents.length - 1].name,
                                          geoId: one.geoId,
                                          region: one.addressComponents[2].name,
                                          sourse: "U",
                                        });

                                        if ($(window).width() < 760) {
                                          $(".sidebar-overlay").removeClass("active");
                                        }
                                        this.dadataInit = false;

                                        $(".drop_cart.visible").toggleClass("visible");
                                        // $(".categories-block__child").find(".active").removeClass("active");

                                        this.choosePaymentType(undefined, this.state.payment);
                                      }}
                                    >
                                      {one.addressComponents[one.addressComponents.length - 2].name +
                                        ", " +
                                        one.addressComponents[one.addressComponents.length - 1].name}
                                    </button>
                                  </li>
                                );
                              }
                            });
                            this.setState({
                              cities: renderCities,
                            });
                          })
                          .catch((err) => {
                            console.log("err :>> ", err);
                          });
                      }
                    }}
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
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
            </div>
          </div>
        </div>
      );

      if (Object.keys(productInCart).length) {
        Object.keys(productInCart).forEach((el) => {
          productList.push(
            <ProductList key={el} data={productInCart[el]} el={el} store={this.props.store} cart={true} clearDeliveryData={this.clearDeliveryData} />
          );

          const salePrice = productInCart[el].sale
            ? typeIsPREPAID && certInCart !== el
              ? Math.floor(productInCart[el].sale_price * 0.97)
              : productInCart[el].sale_price
            : 0;
          const regPrice = typeIsPREPAID && certInCart !== el ? Math.floor(productInCart[el].regular_price * 0.97) : productInCart[el].regular_price;
          this.totalPrice += productInCart[el].sale
            ? productInCartList[el] * salePrice
            : el !== certInCart
            ? productInCartList[el] * regPrice
            : regPrice;

          this.totalNotSalePrice += productInCart[el].sale || el === certInCart ? 0 : productInCartList[el] * productInCart[el].regular_price;

          // totalSale += productInCart[el].sale
          //   ? (regPrice - salePrice) *
          //     productInCartList[el]
          //   : 0;

          //   console.log('Math.ceil(productInCart[el].sale_price*0.02) :>> ', Math.ceil(productInCart[el].sale_price*0.02)*productInCartList[el]);

          // if(typeIsPREPAID){
          //   totalSale+=productInCart[el].sale
          //   ? Math.ceil(productInCart[el].sale_price*0.02)*
          //   productInCartList[el]
          //   : Math.ceil(productInCart[el].regular_price*0.02)*
          //   productInCartList[el];
          // }

          totalFullprice += el !== certInCart ? productInCartList[el] * productInCart[el].regular_price : productInCart[el].regular_price;
        });
      }

      totalSale = totalFullprice - this.totalPrice;

      this.totalNotSalePrice += notSaleSum;

      if (useBonus) {
        this.totalPrice -= useBonus;
      }

      Object.keys(productInCart).forEach((sku) => {
        productInCart[sku].stores.forEach((str) => {
          // console.log("str.name :>> ", str.name);
          if (str.name !== "ТРЦ OUTLET Белая дача" && str.name !== "ТРЦ Орджоникидзе 11" && this.stores[str.name].aval) {
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
          let time = 0;
          // if (moment("31.12.2020", "DD.MM.YYYY").isSame(moment())) {
          //   time += 2;
          // } else if (moment("01.01.2021", "DD.MM.YYYY").isSame(moment())) {
          //   time += 1;
          // }
          dateInStore += moment().add(time, "days").format("DD.MM") + " ";
          dateInStore +=
            "— " +
            moment()
              .add(time + 1, "days")
              .format("DD.MM");
        } else {
          let time = 1;
          // if (moment("31.12.2020", "DD.MM.YYYY").isSame(moment())) {
          //   time += 2;
          // } else if (moment("01.01.2021", "DD.MM.YYYY").isSame(moment())) {
          //   time += 1;
          // }
          dateInStore += moment().add(time, "days").format("DD.MM");
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

      const coupRender = [];

      let certDisc = 0;

      if (Object.keys(productInCart).length) {
        Object.keys(coupsCont).forEach((coupon) => {
          coupRender.push(
            <div key={coupsCont[coupon].code}>
              {coupsCont[coupon].code.toUpperCase()} — <p> Применён</p>{" "}
              <button
                className="ic i_close"
                onClick={() => {
                  const newCoupsCont = coupsCont;
                  delete newCoupsCont[coupsCont[coupon].code];
                  localStorage.setItem("coupsCont", newCoupsCont);
                  this.setState({ coupsCont: newCoupsCont });
                }}
              ></button>
            </div>
          );
          if (coupsCont[coupon].count > 0) {
            if (coupsCont[coupon].type === "percent") {
              Object.keys(productInCart).forEach((el) => {
                const salePrice = productInCart[el].sale
                  ? typeIsPREPAID && certInCart !== el
                    ? Math.floor(productInCart[el].sale_price * 0.97)
                    : productInCart[el].sale_price
                  : 0;
                const regPrice =
                  typeIsPREPAID && certInCart !== el ? Math.floor(productInCart[el].regular_price * 0.97) : productInCart[el].regular_price;
                coupDisc +=
                  Math.ceil(
                    el === certInCart
                      ? 0
                      : productInCart[el].sale
                      ? (+coupsCont[coupon].count / 100) * salePrice
                      : (+coupsCont[coupon].count / 100) * regPrice
                  ) * productInCartList[el];
              });

              // if (certInCart && productInCart[certInCart] !== undefined) {
              //   coupDisc += Math.round(
              //     (this.totalPrice - productInCart[certInCart].regular_price) *
              //       (+coupsCont[coupon].count / 100)
              //   );
              // } else {
              //   coupDisc += Math.round(
              //     this.totalPrice * (+coupsCont[coupon].count / 100)
              //   );
              // }
            } else if (coupsCont[coupon].type === "fixed_cart") {
              certDisc += Math.round(+coupsCont[coupon].count);
            }
          }
        });

        if (certInCart && productInCart[certInCart] !== undefined) {
          if (this.totalPrice - productInCart[certInCart].regular_price > coupDisc + certDisc) {
            this.totalPrice -= coupDisc + certDisc;
          } else {
            this.totalPrice = productInCart[certInCart].regular_price;
          }
        } else {
          if (this.totalPrice > coupDisc + certDisc) {
            this.totalPrice -= coupDisc + certDisc;
          } else {
            this.totalPrice = 0;
          }
        }
      }

      // console.log("coupDisc :>> ", coupDisc);
      if (this.totalPrice === 0 && Object.keys(productInCart).length && this.state.payment !== "PREPAID") {
        this.choosePaymentType(undefined, "PREPAID");
      }

      if (Object.keys(delVar).length) {
        if (Object.keys(delVar).length > 1) {
          Object.keys(delVar).forEach((el) => {
            // console.log("delVar[el].msg. :>> ", delVar[el].msg.match(/\d/));
            let time = +delVar[el].delivery_period;
            if (delVar[el].msg.match(/\d/) !== null) {
              time += +delVar[el].msg.match(/\d/)[0];
            }

            const timeString = moment().add(time, "days");
            timeString.locale("ru");
            delVarRender.push(
              <div
                id="delivery"
                onClick={(e) => {
                  this.setDeliveryData(e, delVar[el], time);
                }}
              >
                <b>{this.translite[delVar[el].partner] !== undefined ? this.translite[delVar[el].partner] : delVar[el].partner}</b> <br />{" "}
                {delVar[el].price === 0 ? "Бесплатно" : `${Math.ceil(+delVar[el].price)} ₽`} <br />
                <p style={{ color: "#747498", fontSize: "14px" }}>{timeString.format("DD") + "-" + timeString.add(1, "days").format("DD MMMM")}</p>
              </div>
            );
          });
        }
      } else {
        delVarRender.push(
          <div
            id="delivery"
            onClick={(e) => {
              $("html, body").animate(
                {
                  scrollTop: $("#paymentMethod").offset().top - $(".navigation").height(),
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

      let maxBonusCount = 0;
      if (autnAndUserData) {
        let bonusSum = this.bonusDoubleBalance + this.bonusBalance;

        maxBonusCount = Math.floor(bonusSum > this.totalPrice / 2 ? this.totalPrice / 2 : bonusSum);
      }

      this.props.store.totalPrice = this.totalPrice;

      if (!this.priceWithOnline) {
        this.priceWithOnline = this.totalPrice;
      }

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
            <div className="cart_header">
              <a
                className="btn"
                onClick={() => {
                  if (this.props.history.length) {
                    window.history.go(-1);
                  } else {
                    window.location.replace("/");
                  }
                }}
              >
                {" "}
                <span className="ic i_left"></span> Вернуться в магазин
              </a>
              <Link className="logo logo_vl" to="/">
                <span className="i_queen"></span>
                <span className="i_of"></span>
                <span className="i_bohemia"></span>
                <span className="i_qd"></span>
              </Link>
            </div>
            <div className="row cart-page__wrp">
              <div className="col col-7 col-s-12">
                <div className="cart-page__cart">
                  <h3>Оформление заказа</h3>

                  <div className="cart__list">{productList}</div>
                </div>

                {this.totalPrice > 0 && (
                  <div className="cart-page__delivery" id="paymentMethod">
                    <h3 className="tilda">Оплата</h3>

                    <div className="cart__list cart-page__list">
                      <div className="alert-message alert-message_error">
                        <p>Выберите способ оплаты</p>
                        <button
                          className="ic i_close"
                          onClick={(e) => {
                            $(e.target).parent().removeClass("alert-message_active");
                          }}
                        ></button>
                      </div>
                      <div
                        className="cart-page__list-elem active"
                        id="payment"
                        onClick={(e) => {
                          this.choosePaymentType(e, "PREPAID");
                        }}
                      >
                        <div className="cart-page__store-info">
                          <p className="cart-page__store-name">
                            Онлайн
                            <span className="disc_perc">скидка 3%</span>
                          </p>
                          <div className="cart-page__store-adress">
                            <p>Банковскими картами Visa, Mastercard, Maestro, Мир, JCB. Apple Pay и Google Pay. Картой рассрочки Халва.</p>
                            <p className="halva-line">
                              Халва (10 мес.) <p>от {Math.ceil(this.priceWithOnline * 0.1)} ₽/мес</p>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`cart-page__list-elem ${certInCart ? "deactiv" : ""}`}
                        id="payment"
                        onClick={(e) => {
                          this.choosePaymentType(e, "CARD");
                        }}
                      >
                        <div className="cart-page__store-info">
                          <p className="cart-page__store-name">Картой при получении</p>
                          <div className="cart-page__store-adress">
                            <p>При оплате банковской картой, Вы получите квитанцию об оплате на указанный e-mail адрес.</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`cart-page__list-elem ${certInCart ? "deactiv" : ""}`}
                        id="payment"
                        onClick={(e) => {
                          this.choosePaymentType(e, "CASH");
                        }}
                      >
                        <div className="cart-page__store-info">
                          <p className="cart-page__store-name">Наличными при получении</p>
                          <div className="cart-page__store-adress">
                            <p>Мы свяжемся с вами для уточнения понадобится ли курьеру сдача.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {Object.keys(productInCart).length === 1 && certInCart ? null : (
                  <div className="cart-page__delivery" id="deliveryBlock">
                    <h3 className="tilda">Доставка</h3>

                    <div className="cart__tumbler" style={{ marginBottom: this.state.pickUpChoose ? "20px" : "40px" }}>
                      <div className="tumbler">
                        <button
                          className={"tumb " + (this.state.delChoose ? "active" : "")}
                          onClick={() => {
                            if (!this.state.delChoose)
                              if (Object.keys(this.state.delVar).length > 1 || inMSC) {
                                this.setState({
                                  delChoose: true,
                                  pickUpChoose: false,
                                  pickUpStoreChoose: false,
                                  deliveryData: {},
                                });
                              } else if (Object.keys(this.state.delVar).length === 1) {
                                this.setState({
                                  delChoose: true,
                                  pickUpChoose: false,
                                  pickUpStoreChoose: false,
                                  deliveryData: this.state.delVar[Object.keys(this.state.delVar)[0]],
                                });
                              }
                          }}
                        >
                          Курьером
                        </button>
                        <button
                          className={"tumb " + (this.state.pickUpChoose ? "active" : "")}
                          onClick={() => {
                            if (!this.state.pickUpChoose) {
                              this.setState({
                                delChoose: false,
                                pickUpChoose: true,
                                pickUpStoreChoose: false,
                                deliveryData: {},
                              });
                              // this.createMap();
                            }
                          }}
                        >
                          Пункт выдачи
                        </button>
                        {(inMSC || cityLocal.region === "Московская область") && (
                          <button
                            className={"tumb " + (this.state.pickUpStoreChoose ? "active" : "")}
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
                        {this.state.delVar === false ? (
                          <div
                            className="alert-message alert-message_error alert-message_active"
                            style={{
                              position: "relative",
                            }}
                          >
                            <p>Доставка выбранным способом в данный населенный пункт невозможна</p>
                          </div>
                        ) : (
                          <>
                            <div className="cart-page__delivery-details" id="addresLabels">
                              <div className="cart__list cart-page__list ">
                                <div className="cart-page__list-elem cart-page__list-elem_adress">
                                  <div className="alert-message alert-message_error">
                                    <p>Укажите адрес доставки</p>
                                    <button
                                      className="ic i_close"
                                      onClick={(e) => {
                                        $(e.target).parent().removeClass("alert-message_active");
                                      }}
                                    ></button>
                                  </div>
                                  <div className="cart-page__store-info">
                                    <p className="cart-page__store-name">Адрес доставки</p>
                                  </div>
                                  {chooseCityBtns}
                                  <form className="row" action="">
                                    <div className="col col-8 col-s-12">
                                      <div className="input-field">
                                        <label className="required" htmlFor="address">
                                          Улица
                                        </label>
                                        <input
                                          id="address"
                                          type="text"
                                          value={adress}
                                          onFocus={(e) => {
                                            $(e.target).parent().find("label").addClass("active");
                                          }}
                                          onBlur={(e) => {
                                            if (e.target.value === "") {
                                              $(e.target).parent().find("label").removeClass("active");
                                            }
                                          }}
                                          onInput={(e) => {
                                            $(".cart-page__list-elem_adress").find(".alert-message").removeClass("alert-message_active");
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

                                    <div className="col col-2 col-s-6">
                                      <div className="input-field">
                                        <label className="required" htmlFor="flat">
                                          Дом
                                        </label>
                                        <input
                                          id="flat"
                                          type="text"
                                          value={house}
                                          onFocus={(e) => {
                                            $(e.target).parent().find("label").addClass("active");
                                          }}
                                          onBlur={(e) => {
                                            if (e.target.value === "") {
                                              $(e.target).parent().find("label").removeClass("active");
                                            }
                                          }}
                                          onInput={(e) => {
                                            $(".cart-page__list-elem_adress").find(".alert-message").removeClass("alert-message_active");
                                            this.setState({
                                              house: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col col-2 col-s-6">
                                      <div className="input-field">
                                        <label htmlFor="porch">Кв/Офис</label>
                                        <input
                                          id="porch"
                                          type="text"
                                          value={flat}
                                          onFocus={(e) => {
                                            $(e.target).parent().find("label").addClass("active");
                                          }}
                                          onBlur={(e) => {
                                            if (e.target.value === "") {
                                              $(e.target).parent().find("label").removeClass("active");
                                            }
                                          }}
                                          onInput={(e) => {
                                            this.setState({
                                              flat: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                {inMSC && (
                                  <div
                                    className="cart-page__list-elem cart-page__list-elem_delivery"
                                    onClick={(e) => {
                                      // this.choosePickUpPoint(e, st);
                                    }}
                                  >
                                    <div className="alert-message alert-message_error">
                                      <p>Выберите способ доставки</p>
                                      <button
                                        className="ic i_close"
                                        onClick={(e) => {
                                          $(e.target).parent().removeClass("alert-message_active");
                                        }}
                                      ></button>
                                    </div>
                                    <div className="cart-page__store-info">
                                      <p className="cart-page__store-name">Экспресс</p>
                                      <div className="cart-page__store-adress">
                                        {/* <span className="old">152 ₽</span> 152 ₽{" "}
                              <span className="disc_perc">-20%</span> */}
                                        <p>
                                          Возможна проверка заказа и частичный отказ.
                                          <br />
                                          <b>Бесплатно</b> при заказе от <b>20 000 ₽</b>.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="cart-page__list-choose">
                                      <div
                                        id="delivery"
                                        onClick={(e) => {
                                          document.querySelectorAll("#delivery").forEach((elem) => {
                                            elem.classList.remove("active");
                                          });
                                          $(e.currentTarget).addClass("active");
                                          $(".cart-page__list-elem_delivery").find(".alert-message").removeClass("alert-message_active");
                                          if (moment().hour() <= 16) {
                                            this.setState({
                                              deliveryData: {
                                                type: "express",
                                                price: inMSC && this.totalPrice >= 20000 ? 0 : 1000,
                                                time: 0,
                                              },
                                            });
                                          } else {
                                            this.setState({
                                              deliveryData: {
                                                type: "express",
                                                price: inMSC && this.totalPrice >= 20000 ? 0 : 1000,
                                                time: 1,
                                              },
                                            });
                                          }
                                        }}
                                      >
                                        {moment().hour() <= 16 ? "Сегодня" : "Завтра"} — {inMSC && this.totalPrice >= 20000 ? "бесплатно" : "1 000 ₽"}{" "}
                                        {/* {moment().hour() > 16 && (
                                          <p
                                            style={{
                                              color: "#747498",
                                              fontSize: "14px",
                                            }}
                                          >
                                            Доступно до 17:00
                                          </p>
                                        )} */}
                                      </div>
                                      <div
                                        id="delivery"
                                        onClick={(e) => {
                                          document.querySelectorAll("#delivery").forEach((elem) => {
                                            elem.classList.remove("active");
                                          });
                                          $(e.currentTarget).addClass("active");
                                          $(".cart-page__list-elem_delivery").find(".alert-message").removeClass("alert-message_active");
                                          if (moment().hour() <= 16) {
                                            this.setState({
                                              deliveryData: {
                                                type: "express",
                                                price: inMSC && this.totalPrice >= 20000 ? 0 : 400,
                                                time: 1,
                                              },
                                            });
                                          } else {
                                            this.setState({
                                              deliveryData: {
                                                type: "express",
                                                price: inMSC && this.totalPrice >= 20000 ? 0 : 400,
                                                time: 2,
                                              },
                                            });
                                          }
                                        }}
                                      >
                                        {moment().hour() <= 16 ? "Завтра" : "Послезавтра"} —{" "}
                                        {inMSC && this.totalPrice >= 20000 ? "бесплатно" : "400 ₽"}{" "}
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
                                  <div className="alert-message alert-message_error">
                                    <p>Выберите способ доставки</p>
                                    <button
                                      className="ic i_close"
                                      onClick={(e) => {
                                        $(e.target).parent().removeClass("alert-message_active");
                                      }}
                                    ></button>
                                  </div>
                                  {Object.keys(delVar).length > 1 ? (
                                    <div className="cart-page__store-info">
                                      <p className="cart-page__store-name">Курьерскими службами</p>
                                      <div className="cart-page__store-adress">
                                        <p>
                                          Dalli-Service или СДЭК. Возможна проверка заказа, доступен частичный отказ . <b>Бесплатно</b> при заказе от{" "}
                                          <b>3 000 ₽</b> по <b>Москве</b>.
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    Object.keys(delVar).length !== 0 && (
                                      <div className="cart-page__list-choose ">
                                        <div
                                          className={`cart-page__store-info ${inMSC ? "" : "active"}`}
                                          id="delivery"
                                          onClick={(e) => {
                                            this.setDeliveryData(e, delVar[Object.keys(delVar)[0]], delVar[Object.keys(delVar)[0]].time);
                                          }}
                                        >
                                          <div className="cart-page__store-name">
                                            <p className="cart-page__s-name">Курьерскими службами</p>
                                            <div>
                                              <p>
                                                {inMSC &&
                                                (this.totalPrice >= 3000 ||
                                                  (Object.keys(productInCart).length === 1 &&
                                                    productInCart[Object.keys(productInCart)[0]].sku === 5637285331))
                                                  ? "Бесплатно"
                                                  : (+delVar[Object.keys(delVar)[0]].price).toLocaleString() + " ₽ "}{" "}
                                              </p>
                                              <p>
                                                {moment().add(delVar[Object.keys(delVar)[0]].time, "days").locale("ru").format("DD")} -{" "}
                                                {moment()
                                                  .add(delVar[Object.keys(delVar)[0]].time + 1, "days")
                                                  .locale("ru")
                                                  .format("DD MMMM")}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="cart-page__store-adress">
                                            {inMSC ? (
                                              <p>
                                                Возможна проверка заказа и частичный отказ.
                                                <br /> <b>Бесплатно</b> при заказе от <b>3 000 ₽</b> по <b>Москве</b>.
                                              </p>
                                            ) : (
                                              <p>Возможна проверка заказа и частичный отказ.</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                  {Object.keys(delVar).length > 1 && <div className="cart-page__list-choose">{delVarRender}</div>}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </Fade>
                    )}
                    {this.state.pickUpChoose && (
                      <Fade distance="50px" duration={500}>
                        {this.state.pvzDataCont === false ? (
                          <div
                            className="alert-message alert-message_error alert-message_active"
                            style={{
                              position: "relative",
                            }}
                          >
                            <p>Доставка выбранным способом в данный населенный пункт невозможна</p>
                          </div>
                        ) : (
                          <>
                            <div className="row">
                              <div className="col col-12">
                                {chooseCityBtns}
                                <div key={this.props.store.city}>
                                  <MapDel
                                    pointsData={this.state.pvzDataCont}
                                    mapCoor={this.mapCoor}
                                    setPVZChooseData={this.setPVZChooseData}
                                  ></MapDel>
                                </div>
                              </div>
                            </div>
                            {Object.keys(deliveryData).length !== 0 && deliveryData.pvz === true && (
                              <div className="cart-page__delivery-details">
                                <div className="row">
                                  <div className="col col-12">
                                    <div className="pvz">
                                      <div className="pvz__head">
                                        <h6>
                                          {this.translite[deliveryData.partner] !== undefined
                                            ? this.translite[deliveryData.partner]
                                            : deliveryData.partner}
                                        </h6>
                                        <div>
                                          {deliveryData.price === 0 ? "Бесплатно" : (+deliveryData.price).toLocaleString() + " ₽ "}
                                          <span className="b_gray">
                                            {moment().add(deliveryData.time, "days").format("DD") +
                                              "-" +
                                              moment()
                                                .add(deliveryData.time + 1, "days")
                                                .format("DD MMMM")}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="pvz__address">{deliveryData.town + ", " + deliveryData.addressReduce}</p>

                                      {deliveryData.description !== undefined && (
                                        <div className="pvz__description">
                                          <span className="b_gray">Описание</span>
                                          <p>{deliveryData.description}</p>
                                        </div>
                                      )}

                                      <div className="pvz__time">
                                        <span className="b_gray">Время работы</span>
                                        <p>{deliveryData.workShedule}</p>
                                      </div>
                                      <div
                                        className="btn"
                                        onClick={() => {
                                          const { geoMap, revertMap } = window;
                                          this.setState({ deliveryData: {} });
                                          $("#map").removeClass("choose");

                                          setTimeout(() => {
                                            // geoMap.removeControl(ymaps.Zoom());
                                            //   geoMap.controls.remove("zoomControl");
                                            // geoMap.container.fitToViewport(); // объект класса ymaps.Map
                                            geoMap.geoObjects.removeAll();
                                            revertMap();
                                          }, 350);
                                        }}
                                      >
                                        Изменить
                                      </div>

                                      {/* <div className="item">
                                    <h5>Стоимость и сроки:</h5>
                                    <span>
                                      
                                      /{" "}
                                      
                                    </span>
                                  </div> */}

                                      {/* {deliveryData.pvz === undefined && (
                                    <div className="item">
                                      <h5>Адрес выдачи:</h5>
                                      <span>{deliveryData.address}</span>
                                    </div>
                                  )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* {this.state.pickUpChoose &&
                            Object.keys(this.state.deliveryData).length ===
                              0 && (
                              <div key={this.props.store.city}>
                                <MapDel
                                  store={this.props.store}
                                  pointsData={this.state.pvzDataCont}
                                  mapCoor={this.mapCoor}
                                  setPVZChooseData={this.setPVZChooseData}
                                ></MapDel>
                              </div>
                            )} */}
                            {/* {Object.keys(deliveryData).length !== 0 && (
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
                          <div className="Ya-block" id="yaDeliveryWidget"></div> */}
                          </>
                        )}
                      </Fade>
                    )}
                    {this.state.pickUpStoreChoose && (
                      <div className="cart__list cart-page__list">
                        {chooseCityBtns}
                        {htmlStore}
                      </div>
                    )}
                  </div>
                )}

                <div className="cart-page__data">
                  <h3 className="tilda">Данные</h3>
                  <div className="alert-message alert-message_error">
                    <p>Заполните все данные</p>
                    <button
                      className="ic i_close"
                      onClick={(e) => {
                        $(e.target).parent().removeClass("alert-message_active");
                      }}
                    ></button>
                  </div>
                  {/* <p>Для получения потребуется паспорт с указанными данными</p> */}
                  {!this.props.store.auth && (
                    <p>
                      <a
                        className="link dotted"
                        onClick={(e) => {
                          document.querySelector(".sidebar-overlay").classList.add("active");

                          document.querySelector("body").classList.add("no-scroll");

                          this.props.store.sideLogin = true;
                          e.preventDefault();
                        }}
                      >
                        <span className="ic i_user"></span> <span className="fw_m b_dark">Войдите</span>
                      </a>{" "}
                      <span className="b_gray">(данные подгрузятся автоматически)</span>
                    </p>
                  )}

                  <form className="cart-page__data-form row" action="">
                    <div className="col col-6">
                      <div className="input-field">
                        <label className={name === "" ? "required" : "required active"} htmlFor="firstname">
                          Имя
                        </label>
                        <input
                          id="firstname"
                          type="text"
                          name="firstname"
                          value={name}
                          onFocus={(e) => {
                            $(e.target).parent().find("label").addClass("active");
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              $(e.target).parent().find("label").removeClass("active");
                            }
                          }}
                          onInput={(e) => {
                            if (e.target.value === "") {
                              $(e.target).css("border-bottom", "1px solid #EB5757");
                            } else {
                              $(e.target).css("border-bottom", "1px solid lightgreen");
                            }
                            $(".cart-page__data").find(".alert-message").removeClass("alert-message_active");
                            this.setState({
                              name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label className={secondName === "" ? "required" : "required active"} htmlFor="lastname">
                          Фамилия
                        </label>
                        <input
                          id="lastname"
                          name="lastname"
                          type="text"
                          value={secondName}
                          onFocus={(e) => {
                            $(e.target).parent().find("label").addClass("active");
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              $(e.target).parent().find("label").removeClass("active");
                            }
                          }}
                          onInput={(e) => {
                            if (e.target.value === "") {
                              $(e.target).css("border-bottom", "1px solid #EB5757");
                            } else {
                              $(e.target).css("border-bottom", "1px solid lightgreen");
                            }
                            $(".cart-page__data").find(".alert-message").removeClass("alert-message_active");
                            this.setState({
                              secondName: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6" style={{ marginBottom: "20px" }}>
                      <div className="input-field">
                        <label className={email === "" ? "required" : "required active"} htmlFor="email">
                          E-mail
                        </label>
                        <input
                          id="email"
                          type="text"
                          value={email}
                          onFocus={(e) => {
                            $(e.target).parent().find("label").addClass("active");
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              $(e.target).parent().find("label").removeClass("active");
                            }
                          }}
                          onInput={(e) => {
                            if (!regexEmail.test(e.target.value)) {
                              $(e.target).css("border-bottom", "1px solid #EB5757");
                            } else {
                              $(e.target).css("border-bottom", "1px solid lightgreen");
                            }
                            $(".cart-page__data").find(".alert-message").removeClass("alert-message_active");
                            this.setState({
                              email: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6" style={{ marginBottom: "20px" }}>
                      <div className="input-field">
                        <label className={tel === "" ? "required" : "required active"} htmlFor="phone">
                          Телефон
                        </label>
                        <input
                          id="phone"
                          type="text"
                          value={tel}
                          onFocus={(e) => {
                            $(e.target).parent().find("label").addClass("active");
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "") {
                              $(e.target).parent().find("label").removeClass("active");
                            }
                          }}
                          onInput={(e) => {
                            if (e.target.value.includes("_")) {
                              $(e.target).css("border-bottom", "1px solid #EB5757");
                            } else {
                              $(e.target).css("border-bottom", "1px solid lightgreen");
                            }
                            $(".cart-page__data").find(".alert-message").removeClass("alert-message_active");
                            this.setState({
                              tel: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <label className="checkbox checkbox_margin" style={{ marginLeft: "10px" }}>
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        id=""
                        value={this.state.acceptedTerms}
                        onChange={() => {
                          $(".cart-page__data").find(".alert-message").removeClass("alert-message_active");
                          this.setState({
                            acceptedTerms: !this.state.acceptedTerms,
                          });
                        }}
                        checked={this.state.acceptedTerms}
                      />
                      <span className="checkbox-btn" style={{ marginRight: "10px" }}></span>
                      <i style={{ maxWidth: "90%" }}>
                        Согласен с{" "}
                        <Link className="underline" to="/help/offer">
                          "Публичной офертой"
                        </Link>{" "}
                        и{" "}
                        <Link className="underline" to="/help/cppd">
                          "Обработкой персональных данных"
                        </Link>
                      </i>
                    </label>
                  </form>
                </div>
              </div>
              <div className="col col-1 hide-s"></div>
              <div className="col col-4 col-s-12">
                <div className="cart-page__result-stick">
                  <div className="cart-page__bonus-sum">
                    <p>Бонусы через 14 дней:</p>
                    {autnAndUserData ? (
                      <div>
                        + {Math.round(userData.user.percentLoyal ? this.totalPrice * userData.user.percentLoyal : this.totalPrice * 0.02)}{" "}
                        <p className="i_coin"></p>
                      </div>
                    ) : (
                      <div>
                        до {Math.round(this.totalPrice * 0.1)} <p className="i_coin"></p>
                      </div>
                    )}
                  </div>

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
                                : (deliveryData.price + this.totalPrice).toLocaleString()
                              : inMSC &&
                                (this.totalPrice >= 3000 ||
                                  (Object.keys(productInCart).length === 1 && productInCart[Object.keys(productInCart)[0]].sku === 5637285331))
                              ? this.totalPrice.toLocaleString()
                              : deliveryData.deliveryOption === undefined
                              ? (+deliveryData.price + this.totalPrice).toLocaleString()
                              : (+deliveryData.price + this.totalPrice).toLocaleString()}{" "}
                            ₽
                          </span>
                        </div>
                        <div>
                          <span>Стоимость товаров</span> <span>{totalFullprice.toLocaleString()} ₽</span>
                        </div>
                        <div>
                          <span>Скидка</span>{" "}
                          <span className="red">{totalSale === 0 ? totalSale.toLocaleString() : "- " + totalSale.toLocaleString()} ₽</span>
                        </div>

                        {coupDisc > 0 && (
                          <div>
                            <span>Промокод</span> <span className="red">- {coupDisc.toLocaleString()} ₽</span>
                          </div>
                        )}
                        {certDisc > 0 && (
                          <div>
                            <span>Сертификат</span> <span className="red">- {certDisc.toLocaleString()} ₽</span>
                          </div>
                        )}
                        {useBonus > 0 && (
                          <div>
                            <span>Бонусы</span> <span className="red">- {useBonus.toLocaleString()} ₽</span>
                          </div>
                        )}

                        {Object.keys(deliveryData).length !== 0 && (
                          <div>
                            <span>Доставка</span>{" "}
                            <span>
                              {deliveryData.price === 0 ? "Бесплатно" : (+deliveryData.price).toLocaleString() + " ₽ "} /{" "}
                              <span className="b_gray">
                                {" "}
                                {moment().utcOffset("+03:00").format("HH") < 15
                                  ? deliveryData.time === 0
                                    ? "сегодня"
                                    : deliveryData.time === 1
                                    ? "завтра"
                                    : deliveryData.time === 2
                                    ? "Послезавтра"
                                    : deliveryData.time + " " + num2str(deliveryData.time, ["день", "дня", "дней"])
                                  : deliveryData.time + 1 === 0
                                  ? "сегодня"
                                  : deliveryData.time + 1 === 1
                                  ? "завтра"
                                  : deliveryData.time + 1 === 2
                                  ? "Послезавтра"
                                  : deliveryData.time + 1 + " " + num2str(deliveryData.time, ["день", "дня", "дней"])}
                              </span>
                            </span>
                          </div>
                        )}
                      </li>
                    </ul>

                    {Object.keys(deliveryData).length !== 0
                      ? (deliveryData.delivery !== undefined || address !== "") && (
                          <div className="cart-page__result-address">
                            {deliveryData.delivery === undefined ? deliveryData.pickupPoint.address.addressString : address}
                          </div>
                        )
                      : null}

                    <button
                      className="btn btn_yellow"
                      id="createOrder"
                      onClick={(e) => {
                        //NEN

                        const { flat, house, adress, delChoose, pickUpChoose, pickUpStoreChoose, payment, coupsCont, useBonus } = this.state;
                        let inError = false;
                        if (payment === "") {
                          $("html, body").animate(
                            {
                              scrollTop: $("#paymentMethod").offset().top - $(".navigation").height(),
                            },
                            500
                          );
                          // document
                          //   .querySelectorAll("#payment")
                          //   .forEach((elem) => {
                          //     elem.classList.add("cart-page__list-elem_red");
                          //     setTimeout(() => {
                          //       elem.classList.remove(
                          //         "cart-page__list-elem_red"
                          //       );
                          //     }, 1500);
                          //   });

                          $("#paymentMethod").find(".alert-message").addClass("alert-message_active");
                          // $("#payment").addClass("cart-page__list-elem_red");
                          // setTimeout(() => {
                          //   $("#payment").removeClass(
                          //     "cart-page__list-elem_red"
                          //   );
                          // }, 1500);
                          inError = true;
                        }
                        if (certInCart && Object.keys(productInCart).length === 1) {
                        } else {
                          if (delChoose) {
                            if (Object.keys(this.state.deliveryData).length === 0 || house === "" || adress === "") {
                              if (!inError) {
                                $("html, body").animate(
                                  {
                                    scrollTop: $("#deliveryBlock").offset().top - $(".navigation").height(),
                                  },
                                  500
                                );
                              }
                              if (Object.keys(this.state.deliveryData).length === 0) {
                                $(".cart-page__list-elem_delivery").find(".alert-message").addClass("alert-message_active");
                              }
                              if (house === "" || adress === "") {
                                $(".cart-page__list-elem_adress").find(".alert-message").addClass("alert-message_active");
                              }
                              inError = true;
                            }
                          } else if (pickUpChoose) {
                            if (!Object.keys(deliveryData).length) {
                              if (!inError) {
                                $("html, body").animate(
                                  {
                                    scrollTop: $("#deliveryBlock").offset().top - $(".navigation").height(),
                                  },
                                  500
                                );
                              }
                              inError = true;
                            }
                          } else {
                            if (this.state.pickUpStore === "") {
                              if (!inError) {
                                $("html, body").animate(
                                  {
                                    scrollTop: $("#deliveryBlock").offset().top - $(".navigation").height(),
                                  },
                                  500
                                );
                              }
                              inError = true;
                            }
                          }
                        }
                        if (
                          name === "" ||
                          secondName === "" ||
                          email === "" ||
                          tel === "" ||
                          !regexEmail.test(email) ||
                          tel.includes("_") ||
                          !this.state.acceptedTerms
                        ) {
                          if (!inError) {
                            $("html, body").animate(
                              {
                                scrollTop: $(".cart-page__data").offset().top - $(".navigation").height(),
                              },
                              500
                            );
                          }
                          $(".cart-page__data").find(".alert-message").addClass("alert-message_active");
                          inError = true;
                        }

                        Object.keys(this.state.coupsCont).forEach((key) => {
                          if (this.state.coupsCont[key].limit === null && this.state.coupsCont[key].use.includes(this.state.email.toLowerCase())) {
                            const newCoupsCont = this.state.coupsCont;

                            delete newCoupsCont[key];

                            localStorage.setItem("coupsCont", newCoupsCont);

                            this.setState({
                              coupsCont: newCoupsCont,
                            });
                            $(".cart-page__promo").find(".alert-message").removeClass("alert-message_warning");
                            $(".cart-page__promo").find(".alert-message").addClass("alert-message_error");
                            $(".cart-page__promo").find(".alert-message").find("p").text("Вы уже использовали данный промокод");
                            $(".cart-page__promo").find(".alert-message").addClass("alert-message_active");
                            inError = true;
                          }
                        });

                        if (inError) {
                          return;
                        }
                        $(e.target).addClass("deactive");
                        $(e.target).text("Создаем заказ");
                        this.props.store.createOrderData(this.state.payment);

                        const senderId = 500001936;
                        const cityLoc = localStorage.getItem("city");

                        const dataToSend = {
                          ...this.props.store.dataToSend,
                        };
                        const ecomProd = [...this.props.store.ecomProd];
                        const productForYA = [...this.props.store.productForYA];

                        const payItems = [...this.props.store.payItems];

                        dataToSend.sum = this.totalPrice;
                        dataToSend.email = this.state.email.toLowerCase();
                        dataToSend.firstName = name;
                        dataToSend.lastName = secondName;
                        dataToSend.phone = String(tel);
                        dataToSend.payment = this.state.payment;
                        dataToSend.coupon = this.state.coupsCont;
                        const that = this;
                        if (certInCart) {
                          dataToSend.certInCart = certInCart;
                        }
                        if (this.totalNotSalePrice) {
                          dataToSend.totalNotSalePrice = this.totalNotSalePrice;
                        }
                        if (useBonus) {
                          dataToSend.useBonus = useBonus;
                        }

                        if (delChoose || pickUpChoose) {
                          const addressData = {
                            geoId: localStorage.getItem("city").geoId,
                            country: "Россия",
                            region: cityLoc.region,
                            locality: cityLoc.name,
                            street: deliveryData.pvz !== undefined ? deliveryData.Street : adress,
                            house: deliveryData.pvz !== undefined ? deliveryData.House : house,
                            apartment: deliveryData.pvz !== undefined ? deliveryData.Apartment : flat,
                          };

                          const contacts = {
                            email: email.toLowerCase(),
                            phone: String(tel),

                            firstName: name,

                            lastName: secondName,
                          };

                          // window.widget.setOrderInfo(this.order);
                          // window.widget.createOrder();

                          // this.deliverySend.cost.fullyPrepaid = dataToSend.payment === "PREPAID";
                          const delivery = {
                            ...deliveryData,
                            address: addressData,
                            dimensions: this.dimensionsApi,
                            contacts,
                            senderId,
                            productForYA,
                            payItems,
                          };

                          // if (certInCart) {
                          //   dataToSend.certInCart = certInCart;
                          // }
                          // if (this.totalNotSalePrice) {
                          //   dataToSend.totalNotSalePrice = this.totalNotSalePrice;
                          // }
                          // if (useBonus) {
                          //   dataToSend.useBonus = useBonus;
                          // }

                          // console.log("object :>> ", delivery, dataToSend);
                          // return;
                          if (process.env.REACT_APP_TYPE === "prod") {
                            window.ym(65097901, "reachGoal", "Checkout");
                          }

                          api
                            .setOrderData({
                              delivery,
                              dataToSend,
                            })
                            .then((data) => {
                              this.orderCancelID = data.id;
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

                              localStorage.setItem("deleteCart", true);

                              // console.log('localStorage.getItem("orderID") :>> ', localStorage.getItem("orderID"));
                              const preValue =
                                Object.keys(dataToSend.prod).length === 1 && certInCart ? dataToSend.sum : +delivery.price + dataToSend.sum;

                              if (dataToSend.payment === "PREPAID" && preValue > 0) {
                                const checkout = new window.YandexCheckout({
                                  confirmation_token: data.confirmationToken, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
                                  return_url: data.return, //Ссылка на страницу завершения оплаты
                                  embedded_3ds: true, // Способ прохождения аутентификации 3-D Secure — во всплывающем окне
                                  error_callback(error) {
                                    console.log("error :>> ", error);
                                    that.cancelPay();
                                    $("#createOrder").removeClass("deactive");
                                  },
                                });

                                checkout.render("payment-form");

                                $(".sidebar-overlay").addClass("active");
                                $(".sidebar-cart").addClass("visible");

                                $("body").addClass("no-scroll");

                                // if (
                                //   deliveryData.deliveryOption !== undefined &&
                                //   deliveryData.type === undefined
                                // ) {
                                //   localStorage.set("sendDeliveryPickUp", true);
                                //   window.widget.setOrderInfo({
                                //     ...this.order,
                                //     externalId: String(data.orderId),
                                //   });
                                // }
                                localStorage.setItem("orderID", data.id);
                              } else {
                                // if (
                                //   deliveryData.deliveryOption !== undefined &&
                                //   deliveryData.type === undefined
                                // ) {
                                //   localStorage.set("sendDeliveryPickUp", true);
                                //   window.widget
                                //     .setOrderInfo({
                                //       ...this.order,
                                //       externalId: String(data.orderId),
                                //     })
                                //     .then((ok) => {
                                //       window.location.href = data.return;
                                //     })
                                //     .catch((err) => {
                                //       console.log("err", err);
                                //     });
                                // } else {
                                localStorage.removeItem("coupsCont");
                                window.location.href = data.return;
                                // }
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
                              this.cancelPay();
                            })
                            .finally(() => {
                              $("#createOrder").removeClass("deactive");
                            });
                        } else if (pickUpStoreChoose) {
                          dataToSend.pickUpChoose = true;

                          dataToSend.address = this.stores[this.state.pickUpStore].address;
                          dataToSend.city = "Москва";
                          dataToSend.store = this.state.pickUpStore;

                          // console.log("object :>> ", dataToSend);
                          // return;

                          api
                            .setOrderData({
                              delivery: {
                                pickUpChoose: true,
                                payment: this.state.payment,
                                store: this.state.pickUpStore,
                                deliveryForCustomer: 0,
                                address: {
                                  locality: this.stores[this.state.pickUpStore].address,
                                },
                                productForYA,
                                payItems,
                              },
                              dataToSend,
                            })
                            .then((data) => {
                              this.orderCancelID = data.id;
                              if (process.env.REACT_APP_TYPE === "prod") {
                                window.ym(65097901, "reachGoal", "Checkout");
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

                              localStorage.setItem("deleteCart", true);

                              if (dataToSend.payment === "PREPAID" && dataToSend.sum > 0) {
                                const checkout = new window.YandexCheckout({
                                  confirmation_token: data.confirmationToken, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
                                  return_url: data.return, //Ссылка на страницу завершения оплаты
                                  embedded_3ds: true, // Способ прохождения аутентификации 3-D Secure — во всплывающем окне
                                  error_callback(error) {
                                    console.log("error :>> ", error);
                                    that.cancelPay();
                                    $("#createOrder").removeClass("deactive");
                                  },
                                });

                                checkout.render("payment-form");

                                localStorage.setItem("deleteCart", true);

                                $(".sidebar-overlay").addClass("active");
                                $(".sidebar-cart").addClass("visible");

                                $("body").addClass("no-scroll");
                                // localStorage.removeItem("coupsCont");
                                localStorage.setItem("orderID", data.id);
                              } else {
                                localStorage.removeItem("coupsCont");
                                window.location.href = data.return;
                              }
                            })
                            .catch((err) => {
                              console.log("err :>> ", err);
                              $("#createOrder").text("Произошла ошибка");
                              setTimeout(() => {
                                $("#createOrder").text("Заказать");
                              }, 3000);
                              this.cancelPay();
                            })
                            .finally(() => {
                              $("#createOrder").removeClass("deactive");
                            });
                        }
                      }}
                    >
                      {this.state.payment === ""
                        ? "Выбрать способ оплаты"
                        : Object.keys(productInCart).length === 1 && certInCart
                        ? name.length === 0 ||
                          secondName.length === 0 ||
                          email.length === 0 ||
                          tel.length === 0 ||
                          !regexEmail.test(email) ||
                          tel.includes("_")
                          ? "Указать контактные данные"
                          : "Заказать"
                        : this.state.delChoose && (Object.keys(this.state.deliveryData).length === 0 || adress.length === 0 || house.length === 0)
                        ? "Выбрать доставку"
                        : (this.state.pickUpChoose && Object.keys(deliveryData).length === 0) ||
                          (this.state.pickUpStoreChoose && this.state.pickUpStore === "")
                        ? "Выбрать пункт самовывоза"
                        : name.length === 0 ||
                          secondName.length === 0 ||
                          email.length === 0 ||
                          tel.length === 0 ||
                          !regexEmail.test(email) ||
                          tel.includes("_")
                        ? "Указать контактные данные"
                        : this.state.payment === "PREPAID"
                        ? "Оплатить"
                        : "Заказать"}
                    </button>
                  </div>
                  {Object.keys(userData).length !== 0 && this.bonusDoubleBalance + this.bonusBalance > 0 && (
                    <div className="cart-page__bonus" id="bonusCont" style={{ position: "relative" }}>
                      <div className="alert-message alert-message_error">
                        <p>Заполните кол-во бонусов</p>
                        <button
                          className="ic i_close"
                          onClick={(e) => {
                            $(e.target).parent().removeClass("alert-message_active");
                          }}
                        ></button>
                      </div>
                      <div className="cart__list cart-page__list ">
                        <div
                          className={`cart-page__list-elem cart-page__list-elem_not-c ${this.state.useBonus ? "cart-page__list-elem_use-bonus" : ""}`}
                        >
                          <div className="cart-page__level">
                            <div className="cart-page__bonus-level-head">
                              <h5>{userData.user.numLoyal} уровень</h5>
                              {userData.user.numLoyal < 6 && (
                                <>
                                  <div className="cart-page__bonus-level-line">
                                    <div
                                      style={{
                                        width: `${
                                          (userData.user.orderCloseSum
                                            ? userData.user.orderCloseSum / this.bonusNextSum[userData.user.numLoyal]
                                            : 0 / this.bonusNextSum[userData.user.numLoyal]) * 100
                                        }%`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="cart-page__bonus-level-link">
                                    <p>
                                      До перехода:{" "}
                                      {userData.user.orderCloseSum
                                        ? (this.bonusNextSum[userData.user.numLoyal] - userData.user.orderCloseSum).toLocaleString()
                                        : (this.bonusNextSum[userData.user.numLoyal] - 0).toLocaleString()}{" "}
                                      ₽
                                    </p>
                                    {this.bonusNextSum[userData.user.numLoyal] - userData.user.orderCloseSum < this.totalPrice && (
                                      <p className="green">Новый уровень через 14 дней после получения этой покупки</p>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="cart-page__store-info bonus-block">
                            <p className="cart-page__store-name">
                              Бонусные баллы
                              <br /> <span className="dib">(можно оплатить до 50% от покупки)</span>
                            </p>
                            {this.state.useBonus ? (
                              <div className="cart-page__bonus">
                                <div className="cart-page__bonus-block">
                                  <p>Использованно: </p>
                                  <div
                                    style={{
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <p>
                                      <b> {this.state.useBonus}</b>
                                    </p>
                                    <p className="i_coin" />
                                  </div>
                                </div>
                                <span className="bonus-line"></span>
                                <button
                                  onClick={() => {
                                    this.setState({
                                      useBonus: 0,
                                    });
                                  }}
                                >
                                  Отменить
                                </button>
                              </div>
                            ) : (
                              <div className="cart-page__bonus">
                                <div className="cart-page__bonus-block">
                                  <p>Баланс </p>
                                  <div
                                    style={{
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <p>
                                      <b> {this.bonusBalance.toLocaleString()}</b>
                                    </p>
                                    <p className="i_coin" />
                                  </div>
                                </div>
                                {Object.keys(this.bonusDouble).length !== 0 && (
                                  <div className="cart-page__bonus-block">
                                    <p style={{ color: "#BA250D" }}>Подарочные бонусы до {this.bonusDouble.dateDouble}</p>
                                    <div
                                      style={{
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <p>
                                        <b style={{ color: "#BA250D" }}> {this.bonusDoubleBalance.toLocaleString()}</b>
                                      </p>
                                      <p className="i_coin" style={{ color: "#BA250D" }} />
                                    </div>
                                  </div>
                                )}
                                {Object.keys(this.bonusDouble).length !== 0 && (
                                  <div className="cart-page__bonus-block">
                                    <p>Итого </p>
                                    <div
                                      style={{
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <p>
                                        <b> {(this.bonusDoubleBalance + this.bonusBalance).toLocaleString()}</b>
                                      </p>
                                      <p className="i_coin" />
                                    </div>
                                  </div>
                                )}
                                <div className="cart-page__bonus-block">
                                  <p>Использовать </p>
                                  <div>
                                    <input
                                      type="number"
                                      id="inputBonusCount"
                                      placeholder={maxBonusCount.toLocaleString()}
                                      onChange={(e) => {
                                        if (+e.target.value > maxBonusCount) {
                                          this.setState({
                                            bonus: maxBonusCount,
                                          });
                                        } else {
                                          this.setState({
                                            bonus: Math.floor(+e.target.value),
                                          });
                                        }
                                      }}
                                      value={this.state.bonus ? this.state.bonus : ""}
                                    />
                                    <p className="i_coin" />
                                  </div>
                                </div>
                                <span className="bonus-line"></span>
                                <button
                                  onClick={() => {
                                    if (this.state.bonus) {
                                      this.setState({
                                        useBonus: this.state.bonus,
                                      });
                                    } else {
                                      this.setState({
                                        useBonus: maxBonusCount,
                                      });
                                    }
                                  }}
                                >
                                  Активировать
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="cart-page__coups">{coupRender}</div>
                  <div className="cart-page__promo">
                    <input className="def" id="coup" placeholder="Промокод" type="text" />{" "}
                    <button
                      onClick={() => {
                        const thisCertAvalHere = Object.keys(this.state.coupsCont).includes($("#coup").val().toLowerCase());
                        let avalRegistCert = false;
                        let avalBlogersCert = false;

                        Object.keys(this.state.coupsCont).forEach((coup) => {
                          if (coup.includes("r-")) {
                            avalRegistCert = true;
                          }
                          if (coup.includes("b-") || coup.includes("juliafir")) {
                            avalBlogersCert = true;
                          }
                        });

                        const blogInLine = $("#coup").val().toLowerCase().includes("b-") || $("#coup").val().toLowerCase().includes("juliafir");

                        if (
                          $("#coup").val() !== "" &&
                          !thisCertAvalHere &&
                          (!avalRegistCert || !$("#coup").val().toLowerCase().includes("r-")) &&
                          (!avalBlogersCert || !blogInLine)
                        ) {
                          const coupClear = $("#coup").val().match(/\S/gi).join("");
                          api
                            .coupon({
                              code: coupClear.toLowerCase(),
                            })
                            .then((d) => {
                              if (d.status === 200) {
                                if (
                                  d.data.usage_limit === null &&
                                  this.state.email !== "" &&
                                  d.data.used_by.includes(this.state.email.toLowerCase())
                                ) {
                                  $(".cart-page__promo").find(".alert-message").removeClass("alert-message_warning");
                                  $(".cart-page__promo").find(".alert-message").addClass("alert-message_error");
                                  $(".cart-page__promo").find(".alert-message").find("p").text("Вы уже использовали данный промокод");
                                  $(".cart-page__promo").find(".alert-message").addClass("alert-message_active");
                                } else {
                                  const newCoupsCont = this.state.coupsCont;

                                  newCoupsCont[d.data.code] = {
                                    count: d.data.amount,
                                    type: d.data.discount_type,
                                    code: d.data.code,
                                    id: d.data.id,
                                    use: d.data.used_by,
                                    limit: d.data.usage_limit,
                                  };

                                  localStorage.setItem("coupsCont", newCoupsCont);
                                  $("#coup").val("");
                                  // this.props.store.createOrderData(this.state.payment)
                                  this.setState({
                                    coupsCont: newCoupsCont,
                                  });
                                }
                              } else {
                                $(".cart-page__promo").find(".alert-message").removeClass("alert-message_warning");
                                $(".cart-page__promo").find(".alert-message").addClass("alert-message_error");
                                $(".cart-page__promo").find(".alert-message").find("p").text(d.message);
                                $(".cart-page__promo").find(".alert-message").addClass("alert-message_active");
                              }
                            });
                        } else {
                          if ($("#coup").val() === "") {
                            $(".cart-page__promo").addClass("deactive");
                            setTimeout(() => {
                              $(".cart-page__promo").removeClass("deactive");
                            }, 4000);
                          } else {
                            // console.log("object :>> ");
                            $(".cart-page__promo").find(".alert-message").removeClass("alert-message_error");
                            $(".cart-page__promo").find(".alert-message").addClass("alert-message_warning");
                            $(".cart-page__promo").find(".alert-message").find("p").text("Промокод уже использован");
                            $(".cart-page__promo").find(".alert-message").addClass("alert-message_active");
                          }
                        }
                      }}
                    >
                      Активировать
                    </button>
                    <div className="alert-message alert-message_error">
                      <p>Промокода не существует</p>
                      <button
                        className="ic i_close"
                        onClick={(e) => {
                          $(e.target).parent().removeClass("alert-message_active");
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    runLoadDelivCost = () => {
      if (Object.keys(this.props.store.productInCart).length !== 0) {
        this.choosePaymentType(undefined, "PREPAID");
      } else {
        setTimeout(() => {
          this.runLoadDelivCost();
        }, 1000);
      }
    };

    componentDidMount() {
      try {
      } catch {}

      setInterval(() => {
        window.location.reload();
      }, 1000 * 60 * 60 * 24);
      const tel = new Inputmask({
        mask: "+7 (999) 999 99 99",
        showMaskOnHover: false,
        // isComplete: function()
      });

      tel.mask($("#phone"));

      if (localStorage.getItem("orderID") !== null) {
        this.startCancelPay(localStorage.getItem("orderID"));
      } else {
        // console.log("k");
        const coupsCont = localStorage.getItem("coupsCont");
        // console.log("coupsCont :>> ", coupsCont);

        if (coupsCont !== undefined && coupsCont !== null && coupsCont !== "undefined") {
          Object.keys(coupsCont).forEach((coup) => {
            api.coupon({ code: coup.toLowerCase() }).then((d) => {
              if (d.status === 400) {
                const newCoupsCont = this.state.coupsCont;

                delete newCoupsCont[coup];

                localStorage.setItem("coupsCont", newCoupsCont);

                this.setState({
                  coupsCont: newCoupsCont,
                });
              }
            });
          });
        }
      }

      this.runLoadDelivCost();
    }
  }
);

export default withRouter(CartPage);
