import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import api from "./api";

const { Component } = React;

const Finish = observer(
  class Finish extends Component {
    state = {
      ready: false,
      data: {},
    };
    focusHandler = (e) => {
      $(e.target).parent().find("label").addClass("active");
    };

    blurHandler = (e) => {
      if (e.target.value === "") {
        $(e.target).parent().find("label").removeClass("active");
      }
    };
    render() {
      const { ready, data } = this.state;
      const products = [];
      if (!ready) {
        api
          .getFinishData(this.props.id)
          .then((data) => {
            this.setState({ data: data._doc, ready: true });
          })
          .catch((err) => {
            console.log("err :>> ", err);
          });
      } else {
        Object.keys(data.products).forEach((prod) => {
          products.push(
            <div className="item">
              <span className="name">{data.products[prod].name}</span>
              <span className="price">
                {data.products[prod].sale
                  ? data.products[prod].sale_price.toLocaleString()
                  : data.products[prod].regular_price.toLocaleString()}{" "}
                ₽
              </span>
            </div>
          );
        });
      }

      return (
        ready && (
          <div className="cart-page">
            <div className="container">
              <div className="row">
                <div className="col col-7">
                  <h3>Заказ №{data.dbid} принят</h3>
                  <p>
                    Мы начали обрабатывать Ваш заказ.
                    <br />
                    Скоро с Вами свяжется менеджер для подтверждения.
                  </p>
                  <p>
                    <button className="link dotted">
                      <span className="ic i_user"></span> Войдите
                    </button>
                    , чтобы отслеживать статус заказа
                  </p>
                  <div className="profile-p__card">
                    <p>
                      <b>Не зарегистрированы?</b>
                      <br />
                      Копите бонусы и отслеживайте заказы в личном кабинете,
                      осталось только придумать пароль:
                    </p>
                    <form className="profile-p__card-login">
                      <div className="input-field">
                        <label className="required" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          value={data.user}
                          onFocus={this.focusHandler}
                          onBlur={this.blurHandler}
                        />
                      </div>

                      <div className="input-field">
                        <label className="required" htmlFor="password">
                          Пароль
                        </label>
                        <input
                          name="password"
                          type="password"
                          id="password"
                          onFocus={this.focusHandler}
                          onBlur={this.blurHandler}
                        />
                      </div>
                      <button className="btn btn_primary">Регистрация</button>

                      <label className="checkbox checkbox_margin">
                        <input type="checkbox" name="acceptedTerms" id="" />
                        <span className="checkbox-btn"></span>
                        <i>
                          Согласен с условиями "
                          <a className="underline" href="">
                            Публичной оферты
                          </a>
                          "
                        </i>
                      </label>
                    </form>
                  </div>
                </div>
                <div className="col col-1"></div>
                <div className="col col-4">
                  <div className="order">
                    <h4 className="a_dark">Ваш заказ</h4>
                    <div className="orders-item__products">
                      {products}
                      <div className="item">
                        <span className="name">Доставка</span>
                        <span className="price">
                          {data.delivery.deliveryForCustomer.toLocaleString()}₽
                          / <span className="b_gray">3-4 дня</span>
                        </span>
                      </div>

                      <div className="item">
                        <b className="name">Итого</b>
                        <b className="price">{data.sum.toLocaleString()}₽</b>
                      </div>
                    </div>
                  </div>

                  <h4 className="a_dark">Ваши данные</h4>
                  <div className="profile-p__card profile-p__card_no-wrp">
                    <div className="user__name">
                      {data.delivery.contacts.firstName}{" "}
                      {data.delivery.contacts.lastName}
                    </div>
                    <div className="user__contact">
                      <div className="user__phone">
                        {data.delivery.contacts.phone}
                      </div>
                      <div className="user__mail">{data.user}</div>
                    </div>
                    <div className="user__address">
                      г. {data.delivery.recipient.address.locality},{" "}
                      {data.delivery.recipient.address.street}, д.{" "}
                      {data.delivery.recipient.address.house}, кв.{" "}
                      {data.delivery.recipient.address.apartment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
  }
);

export default Finish;
