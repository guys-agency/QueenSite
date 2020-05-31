import { observer } from "mobx-react";
import React from "react";
import ProductCard from "./ProductCard";
import Paginat from "./paginat";

const ProductCardContainer = observer(
  class ProductCardContainer extends React.Component {
    state = { ready: false };

    testContainer = [];

    test = (data) => {
      this.props.ch(data);
    };

    createProductContainer = () => {
      fetch("http://127.0.0.1:3010", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start: 0, stop: 50 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          Object.keys(data).forEach((element) => {
            this.testContainer.push(
              <ProductCard
                key={data[element].slug}
                data={data[element]}
                store={this.props.store}
              />
            );
          });
          this.props.store.productsToRender = this.testContainer;
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch("http://127.0.0.1:3010/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.props.store.createFilterPointsContainers(data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    render() {
      return (
        <div className="col col-9 col-t-8">
          <div className="row row_inner">
            {this.props.store.productsToRender}
            {this.props.store.paginatCont}
          </div>
        </div>
      );
    }

    // componentDidMount() {
    //   this.createProductContainer();
    // }
  }
);

export default ProductCardContainer;
