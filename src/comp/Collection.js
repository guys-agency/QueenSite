import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import Filters from "./Filters";
import ProductCardContainer from "./ProductCardContainer";
const { Component } = React;

const Collection = observer(
  class Collection extends Component {
    state = { dataProd: [], dataColl: {} };
    render() {
      const { dataProd, dataColl } = this.state;
      const prodRender = [];
      const collRender = [];

      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (dataProd.length) {
        collRender.push(
          <>
            <div className="head head_big">
              <div className="head-cont">
                <div
                  className="head-banner"
                  style={{
                    backgroundImage:
                      "url(" + "/image/hb/" + typeDevice
                        ? dataColl["image-mob-large"]
                        : dataColl["image-desc-large"] + ")",
                  }}
                ></div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col col-3"></div>
                <div className="col col-8">
                  <div className="collections__desc">
                    {dataColl.description}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }

      return (
        <div className="collections">
          <div className="head head_big">
            <div className="head-cont">
              <div
                className="head-banner"
                style={{
                  backgroundImage: "url(" + "/image/hb/1.jpg" + ")",
                }}
              ></div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-3"></div>
              <div className="col col-8">
                <div className="collections__desc">
                  Коллекция Натура – это уникальное сочетание натуральных
                  цветов, воссозданное в наших изделиях из выдувного богемского
                  стекла, кристалайта и фарфора.
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row"></div>
          </div>
          <div className="main-screen">
            <div className="container">
              <div className="row catalog">
                <div className="col col-3">
                  <Filters store={this.props.store} />
                </div>
                <ProductCardContainer store={this.props.store} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    componentDidMount() {
      api
        .getCollection(this.props.slug)
        .then((data) => {
          console.log("data :>> ", data);
          this.props.store.filtration(data.collData[0].products);
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  }
);

export default Collection;
