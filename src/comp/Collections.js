import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const Collections = observer(
  class Collections extends Component {
    state = {};
    render() {
      const { store } = this.props;
      let { collections } = Object.assign({}, store.bannersData);
      if (window.location.href.includes("/ideas")) {
        collections = store.bannersData.ideas;
      } else if (collections !== undefined && window.location.href.includes("/sborka-serviza")) {
        collections = collections.filter((coll) => coll.utensilSet);
      }
      const renderColl = [];
      const mainBan = [];
      const sortData = [];
      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (collections !== undefined) {
        collections.forEach((el, i) => {
          if (i === 0) {
            mainBan.push(
              <Link
                key={el.slug}
                className="head-banner"
                onClick={() => {
                  this.props.store.dataColl = [el];
                }}
                style={{
                  backgroundImage: `url(/image/banners/${typeDevice ? el["image-mob-large"] : el["image-desc-large"]})`,
                }}
                to={`${el.type}/${el.slug}`}
              ></Link>
            );
          } else {
            renderColl.push(
              <div className="col" key={el.name}>
                <Link
                  href="#"
                  className="banner banner_overlay main"
                  onClick={() => {
                    this.props.store.dataColl = [el];
                  }}
                  to={`${el.type}/${el.slug}`}
                  style={{
                    backgroundImage: `url(/image/banners/${typeDevice ? el["image-mob-small"] : el["image-desc-small"]})`,
                  }}
                >
                  <div className="banner__desc">{el.name}</div>
                </Link>
              </div>
            );
          }
        });
      }

      return (
        <div className="collections">
          <div className="head head_big">
            <div className="head-cont">{mainBan}</div>
          </div>
          <div className="container collections__list">
            <div className="row">{renderColl}</div>
          </div>
        </div>
      );
    }
    // componentWillMount() {
    //   if (!this.props.store.collections.length) {
    //     this.props.store.getCollections();
    //   }
    // }
  }
);

export default Collections;
