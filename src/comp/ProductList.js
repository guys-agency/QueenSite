import { observer } from "mobx-react";
import React from "react";

import { Link } from "react-router-dom";

const { Component } = React;

const ProductList = observer(
  class ProductList extends Component {
    state = {};

    deteleProduct = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      delete productInCartList[el];
      addtoCart(true);
    };

    clickPlus = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      productInCartList[el] += 1;
      addtoCart(false);
    };

    clickMinus = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      productInCartList[el] -= 1;
      addtoCart(false);
    };

    render() {
      const { data, el, store, cart } = this.props;
      const { productInCartList, likeContainer, addToLike, addtoCart } = store;
      let inCart;

      if (!cart) {
        inCart = Object.keys(store.productInCartList).length
          ? Object.keys(store.productInCartList).indexOf(String(data.slug))
          : -1;
      }

      return (
        <div className="product product_h">
          <div className="product__image">
            <div className="product__image-wrp">
              <img
                src={
                  data.path_to_photo !== undefined
                    ? "/image/products/" + data.path_to_photo[0]
                    : "/image/Category/Product-card/Placeholder.png"
                }
              />
            </div>
          </div>
          <div className="product__info">
            <Link className="product__name" to={"/product/" + el}>
              {data.name}
            </Link>
            {data.sale ? (
              <div className={"product__price product__price_disc"}>
                <span className="old">{data.regular_price} ₽</span>{" "}
                {data.sale_price.toLocaleString()} ₽{" "}
                <span className="disc_perc">
                  {((data.sale_price / data.regular_price - 1) * 100).toFixed(
                    0
                  )}
                  %
                </span>
              </div>
            ) : (
              <div className={"product__price"}>
                {data.regular_price.toLocaleString()} ₽{" "}
              </div>
            )}
            {cart ? (
              <button
                className="ic i_close"
                onClick={() => {
                  this.deteleProduct(el);
                }}
              ></button>
            ) : (
              <button
                className="ic i_fav active"
                onClick={() => {
                  likeContainer.splice(likeContainer.indexOf(String(el)), 1);
                  addToLike();
                }}
              ></button>
            )}
            {cart ? (
              <div className="product__counter">
                <button
                  className="ic i_minus"
                  onClick={() => {
                    if (productInCartList[el] > 1) {
                      this.clickMinus(el);
                    }
                  }}
                ></button>
                <input
                  min="1"
                  max="100"
                  type="number"
                  value={productInCartList[el]}
                />
                <button
                  className="ic i_plus"
                  onClick={() => {
                    if (productInCartList[el] < data.stock_quantity) {
                      this.clickPlus(el);
                    }
                  }}
                ></button>
              </div>
            ) : (
              <button
                className={"ic i_bag" + (inCart === -1 ? "" : " active")}
                onClick={() => {
                  if (inCart !== -1) {
                    console.log("test123 :>> ");

                    delete productInCartList[data.slug];
                  } else {
                    productInCartList[data.slug] = 1;
                  }
                  addtoCart(true);
                }}
              ></button>
            )}
          </div>
        </div>
      );
    }
  }
);

export default ProductList;