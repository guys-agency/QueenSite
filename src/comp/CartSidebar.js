import { observer } from "mobx-react";
import React from "react";
import ProductList from "./ProductList";
import { withRouter } from "react-router";

const { Component } = React;

const CartSidebar = observer(
  class CartSidebar extends Component {
    state = {};
    render() {
      const {
        productInCart,
        productInCartList,
        addtoCart,
        dontSaleProdCount,
        certInCart,
      } = this.props.store;
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
          const quant = certInCart !== el ? productInCartList[el] : 1;
          totalPrice += productInCart[el].sale
            ? quant * productInCart[el].sale_price
            : quant * productInCart[el].regular_price;

          totalSale += productInCart[el].sale
            ? (productInCart[el].regular_price - productInCart[el].sale_price) *
              quant
            : 0;
          totalFullprice += quant * productInCart[el].regular_price;
        });
      }
      return (
        <>
          <div className="sidebar__total">
            <b>Итого:</b>{" "}
            <b className="price">{totalPrice.toLocaleString()} ₽</b>
          </div>
          {/* {dontSaleProdCount !== 0 && dontSaleProdCount % 3 !== 0 ? (
            <Link
              to="/main/1+13"
              className="one-plus-one"
              onClick={this.props.closeSidebar}
            >
              Добавьте еще{" "}
              {3 * (Math.floor(dontSaleProdCount / 3) + 1) - dontSaleProdCount}{" "}
              {num2str(
                3 * (Math.floor(dontSaleProdCount / 3) + 1) - dontSaleProdCount,
                ["товар", "товара", "товаров"]
              )}{" "}
              из акции <p className="disc_perc">1 + 1 = 3</p>
            </Link>
          ) : null} */}

          <div className="sidebar__over">
            <div className="cart__list">{productList}</div>
          </div>
          {productList.length > 0 && (
            <a
              href="/cart"
              className="btn btn_yellow btn_wide btn_bottom"
              style={{ minHeight: "50px" }}
              // onClick={() => {
              //   this.props.history.push("/cart");
              //   this.props.closeSidebar();
              // }}
            >
              Перейти к оформлению <span className="ic i_right"></span>
            </a>
          )}
        </>
      );
    }
  }
);

export default withRouter(CartSidebar);
