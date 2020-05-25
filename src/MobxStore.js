import { observable, decorate, autorun } from "mobx";
import $ from "jquery";
import FilterPoint from "./comp/FilterPoint";
import ProductCard from "./comp/ProductCard";
import React from "react";
import Paginat from "./comp/paginat";

//1http://134.122.81.119/api
//127.0.0.1:3010
const mainAdressServ = "http://134.122.81.119";

class Store {
  productsToRender = [];
  filterPointsContainers = [];
  measurePointsContainers = [];
  optPointsContainers = [];
  activeFilters = {
    brand: [],
    material: [],
    country: [],
    color: [],
    measure: [],
    count: 0,
    choosePoint: [],
    attr: [],
    minPrice: 0,
    maxPrice: 0,
  };

  productValue = 0;

  filtCount = 0;

  categoryFilter = {};
  nameMainCat = "";

  nameSecondCat = "";

  cartCount = 0;
  productInCart = [];

  cardContainer = [];

  productPage = false;
  cartPage = false;

  minPrice = 0;
  maxPrice = 0;

  startPag = 0;
  stopPag = 42;

  paginatCont = [];

  getData = (filterArray, bodyJSON, bodyJSONFilter) => {
    const testContainer = [];
    if (!filterArray.length) {
      fetch(mainAdressServ, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(bodyJSON),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("dataData :>> ", data);
          Object.keys(data).forEach((element) => {
            testContainer.push(
              <div className="col col-4">
                <ProductCard
                  key={data[element].slug}
                  data={data[element]}
                  store={this}
                />
              </div>
            );
          });
          this.productsToRender = testContainer;
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch(mainAdressServ + "/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(bodyJSONFilter),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const sortData = {};

          Object.keys(data).forEach((name) => {
            if (
              (name !== "_id") &
              (name !== "minPrice") &
              (name !== "maxPrice") &
              (name !== "measure") &
              (name !== "count")
            ) {
              sortData[name] = data[name].sort();
            } else if (name == "measure") {
              const newMeasure = [];
              const sortObj = {
                names: [],
              };
              data[name].forEach((elem) => {
                if (elem.name != "") {
                  if (!sortObj.names.includes(elem.name[0])) {
                    sortObj.names.push(elem.name[0]);
                  }
                  if (sortObj[elem.name]) {
                    sortObj[elem.name].push(Number(elem.value[0]));
                  } else {
                    sortObj[elem.name] = [Number(elem.value[0])];
                  }
                  if (!sortObj[elem.name + "Unit"]) {
                    sortObj[elem.name + "Unit"] = elem.unit;
                  }
                }
              });
              sortObj.names.sort();

              sortObj.names.forEach((sn) => {
                newMeasure.push({
                  name: sn,
                  value: sortObj[sn].sort(function (a, b) {
                    return a - b;
                  }),
                  unit: sortObj[sn + "Unit"][0],
                });
              });
              sortData[name] = newMeasure;
            } else {
              sortData[name] = data[name];
            }
          });
          this.productValue = data.count;
          this.paginatCont = [<Paginat store={this} />];
          this.categoryFilter = sortData;

          //временная заплатка
          // if (Object.keys(data).length === 0) {
          //   console.log("object123");
          //   this.filtration();
          //   return;
          // }
          console.log("data :>> ", data);
          this.createFilterPointsContainers(sortData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      fetch(mainAdressServ, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(
          Object.assign(bodyJSON, {
            $and: filterArray,
          })
        ),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("dataData :>> ", data);
          Object.keys(data).forEach((element) => {
            testContainer.push(
              <div className="col col-4">
                <ProductCard
                  key={data[element].slug}
                  data={data[element]}
                  store={this}
                />
              </div>
            );
          });

          this.productsToRender = testContainer;
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch(mainAdressServ + "/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(
          Object.assign(bodyJSONFilter, {
            $and: filterArray,
          })
        ),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data2 :>> ", data);
          const sortData = {};

          Object.keys(data).forEach((name) => {
            if (
              (name !== "_id") &
              (name !== "minPrice") &
              (name !== "maxPrice") &
              (name !== "measure") &
              (name !== "count")
            ) {
              sortData[name] = data[name].sort();
            } else if (name == "measure") {
              const newMeasure = [];
              const sortObj = {
                names: [],
              };
              data[name].forEach((elem) => {
                if (elem.name != "") {
                  if (!sortObj.names.includes(elem.name[0])) {
                    sortObj.names.push(elem.name[0]);
                  }
                  if (sortObj[elem.name]) {
                    sortObj[elem.name].push(Number(elem.value[0]));
                  } else {
                    sortObj[elem.name] = [Number(elem.value[0])];
                  }
                  if (!sortObj[elem.name + "Unit"]) {
                    sortObj[elem.name + "Unit"] = elem.unit;
                  }
                }
              });
              sortObj.names.sort();

              sortObj.names.forEach((sn) => {
                newMeasure.push({
                  name: sn,
                  value: sortObj[sn].sort(function (a, b) {
                    return a - b;
                  }),
                  unit: sortObj[sn + "Unit"][0],
                });
              });
              sortData[name] = newMeasure;
            } else {
              sortData[name] = data[name];
            }
          });
          this.productValue = data.count;
          this.paginatCont.push(<Paginat store={this} />);
          this.createFilterPointsContainers(sortData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  cleaningActiveFilters = () => {
    const clearFilters = {
      brand: [],
      material: [],
      country: [],
      color: [],
      measure: [],
      count: 0,
      choosePoint: [],
      attr: [],
      minPrice: 0,
      maxPrice: 0,
    };

    this.activeFilters = Object.assign({}, clearFilters);
    this.categoryFilter = {};
  };

  filtration = autorun(() => {
    console.log("this.props.store.startPag", this.startPag);
    console.log("this.props.store.stopPag", this.stopPag);
    const filterArray = [];

    if (this.activeFilters.count) {
      this.startPag = 0;
      this.stopPag = 42;
      this.activeFilters.choosePoint.forEach((filterName) => {
        const onePointFilter = [];
        if (filterName !== "choosePoint") {
          if (filterName !== "measure") {
            if (this.activeFilters[filterName].length) {
              this.activeFilters[filterName].forEach((filterValue) => {
                onePointFilter.push({ [filterName]: filterValue });
                // } else {

                //   onePointFilter.push({ "attributes.name": filterValue.name,
                //   "attributes.value": filterValue.value});
              });
            }
          } else {
            if (Object.keys(this.activeFilters[filterName]).length) {
              Object.keys(this.activeFilters[filterName]).forEach((name) => {
                onePointFilter.push({
                  "attributes.name": name,
                  "attributes.value": {
                    $in: this.activeFilters[filterName][name],
                  },
                });
              });
            }
          }
        }
        if (onePointFilter.length) {
          filterArray.push({ $or: onePointFilter });
        }
      });
      // console.log("onePointFilter :>> ", onePointFilter);
    }

    if (this.activeFilters.maxPrice | this.activeFilters.minPrice) {
      const price = { regular_price: {} };
      if (this.activeFilters.maxPrice) {
        price.regular_price["$lte"] = Number(this.activeFilters.maxPrice);
      }
      if (this.activeFilters.minPrice) {
        price.regular_price["$gte"] = Number(this.activeFilters.minPrice);
      }
      filterArray.push(price);
    }

    if (this.activeFilters.attr.length) {
      this.activeFilters.attr.forEach((elem) => {
        filterArray.push({ [elem]: true });
      });
    }

    const bodyJSON = {
      start: this.startPag,
      stop: this.stopPag,
    };

    const bodyJSONFilter = {};

    if (
      this.nameMainCat !== "" &&
      this.nameSecondCat !== "" &&
      this.nameMainCat !== undefined &&
      this.nameSecondCat !== undefined
    ) {
      bodyJSON["categories.slugName"] = this.nameMainCat;
      bodyJSON["categories.childsSlug"] = this.nameSecondCat;
      bodyJSONFilter["categories.slugName"] = this.nameMainCat;
      bodyJSONFilter["categories.childsSlug"] = this.nameSecondCat;
    }

    //переделать, что бы не было лишних запросов
    this.getData(filterArray, bodyJSON, bodyJSONFilter);
  });

  createFilterPointsContainers = (availableFilters) => {
    this.minPrice = availableFilters.minPrice;
    this.maxPrice = availableFilters.maxPrice;

    const filterPoints = [];
    const measurePoints = [];
    const optPoints = [];
    Object.keys(availableFilters).forEach((filterType) => {
      if (filterType == "brand") {
        if (this.activeFilters.choosePoint.indexOf(filterType) != -1) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (
              name !== filterType &&
              this.activeFilters.choosePoint.indexOf(name) == -1
            ) {
              this.categoryFilter[name] = availableFilters[name];
            }
          });
          filterPoints.push(
            <FilterPoint
              name="Бренды"
              objectName={filterType}
              key={filterType}
              data={this.categoryFilter[filterType]}
              store={this}
            />
          );
        } else {
          filterPoints.push(
            <FilterPoint
              name="Бренды"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        }
      } else if (filterType == "material") {
        if (this.activeFilters.choosePoint.indexOf(filterType) != -1) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (
              name !== filterType &&
              this.activeFilters.choosePoint.indexOf(name) == -1
            ) {
              this.categoryFilter[name] = availableFilters[name];
            }
          });
          filterPoints.push(
            <FilterPoint
              name="Материалы"
              objectName={filterType}
              key={filterType}
              data={this.categoryFilter[filterType]}
              store={this}
            />
          );
        } else {
          filterPoints.push(
            <FilterPoint
              name="Материалы"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        }
      } else if (filterType == "country") {
        if (this.activeFilters.choosePoint.indexOf(filterType) != -1) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (
              name !== filterType &&
              this.activeFilters.choosePoint.indexOf(name) == -1
            ) {
              this.categoryFilter[name] = availableFilters[name];
            }
          });
          filterPoints.push(
            <FilterPoint
              name="Страны"
              objectName={filterType}
              key={filterType}
              data={this.categoryFilter[filterType]}
              store={this}
            />
          );
        } else {
          filterPoints.push(
            <FilterPoint
              name="Страны"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        }
      } else if (filterType == "color") {
        if (this.activeFilters.choosePoint.indexOf(filterType) != -1) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (
              name !== filterType &&
              this.activeFilters.choosePoint.indexOf(name) == -1
            ) {
              this.categoryFilter[name] = availableFilters[name];
            }
          });
          filterPoints.push(
            <FilterPoint
              name="Цвета"
              objectName={filterType}
              key={filterType}
              data={this.categoryFilter[filterType]}
              store={this}
            />
          );
        } else {
          filterPoints.push(
            <FilterPoint
              name="Цвета"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        }
      } else if (filterType == "measure") {
        if (this.activeFilters.choosePoint.indexOf(filterType) != -1) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (
              name !== filterType &&
              this.activeFilters.choosePoint.indexOf(name) == -1
            ) {
              this.categoryFilter[name] = availableFilters[name];
            }
          });
          this.categoryFilter[filterType].forEach((meas) => {
            if (
              meas.name === "Кол-во персон" ||
              meas.name === "Комплектность"
            ) {
              optPoints.push(
                <FilterPoint
                  name={meas.name}
                  objectName={filterType}
                  key={meas.name}
                  data={meas.value}
                  store={this}
                />
              );
            } else {
              measurePoints.push(
                <FilterPoint
                  name={meas.name}
                  objectName={filterType}
                  key={meas.name}
                  data={meas.value}
                  store={this}
                />
              );
            }
          });
        } else {
          availableFilters[filterType].forEach((meas) => {
            if (
              meas.name === "Кол-во персон" ||
              meas.name === "Комплектность"
            ) {
              optPoints.push(
                <FilterPoint
                  name={meas.name}
                  objectName={filterType}
                  key={meas.name}
                  data={meas.value}
                  store={this}
                />
              );
            } else {
              measurePoints.push(
                <FilterPoint
                  name={meas.name}
                  objectName={filterType}
                  key={meas.name}
                  data={meas.value}
                  store={this}
                />
              );
            }
          });
        }
      }
    });

    this.filterPointsContainers = filterPoints;
    this.measurePointsContainers = measurePoints;
    this.optPointsContainers = optPoints;
  };
}

decorate(Store, {
  productsToRender: observable,
  filterPointsContainers: observable,
  measurePointsContainers: observable,
  optPointsContainers: observable,
  activeFilters: observable,
  cartCount: observable,
  productInCart: observable,
  productPage: observable,
  cartPage: observable,
  cardContainer: observable,
  minPrice: observable,
  maxPrice: observable,
  paginatCont: observable,
  startPag: observable,
  stopPag: observable,
  productValue: observable,
});

const store = new Store();

export default store;
