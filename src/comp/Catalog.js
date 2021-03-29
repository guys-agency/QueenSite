import { observer } from "mobx-react";
import React from "react";
import Filters from "./Filters";
import ProductCardContainer from "./ProductCardContainer";
import Helmet from "react-helmet";
import Breadcrumbs from "./breadcrumbs";
const { Component } = React;

const Catalog = observer(
  class Catalog extends Component {
    state = {};
    render() {
      const { menuAccor } = this.props.store;
      const { childName, parentName } = this.props;

      const nameCat = menuAccor[parentName] !== undefined ? (childName ? menuAccor[childName] : menuAccor[parentName]) : "Каталог";

      const desc = `${nameCat}  в Queen of Bohemia. Магазины в Москве, доставка по всей России. Богемское стекло, хрусталь и фарфор из Европы! Аккуратно доставим или бесплатно заменим.`;

      return (
        <div className="main-screen">
          <Helmet
            title={nameCat + " - Queen of Bohemia"}
            meta={[
              {
                name: "description",
                content: desc,
              },

              {
                property: "og:title",
                content: nameCat + " - Queen of Bohemia",
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
                <Breadcrumbs name={parentName} child={childName} store={this.props.store} />
                <h3 className="catalog-title">{nameCat}</h3>
              </div>
            </div>
            <div className="row catalog">
              <div className="col col-3">
                <Filters store={this.props.store} parentName={parentName} childName={childName} />
              </div>
              <ProductCardContainer store={this.props.store} parentName={parentName} childName={childName} />
            </div>
          </div>
        </div>
      );
    }
  }
);

export default Catalog;
