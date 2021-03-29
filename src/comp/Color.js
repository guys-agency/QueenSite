import { observer } from "mobx-react";
import React from "react";
import Filters from "./Filters";
import ProductCardContainer from "./ProductCardContainer";
import Helmet from "react-helmet";
import Breadcrumbs from "./breadcrumbs";
const { Component } = React;

const Color = observer(
  class Color extends Component {
    state = {};
    render() {
      const { dataColl, colorsObj } = this.props.store;

      const desc = `${
        colorsObj[this.props.slug]
      } цвет посуды для самых оригинальных интерьеров! Богемское стекло, хрусталь и фарфор из Европы. Доставим по России целым или бесплатно заменим.`;

      return (
        <div className="main-screen">
          <Helmet
            title={colorsObj[this.props.slug] + " - Queen of Bohemia"}
            meta={[
              {
                name: "description",
                content: desc,
              },

              {
                property: "og:title",
                content: colorsObj[this.props.slug] + " - Queen of Bohemia",
              },
              {
                property: "og:description",
                content: desc,
              },
              {
                property: "og:type",
                content: "website",
              },
              {
                property: "og:site_name",
                content: "Queen of Bohemia",
              },
              {
                property: "og:url",
                content: `https://queenbohemia.ru${this.props.url}`,
              },
            ]}
          />
          <div className="container">
            <div className="row">
              <div className="col col-12">
                <h3 className="catalog-title">{colorsObj[this.props.slug]}</h3>
              </div>
            </div>
            <div className="row catalog">
              <div className="col col-3">
                <Filters store={this.props.store} parentName={this.props.slug} childName={this.props.slug} />
              </div>
              <ProductCardContainer store={this.props.store} parentName={this.props.slug} childName={this.props.slug} />
            </div>
          </div>
        </div>
      );
    }
  }
);

export default Color;
