import { observer } from "mobx-react";
import React from "react";
import ProductList from "./ProductList";
import LikeButton from "./LikeButton";
import { withRouter } from "react-router";
import num2str from "../ulits/nm2wrd";
import { Link } from "react-router-dom";

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
      } = this.props.store;
      const { deliveryData } = this.state;

      const productList = [];
      let totalPrice = 0;
      let totalSale = 0;
      let totalFullprice = 0;
      let address = "";

      if (Object.keys(productInCart).length) {
        // Object.keys(productInCart).forEach((el) => {
        //   if (!productInCart[el].sale) {
        //     dontSaleProdCount += +productInCartList[el];
        //     dontSaleProd.push(productInCart[el]);
        //   }
        // });

        // if (dontSaleProdCount > 0 && dontSaleProdCount % 3 === 0) {
        //   let minProd = 0;
        //   let minProdSlug = 0;
        //   const minProdSlugs = [];
        //   // for (var k = 0; k < dontSaleProdCount / 3; k++) {
        //   //   for (var i = 0; i < Object.keys(productInCart).length; i++) {
        //   //     if (!productInCart[Object.keys(productInCart)[i]].sale) {
        //   //       if (!minProdSlug)
        //   //         minProd =
        //   //           productInCart[Object.keys(productInCart)[i]].regular_price;
        //   //       if (
        //   //         minProd >
        //   //         productInCart[Object.keys(productInCart)[i]].regular_price
        //   //       ) {
        //   //         minProd =
        //   //           productInCart[Object.keys(productInCart)[i]].regular_price;
        //   //         minProdSlugs.push(Object.keys(productInCart)[i]);
        //   //         minProdSlug = Object.keys(productInCart)[i];
        //   //       }
        //   //     }
        //   //   }
        //   // }
        //   dontSaleProd.sort((a, b) => {
        //     if (a < b) return -1;
        //     if (a > b) return 1;
        //     return 0;
        //   });
        //   console.log("dont :>> ", dontSaleProd);
        //   minProdSlugs.push(minProdSlug);
        //   let dontSaleProdCountIn = dontSaleProdCount / 3;
        //   console.log("minProdSlugs :>> ", minProdSlugs);
        //   for (let index = 0; index < dontSaleProd.length; index++) {
        //     if (
        //       productInCartList[dontSaleProd[index].slug] ===
        //       dontSaleProdCountIn
        //     ) {
        //       productInCart[dontSaleProd[index].slug].regular_price = 0;
        //       break;
        //     } else if (
        //       productInCartList[dontSaleProd[index].slug] > dontSaleProdCountIn
        //     ) {
        //       productInCart[dontSaleProd[index].slug].sale_price =
        //         (productInCart[dontSaleProd[index].slug].regular_price *
        //           productInCartList[dontSaleProd[index].slug]) /
        //         dontSaleProdCountIn;
        //       productInCart[dontSaleProd[index].slug].sale = true;
        //       break;
        //     } else if (
        //       productInCartList[dontSaleProd[index].slug] < dontSaleProdCountIn
        //     ) {
        //       productInCart[dontSaleProd[index].slug].regular_price = 0;
        //       dontSaleProdCountIn -=
        //         productInCartList[dontSaleProd[index].slug];
        //     }
        //   }
        // }

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
          <div className="sidebar__total">
            <b>Итого:</b>{" "}
            <b className="price">{totalPrice.toLocaleString()} ₽</b>
          </div>
          {dontSaleProdCount !== 0 && dontSaleProdCount % 3 !== 0 ? (
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
          ) : null}

          <div className="sidebar__over">
            <div className="cart__list">{productList}</div>
          </div>
          {productList.length > 0 && (
            <button
              className="btn btn_yellow btn_wide btn_bottom"
              onClick={() => {
                this.props.history.push("/cart");
                this.props.closeSidebar();
              }}
            >
              Перейти к оформлению <span className="ic i_right"></span>
            </button>
          )}
        </>
      );
    }
  }
);

export default withRouter(CartSidebar);
