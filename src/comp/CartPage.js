import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
const { Component } = React;

//TODO: исправить вывод стоимости во время скидки
const CartPage = observer(
  class CartPage extends Component {
    state = {};

    deteleProduct = (i) => {
      console.log("work?");
      this.props.store.productInCart = this.props.store.productInCart.splice(
        i,
        1
      );
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

    // componentDidUpdate() {
    //   $(".city__btn").off("click", this.toggleCity);
    //   $(".city__btn").on("click", this.toggleCity);
    // };

    render() {
      const { productInCart } = this.props.store;

      const productList = [];
      let totalPrice = 0;
      console.log("object123123 :>> ", productInCart);
      Object.keys(productInCart).forEach((el) => {
        productList.push(
          <div className="product product_h" key={el}>
            <div className="product__image">
              <div className="product__image-wrp">
                <img src="/image/Category/Product-card/Placeholder.png" />
              </div>
            </div>
            <div className="product__info">
              <Link className="product__name" to={"/product/" + el}>
                {productInCart[el].name}
              </Link>
              {productInCart[el].sale ? (
                <div className={"product__price product__price_disc"}>
                  <span className="old">
                    {productInCart[el].regular_price} ₽
                  </span>{" "}
                  {productInCart[el].sale_price.toLocaleString()} ₽{" "}
                  <span className="disc_perc">
                    -
                    {(
                      (productInCart[el].regular_price /
                        productInCart[el].sale_price -
                        1) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              ) : (
                <div className={"product__price"}>
                  {productInCart[el].regular_price.toLocaleString()} ₽{" "}
                </div>
              )}
              <button className="ic i_close"></button>
              <div className="product__counter">
                <button className="ic i_minus"></button>
                <input
                  min="1"
                  max="100"
                  type="number"
                  value={productInCart[el].countInCart}
                />
                <button className="ic i_plus"></button>
              </div>
            </div>
          </div>

          // <div className="product-list" key={i}>
          //   <p className="product-list__name">{el.name}</p>
          //   <p className="product-list__price">
          //     {el.regular_price.toLocaleString() + " руб."}
          //   </p>
          //   <p className="product-list__price">{el.countInCart}</p>
          //   <p
          //     className="product-list__delete"
          //     onClick={() => {
          //       this.deteleProduct(i);
          //     }}
          //   >
          //     Удалить
          //   </p>
          // </div>
        );

        totalPrice +=
          productInCart[el].countInCart * productInCart[el].regular_price;
      });

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
              <div className="col col-7">
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
                          }}
                        >
                          Москва <span className="ic i_drop"></span>
                        </button>
                        <form className="city__drop header__drop header__drop_city">
                          <div className="input-field">
                            <label className="active" htmlFor="citySearch">
                              Ваш город
                            </label>
                            <input
                              id="citySearch"
                              value="Ка"
                              placeholder="Поиск"
                              type="text"
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
                          <ul>
                            <li>
                              <button type="submit">Казань</button>
                            </li>
                            <li>
                              <button type="submit">Калининград</button>
                            </li>
                            <li>
                              <button type="submit">Кабанск</button>
                            </li>
                          </ul>
                        </form>
                      </span>
                    </h5>
                    <div className="cart-page__delivery-details">
                      <div className="row">
                        <div className="items col col-12">
                          <div className="item">
                            <h5>Тип доставки:</h5>
                            <span>Курьером</span>
                          </div>

                          <div className="item">
                            <h5>Служба доставки:</h5>
                            <span>
                              СДЭК (250 ₽/ <span className="b_gray">3 дня</span>
                              )
                            </span>
                          </div>

                          <div className="item">
                            <h5>Адрес выдачи:</h5>
                            <span>
                              443063, Самарская обл., Самара, ул. Вольская, д.
                              71/42, кв. 1 этаж
                            </span>
                          </div>
                        </div>
                      </div>
                      <form className="row" action="">
                        <div className="col col-8">
                          <div className="input-field">
                            <label className="required" htmlFor="address">
                              Адрес
                            </label>
                            <input
                              id="address"
                              type="text"
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
                            />
                          </div>
                        </div>

                        <div className="col col-2">
                          <div className="input-field">
                            <label className="required" htmlFor="flat">
                              Кв/Офис
                            </label>
                            <input
                              id="flat"
                              type="text"
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
                            />
                          </div>
                        </div>

                        <div className="col col-2">
                          <div className="input-field">
                            <label className="required" htmlFor="porch">
                              Подъезд
                            </label>
                            <input
                              id="porch"
                              type="text"
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
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </h3>

                  <div className="btn btn_primary">Выбрать доставку</div>
                  <div className="btn">Изменить способ доставки</div>
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
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col col-1"></div>
              <div className="col col-4 ">
                <div className="cart-page__result-stick">
                  <div className="cart-page__result">
                    <ul>
                      <li>
                        <div>
                          <span>Итого</span> <span>{totalPrice} ₽</span>
                        </div>
                        <div>
                          <span>Стоимость товаров</span>{" "}
                          <span>{totalPrice} ₽</span>
                        </div>
                        <div>
                          <span>Скидка</span>{" "}
                          <span className="red">{totalPrice} ₽</span>
                        </div>
                        <div>
                          <span>Доставка</span>{" "}
                          <span>
                            250 ₽ / <span className="b_gray"> 3 дня</span>
                          </span>
                        </div>
                      </li>
                    </ul>

                    <div className="cart-page__result-address">
                      г. Москва, Большая Андроньевская 23, 24, подъезд 1
                    </div>

                    <button className="btn btn_yellow">Зaказать</button>
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

    componentDidMount() {
      const { productInCart } = this.props.store;
      const items = [];
      let sum = 0;
      Object.keys(productInCart).forEach((el, i) => {
        sum += productInCart[el].regular_price * productInCart[el].countInCart;
        items.push({
          externalId: `${productInCart[el].slug}`,
          name: productInCart[el].name,
          count: productInCart[el].countInCart,
          price: productInCart[el].regular_price,
          assessedValue: productInCart[el].regular_price,
          tax: "NO_VAT",
          dimensions: {
            weight: productInCart[el].weight,
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
      YaDeliveryFunc(window, cart, order);
    }
  }
);

function YaDeliveryFunc(w, cart, order) {
  function start() {
    w.removeEventListener("YaDeliveryLoad", start);
    console.log("object", document.getElementById("yaDeliveryWidget"));

    // Создание виджета
    w.YaDelivery.createWidget({
      // Обязательные параметры
      containerId: "yaDeliveryWidget", // Идентификатор HTML-элемента (контейнера),
      // в котором будет отображаться виджет
      type: "deliveryCart", // Тип виджета - всегда deliveryCart
      onlyDeliveryTypes: ["pickup"],
      deliveryType: "PICKUP",
      params: {
        // Обязательные параметры
        apiKey: "f16336a6-8d98-4f0e-b07f-3969b2384006", // Авторизационный ключ
        senderId: 500001936, // Идентификатор магазина
        deliveryType: "PICKUP",
      },
    })
      // Функция createWidget возвращает объект типа Promise. С ним можно
      // продолжить работу с помощью функций-коллбэков, передаваемых в аргументах
      // методов then (при успешном создании виджета) и catch (для обработки ошибок).
      .then(successCallback)
      .catch(failureCallback);

    function successCallback(widget) {
      // После инициализации виджета автоматически определяется регион пользователя.
      // Перед отображением виджета этот регион можно получить методом getRegion...
      var regionName;
      widget.getRegion().then(({ name }) =>
        widget.getRegionsByName(name).then((regions) => {
          widget.setRegion({ id: regions[0].id });
        })
      );
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
      });

      // Когда пользователь отправит форму выбора условий доставки, нужно сохранить
      // их в куки с помощью метода setOrderInfo, чтобы после оформления заказа вы могли
      // отправить их в Доставку. В аргументе метода нужно передать объект с информацией
      // о заказе. Подробнее об объекте order.
      // const form = document.getElementById("checkout");
      // form.addEventListener("submit", () => widget.setOrderInfo(order));
    }

    function failureCallback(error) {
      // Эта функция будет вызвана, если при создании виджета произошли ошибки.
      console.log("error", error);
    }
  }
  w.YaDelivery ? start() : w.addEventListener("YaDeliveryLoad", start);
}

export default withRouter(CartPage);
