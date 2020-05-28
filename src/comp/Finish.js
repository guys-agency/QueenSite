import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";

const { Component } = React;

const Finish = observer(
  class Finish extends Component {
    state = {};
    focusHandler = (e) => {
      $(e.target).parent().find("label").addClass("active");
    };

    blurHandler = (e) => {
      if (e.target.value === "") {
        $(e.target).parent().find("label").removeClass("active");
      }
    };
    render() {
      return (
        <div className="cart-page">
          <div className="container">
            <div className="row">
              <div className="col col-7">
                <h3>Заказ №210 принят</h3>
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
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        id=""
                      />
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
                    <div className="item">
                      <span className="name">
                        Блюдо овальное 32 см Луиза, Роза вензель, кобальт
                      </span>
                      <span className="price">152 ₽</span>
                    </div>
                    <div className="item">
                      <span className="name">
                        Блюдо овальное 32 см Луиза, Роза вензель, кобальт
                      </span>
                      <span className="price">152 ₽</span>
                    </div>
                    <div className="item">
                      <span className="name">Доставка</span>
                      <span className="price">
                        230₽ / <span className="b_gray">3-4 дня</span>
                      </span>
                    </div>

                    <div className="item">
                      <b className="name">Итого</b>
                      <b className="price">230₽</b>
                    </div>
                  </div>
                </div>
                <h4 className="a_dark">Ваши данные</h4>
                <div className="profile-p__card profile-p__card_no-wrp">
                  <div className="user__name">Данил Леонов</div>
                  <div className="user__contact">
                    <div className="user__phone">+7 995 299-22-23</div>
                    <div className="user__mail">d@guys.agency</div>
                  </div>
                  <div className="user__address">
                    г. Москва, Большая Андроньевская 23
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default Finish;
