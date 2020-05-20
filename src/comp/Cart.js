import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
const { Component } = React;

const Cart = observer(
  class Cart extends Component {
    state = {};
    openCart = () => {
      this.props.store.cartPage = true;
      this.props.store.productPage = false;
    };
    render() {
      return (
        <p>
          <Link to="/cart"> Корзина + {this.props.store.cartCount}</Link>
        </p>
      );
    }
  }
);

export default Cart;
