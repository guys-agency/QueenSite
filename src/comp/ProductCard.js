import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import localStorage from "mobx-localstorage";

const ProductCard = observer(function ProductCard(props) {
  const clickHandler = (e) => {
    const { data, store } = props;

    if (e.target.classList.contains("i_bag")) {
      const cardData = Object.assign(data, {
        countInCart: 1,
      });
      if (
        localStorage.get("productInCart") &&
        Object.keys(localStorage.get("productInCart")).length
      ) {
        const pc = localStorage.get("productInCart");

        if (Object.keys(pc).includes(cardData.slug)) {
          console.log("object :>> ");
          pc[cardData.slug].countInCart += 1;
        } else {
          pc[cardData.slug] = cardData;
        }
        localStorage.setItem("productInCart", pc);
      } else
        localStorage.setItem("productInCart", {
          [cardData.slug]: cardData,
        });
    } else {
      store.cardContainer = data;
      props.history.push(`/product/${data.slug}`, { test: "test" });

      store.productPage = true;
      store.cartPage = false;
    }
  };

  const { data } = props;
  let imagePath = "/image/products/" + data.path_to_photo[0];

  return (
    <div className="product" onClick={clickHandler}>
      <div className="product__image">
        <div className="product__image-wrp">
          <img src={imagePath} />
          <div className="product__attr-cont">
            {data.hit && <div className="product__hit">Хит</div>}
            {data.sale && <div className="product__sale">Акция</div>}
            {data.new && <div className="product__new">Новинка</div>}
          </div>
        </div>
        <div className="product__action">
          <button className="ic i_fav"></button>
          <button className="ic i_bag"></button>
        </div>
      </div>
      <h3 className="product__name">{data.name}</h3>
      {data.sale ? (
        <div className={"product__price product__price_disc"}>
          <span className="old">{data.regular_price} ₽</span>{" "}
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
