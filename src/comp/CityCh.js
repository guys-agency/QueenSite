import React from "react";
import { observer } from "mobx-react";
import localStorage from "mobx-localstorage";
import $ from "jquery";
import api from "./api";
const { Component } = React;

const CityCh = observer(
  class CityCh extends Component {
    state = {
      cities: [],
    };
    render() {
      return (
        <span>
          <button className="link dotted header__btn header__btn-city">
            {this.props.store.city} <span className="ic i_drop"></span>
          </button>
          {localStorage.getItem("city") !== null && localStorage.getItem("city") !== undefined && localStorage.getItem("city").sourse === "Y" && (
            <div className="header__drop header__drop_city-check">
              <p>
                {" "}
                Регион доставки:
                <b> {this.props.store.city} ?</b>
              </p>
              <div>
                <button
                  className="btn"
                  onClick={() => {
                    $(".menu_mega").removeClass("visible");
                    $(".menu_sub").removeClass("visible");
                    $(".menu-point").removeClass("active");
                    $(".header__drop").removeClass("visible");
                    $(".header__btn").removeClass("active");

                    $(".header__drop_city-check").addClass("deactiv");
                    $(".header__drop_city").addClass("visible");
                    $(".header__btn-city").addClass("active");
                  }}
                >
                  Выбрать другой
                </button>
                <button
                  className=" btn_yellow btn"
                  onClick={() => {
                    const cityData = localStorage.getItem("city");
                    cityData.sourse = "U";
                    localStorage.setItem("city", cityData);
                  }}
                >
                  Да
                </button>
              </div>
            </div>
          )}
          <form className="header__drop header__drop_city">
            <button
              className="btn btn_wide vis-s"
              onClick={(e) => {
                $(".header__drop").removeClass("visible");
                e.preventDefault();
              }}
            >
              <span className="ic i_left"></span> Назад
            </button>
            <div className="input-field">
              <label className="active" htmlFor="citySearch">
                Населенный пункт
              </label>
              <input
                id="citySearch"
                placeholder="Поиск"
                type="text"
                onInput={(e) => {
                  if (e.target.value.length >= 3) {
                    const renderCities = [];
                    api
                      .getCity(e.target.value)
                      .then((c) => {
                        c.forEach((one) => {
                          let region = one.address.state;
                          let city =
                            "city" in one.address ? one.address.city : "natural" in one.address ? one.address.natural : one.address.municipality;
                          if (city) {
                            renderCities.push(
                              <li key={one.geoId}>
                                <button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    $(".header__drop").removeClass("visible");

                                    localStorage.setItem("city", {
                                      name: city,
                                      geoId: one.place_id,
                                      region: region,
                                      sourse: "U",
                                    });
                                  }}
                                >
                                  {city + ", " + region}
                                </button>
                              </li>
                            );
                          }

                          // if (one.addressComponents.length <= 6) {
                          //   renderCities.push(
                          //     <li key={one.geoId}>
                          //       <button
                          //         type="submit"
                          //         onClick={(e) => {
                          //           e.preventDefault();
                          //           $(".header__drop").removeClass("visible");
                          //           let region = one.addressComponents[2].name;
                          //           one.addressComponents.forEach((l) => {
                          //             if (l.kind === "PROVINCE") {
                          //               region = l.name;
                          //             }
                          //           });
                          //           localStorage.setItem("city", {
                          //             name: one.addressComponents[one.addressComponents.length - 1].name,
                          //             geoId: one.geoId,
                          //             region: region,
                          //             sourse: "U",
                          //           });
                          //         }}
                          //       >
                          //         {one.addressComponents[one.addressComponents.length - 2].name +
                          //           ", " +
                          //           one.addressComponents[one.addressComponents.length - 1].name}
                          //       </button>
                          //     </li>
                          //   );
                          // }
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
