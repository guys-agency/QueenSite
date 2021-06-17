import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import HelmetHead from "./common/Helmet";
const { Component } = React;

const Collections = observer(
  class Collections extends Component {
    state = {};
    render() {
      const { store } = this.props;
      let { collections } = Object.assign({}, store.bannersData);
      let collHead = <h1 className="h1">Коллекции</h1>;
      let sbSm = false;
      if (window.location.href.includes("/ideas")) {
        collections = store.bannersData.ideas;
        collHead = <h1 className="h1">Идеи</h1>;
      } else if (collections !== undefined && window.location.href.includes("/sborka-serviza")) {
        collections = collections.filter((coll) => coll.utensilSet);
        collHead = (
          <>
            <h1 className="h1">Собрать сервиз</h1>
            <p>Вы можете собрать свой индивидуальный сервиз из коллекции посуды, которая вам приглянулась. </p>
          </>
        );
        sbSm = true;
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
                to={`/${el.type}/${el.slug}`}
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
                  to={`/${el.type}/${el.slug}`}
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
        <div className={sbSm ? "collections sb-sm" : "collections"}>
          <HelmetHead
            title="Коллекции - Queen of Bohemia посуда"
            description="Интернет-магазин чешского фарфора и хрусталя Queen of Bohemia в Москве. Коллекции элитной посуды и товаров для сервировки стола."
            keywords="наборы посуды, набор посуды фарфор"
          />
          <div className="head head_big">
            <div className="head-cont">
              <div className="collections__head">{collHead}</div>
              {mainBan}
            </div>
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
