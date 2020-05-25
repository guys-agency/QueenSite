import { observer } from "mobx-react";
import React from "react";
import { useHistory } from "react-router-dom";

const ProductCard = observer(function ProductCard(props) {
  let history = useHistory();
  const clickHandler = () => {
    const { data, store } = props;
    store.cardContainer = data;
    history.push(`/product/${data.slug}`);
    store.productPage = true;
    store.cartPage = false;
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
