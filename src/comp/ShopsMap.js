import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";


const { Component } = React;

const ShopsMap = observer(
  class ShopsMap extends Component {
    state = {};
    render() {
      return (
        <div>
          <div className="shop__tumbler">
            <div className="tumbler">
              <Link className="tumb" to="/shops">
                Списком
              </Link>
              <Link className="tumb active">Карта</Link>
            </div>
          </div>
          <div className="shops shops_map">
            <div className="head head_big head_big-f map">
              <div className="head_shop">
                <div className="head-map">
                  <div className="head-banner">
                    <iframe
                      src="https://yandex.ru/map-widget/v1/?um=constructor%3A1b975764a274db1d573df63c9d26f21116534baf221ecefe95d4aa2e10958388&amp;source=constructor"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default ShopsMap;
