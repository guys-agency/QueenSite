import { observer } from "mobx-react";
import React from "react";
import Filters from "./Filters";
import ProductCardContainer from "./ProductCardContainer";
import Breadcrumbs from "./breadcrumbs";
import Helmet from "react-helmet";
const { Component } = React;

const Collection = observer(
  class Collection extends Component {
    state = {};
    render() {
      const { dataColl } = this.props.store;

      const collRender = [];

      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (dataColl.length) {
        if (dataColl[0].type === "brend") {
          collRender.push(
            <React.Fragment key={dataColl[0].slug}>
              <div className="head head_big head_brand">
                <div className="head-cont head-cont_brand">
                  <div
                    className="head-banner head-banner_brand col col-5 col-s-1"
                    style={{
                      backgroundImage: `url(/image/brends/${typeDevice ? dataColl[0]["image-mob-large"] : dataColl[0]["image-desc-large"]})`,
                    }}
                  ></div>
                  {dataColl[0].description !== "" && dataColl[0].description !== undefined && (
                    <div className="container">
                      <div className="row">
                        <div className="col col-10 col-s-11">
                          <div className="collections__desc collections__desc_brand">{dataColl[0].description}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        } else if (dataColl[0].type === "closeBanner") {
          collRender.push(
            <React.Fragment key={dataColl[0].slug}>
              <div className="head head_big">
                <div className="head-cont">
                  <div
                    className="head-banner"
                    style={{
                      backgroundImage: `url(/image/CM/${typeDevice ? "banner-m.jpg" : "banner.jpg"})`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col col-3 col-s-1"></div>
                  <div className="col col-8 col-s-10">
                    <div className="collections__desc">
                      Мы подготовили для вас закрытый раздел на 
                      <b>239 товаров</b> со скидками <b>до 67%</b>.
                    </div>
                  </div>
                  <div className="col col-s-1"></div>
                </div>
              </div>
            </React.Fragment>
          );
        } else if (dataColl[0].type === "isSet") {
        } else if (dataColl[0].type !== "sale") {
          collRender.push(
            <React.Fragment key={dataColl[0].slug}>
              <div className="head head_big head_in-col">
                <div className="head-cont">
                  <div
                    className="head-banner"
                    style={{
                      backgroundImage: `url(/image/banners/${typeDevice ? dataColl[0]["image-mob-large"] : dataColl[0]["image-desc-large"]})`,
                    }}
                  ></div>
                </div>
              </div>
              {dataColl[0].description !== "" && dataColl[0].description !== undefined && (
                <div className="container">
                  <div className="row">
                    <div className="col col-3 col-s-1"></div>
                    <div className="col col-8 col-s-10">
                      <div className="collections__desc">{dataColl[0].description}</div>
                    </div>
                    <div className="col col-s-1"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        } else {
          collRender.push(
            <div className="head head_big head_no-link head_in-col" key={dataColl[0].slug}>
              <div
                className="head-banner head-banner_action"
                style={{
                  backgroundImage: `url(/image/banners/${typeDevice ? dataColl[0]["image-mob-large"] : dataColl[0]["image-desc-large"]})`,
                }}
              >
                <div className="text">
                  <div className="label">Акция</div>
                  <h1 className="h2">
                    {dataColl[0].name} <span className="ic i_right"></span>
                  </h1>
                  {dataColl[0].description !== "" && dataColl[0].description !== undefined && <p>{dataColl[0].description}</p>}
                </div>
              </div>
            </div>
          );
        }
      }

      return (
        dataColl.length !== 0 && (
          <div className={dataColl[0].type !== "sale" ? "collections" : "actions"}>
            {collRender}
            <div className="container">
              {dataColl[0].seo !== undefined && dataColl[0].seo.title !== "" && dataColl[0].seo.title !== undefined && (
                <Helmet
                  title={dataColl[0].seo.title}
                  meta={[
                    { name: "description", content: dataColl[0].seo.description },
                    { name: "keywords", content: dataColl[0].seo.keywords },
                    {
                      property: "og:title",
                      content: dataColl[0].seo.title,
                    },
                    {
                      property: "og:description",
                      content: dataColl[0].seo.description,
                    },
                    {
                      property: "og:type",
                      content: "website",
                    },
                    {
                      property: "og:site_name",
                      content: "Queen of Bohemia",
                    },
                  ]}
                />
              )}
              <div className="row"></div>
            </div>
            <div className="main-screen">
              <div className="container">
                <Breadcrumbs name={this.props.slug} store={this.props.store} />
                {dataColl[0].name !== undefined && dataColl[0].type !== "sale" ? <h1 className="catalog-title h3">{dataColl[0].name}</h1> : null}
                <div className="row catalog">
                  <div className="col col-3">
                    <Filters store={this.props.store} />
                  </div>
                  <ProductCardContainer store={this.props.store} />
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
  }
);

export default Collection;
