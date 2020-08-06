import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import api from "./api";
import { Formik } from "formik";
import RegistrationSchema from "../schemas/registrationSchema";
import { withRouter } from "react-router";

const { Component } = React;

const Finish = observer(
  class Finish extends Component {
    state = {
      ready: false,
      data: {},
      stopMess: "",
      err: false,
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
          <div className="cart-page col-12">
            <div className="container">
              <div className="row">
                <div className="col col-7 col-s-12">
                  <h3>Заказ №{data.dbid} принят</h3>
                  <p>
                    Мы начали обрабатывать Ваш заказ.
                    <br />
                    Скоро с Вами свяжется менеджер для подтверждения.
                  </p>
                  {!this.props.store.auth ? (
                    <>
                      <p>
                        <button
                          className="link dotted"
                          onClick={() => {
                            document
                              .querySelector(".sidebar-overlay")
                              .classList.add("active");

                            document
                              .querySelector("body")
                              .classList.add("no-scroll");

                            this.props.store.sideLogin = true;
                          }}
                        >
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
                        {/* <form className="profile-p__card-login">
                      <div className="input-field">
                        <label className="required active" htmlFor="email">
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
                    </form> */}
                        <Formik
                          //инициализируем значения input-ов
                          initialValues={{
                            email: data.user,

                            password: "",

                            acceptedTerms: true,
                          }}
                          //подключаем схему валидации, которую описали выше
                          validationSchema={RegistrationSchema}
                          //определяем, что будет происходить при вызове onsubmit
                          onSubmit={(values, { setSubmitting }) => {
                            api
                              .regist({
                                name: data.name.split(" ")[0],
                                email: values.email.toLowerCase(),
                                password: values.password,
                              })
                              .then((ok) => {
                                if (ok.status === 201) {
                                  this.props.history.push("/profile");
                                } else if (ok.status === 400) {
                                  this.setState({
                                    stopMess: ok.message,
                                    err: true,
                                  });
                                  setTimeout(() => {
                                    this.setState({ err: false });
                                  }, 3000);
                                }
                              })
                              .catch((err) => {
                                console.log("err2 :>> ", err);
                              });
                          }}
                          //свойство, где описывыем нашу форму
                          //errors-ошибки валидации формы
                          //touched-поля формы, которые мы "затронули",
                          //то есть, в которых что-то ввели
                        >
                          {({
                            errors,
                            touched,
                            handleSubmit,
                            isSubmitting,
                            values,
                            handleChange,
                          }) => (
                            <form
                              className="profile-p__card-login"
                              onSubmit={handleSubmit}
                            >
                              <div className="input-field">
                                <label
                                  className="required active"
                                  htmlFor="email"
                                >
                                  E-mail
                                </label>
                                <input
                                  id="email"
                                  name="email"
                                  type="text"
                                  onFocus={this.focusHandler}
                                  onBlur={this.blurHandler}
                                  value={values.email}
                                  onChange={handleChange}
                                />
                                <div className="field-error">
                                  {this.state.err
                                    ? this.state.stopMess
                                    : errors.email}
                                </div>
                              </div>

                              <div className="input-field">
                                <label className="required" htmlFor="password">
                                  Пароль
                                </label>
                                <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  onFocus={this.focusHandler}
                                  onBlur={this.blurHandler}
                                  value={values.password}
                                  onChange={handleChange}
                                />
                                <div className="field-error">
                                  {errors.password}
                                </div>
                              </div>

                              <button className="btn btn_primary" type="submit">
                                Регистрация
                              </button>
                              <label className="checkbox checkbox_margin">
                                <input
                                  type="checkbox"
                                  name="acceptedTerms"
                                  id=""
                                  value={values.acceptedTerms}
                                  onChange={handleChange}
                                  checked={values.acceptedTerms}
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
                          )}
                        </Formik>
                      </div>
                    </>
                  ) : (
                    <button
                      className="btn btn_primary"
                      onClick={() => {
                        this.props.history.push("/profile");
                      }}
                    >
                      <span className="ic i_user"></span>В личный кабинет
                    </button>
                  )}
                </div>
                <div className="col col-1"></div>
                <div className="col col-4 col-s-12">
                  <div className="order">
                    <h4 className="a_dark">Ваш заказ</h4>
                    <div className="orders-item__products">
                      {products}
                      {(!data.delivery.pickUpChoose ||
                        data.delivery.pickUpChoose === undefined) && (
                        <div className="item">
                          <span className="name">Доставка</span>
                          <span className="price">
                            {data.delivery.deliveryOption === undefined
                              ? data.delivery.cost.deliveryForCustomer.toLocaleString()
                              : data.delivery.deliveryForCustomer.toLocaleString()}
                            ₽{/* / <span className="b_gray">3-4 дня</span> */}
                          </span>
                        </div>
                      )}

                      <div className="item">
                        <b className="name">Итого</b>
                        <b className="price">
                          {(data.delivery.deliveryForCustomer !== undefined ||
                          data.delivery.deliveryOption === undefined
                            ? data.delivery.deliveryOption === undefined
                              ? data.sum +
                                data.delivery.cost.deliveryForCustomer
                              : data.sum + data.delivery.deliveryForCustomer
                            : data.sum
                          ).toLocaleString()}
                          ₽
                        </b>
                      </div>
                    </div>
                  </div>

                  <h4 className="a_dark">Ваши данные</h4>
                  <div className="profile-p__card profile-p__card_no-wrp">
                    <div className="user__name">{data.name} </div>
                    <div className="user__contact">
                      {data.tel !== undefined && (
                        <div className="user__phone">{data.tel}</div>
                      )}
                      <div className="user__mail">{data.user}</div>
                    </div>
                    <div className="user__address">
                      {data.delivery.pickUpChoose === true
                        ? `Магазин:${data.delivery.store}, 
                        по адресу: ${data.delivery.address.locality}`
                        : data.delivery.deliveryType === "PICKUP"
                        ? `Адрес выдачи: ${data.delivery.pickupPoint.address.addressString}`
                        : `г. ${data.delivery.address.locality}, ${data.delivery.address.street}, д. ${data.delivery.address.house}, кв. ${data.delivery.address.apartment}`}
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

export default withRouter(Finish);
