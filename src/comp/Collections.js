import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const Collections = observer(
  class Collections extends Component {
    state = {};
    render() {
      const { store } = this.props;
      const { collectionsData } = store;
      const renderColl = [];
      const mainBan = [];
      const sortData = [];
      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (collectionsData.length) {
        collectionsData.forEach((el, i) => {
          if (i === 0) {
            mainBan.push(
              <Link
                className="head-banner"
                style={{
                  backgroundImage:
                    "url(" + "/image/hb/" + typeDevice
                      ? el["image-mob-large"]
                      : el["image-desc-large"] + ")",
                }}
                to={"collections/" + el.slug}
              ></Link>
            );
          } else {
            renderColl.push(
              <div className="col" key={el.name}>
                <Link
                  href="#"
                  className="banner banner_overlay main"
                  style={{
                    backgroundImage:
                      "url(" + "/image/ideas/" + typeDevice
                        ? el["image-mob-small"]
                        : el["image-desc-small"] + ")",
                  }}
                  to={"collections/" + el.slug}
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
    componentWillMount() {
      if (!this.props.store.collectionsData.length) {
        this.props.store.getCollections();
      }
    }
  }
);

export default Collections;
