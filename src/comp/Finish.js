import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import api from "./api";
import { Formik } from "formik";
import RegistrationSchema from "../schemas/registrationSchema";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import localStorage from "mobx-localstorage";

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

    orderCancelID = "";

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
    render() {
      const { ready, data, startCheck } = this.state;
      const products = [];

      let checkPay = false;
      let rePaid = false;
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
        if (data.payment === "PREPAID" && this.statusToCheck.includes(data.status)) {
          checkPay = true;
          if (startCheck) {
            const timerToChekStatus = setTimeout(() => {
              api
                .getFinishData(this.props.id)
                .then((data) => {
                  console.log("11", 11);
                  this.setState({
                    data: data._doc,
                    ready: true,
                    startCheck: true,
                  });
                })
                .catch((err) => {
                  console.log("err :>> ", err);
                });
            }, 6000);
            this.setState({ startCheck: false });
          }
        } else if (data.payment === "PREPAID" && data.status === "Отменен") {
          checkPay = true;
          rePaid = true;
        }
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
          window.gtag("event", "conversion", { send_to: "AW-592840699/rK8kCN_c4P4BEPuP2JoC", transaction_id: data.dbid });
        }
      }

      return (
        ready && (
          <div className="cart-page col-12">
            <div className="container">
              <div className="sidebar-overlay" onClick={this.cancelPay}></div>
              <div className="sidebar sidebar-cart">
                <div className="sidebar__head">
                  <div className="btn" onClick={this.cancelPay}>
                    Отменить оплату
                  </div>
                </div>

                <div id="payment-form"></div>
              </div>
              <div className="cart_header">
                <a
                  className="btn"
                  onClick={() => {
                    if (this.props.history.length) {
                      window.history.back();
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
                ) : rePaid ? (
                  <div className="col col-7 col-s-12" style={{ marginBottom: "20px" }}>
                    <div
                      className="alert-message alert-message_error alert-message_active"
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        marginBottom: "25px",
                      }}
                    >
                      <p>Оплата за заказ №{data.dbid} не удалась.</p>
                    </div>
                    <p>
                      Не удалось оплатить заказа, попробуйте проверить введеные данные карты и повторить попытку.
                      <br />
                      <br /> При повторной ошбике свяжитесь с нами по телефону: 8 800 600-34-21
                    </p>
                    <button
                      className="btn btn_yellow "
                      style={{ width: "100%", marginTop: "10px" }}
                      onClick={() => {
                        api
                          .getRepaid(this.props.id)
                          .then((data) => {
                            this.orderCancelID = this.props.id;
                            const that = this;
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
                          })
                          .catch((err) => {
                            console.log("err :>> ", err);
                          });
                      }}
                    >
                      Оплатить{" "}
                    </button>
                  </div>
                ) : (
                  <div className="col col-7 col-s-12">
                    <h3>Заказ №{data.dbid} ожидает оплаты</h3>
                    <p>Ваш заказ ожидает оплаты.</p>
                    <div className="loader-page__loader" style={{ margin: "35px 0px" }}>
                      <div className="percent">
                        <svg className="circle">
                          {/* <circle transform="rotate(-90)" r="30" cx="-37" cy="37" /> */}
                          <circle
                            // transform="rotate(0)"
                            // style={{ "stroke-dasharray": "440" }}
                            r="37"
                            cx="37"
                            cy="37"
                          />
                          <circle
                            // transform="rotate(90)"
                            style={{
                              "stroke-dashoffset": 232 - (232 * 60) / 100,
                            }}
                            r="37"
                            cx="37"
                            cy="37"
                          />
                        </svg>
                        <div className="number">
                          <div className="logo logo_vl">
                            <span className="i_qd" style={{ fontSize: "40px" }}></span>
                          </div>
                        </div>
                        <div className="shadow"></div>
                      </div>
                      {/* <div className="pie spinner"></div> */}
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
                        по адресу: ${data.delivery.address.addressReduce}`
                          : data.delivery.pvz !== undefined
                          ? `Адрес выдачи: ${data.delivery.addressReduce}`
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
