import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { Formik } from "formik";
import RegistrationSchema from "../schemas/registrationSchema";
import $ from "jquery";
import LoginSchema from "../schemas/loginSchema";
import RestoreSchema from "../schemas/restoreSchema";

const { Component } = React;

const AuthSidebar = observer(
  class AuthSidebar extends Component {
    state = {
      reg: true,
      log: false,
      pass: false,
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
      return (
        <>
          <div className="tumbler">
            <button
              className={this.state.log || this.state.pass ? " active" : ""}
              onClick={() => {
                this.setState({ reg: false, pass: false, log: true });
              }}
            >
              Вход
            </button>
            <button
              className={this.state.reg ? " active" : ""}
              onClick={() => {
                this.setState({ reg: true, log: false, pass: false });
              }}
            >
              Регистрация
            </button>
          </div>

          {this.state.reg && (
            <div className="discond-fix_sidebar">
              <img src="/image/button/icon/gift.svg"></img>
              <p>
                <b>Скидка 10%</b> на первую покупку.
                <br /> Промокод придет на почту
              </p>
            </div>
          )}

          {this.state.log && (
            <Formik
              //инициализируем значения input-ов
              initialValues={{
                email: "",
                password: "",
              }}
              //подключаем схему валидации, которую описали выше
              validationSchema={LoginSchema}
              //определяем, что будет происходить при вызове onsubmit
              onSubmit={(values, { setSubmitting }) => {
                api
                  .login({
                    email: values.email.toLowerCase(),
                    password: values.password,
                  })
                  .then((data) => {
                    if (data.status === 400) {
                      $("#loginBtn").text(data.message);

                      $("#loginBtn").addClass("error");

                      setTimeout(() => {
                        $("#loginBtn").removeClass("error");
                        $("#loginBtn").text("Войти");
                      }, 3000);
                    } else {
                      this.props.store.auth = true;
                      const lc = this.props.store.likeContainer;
                      data.likeProducts.forEach((prod) => {
                        if (!this.props.store.likeContainer.includes(prod)) {
                          lc.push(prod);
                        }
                      });

                      this.props.store.likeContainer = lc;
                      // const localCartCont = Object.keys(this.props.store.productInCartList);
                      // const serverCartCont = Object.keys(data.inCart);

                      // const newCartCont = this.props.store.productInCartList

                      // newCartCont.forEach(prod=>{
                      //   if (!localCartCont.includes(prod)) {
                      //     newCartCont[prod]=data.inCart[prod]
                      //   }
                      // })

                      // this.props.store.productInCartList = newCartCont;
                      this.props.store.addToLike();
                      // this.props.store.addtoCart(true);
                      this.props.store.sideAsk = false;
                      this.props.store.sideLogin = false;
                      document
                        .querySelector(".sidebar-overlay")
                        .classList.remove("active");
                      $("body").removeClass("no-scroll");
                      $(".navigation").removeClass("visible");
                    }
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
                <>
                  <form className=" visible" onSubmit={handleSubmit}>
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
                        value={values.email}
                        onChange={handleChange}
                      />

                      <div className="field-error">{errors.email}</div>
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
                        value={values.password}
                        onChange={handleChange}
                      />
                      {errors.password && touched.password && (
                        <div className="field-error">{errors.password}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn_primary"
                      id="loginBtn"
                    >
                      Войти
                    </button>
                  </form>
                  <br />
                  <span
                    className="mla link dotted forgot-btn"
                    onClick={(e) => {
                      this.setState({ pass: true, log: false });
                    }}
                  >
                    Забыли пароль?
                  </span>
                </>
              )}
            </Formik>
          )}

          {this.state.pass && (
            <Formik
              //инициализируем значения input-ов
              initialValues={{
                email: "",
              }}
              //подключаем схему валидации, которую описали выше
              validationSchema={RestoreSchema}
              //определяем, что будет происходить при вызове onsubmit
              onSubmit={(values, { setSubmitting }) => {
                api
                  .restorePass({
                    email: values.email.toLowerCase(),
                  })
                  .then((data) => {
                    $("#restorePass").text(data.message);
                    if (data.status === 201) {
                      $("#restorePass").addClass("success");
                    } else {
                      $("#restorePass").addClass("error");
                    }
                    setTimeout(() => {
                      $("#restorePass").removeClass("success");
                      $("#restorePass").removeClass("error");
                      $("#restorePass").text("Восстановить пароль");
                    }, 3000);
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
                <>
                  <form className=" visible" action="" onSubmit={handleSubmit}>
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
                        value={values.email}
                        onChange={handleChange}
                      />

                      <div className="field-error">{errors.email}</div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn_primary"
                      id="restorePass"
                    >
                      Восстановить пароль
                    </button>
                  </form>
                  <br />
                  <span
                    className="mla link dotted forgot-btn"
                    onClick={(e) => {
                      this.setState({ pass: false, log: true });
                    }}
                  >
                    Вспомнили пароль?
                  </span>
                </>
              )}
            </Formik>
          )}
          {/* <form className={this.state.log ? " visible" : ""}>
                <div className="input-field">
                  <label className="required" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ login: e.target.value });
                    }}
                  />
                </div>

                <div className="input-field">
                  <label className="required" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    id="password"
                    type="password"
                    onFocus={(e) => {
                      $(e.target).parent().find("label").addClass("active");
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        $(e.target)
                          .parent()
                          .find("label")
                          .removeClass("active");
                      }
                    }}
                    onChange={(e) => {
                      this.setState({ login: e.target.value });
                    }}
                  />
                </div>

                <button
                  className="btn btn_primary"
                  onClick={(e) => {
                    e.preventDefault();
                    api.login({
                      email: this.state.login,

                      password: this.state.password,
                    });
                  }}
                >
                  Войти
                </button>
                <button className="link dotted forgot-btn">
                  Забыли пароль?
                </button>
              </form> */}
          {this.state.reg && (
            <Formik
              //инициализируем значения input-ов
              initialValues={{
                email: "",
                username: "",
                password: "",
                repassword: "",
                acceptedTerms: true,
              }}
              //подключаем схему валидации, которую описали выше
              validationSchema={RegistrationSchema}
              //определяем, что будет происходить при вызове onsubmit
              onSubmit={(values, { setSubmitting }) => {
                api
                  .regist({
                    name: values.username,
                    email: values.email.toLowerCase(),
                    password: values.password,
                  })
                  .then((ok) => {
                    $("#registrBtn").text(ok.message);
                    if (ok.status === 201) {
                      $("#registrBtn").addClass("success");
                      this.props.store.auth = true;
                      const lc = this.props.store.likeContainer;
                      ok.data.likeProducts.forEach((prod) => {
                        if (!this.props.store.likeContainer.includes(prod)) {
                          lc.push(prod);
                        }
                      });

                      this.props.store.likeContainer = lc;
                      // const localCartCont = Object.keys(this.props.store.productInCartList);
                      // const serverCartCont = Object.keys(data.inCart);

                      // const newCartCont = this.props.store.productInCartList

                      // newCartCont.forEach(prod=>{
                      //   if (!localCartCont.includes(prod)) {
                      //     newCartCont[prod]=data.inCart[prod]
                      //   }
                      // })

                      // this.props.store.productInCartList = newCartCont;
                      this.props.store.addToLike();
                      // this.props.store.addtoCart(true);
                      this.props.store.sideAsk = false;
                      this.props.store.sideLogin = false;
                      document
                        .querySelector(".sidebar-overlay")
                        .classList.remove("active");
                      $("body").removeClass("no-scroll");
                      $(".navigation").removeClass("visible");
                    } else {
                      $("#registrBtn").addClass("error");
                    }
                    setTimeout(() => {
                      $("#registrBtn").removeClass("success");
                      $("#registrBtn").removeClass("error");
                      $("#registrBtn").text("Регистрация");
                    }, 3000);
                  })
                  .catch((err) => {
                    console.log("err :>> ", err);
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
                <form className=" visible" onSubmit={handleSubmit}>
                  <div className="input-field">
                    <label className="required" htmlFor="name">
                      Имя
                    </label>
                    <input
                      id="name"
                      name="username"
                      type="text"
                      onFocus={this.focusHandler}
                      onBlur={this.blurHandler}
                      value={values.username}
                      onChange={handleChange}
                    />
                    <div className="field-error">{errors.username}</div>
                  </div>

                  <div className="input-field">
                    <label className="required" htmlFor="email">
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
                    <div className="field-error">{errors.email}</div>
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

                  <div className="input-field">
                    <label className="required" htmlFor="password_confirm">
                      Пароль еще раз
                    </label>
                    <input
                      id="password_confirm"
                      type="password"
                      name="repassword"
                      onFocus={this.focusHandler}
                      onBlur={this.blurHandler}
                      value={values.repassword}
                      onChange={handleChange}
                    />
                    <div className="field-error">{errors.repassword}</div>
                  </div>
                  <button
                    className="btn btn_primary"
                    type="submit"
                    id="registrBtn"
                  >
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
          )}
        </>
      );
    }
  }
);

export default AuthSidebar;
