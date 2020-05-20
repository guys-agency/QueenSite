import { observer } from "mobx-react";
import React from "react";
import { createBrowserHistory } from "history";
const { Component } = React;
const historyAll = createBrowserHistory();

//TODO: исправить вывод стоимости во время скидки
const CardView = observer(
  class CardView extends Component {
    state = {};

    countInCart = 1;
    inCart = false;

    cardData = Object.assign(this.props.data, {
      countInCart: this.countInCart,
    });

    clickHandler = () => {
      const { data, store } = this.props;
      if (!this.inCart) {
        store.productInCart.push(this.cardData);
        this.inCart = true;
      } else {
        this.cardData.countInCart += 1;
      }
      store.cartCount += 1;
    };

    close = () => {
      historyAll.goBack();
      this.props.store.productPage = false;
    };

    render() {
      const { data } = this.props;

      return (
        <div className="card-view-containet">
          <div className="card">
            <p onClick={this.close}>Закрыть</p>
            <div className="card__image-block"></div>
            <div className="card__description-block">
              <h3 className="card__name">{data.name}</h3>
              <div className="card__p-a">
                <p className="card__price">
                  {data.regular_price.toLocaleString() + " руб."}
                </p>
                <p className="card__article">{"Артикул: " + data.slug}</p>
              </div>
              <p className="card__description">{data.description}</p>
              <div className="card__spec">
                <ul>
                  <p>Детали:</p>
                  <li>{data.weight + " кг."}</li>
                  <li>
                    {data.dimensions.length.toLocaleString() +
                      " x " +
                      data.dimensions.width.toLocaleString() +
                      " x " +
                      data.dimensions.height.toLocaleString() +
                      " см."}
                  </li>
                  <li>{data.country}</li>
                  <li>{data.brand}</li>
                </ul>
                {(data.microwave || data.pm) && (
                  <ul>
                    <p>Можно использовать:</p>
                    {data.microwave && <li>в микроволновой печи</li>}
                    {data.pm && <li>в посудомоечной машине</li>}
                  </ul>
                )}
              </div>
              <p className="card__avaliable-name">Колличество</p>
              <div className="card__avaliable">
                <div className="card__count">
                  <div className="card__count-minus">-</div>
                  <div className="card__value">{this.countInCart}</div>
                  <div className="card__count-plus">+</div>
                </div>
                <p className="card__avaliable-desc">
                  {data.stock_quantity ? "Есть на складе" : "Отсутствует"}
                </p>
                <p className="card__delivery"></p>
              </div>
              <div className="card__buttons">
                <button className="card__btn" onClick={this.clickHandler}>
                  В корзину
                </button>
                <button className="card__btn">В избранное</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default CardView;
