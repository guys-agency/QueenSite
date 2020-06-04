import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
const { Component } = React;

const FilterPoint = observer(
  class FilterPoint extends Component {
    state = {
      inFilter: false,
      classStyle: "filter__container",
    };

    clickHandler = (filterPoint) => {
      const { objectName, data, name } = this.props;
      const { activeFilters, filtration, prodSlugs } = this.props.store;
      const start = new Date();
      let searchQt = "";
      if (objectName === "measure") {
        const number = Object.keys(activeFilters[objectName]).indexOf(name);
        if (number === -1) {
          activeFilters[objectName][name] = [String(filterPoint)];

          activeFilters.count += 1;
          activeFilters.choosePoint.push(objectName);
          console.log("number :>> ", number);
        } else {
          const valueNumber = activeFilters[objectName][name].indexOf(
            String(filterPoint)
          );
          console.log("valueNumber :>> ", valueNumber);
          if (valueNumber === -1) {
            activeFilters[objectName][name].push(String(filterPoint));
            activeFilters.count += 1;
          } else {
            activeFilters[objectName][name].splice(valueNumber, 1);
            activeFilters.count -= 1;

            if (!activeFilters[objectName][name].length) {
              delete activeFilters[objectName][name];
            }
          }
        }
      } else {
        const number = activeFilters[objectName].indexOf(filterPoint);

        if (number === -1) {
          activeFilters[objectName].push(filterPoint);
          activeFilters.count += 1;
          if (activeFilters.choosePoint.indexOf(objectName) === -1)
            activeFilters.choosePoint.push(objectName);
        } else {
          activeFilters.count -= 1;
          activeFilters[objectName].splice(number, 1);

          if (!activeFilters[objectName].length) {
            const numberInChoose = activeFilters.choosePoint.indexOf(
              objectName
            );
            activeFilters.choosePoint.splice(numberInChoose, 1);
          }
        }
      }
      console.log("activeFilters.count :>> ", activeFilters.count);
      if (activeFilters.count) {
        activeFilters.choosePoint.forEach((filterName) => {
          if (filterName !== "choosePoint") {
            if (filterName !== "measure") {
              if (activeFilters[filterName].length) {
                if (!searchQt.length) {
                  searchQt =
                    filterName + "=" + activeFilters[filterName].join();
                } else {
                  searchQt +=
                    "&&" + filterName + "=" + activeFilters[filterName].join();
                }
              }
            } else {
              console.log("filterPoint", filterPoint);
              if (Object.keys(activeFilters[filterName]).length) {
                Object.keys(activeFilters[filterName]).forEach((ind) => {
                  console.log("ind :>> ", activeFilters[filterName][ind]);
                  if (!searchQt.length) {
                    searchQt =
                      filterName +
                      "=" +
                      name +
                      "!~" +
                      activeFilters[filterName][ind].join(",");
                  } else {
                    searchQt +=
                      "&&" +
                      filterName +
                      "=" +
                      name +
                      "!~" +
                      activeFilters[filterName][ind].join(",");
                  }
                });
              }
            }
          }
        });
        // console.log("onePointFilter :>> ", onePointFilter);
      }
      this.props.store.startPag = 0;
      this.props.store.stopPag = 42;
      console.log("TESTTESTTEST :>> ");
      console.log("activeFilters!!!!!! :>> ", activeFilters);
      const stop = new Date();
      console.log("time :>> ", stop - start);
      this.props.history.replace({ search: searchQt });
      // filtration();
    };

    render() {
      const { data, name, objectName } = this.props;
      const { classStyle } = this.state;
      const { activeFilters } = this.props.store;
      let active = false;
      let act = false;
      const filterPoints = [];
      data.forEach((filterPoint) => {
        if (filterPoint != "") {
          let number;
          if (objectName === "measure") {
            if (Object.keys(activeFilters[objectName]).includes(name)) {
              number = activeFilters[objectName][name].includes(
                String(filterPoint)
              );
            }
          } else {
            number = activeFilters[objectName].includes(filterPoint);
          }
          if (number) {
            active = true;
          }
          filterPoints.push(
            <span
              className={!number ? "filter__point" : "filter__point active"}
              onClick={(e) => {
                e.target.classList.toggle("active");
                this.clickHandler(filterPoint);
              }}
              key={filterPoint}
            >
              {filterPoint}
            </span>
          );
        }
      });

      return (
        filterPoints.length > 0 && (
          <div className="filter-block">
            <h3
              className={active ? "filter__name active" : "filter__name"}
              onClick={(e) => {
                e.target.classList.toggle("active");
                if (classStyle.includes("active")) {
                  this.setState({ classStyle: "filter__container" });
                } else {
                  this.setState({ classStyle: "filter__container active" });
                }
              }}
            >
              {name}
              <div className="ic i_drop"></div>
            </h3>
            <div className={classStyle}>{filterPoints}</div>
          </div>
        )
      );
    }
  }
);

export default withRouter(FilterPoint);
