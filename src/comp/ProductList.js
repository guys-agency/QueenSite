import { observer } from "mobx-react";
import React from "react";
import Fade from "react-reveal/Fade";
import $ from "jquery";
import api from "./api";

import { Link } from "react-router-dom";

const { Component } = React;

const ProductList = observer(
  class ProductList extends Component {
    state = {
      show: true,
    };

    changeCertSum = (elNew) => {
      const { productInCartList, addtoCart, productInCart } = this.props.store;
      // console.log("el :>> ", this.props.el);
      if (this.props.el === elNew) {
        return;
      } else {
        const newProductInCartList = {};
        Object.keys(productInCartList).forEach((slug) => {
          if (slug !== this.props.el) {
            newProductInCartList[slug] = productInCartList[slug];
          } else {
            newProductInCartList[elNew] = productInCartList[slug];
          }
          this.props.store.productInCartList = newProductInCartList;
        });
        addtoCart(false);
      }
    };

    deteleProduct = (el) => {
      const { productInCartList, addtoCart, productInCart } = this.props.store;
      const { data } = this.props;
      setTimeout(() => {
        delete productInCart[el];
        delete productInCartList[el];
        addtoCart(true);
        if (this.props.clearDeliveryData) {
          this.props.clearDeliveryData();
        }
      }, 500);
      this.setState({ show: false });
      if (process.env.REACT_APP_TYPE === "prod") {
        window.dataLayer.push({
          ecommerce: {
            remove: {
              products: [
                {
                  id: data.slug,
                  name: data.name,
                  price: data.price,
                  brand: data.brand,
                },
              ],
            },
          },
        });
      }
    };

    clickPlus = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      const { data } = this.props;
      productInCartList[el] += 1;
      addtoCart(false);
      if (process.env.REACT_APP_TYPE === "prod") {
        window.dataLayer.push({
          ecommerce: {
            add: {
              products: [
                {
                  id: data.slug,
                  name: data.name,
                  price: data.price,
                  brand: data.brand,
                  quantity: 1,
                },
              ],
            },
          },
        });

        window._tmr.push({
          type: "itemView",
          productid: String(this.data.slug),
          pagetype: "cart",
          list: "1",
          totalvalue: String(this.data.price),
        });
      }
      if (this.props.clearDeliveryData) {
        this.props.clearDeliveryData();
      }
    };

    clickMinus = (el) => {
      const { productInCartList, addtoCart } = this.props.store;
      const { data } = this.props;
      productInCartList[el] -= 1;
      addtoCart(false);
      if (process.env.REACT_APP_TYPE === "prod") {
        window.dataLayer.push({
          ecommerce: {
            remove: {
              products: [
                {
                  id: data.slug,
                  name: data.name,
                  price: data.price,
                  brand: data.brand,
                  quantity: 1,
                },
              ],
            },
          },
        });
      }
      if (this.props.clearDeliveryData) {
        this.props.clearDeliveryData();
      }
    };

    render() {
      const { data, el, store, cart } = this.props;
      const { productInCartList, likeContainer, addToLike, addtoCart, certInCart } = store;
      const itsSert = data.name === "Электронный подарочный сертификат";
      let inCart;

      if (!cart) {
        inCart = Object.keys(store.productInCartList).length ? Object.keys(store.productInCartList).indexOf(String(data.slug)) : -1;

        if (data.name === "Электронный подарочный сертификат" && certInCart) {
          inCart = Object.keys(this.props.store.productInCartList).indexOf(certInCart);
        }
      }

      const itsNotCert = typeof productInCartList[el] === "number";

      return (
        <Fade distance="50px" duration={500} right when={this.state.show}>
          <div className="product product_h">
            <div className="product__image">
              <div className="product__image-wrp">
                <img
                  src={data.path_to_photo !== undefined ? "/image/items/" + data.path_to_photo[0] : "/image/Category/Product-card/Placeholder.png"}
                />
              </div>
            </div>
            <div className="product__info">
              <Link className="product__name" to={"/product/" + el}>
                {data.name}
              </Link>
              {data.sale ? (
                data.sale_price !== 0 ? (
                  productInCartList[el] !== undefined ? (
                    <div className={"product__price product__price_disc"}>
                      <span className="old">{(productInCartList[el] * data.regular_price).toLocaleString()} ₽</span>{" "}
                      {(productInCartList[el] * data.sale_price).toLocaleString()} ₽{" "}
                      <span className={`disc_perc ${data.bfsale ? " disc_perc-bf" : ""}`}>
                        {((data.sale_price / data.regular_price - 1) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ) : (
                    <div className={"product__price product__price_disc"}>
                      <span className="old">{data.regular_price.toLocaleString()} ₽</span> {data.sale_price.toLocaleString()} ₽{" "}
                      <span className={"disc_perc" + data.bfsale ? " disc_perc-bf" : ""}>
                        {((data.sale_price / data.regular_price - 1) * 100).toFixed(0)}%
                      </span>
                    </div>
                  )
                ) : (
                  <div className={"product__price product__price_text"}>
                    <span className="old">{(productInCartList[el] * data.regular_price).toLocaleString()} ₽</span> Бесплатно
                  </div>
                )
              ) : productInCartList[el] !== undefined && itsNotCert ? (
                <div className={"product__price"}>{(productInCartList[el] * data.regular_price).toLocaleString()} ₽ </div>
              ) : (
                <div className={"product__price"}>{data.regular_price.toLocaleString()} ₽ </div>
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
                    api.updateCountStats(data._id, "like");
                    addToLike();
                  }}
                ></button>
              )}
              {cart ? (
                itsNotCert ? (
                  <div className="product__counter">
                    <button
                      className="ic i_minus"
                      onClick={() => {
                        if (productInCartList[el] > 1) {
                          this.clickMinus(el);
                        }
                      }}
                    ></button>
                    <input min="1" max="100" type="number" value={productInCartList[el]} readOnly />
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
                  <>
                    {window.location.pathname.includes("/cart") && (
                      <p
                        className="gift__change-text"
                        onClick={() => {
                          this.props.store.sideGift = true;
                          document.querySelector(".sidebar-overlay").classList.add("active");
                        }}
                      >
                        Текст поздравления
                      </p>
                    )}
                    <div
                      className="product__counter gift__drop-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.target.classList.toggle("active");
                        var drop = document.querySelector(".drop_shop");

                        $(".drop_shop").offset({
                          top: $(".gift__drop-btn").offset().top + $(".gift__drop-btn").height() + 12,
                          left: $(".gift__drop-btn").offset().left,
                        });
                        $(".drop_shop").width($(".gift__drop-btn").width());
                        drop.classList.toggle("visible");
                      }}
                    >
                      <p>Номинал {data.regular_price.toLocaleString()} ₽</p>
                      <img src="/image/>.svg"></img>
                    </div>
                    <div className="drop drop_shop">
                      <div className="drop_shop-list">
                        <div
                          className="gift__link"
                          onClick={() => {
                            this.changeCertSum("1111");
                          }}
                        >
                          Номинал 1 000 ₽
                        </div>
                        <div
                          className="gift__link"
                          onClick={() => {
                            this.changeCertSum("1112");
                          }}
                        >
                          Номинал 3 000 ₽
                        </div>
                        <div
                          className="gift__link"
                          onClick={() => {
                            this.changeCertSum("1113");
                          }}
                        >
                          Номинал 5 000 ₽
                        </div>
                        <div
                          className="gift__link"
                          onClick={() => {
                            this.changeCertSum("1114");
                          }}
                        >
                          Номинал 10 000 ₽
                        </div>
                      </div>
                    </div>
                  </>
                )
              ) : (
                <button
                  className={"ic i_bag" + (inCart === -1 ? "" : " active")}
                  onClick={() => {
                    if (inCart !== -1) {
                      delete productInCartList[data.slug];
                      if (process.env.REACT_APP_TYPE === "prod") {
                        window.dataLayer.push({
                          ecommerce: {
                            remove: {
                              products: [
                                {
                                  id: data.slug,
                                  name: data.name,
                                  price: data.price,
                                  brand: data.brand,
                                },
                              ],
                            },
                          },
                        });
                      }
                    } else {
                      if (itsSert) {
                        productInCartList[data.slug] = "";
                      } else {
                        productInCartList[data.slug] = 1;
                      }

                      if (process.env.REACT_APP_TYPE === "prod") {
                        window.dataLayer.push({
                          ecommerce: {
                            add: {
                              products: [
                                {
                                  id: data.slug,
                                  name: data.name,
                                  price: data.price,
                                  brand: data.brand,
                                  quantity: 1,
                                },
                              ],
                            },
                          },
                        });

                        window._tmr.push({
                          type: "itemView",
                          productid: String(this.data.slug),
                          pagetype: "cart",
                          list: "1",
                          totalvalue: String(this.data.price),
                        });
                      }
                    }
                    addtoCart(true);
                  }}
                ></button>
              )}
            </div>
          </div>
        </Fade>
      );
    }
  }
);

export default ProductList;
