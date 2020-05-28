import React from 'react';
import { observer } from 'mobx-react';
import localStorage from "mobx-localstorage";
import $ from "jquery";
import { cities } from "../constants";
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
          <button className="link dotted header__btn">
            {this.props.store.city} <span className="ic i_drop"></span>
          </button>
          <form className="header__drop header__drop_city">
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
                    const rigthCities = [];
                    cities.some((el) => {
                      if (rigthCities.length < 3) {
                        if (
                          el
                            .toLowerCase()
                            .indexOf(e.target.value.toLowerCase()) !== -1
                        ) {
                          rigthCities.push(el);
                        }
                        return false;
                      } else {
                        return true;
                      }
                    });
                    const renderCities = [];
                    for (let index = 0; index < 3; index++) {
                      console.log("object :>> ", rigthCities);
                      renderCities.push(
                        <li>
                          <button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              localStorage.set("city", {
                                name: rigthCities[index],
                                sourse: "U",
                              });
                            }}
                          >
                            {rigthCities[index]}
                          </button>
                        </li>
                      );
                    }
                    this.setState({ cities: renderCities });
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