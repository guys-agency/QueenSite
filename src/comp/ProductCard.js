import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import localStorage from "mobx-localstorage";

const ProductCard = observer(function ProductCard(props) {
  const { data, store } = props;

  const inLike = store.likeContainer.length
    ? store.likeContainer.indexOf(String(data.slug))
    : -1;
  const inCart = Object.keys(store.productInCartList).length
    ? Object.keys(store.productInCartList).indexOf(String(data.slug))
    : -1;

  // console.log("inLike :>> ", store.productInCartList);
  //придумать, как не вызывать все это заного у всех при изменении у одного
  const clickHandler = (e) => {
    if (e.target.classList.contains("i_bag")) {
      const { productInCartList, addtoCart } = store;
      console.log("inCart :>> ", inCart);
      if (inCart !== -1) {
        console.log("test123 :>> ");

        delete productInCartList[data.slug];
      } else {
        productInCartList[data.slug] = 1;
      }
      addtoCart(true);
    } else if (e.target.classList.contains("i_fav")) {
      const { likeContainer, addToLike } = store;

      if (inLike !== -1) {
        likeContainer.splice(inLike, 1);
      } else {
        likeContainer.unshift(String(data.slug));
      }
      addToLike();
    } else {
      store.cardContainer = data;
      props.history.push(`/product/${data.slug}`, { test: "test" });

      store.productPage = true;
      store.cartPage = false;
    }
  };

  let imagePath = "/image/products/" + data.path_to_photo[0];

  return (
    <div className="product" onClick={clickHandler}>
      <div className="product__image">
        <div className="product__image-wrp">
          <img src={imagePath} />
          <div className="product__attr-cont">
            {data.hit && <div className="product__hit">Хит</div>}
            {data.sale && <div className="product__sale">Акция</div>}
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
    </div>
  );
});

export default withRouter(ProductCard);
