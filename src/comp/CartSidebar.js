import { observer } from "mobx-react";
import React from "react";
import ProductList from "./ProductList";
import LikeButton from "./LikeButton";
import { withRouter } from "react-router";
const { Component } = React;

const CartSidebar = observer(
  class CartSidebar extends Component {
    state = {};
    render() {
      const { productInCart, productInCartList, addtoCart } = this.props.store;
      const { deliveryData } = this.state;

      const productList = [];
      let totalPrice = 0;
      let totalSale = 0;
      let totalFullprice = 0;
      let address = "";
      if (Object.keys(productInCart).length) {
        Object.keys(productInCart).forEach((el) => {
          productList.push(
            <ProductList
              key={el}
              data={productInCart[el]}
              el={el}
              store={this.props.store}
              cart={true}
            />
          );

          totalPrice += productInCart[el].sale
            ? productInCartList[el] * productInCart[el].sale_price
            : productInCartList[el] * productInCart[el].regular_price;

          totalSale += productInCart[el].sale
            ? (productInCart[el].regular_price - productInCart[el].sale_price) *
              productInCartList[el]
            : 0;
          totalFullprice +=
            productInCartList[el] * productInCart[el].regular_price;
        });
      }
      return (
        <>
          <div className="sidebar__total"><b>Итого:</b> <b className="price">{totalPrice.toLocaleString()} ₽</b></div>
          <div className="sidebar__over">
            <div className="cart__list">{productList}</div>
          </div>
          <button
            className="btn btn_yellow btn_wide btn_bottom"
            onClick={() => {
              this.props.history.push("/cart");
              this.props.closeSidebar();
            }}
          >
            Перейти к оформлению <span className="ic i_right"></span>
          </button>
        </>
      );
    }
  }
);

export default withRouter(CartSidebar);
