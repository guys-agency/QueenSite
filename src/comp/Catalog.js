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
      const { menuAccor, catalogSEO } = this.props.store;
      const { childName, parentName } = this.props;

      const nameCat = menuAccor[parentName] !== undefined ? (childName ? menuAccor[childName] : menuAccor[parentName]) : "Каталог";

      const seo = catalogSEO[parentName] !== undefined ? (childName ? catalogSEO[parentName].childs[childName] : catalogSEO[parentName]) : undefined;
      const descriptionInPage = seo ? seo.descriptionInPage : undefined;

      const desc = `${nameCat}  в Queen of Bohemia. Магазины в Москве, доставка по всей России. Богемское стекло, хрусталь и фарфор из Европы! Аккуратно доставим или бесплатно заменим.`;

      return (
        <div className="main-screen">
          {seo !== undefined && seo.title !== "" && seo.title !== undefined ? (
            <Helmet
              title={seo.title}
              meta={[
                { name: "description", content: seo.description },
                { name: "keywords", content: seo.keywords },
                {
                  property: "og:title",
                  content: seo.title,
                },
                {
                  property: "og:description",
                  content: seo.description,
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
          ) : (
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
          )}
          <div className="container">
            <div className="row">
              <div className="col col-12">
                <Breadcrumbs name={parentName} child={childName} store={this.props.store} />
                <h1 className="catalog-title h3">{nameCat}</h1>
              </div>
            </div>
            <div className="row catalog">
              <div className="col col-3">
                <Filters store={this.props.store} parentName={parentName} childName={childName} />
              </div>
              <ProductCardContainer store={this.props.store} parentName={parentName} childName={childName} descriptionInPage={descriptionInPage} />
            </div>
          </div>
        </div>
      );
    }
  }
);

export default Catalog;
