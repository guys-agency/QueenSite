import { observer } from "mobx-react";
import React from "react";
import { useHistory } from "react-router-dom";
import localStorage from "mobx-localstorage";

const ProductCard = observer(function ProductCard(props) {
  let history = useHistory();
  const clickHandler = (e) => {
    const { data, store } = props;
    console.log("currentTarget :>> ", e.target);
    if (e.target.classList.contains("i_bag")) {
      const cardData = Object.assign(data, {
        countInCart: 1,
      });
      if (
        localStorage.get("productInCart") &&
        Object.keys(localStorage.get("productInCart")).length
      ) {
        console.log("object :>> 123123123123123");
        const pc = localStorage.get("productInCart");
        console.log(
          "Object.keys(pc).includes(this.cardData.slug) :>> ",
          Object.keys(pc).includes(cardData.slug)
        );
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
      history.push(`/product/${data.slug}`);
      store.productPage = true;
      store.cartPage = false;
    }
  };

  const { data } = props;
  let imagePath = "/image/products/";

  data.meta_data.forEach((elem) => {
    if (elem.key === "path_to_photo") {
      const imageCont = elem.value.split(",");
      imagePath = imagePath + imageCont[0];
    }
  });

  return (
    <div className="product" onClick={clickHandler}>
      <div className="product__image">
        <div className="product__image-wrp">
          <img src={imagePath} />
          <div className="product__attr-cont">
            <div className="product__hit">Хит</div>
            <div className="product__sale">Акция</div>
            <div className="product__new">Новинка</div>
          </div>
        </div>
        <div className="product__action">
          <button className="ic i_fav"></button>
          <button className="ic i_bag"></button>
        </div>
      </div>
      <h3 className="product__name">{data.name}</h3>
      {/* <p className="product__brand">{data.brand}</p> */}
      <p className="product__price">{data.regular_price.toLocaleString()} ₽</p>
    </div>
  );
});

export default ProductCard;
