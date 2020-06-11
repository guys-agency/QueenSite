import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { Formik } from "formik";
import $ from "jquery";
import ChangePasswordSchema from "../schemas/changePasswordSchema";
import ProfileDataSchema from "../schemas/profileDataSchema";

const { Component } = React;

const ChangeSidebar = observer(
  class ChangeSidebar extends Component {
    state = {
      data: true,
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
              className={this.state.data ? " active" : ""}
              onClick={() => {
                this.setState({ data: true, pass: false });
              }}
            >
              Данные
            </button>
            <button
              className={this.state.pass ? " active" : ""}
              onClick={() => {
                this.setState({ data: false, pass: true });
              }}
            >
              Пароль
            </button>
          </div>

          {this.state.data && (
            <Formik
              //инициализируем значения input-ов
              initialValues={{
                name: this.props.store.userData.user.name,
                tel: this.props.store.userData.user.tel
                  ? this.props.store.userData.user.tel
                  : "",
              }}
              //подключаем схему валидации, которую описали выше
              validationSchema={ProfileDataSchema}
              //определяем, что будет происходить при вызове onsubmit
              onSubmit={(values, { setSubmitting }) => {
                api
                  .changeData({
                    name: values.name,
                    tel: values.tel,
                  })
                  .then((ok) => {
                    console.log("data :>> ", ok);

                    $("#loginBtn").text(ok.message);
                    if (ok.status === 201) {
                      this.props.store.userData.user = ok.user;
                      $("#loginBtn").addClass("success");
                    } else {
                      $("#loginBtn").addClass("error");
                    }
                    setTimeout(() => {
                      $("#loginBtn").removeClass("success");
                      $("#loginBtn").removeClass("error");
                      $("#loginBtn").text("Изменить");
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
                <form className=" visible" onSubmit={handleSubmit}>
                  <div className="input-field">
                    <label
                      className={
                        "required" + (values.name !== "" ? " active" : "")
                      }
                      htmlFor="email"
                    >
                      Имя
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onFocus={this.focusHandler}
                      onBlur={this.blurHandler}
                      value={values.name}
                      onChange={handleChange}
                    />

                    <div className="field-error">{errors.email}</div>
                  </div>

                  <div className="input-field">
                    <label
                      className={
                        "required" + (values.tel !== "" ? " active" : "")
                      }
                      htmlFor="password"
                    >
                      Телефон
                    </label>
                    <input
                      name="tel"
                      type="tel"
                      id="tel"
                      onFocus={this.focusHandler}
                      onBlur={this.blurHandler}
                      value={values.tel}
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
                    Изменить
                  </button>
                </form>
              )}
            </Formik>
          )}

          {this.state.pass && (
            <Formik
              //инициализируем значения input-ов
              initialValues={{
                oldPassword: "",
                password: "",
                repassword: "",
              }}
              //подключаем схему валидации, которую описали выше
              validationSchema={ChangePasswordSchema}
              //определяем, что будет происходить при вызове onsubmit
              onSubmit={(values, { setSubmitting }) => {
                console.log("values :>> ", values);
                api
                  .changePassword({
                    oldPassword: values.oldPassword,
                    email: this.props.email,
                    password: values.password,
                  })
                  .then((ok) => {
                    console.log("ok :>> ", ok);
                    $("#changePass").text(ok.message);
                    if (ok.status === 201) {
                      $("#changePass").addClass("success");
                    } else {
                      $("#changePass").addClass("error");
                    }
                    setTimeout(() => {
                      $("#changePass").removeClass("success");
                      $("#changePass").removeClass("error");
                      $("#changePass").text("Сменить пароль");
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
                    <label className="required" htmlFor="email">
                      Старый пароль
                    </label>
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
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
                    id="changePass"
                  >
                    Сменить пароль
                  </button>
                </form>
              )}
            </Formik>
          )}
        </>
      );
    }
  }
);

export default ChangeSidebar;
