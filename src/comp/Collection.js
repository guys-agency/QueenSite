import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import Filters from "./Filters";
import ProductCardContainer from "./ProductCardContainer";
import Breadcrumbs from "./breadcrumbs";
const { Component } = React;

const Collection = observer(
  class Collection extends Component {
    state = {};
    render() {
      const { dataColl } = this.props.store;

      const collRender = [];

      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (dataColl.length) {
        if (dataColl[0].type !== "sale") {
          collRender.push(
            <>
              <div className="head head_big">
                <div className="head-cont">
                  <div
                    className="head-banner"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? dataColl[0]["image-mob-large"]
                          : dataColl[0]["image-desc-large"]
                      })`,
                    }}
                  ></div>
                </div>
              </div>
              {dataColl[0].description !== "" && (
                <div className="container">
                  <div className="row">
                    <div className="col col-3"></div>
                    <div className="col col-8">
                      <div className="collections__desc">
                        {dataColl[0].description}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        } else {
          collRender.push(
            <div className="head head_big head_no-link">
              <div
                className="head-banner head-banner_action"
                style={{
                  backgroundImage: `url(/image/banners/${
                    typeDevice
                      ? dataColl[0]["image-mob-large"]
                      : dataColl[0]["image-desc-large"]
                  })`,
                }}
              >
                <div className="text">
                  <div className="label">Акция</div>
                  <h1>
                    {dataColl[0].name} <span className="ic i_right"></span>
                  </h1>
                  {dataColl[0].description !== "" && (
                    <p>{dataColl[0].description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        }
      }

      return (
        dataColl.length !== 0 &&
        (window.location.pathname.includes("ideas") ? (
          <div className="main-screen">
            <div className="container">
              <Breadcrumbs name={this.props.slug} store={this.props.store} />
              <div className="row catalog">
                <div className="col col-3">
                  <Filters store={this.props.store} />
                </div>
                <ProductCardContainer store={this.props.store} />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={dataColl[0].type !== "sale" ? "collections" : "actions"}
          >
            {collRender}
            <div className="container">
              <div className="row"></div>
            </div>
            <div className="main-screen">
              <div className="container">
                <Breadcrumbs name={this.props.slug} store={this.props.store} />
                <div className="row catalog">
                  <div className="col col-3">
                    <Filters store={this.props.store} />
                  </div>
                  <ProductCardContainer store={this.props.store} />
                </div>
              </div>
            </div>
          </div>
        ))
      );
    }
  }
);

export default Collection;
