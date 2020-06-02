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
const { Component } = React;

//TODO: исправить вывод стоимости во время скидки
const CartPage = observer(
  class CartPage extends Component {
    state = {
      cities: [],
      deliveryData: {},
      adress: "",
      flat: "",
      flatcoub: "",
      name: "",
      secondName: "",
      email: "",
      tel: "",
    };

    deliveryOrderData = {};
    deliverySend = {};

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
      }

      console.log("auth :>> ", this.props.store.auth);
      const {
        adress,
        flat,
        flatcoub,
        name,
        secondName,
        email,
        tel,
      } = this.state;

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
                              $(".sidebar-overlay").addClass('active');
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
                                  console.log(
                                    "e.target.value.length :>> ",
                                    e.target.value.length
                                  );
                                  const rigthCities = [];
                                  cities.some((el) => {
                                    if (rigthCities.length < 3) {
                                      if (
                                        el
                                          .toLowerCase()
                                          .indexOf(
                                            e.target.value.toLowerCase()
                                          ) !== -1
                                      ) {
                                        rigthCities.push(el);
                                      }
                                      return false;
                                    } else {
                                      return true;
                                    }
                                  });
                                  const renderCities = [];
                                  for (let index = 0; index < 3; index++) {
                                    console.log("object :>> ", rigthCities);
                                    renderCities.push(
                                      <li>
                                        <button
                                          type="submit"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            localStorage.set("city", {
                                              name: rigthCities[index],
                                              sourse: "U",
                                            });
                                          }}
                                        >
                                          {rigthCities[index]}
                                        </button>
                                      </li>
                                    );
                                  }
                                  this.setState({ cities: renderCities });
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
                              {
                                deliveryData.deliveryOption.cost
                                  .deliveryForCustomer
                              }{" "}
                              ₽/{" "}
                              <span className="b_gray">
                                {deliveryData.time} дня
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
                                Адрес
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
                                Кв/Офис
                              </label>
                              <input
                                id="flat"
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

                          <div className="col col-3 col-s-6">
                            <div className="input-field">
                              <label className="required" htmlFor="porch">
                                Подъезд
                              </label>
                              <input
                                id="porch"
                                type="text"
                                value={flatcoub}
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
                                  this.setState({ flatcoub: e.target.value });
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
                  <p>Для получения потребуется паспорт с указанными данными</p>
                  <p>
                    <a className="link dotted">
                      <span className="ic i_user"></span>{" "}
                      <span className="fw_m b_dark">Войдите</span>
                    </a>{" "}
                    <span className="b_gray">
                      (данные подгрузятся автоматически)
                    </span>
                  </p>

                  <form className="cart-page__data-form row" action="">
                    <div className="col col-6">
                      <div className="input-field">
                        <label className="required" htmlFor="firstname">
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
                            this.setState({ name: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label className="required" htmlFor="lastname">
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
                            this.setState({ secondName: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label className="required" htmlFor="email">
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
                            this.setState({ email: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col col-6">
                      <div className="input-field">
                        <label className="required" htmlFor="phone">
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
                            {totalSale.toLocaleString()} ₽
                          </span>
                        </div>
                        {Object.keys(deliveryData).length !== 0 && (
                          <div>
                            <span>Доставка</span>{" "}
                            <span>
                              {
                                deliveryData.deliveryOption.cost
                                  .deliveryForCustomer
                              }{" "}
                              ₽ /{" "}
                              <span className="b_gray">
                                {" "}
                                {deliveryData.time} дня
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
                      onClick={() => {
                        //NEN
                        console.log("productInCart", productInCart);
                        const senderId = "500001936";

                        const recipient = {
                          firstName: name,
                          middleName: "{string}",
                          lastName: secondName,
                          email: email,
                          address: {
                            // "geoId": {int},
                            country: "Россия",
                            region: "Татарстан",
                            locality: "Казань",
                            street: "Волкова",
                            house: "2",
                            // "housing": "{string}",
                            // "building": "{string}",
                            apartment: "5",
                          },
                          // "pickupPointId": {int}
                        };
                        const contacts = [
                          {
                            type: "CONTACT",
                            phone: String(tel),
                            // "additional": "{string}",
                            firstName: name,
                            // "middleName": "{string}",
                            lastName: secondName,
                          },
                        ];
                        const deliveryOrderData = Object.assign(
                          { ...this.deliveryOrderData.deliveryOption.cost },
                          this.deliveryOrderData
                        );
                        deliveryOrderData.deliveryOption.partnerId = this.deliveryOrderData.deliveryOption.partner;
                        deliveryOrderData.deliveryOption.delivery = this.deliveryOrderData.deliveryOption.cost.delivery;

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
                            dataToSend[el].sale_price =
                              productInCart[el].sale_price;
                          }
                        });

                        dataToSend.sum = totalPrice;
                        dataToSend.email = this.state.email;

                        console.log("delivery :>> ", dataToSend);

                        api
                          .setOrderData({
                            delivery,
                            dataToSend,
                          })
                          .then((data) => {
                            console.log("data :>> ", data);
                          })
                          .catch((err) => {
                            console.log("err :>> ", err);
                          });
                      }}
                    >
                      Зaказать
                    </button>
                  </div>
                  <div className="cart-page__promo">
                    <input
                      className="def"
                      placeholder="Сертификат"
                      type="text"
                    />{" "}
                    <button>Активировать</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    componentDidMount() {}

    startYaDeliv = (fullPrice, array) => {
      const { productInCart, city } = this.props.store;
      console.log(
        "productInCart :>> ",
        productInCart[Object.keys(productInCart)[2]]
      );
      console.log(
        "Object.keys(productInCart) :>> ",
        Object.keys(productInCart)
      );
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
          fromWarehouseId: 10001563755,
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

          widget.getRegionsByName(city).then((regions) => {
            widget.setRegion({ id: regions[0].id });
          });

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
            console.log("deliveryOption", deliveryOption);
            const time =
              deliveryOption.deliveryOption.calculatedDeliveryDateMax ==
              deliveryOption.deliveryOption.calculatedDeliveryDateMin
                ? moment(
                    deliveryOption.deliveryOption.calculatedDeliveryDateMax
                  ).diff(moment(), "days")
                : moment(
                    deliveryOption.deliveryOption.calculatedDeliveryDateMin
                  ).diff(moment(), "days") +
                  "-" +
                  moment(
                    deliveryOption.deliveryOption.calculatedDeliveryDateMax
                  ).diff(moment(), "days");

            this.deliveryOrderData = deliveryOption;
            this.setState({ deliveryData: { ...deliveryOption, time } });
          });

          // Когда пользователь отправит форму выбора условий доставки, нужно сохранить
          // их в куки с помощью метода setOrderInfo, чтобы после оформления заказа вы могли
          // отправить их в Доставку. В аргументе метода нужно передать объект с информацией
          // о заказе. Подробнее об объекте order.
          // const form = document.getElementById("checkout");
          // form.addEventListener("submit", () => widget.setOrderInfo(order));
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
