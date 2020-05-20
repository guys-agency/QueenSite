import { observer } from "mobx-react";
import React from "react";
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

    closeCart = () => {
      this.props.store.cartPage = false;
    };

    render() {
      const { store } = this.props;

      const productList = [];
      let totalPrice = 0;

      store.productInCart.forEach((el, i) => {
        productList.push(
          <div className="product-list" key={i}>
            <p className="product-list__name">{el.name}</p>
            <p className="product-list__price">
              {el.regular_price.toLocaleString() + " руб."}
            </p>
            <p className="product-list__price">{el.countInCart}</p>
            <p
              className="product-list__delete"
              onClick={() => {
                this.deteleProduct(i);
              }}
            >
              Удалить
            </p>
          </div>
        );
        totalPrice += el.countInCart * el.regular_price;
      });

      return (
        <div className="cart-page">
          <h3 className="cart-page__title">Оформление заказа</h3>
          <p>
            <Link to="/catalog">Закрыть</Link>
          </p>
          <div className="cart-page__container">
            <div className="cart-page__table">{productList}</div>
            <div className="cart-page__result">
              <p>Итого</p>
              <p>{totalPrice}</p>
            </div>
            <button className="yaaaas">ЗАказать</button>
          </div>
          <div className="delivery-block">
            <h4>Доставка</h4>
            <div className="Ya-block" id="yaDeliveryWidget"></div>
          </div>
        </div>
      );
    }

    componentDidMount() {
      const { store } = this.props;
      const items = [];
      let sum = 0;
      store.productInCart.forEach((el, i) => {
        sum += el.regular_price * el.countInCart;
        items.push({
          externalId: `${el.slug}`,
          name: el.name,
          count: el.countInCart,
          price: el.regular_price,
          assessedValue: el.regular_price,
          tax: "NO_VAT",
          dimensions: {
            weight: el.weight,
            length: parseInt(el.dimensions.length, 10),
            width: parseInt(el.dimensions.width, 10),
            height: parseInt(el.dimensions.height, 10),
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

export default CartPage;
