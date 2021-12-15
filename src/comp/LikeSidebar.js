import { observer } from "mobx-react";
import React from "react";
import ProductList from "./ProductList";
import localStorage from "mobx-localstorage";
const { Component } = React;

const LikeSidebar = observer(
  class LikeSidebar extends Component {
    state = {
      reg: false,
      log: true,
    };
    clickHandl = () => {
      const { store } = this.props;
      // e.target.textContent = "Добавлено в корзину";

      const { productInCartList, addtoCart, addToLike } = store;
      let { likeContainer, likeData } = store;

      likeContainer.forEach((el, i) => {
        const inCart = Object.keys(store.productInCartList).length
          ? Object.keys(store.productInCartList).indexOf(String(el))
          : -1;
        if (inCart === -1) {
          productInCartList[el] = 1;
        }
      });
      this.props.store.likeContainer = [];

      localStorage.removeItem("like");

      addtoCart(true);
      addToLike(true);
      this.props.closeSidebar();
    };
    render() {
      const { store } = this.props;
      const { likeData } = store;
      const renderCont = [];
      Object.keys(likeData).forEach((n) => {
        renderCont.push(
          <ProductList
            key={likeData[n].slug}
            data={likeData[n]}
            el={likeData[n].slug}
            store={this.props.store}
            cart={false}
          />
        );
      });
      return (
        <>
          <div className="sidebar__over">{renderCont}</div>

          <div
            className="btn btn_primary btn_wide btn_bottom"
            onClick={this.clickHandl}
          >
            Добавить все в корзину
          </div>
        </>
      );
    }
  }
);

export default LikeSidebar;
