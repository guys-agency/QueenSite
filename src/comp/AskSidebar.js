import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { Formik } from "formik";
import $ from "jquery";

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
                <>
                    <form className=" visible" >
                        <div className="input-field">
                            <label className="required" htmlFor="name">
                                Имя
                            </label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                onFocus={this.focusHandler}
                                onBlur={this.blurHandler}
                            // value={values.password}
                            // onChange={handleChange}
                            />
                            {/* {errors.password && touched.password && (
                                <div className="field-error">{errors.password}</div>
                            )} */}
                        </div>

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
                                // value={values.email}
                                // onChange={handleChange}
                            />

                            {/* <div className="field-error">{errors.email}</div> */}
                        </div>

                        <div className="input-field">
                            <label className="required" htmlFor="question">
                                Вопрос
                            </label>
                            <textarea name="question" id="question" cols="30" rows="10"
                                onFocus={this.focusHandler}
                                onBlur={this.blurHandler}
                                // value={values.password}
                            ></textarea>
                            {/* {errors.password && touched.password && (
                                <div className="field-error">{errors.password}</div>
                            )} */}
                        </div>
                        <button type="submit" className="btn btn_primary">
                            Отправить
                        </button>
                        <label className="checkbox checkbox_margin">
                            <input
                                type="checkbox"
                                name="acceptedTerms"
                                id=""
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
                </>
            );
        }
    }
);

export default AskSidebar;
