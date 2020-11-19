import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import localStorage from "mobx-localstorage";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import api from "./api";

const ProductCard = observer(function ProductCard(props) {
  const { data, store } = props;

  const { productInCartList, addtoCart, certInCart } = store;

  const inLike = store.likeContainer.length
    ? store.likeContainer.indexOf(String(data.slug))
    : -1;
  let inCart = Object.keys(store.productInCartList).length
    ? Object.keys(store.productInCartList).indexOf(String(data.slug))
    : -1;

  if (Object.keys(productInCartList).length) {
    if (data.name === "Электронный подарочный сертификат" && certInCart) {
      inCart = Object.keys(productInCartList).indexOf(certInCart);
    }
  }

  // console.log("inLike :>> ", store.productInCartList);
  //придумать, как не вызывать все это заного у всех при изменении у одного
  const clickHandler = (e) => {
    if (e.target.classList.contains("i_bag")) {
      // console.log("bag :>> ");
      e.preventDefault();

      if (inCart !== -1) {
        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);

        $(".tooltip_cart").find(".ic").removeClass("i_fav");
        $(".tooltip_cart").find(".ic").removeClass("i_plus");
        $(".tooltip_cart").find(".ic").addClass("i_minus");

        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);

        if (data.name === "Электронный подарочный сертификат") {
          delete productInCartList[certInCart];
        } else {
          delete productInCartList[data.slug];
        }
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
        if (data.name === "Электронный подарочный сертификат") {
          productInCartList[data.slug] = "";
        } else {
          productInCartList[data.slug] = 1;
        }

        $(".tooltip_cart").find(".ic").removeClass("i_fav-f");
        $(".tooltip_cart").find(".ic").removeClass("i_minus");
        $(".tooltip_cart").find(".ic").addClass("i_plus");

        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);
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
        }
      }
      api.updateCountStats(data._id, "cart");
      addtoCart(true);
    } else if (e.target.classList.contains("i_fav")) {
      // console.log("like :>> ");
      e.preventDefault();
      const { likeContainer, addToLike } = store;

      if (inLike !== -1) {
        likeContainer.splice(inLike, 1);

        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);

        $(".tooltip_cart").find(".ic").removeClass("i_fav-f");
        $(".tooltip_cart").find(".ic").removeClass("i_plus");
        $(".tooltip_cart").find(".ic").addClass("i_minus");
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);
      } else {
        likeContainer.unshift(String(data.slug));

        $(".tooltip_cart").addClass("visible");
        $(".tooltip_cart").find(".text").text(data.name);

        $(".tooltip_cart").find(".ic").removeClass("i_plus");
        $(".tooltip_cart").find(".ic").removeClass("i_minus");
        $(".tooltip_cart").find(".ic").addClass("i_fav-f");
        setTimeout(() => {
          $(".tooltip_cart").removeClass("visible");
        }, 2000);
        api.updateCountStats(data._id, "like");
      }
      addToLike();
    } else {
      // console.log("data :>> ");
      e.stopPropagation();

      store.cardContainer = data;
      return true;
      // props.history.push(`/product/${data.slug}`);

      // store.productPage = true;
      // store.cartPage = false;
    }
  };

  let imagePath = `/image/items/${data.path_to_photo[0]}`;

  return (
    // <Link className="product" to={`/product/${data.slug}`}>
    <Link
      className="product"
      to={`/product/${data.slug}`}
      onClick={clickHandler}
    >
      <div className="product__image">
        <div className="product__image-wrp">
          <LazyLoadImage effect="blur" src={imagePath} />
          <div className="product__attr-cont">
            {data.hit && <div className="product__hit">Хит</div>}
            {data.sale && <div className="product__sale">Акция</div>}
            {/* {!data.sale &&
              data.categories[0].childsSlug[0] !== "sertificats" && (
                <div className="product__sale">1 + 1 = 3</div>
              )} */}
            {/* {data.new && <div className="product__new">Новинка</div>} */}
          </div>
        </div>
        <div className="product__action">
          <button
            className={"ic i_fav" + (inLike === -1 ? "" : " active")}
          ></button>
          <button
            className={"ic i_bag" + (inCart === -1 ? "" : " active")}
          ></button>
        </div>
      </div>
      <h3 className="product__name">{data.name}</h3>
      {data.sale ? (
        <div className={"product__price product__price_disc"}>
          <span className="old">{data.regular_price.toLocaleString()} ₽</span>{" "}
          {data.sale_price.toLocaleString()} ₽{" "}
          <span className="disc_perc">
            {((data.sale_price / data.regular_price - 1) * 100).toFixed(0)}%
          </span>
        </div>
      ) : (
        <div className={"product__price"}>
          {data.regular_price.toLocaleString()} ₽{" "}
        </div>
      )}
      {/* <p className="product__brand">{data.brand}</p> */}
      {/* <p className="product__price">{data.regular_price.toLocaleString()} ₽</p> */}
    </Link>
  );
});

export default withRouter(ProductCard);
