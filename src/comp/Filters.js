import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Filters = observer(
  class Filters extends Component {
    state = {};

    activeFilters = {
      brand: [],
      material: [],
      country: [],
      color: [],
      measure: [],
      count: 0,
      choosePoint: [],
    };

    render() {
      const { filterPointsContainers } = this.props.store;

      const { parentName, childName } = this.props;

      // if () {
      //   console.log("parentName", parentName);

      //   this.props.store.nameMainCat = parentName;
      //   this.props.store.nameSecondCat = childName;
      // }

      return <div className="filters-block">{filterPointsContainers}</div>;
    }
  }
);

export default Filters;
