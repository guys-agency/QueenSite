import { observer } from "mobx-react";
import React from "react";
import ProductList from "./ProductList";
const { Component } = React;

const LikeSidebar = observer(
  class LikeSidebar extends Component {
    state = {
      reg: false,
      log: true,
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
      return <>{renderCont}</>;
    }
  }
);

export default LikeSidebar;
