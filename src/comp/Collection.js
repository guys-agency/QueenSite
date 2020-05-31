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
          this.props.store.nameMainCat = "";
          this.props.store.nameSecondCat = "";
          this.props.store.cleaningActiveFilters();

          const cats = {};

          data.products[0].cats[0].cats.forEach((elemMain) => {
            elemMain.forEach((elem) => {
              if (cats[elem.slugName] !== undefined) {
                elem.childs.forEach((child, i) => {
                  if (
                    !cats[elem.slugName].childsNameArr.includes(
                      elem.childsSlug[i]
                    )
                  ) {
                    cats[elem.slugName].childs.push({
                      name: child,
                      slug: elem.childsSlug[i],
                    });
                    cats[elem.slugName].childsNameArr.push(elem.childsSlug[i]);
                  }
                });
              } else {
                cats[elem.slugName] = {
                  name: elem.name,
                  slug: elem.slugName,
                };
                if (cats[elem.slugName].childs === undefined) {
                  cats[elem.slugName].childs = [];
                  cats[elem.slugName].childsNameArr = [];
                }
                elem.childs.forEach((child, i) => {
                  if (
                    !cats[elem.slugName].childsNameArr.includes(
                      elem.childsSlug[i]
                    )
                  ) {
                    cats[elem.slugName].childs.push({
                      name: child,
                      slug: elem.childsSlug[i],
                    });
                    cats[elem.slugName].childsNameArr.push(elem.childsSlug[i]);
                  }
                });
              }
            });
          });
          const catsArr = [];
          Object.keys(cats).forEach((name) => {
            catsArr.push(cats[name]);
          });

          console.log("data :>> ", data);
          console.log("cats :>> ", catsArr);
          this.props.store.prodCats = catsArr;
          this.props.store.prodSlugs = data.collData[0].products;
          this.props.store.filtration();
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  }
);

export default Collection;
