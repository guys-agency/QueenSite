import React from "react";
import { observer } from "mobx-react";
import localStorage from "mobx-localstorage";
import $ from "jquery";
import { cities } from "../constants";
import api from "./api";
const { Component } = React;

const CityCh = observer(
  class CityCh extends Component {
    state = {
      cities: [],
    };
    render() {
      console.log(this.props.store.city);

      return (
        <span>
          <button className="link dotted header__btn header__btn-city">
            {this.props.store.city} <span className="ic i_drop"></span>
          </button>
          <form className="header__drop header__drop_city">
            <button
              className="btn btn_wide vis-s"
              onClick={(e) => {
                $(".header__drop").removeClass("visible");
              }}
            >
              <span className="ic i_left"></span> Назад
            </button>
            <div className="input-field">
              <label className="active" htmlFor="citySearch">
                Ваш город
              </label>
              <input
                id="citySearch"
                placeholder="Поиск"
                type="text"
                onInput={(e) => {
                  if (e.target.value.length >= 3) {
                    console.log(
                      "e.target.value.length :>> ",
                      e.target.value.length
                    );
                    const renderCities = [];
                    api
                      .getCity(e.target.value)
                      .then((c) => {
                        console.log("c :>> ", c);
                        c.forEach((one) => {
                          if (one.addressComponents.length < 6) {
                            renderCities.push(
                              <li>
                                <button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    $(".header__drop").removeClass("visible");
                                    localStorage.set("city", {
                                      name:
                                        one.addressComponents[
                                          one.addressComponents.length - 1
                                        ].name,
                                      geoId: one.geoId,
                                      sourse: "U",
                                    });
                                  }}
                                >
                                  {one.addressComponents[
                                    one.addressComponents.length - 2
                                  ].name +
                                    ", " +
                                    one.addressComponents[
                                      one.addressComponents.length - 1
                                    ].name}
                                </button>
                              </li>
                            );
                          }
                        });
                        this.setState({ cities: renderCities });
                      })
                      .catch((err) => {
                        console.log("err :>> ", err);
                      });
                    // const rigthCities = [];
                    // cities.some((el) => {
                    //   if (rigthCities.length < 3) {
                    //     if (
                    //       el
                    //         .toLowerCase()
                    //         .indexOf(e.target.value.toLowerCase()) !== -1
                    //     ) {
                    //       rigthCities.push(el);
                    //     }
                    //     return false;
                    //   } else {
                    //     return true;
                    //   }
                    // });

                    // for (let index = 0; index < 3; index++) {
                    //   console.log("object :>> ", rigthCities);
                    //   renderCities.push(
                    //     <li>
                    //       <button
                    //         type="submit"
                    //         onClick={(e) => {
                    //           e.preventDefault();
                    //           $(".header__drop").removeClass("visible");
                    //           localStorage.set("city", {
                    //             name: rigthCities[index],
                    //             sourse: "U",
                    //           });
                    //         }}
                    //       >
                    //         {rigthCities[index]}
                    //       </button>
                    //     </li>
                    //   );
                    // }
                  }
                }}
                onFocus={(e) => {
                  $(e.target).parent().find("label").addClass("active");
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    // $(e.target).parent().find('label').removeClass('active');
                  }
                }}
              />
            </div>
            <ul>
              {this.state.cities}
              {/* <li>
                          <button type="submit">Казань</button>
                        </li>
                        <li>
                          <button type="submit">Калининград</button>
                        </li>
                        <li>
                          <button type="submit">Кабанск</button>
                        </li> */}
            </ul>
          </form>
        </span>
      );
    }
  }
);

export default CityCh;
