import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import api from "./api";
import { Formik } from "formik";
import RegistrationSchema from "../schemas/registrationSchema";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const { Component } = React;

const Finish = observer(
  class Finish extends Component {
    state = {
      ready: false,
      data: {},
      stopMess: "",
      err: false,
      startCheck: true,
    };

    statusToCheck = ["Created", "Ожидает оплаты", "Создан"];

    firstView =
      (localStorage.getItem("deleteCart") === true || localStorage.getItem("deleteCart") === "true") && process.env.REACT_APP_TYPE === "prod";

    copy = (str) => {
      let tmp = document.createElement("INPUT"), // Создаём новый текстовой input
        focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

      tmp.value = str; // Временному input вставляем текст для копирования

      document.body.appendChild(tmp); // Вставляем input в DOM
      tmp.select(); // Выделяем весь текст в input
      document.execCommand("copy"); // Магия! Копирует в буфер выделенный текст (см. команду выше)
      document.body.removeChild(tmp); // Удаляем временный input
      focus.focus(); // Возвращаем фокус туда, где был
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
      const { ready, data, startCheck } = this.state;
      const products = [];

      let checkPay = false;
      if (!ready) {
        api
          .getFinishData(this.props.id)
          .then((data) => {
            // console.log("22 :>> ", 22);
            if (Object.keys(data).length === 0) {
              this.props.history.replace("/");
            }
            this.setState({ data: data._doc, ready: true });
          })
          .catch((err) => {
            console.log("err :>> ", err);
            this.props.history.replace("/");
          });
      } else {
        // if (
        //   data.payment === "PREPAID" &&
        //   this.statusToCheck.includes(data.status)
        // ) {
        //   checkPay = true;
        //   // if (startCheck) {
        //   //   const timerToChekStatus = setTimeout(() => {
        //   //     api
        //   //       .getFinishData(this.props.id)
        //   //       .then((data) => {
        //   //         console.log("11", 11);
        //   //         this.setState({
        //   //           data: data._doc,
        //   //           ready: true,
        //   //           startCheck: true,
        //   //         });
        //   //       })
        //   //       .catch((err) => {
        //   //         console.log("err :>> ", err);
        //   //       });
        //   //   }, 6000);
        //   //   this.setState({ startCheck: false });
        //   // }
        // }
        const purchaseTarget = {
          type: "itemView",
          productid: [],
          pagetype: "purchase",
          totalvalue: String(data.sum),
          list: "1",
        };
        Object.keys(data.products).forEach((prod) => {
          products.push(
            <div className="item">
              <span className="name">{data.products[prod].name}</span>
              <span className="price">
                {data.products[prod].sale ? data.products[prod].sale_price.toLocaleString() : data.products[prod].regular_price.toLocaleString()} ₽
              </span>
            </div>
          );
          if (this.firstView) {
            purchaseTarget.productid.push(String(prod));
          }
        });
        if (this.firstView) {
          window._tmr.push(purchaseTarget);
        }
      }

      return (
        ready && (
          <div className="cart-page col-12">
            <div className="container">
              <div className="row">
                {!checkPay ? (
                  <div className="col col-7 col-s-12">
                    <h3>Заказ №{data.dbid} принят</h3>
                    <p>
                      Мы начали обрабатывать Ваш заказ.
                      <br />
                      Скоро с Вами свяжется менеджер для подтверждения.
                    </p>
                    {data.certificate !== undefined && (
                      <div className="profile-p__card cert">
                        <p>
                          <b>Cсылка на подарочный сертификат:</b>
                          <br />
                        </p>
                        <p className="gift-link">https://queenbohemia.ru/gift/{data.certificate}</p>
                        <button
                          className="btn btn_primary"
                          id="gift-copy"
                          onClick={() => {
                            try {
                              this.copy(`https://queenbohemia.ru/gift/${data.certificate}`);
                              $("#gift-copy").css("border", "1px solid lightgreen");
                              setTimeout(() => {
                                $("#gift-copy").css("border", "");
                              }, 3000);
                            } catch {
                              $("#gift-copy").css("border", "1px solid rgb(235, 87, 87)");
                              setTimeout(() => {
                                $("#gift-copy").css("border", "");
                              }, 3000);
                            }
                          }}
                        >
                          Скопировать
                        </button>
                      </div>
                    )}
                    {!this.props.store.auth ? (
                      <>
                        <p>
                          <button
                            className="link dotted"
                            onClick={() => {
                              document.querySelector(".sidebar-overlay").classList.add("active");

                              document.querySelector("body").classList.add("no-scroll");

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
                            Копите бонусы и отслеживайте заказы в личном кабинете, осталось только придумать пароль:
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
                            {({ errors, touched, handleSubmit, isSubmitting, values, handleChange }) => (
                              <form className="profile-p__card-login" onSubmit={handleSubmit}>
                                <div className="input-field">
                                  <label className="required active" htmlFor="email">
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
                                  <div className="field-error">{this.state.err ? this.state.stopMess : errors.email}</div>
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
                                  <div className="field-error">{errors.password}</div>
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
                      <Link className="btn btn_primary" to="/profile">
                        <span className="ic i_user"></span>В личный кабинет
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="col col-7 col-s-12">
                    <h3>Заказ №{data.dbid} ожидает оплаты</h3>
                    <p>Происходит проверка оплаты, не покидайте страницу</p>
                    <div className="profile-p__loading">
                      <span className="i_line-h loading"></span>
                    </div>
                  </div>
                )}
                <div className="col col-1"></div>
                <div className="col col-4 col-s-12">
                  <div className="order">
                    <h4 className="a_dark">Ваш заказ</h4>
                    <div className="orders-item__products">
                      {products}
                      {(!data.delivery.pickUpChoose || data.delivery.pickUpChoose === undefined) &&
                        (data.certInCart && Object.keys(data.products).length === 1 ? null : (
                          <div className="item">
                            <span className="name">Доставка</span>
                            <span className="price">
                              {data.delivery.price.toLocaleString()}₽
                              {data.delivery.type === "express" ? (
                                <span className="b_gray">
                                  / {data.delivery.time === 0 ? "Сегодня" : data.delivery.time === 1 ? "Завтра" : "Послезавтра"}
                                </span>
                              ) : null}
                            </span>
                          </div>
                        ))}

                      <div className="item">
                        <b className="name">Итого</b>
                        <b className="price">
                          {((data.certInCart && Object.keys(data.products).length === 1) || data.delivery.pickUpChoose
                            ? data.sum
                            : data.sum + +data.delivery.price
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
                      {data.tel !== undefined && <div className="user__phone">{data.tel}</div>}
                      <div className="user__mail">{data.user}</div>
                    </div>
                    {data.certInCart && Object.keys(data.products).length === 1 ? null : (
                      <div className="user__address">
                        {data.delivery.pickUpChoose === true
                          ? `Магазин:${data.delivery.store}, 
                        по адресу: ${data.delivery.address.locality}`
                          : data.delivery.pvz !== undefined
                          ? `Адрес выдачи: ${data.delivery.address}`
                          : `г. ${data.delivery.address.locality}, ${data.delivery.address.street}, д. ${data.delivery.address.house}, кв. ${data.delivery.address.apartment}`}
                      </div>
                    )}
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
