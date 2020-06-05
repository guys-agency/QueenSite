import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { Formik } from "formik";
import $ from "jquery";

const { Component } = React;

const AskSidebar = observer(
    class AskSidebar extends Component {
        render() {
            return (
                <>

                    

                    <form className=" visible" >
                        <div className="input-field">
                            <label className="required" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                // onFocus={this.focusHandler}
                                // onBlur={this.blurHandler}
                                // value={values.email}
                                // onChange={handleChange}
                            />

                            {/* <div className="field-error">{errors.email}</div> */}
                        </div>

                        <div className="input-field">
                            <label className="required" htmlFor="password">
                                Пароль
                            </label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                // onFocus={this.focusHandler}
                                // onBlur={this.blurHandler}
                                // value={values.password}
                                // onChange={handleChange}
                            />
                            {/* {errors.password && touched.password && (
                                <div className="field-error">{errors.password}</div>
                            )} */}
                        </div>
                        <button type="submit" className="btn btn_primary">
                            Войти
                        </button>
                    </form>
                    <br />
                    <span className="mla link dotted forgot-btn" onClick={(e) => {
                        this.setState({ pass: true, log: false });
                    }}>
                        Забыли пароль?
                    </span>
        
                    
                </>
            );
        }
    }
);

export default AskSidebar;
