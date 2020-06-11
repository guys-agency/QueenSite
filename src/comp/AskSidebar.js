import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { Formik } from "formik";
import $ from "jquery";
import AskSchema from "../schemas/askSchema";

const { Component } = React;

const AskSidebar = observer(
  class AskSidebar extends Component {
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
        <Formik
          //инициализируем значения input-ов
          initialValues={{
            name: "",
            email: "",
            question: "",
            acceptedTerms: true,
          }}
          //подключаем схему валидации, которую описали выше
          validationSchema={AskSchema}
          //определяем, что будет происходить при вызове onsubmit
          onSubmit={(values, { setSubmitting }) => {
            api
              .sendQestion({
                name: values.name,
                email: values.email.toLowerCase(),
                question: values.question,
              })
              .then((data) => {
                $("#askBtn").text(data.message);
                if (data.status === 200) {
                  $("#askBtn").text(data.message);
                  $("#askBtn").addClass("success");
                } else {
                  $("#askBtn").addClass("error");
                }
                setTimeout(() => {
                  $("#askBtn").removeClass("success");
                  $("#askBtn").removeClass("error");
                  $("#askBtn").text("Отправить");
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
                <label className="required" htmlFor="name">
                  Имя
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  value={values.name}
                  onFocus={this.focusHandler}
                  onBlur={this.blurHandler}
                  // value={values.password}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <div className="field-error">{errors.name}</div>
                )}
              </div>

              <div className="input-field">
                <label className="required" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={values.email}
                  onFocus={this.focusHandler}
                  onBlur={this.blurHandler}
                  // value={values.email}
                  onChange={handleChange}
                />

                {errors.email && touched.email && (
                  <div className="field-error">{errors.email}</div>
                )}
              </div>

              <div className="input-field">
                <label className="required" htmlFor="question">
                  Вопрос
                </label>
                <textarea
                  name="question"
                  id="question"
                  cols="30"
                  rows="10"
                  value={values.question}
                  onFocus={this.focusHandler}
                  onBlur={this.blurHandler}
                  onChange={handleChange}
                  // value={values.password}
                ></textarea>
                {errors.question && touched.question && (
                  <div className="field-error">{errors.question}</div>
                )}
              </div>
              <button type="submit" className="btn btn_primary" id="askBtn">
                Отправить
              </button>
              <label className="checkbox checkbox_margin">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={values.acceptedTerms}
                  id=""
                  onChange={handleChange}
                  // value={values.acceptedTerms}
                  // onChange={handleChange}
                  // checked={values.acceptedTerms}
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
      );
    }
  }
);

export default AskSidebar;
