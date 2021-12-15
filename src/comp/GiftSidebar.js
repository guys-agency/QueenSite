import { observer } from "mobx-react";
import React from "react";
import { Formik } from "formik";
import $ from "jquery";

const { Component } = React;

const GiftSidebar = observer(
  class GiftSidebar extends Component {
    focusHandler = (e) => {
      $(e.target).parent().find("label").addClass("active");
    };

    blurHandler = (e) => {
      if (e.target.value === "") {
        $(e.target).parent().find("label").removeClass("active");
      }
    };
    render() {
      const { productInCartList, certInCart } = this.props.store;
      return (
        <Formik
          //инициализируем значения input-ов
          initialValues={{
            question: productInCartList[certInCart],
          }}
          //подключаем схему валидации, которую описали выше

          //определяем, что будет происходить при вызове onsubmit
          onSubmit={(values, { setSubmitting, resetForm }) => {
            this.props.store.productInCartList[certInCart] = values.question;
            this.props.store.sideGift = false;
            this.props.closeSidebar();
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
                  className={"required " + (values.question ? " active" : "")}
                  htmlFor="question"
                >
                  Текст поздравления
                </label>
                <textarea
                  name="question"
                  id="question"
                  cols="100"
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
                Сохранить
              </button>
            </form>
          )}
        </Formik>
      );
    }
  }
);

export default GiftSidebar;
