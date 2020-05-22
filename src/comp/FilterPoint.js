import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const FilterPoint = observer(
  class FilterPoint extends Component {
    state = {
      inFilter: false,
      classStyle: "filter__container",
    };

    clickHandler = (filterPoint) => {
      const { objectName, data, name } = this.props;
      const { activeFilters } = this.props.store;
      if (objectName === "measure") {
        console.log("object :>> 121221");
        const number = Object.keys(activeFilters[objectName]).indexOf(name);
        if (number === -1) {
          activeFilters[objectName][name] = [String(filterPoint)];
          console.log("[].push(data) ", [filterPoint]);
          console.log("filterPoint ", filterPoint);
          activeFilters.count += 1;
          activeFilters.choosePoint.push(objectName);
        } else {
          const valueNumber = activeFilters[objectName][name].indexOf(
            String(filterPoint)
          );
          if (valueNumber === -1) {
            activeFilters[objectName][name].push(String(filterPoint));
            activeFilters.count += 1;
          } else {
            activeFilters[objectName][name].splice(valueNumber, 1);
            activeFilters.count -= 1;
            console.log(
              "activeFilters[objectName][name].length :>> ",
              activeFilters[objectName][name].length
            );
            if (!activeFilters[objectName][name].length) {
              delete activeFilters[objectName][name];
            }
          }
        }
      } else {
        console.log(" 1:>> ");
        const number = activeFilters[objectName].indexOf(filterPoint);
        if (number === -1) {
          console.log(" 2:>> ");
          activeFilters[objectName].push(filterPoint);
          activeFilters.count += 1;
          activeFilters.choosePoint.push(objectName);
        } else {
          console.log(" 3:>> ");
          activeFilters.count -= 1;
          activeFilters[objectName].splice(number, 1);
          if (activeFilters[objectName].length) {
            console.log(" 4:>> ");
            const numberInChoose = activeFilters.choosePoint.indexOf(
              objectName
            );
            activeFilters.choosePoint.splice(numberInChoose, 1);
          }

          console.log(" 5:>> ");
        }
      }
    };

    render() {
      const { data, name } = this.props;
      const { classStyle } = this.state;
      const filterPoints = [];
      data.forEach((filterPoint) => {
        if (filterPoint != "") {
          filterPoints.push(
            <p
              className="filter__point"
              onClick={(e) => {
                e.target.classList.toggle("active");
                this.clickHandler(filterPoint);
              }}
              key={filterPoint}
            >
              {filterPoint}
            </p>
          );
        }
      });
      return (
        <div className="filter-block">
          <h3
            className="filter__name"
            onClick={(e) => {
              console.log("e", e.target);
              if (classStyle.includes("active")) {
                this.setState({ classStyle: "filter__container" });
              } else {
                this.setState({ classStyle: "filter__container active" });
              }
            }}
          >
            {name}
          </h3>
          <div className={classStyle}>{filterPoints}</div>
        </div>
      );
    }
  }
);

export default FilterPoint;
