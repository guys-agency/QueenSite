import { observable, decorate, autorun } from "mobx";
import $ from "jquery";
import FilterPoint from "./comp/FilterPoint";
import ProductCard from "./comp/ProductCard";
import React from "react";

class Store {
  productsToRender = [];
  filterPointsContainers = [];
  activeFilters = {
    brand: [],
    material: [],
    country: [],
    color: [],
    measure: [],
    count: 0,
    choosePoint: [],
  };

  categoryFilter = {};
  nameMainCat = "";

  nameSecondCat = "";

  cartCount = 0;
  productInCart = [];

  cardContainer = [];

  productPage = false;
  cartPage = false;

  cleaningActiveFilters = () => {
    const clearFilters = {
      brand: [],
      material: [],
      country: [],
      color: [],
      measure: [],
      count: 0,
      choosePoint: [],
    };

    this.activeFilters = Object.assign({}, clearFilters);
    this.categoryFilter = {};
  };

  filtration = autorun(() => {
    console.log("categoryFilter", this.categoryFilter);
    const filterArray = [];

    if (this.activeFilters.count) {
      Object.keys(this.activeFilters).forEach((filterName) => {
        if (filterName !== "choosePoint") {
          if (this.activeFilters[filterName].length) {
            const onePointFilter = [];
            this.activeFilters[filterName].forEach((filterValue) => {
              if (filterName !== "measure") {
                onePointFilter.push({ [filterName]: filterValue });
              } else {
                onePointFilter.push({ "attributes.name": filterValue });
              }
            });
            filterArray.push({ $or: onePointFilter });
          }
        }
      });
    }

    const testContainer = [];

    console.log("filterArray1", filterArray);

    const bodyJSON = {
      start: 0,
      stop: 9,
    };

    const bodyJSONFilter = {};

    if (this.nameMainCat !== "" && this.nameSecondCat !== "") {
      console.log("this.nameMainCat", this.nameMainCat);
      bodyJSON["categories.slugName"] = this.nameMainCat;
      bodyJSON["categories.childsSlug"] = this.nameSecondCat;
      bodyJSONFilter["categories.slugName"] = this.nameMainCat;
      bodyJSONFilter["categories.childsSlug"] = this.nameSecondCat;
    }

    console.log("bodyJSON", bodyJSON);

    if (!filterArray.length) {
      console.log("this");
      fetch("http://127.0.0.1:3010", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJSON),
      })
        .then((res) => {
          console.log("res", res);
          return res.json();
        })
        .then((data) => {
          console.log("data1", data);
          Object.keys(data).forEach((element) => {
            testContainer.push(
              <ProductCard
                key={data[element].slug}
                data={data[element]}
                store={this}
              />
            );
          });
          this.productsToRender = testContainer;
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch("http://127.0.0.1:3010/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJSONFilter),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const sortData = {};
          console.log("data123", data);

          Object.keys(data).forEach((name) => {
            if (
              (name !== "_id") &
              (name !== "minPrice") &
              (name !== "maxPrice")
            ) {
              sortData[name] = data[name].sort();
            }
          });
          this.categoryFilter = sortData;

          //временная заплатка
          // if (Object.keys(data).length === 0) {
          //   console.log("object123");
          //   this.filtration();
          //   return;
          // }
          this.createFilterPointsContainers(sortData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      console.log("filterArray2", filterArray);
      fetch("http://127.0.0.1:3010", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.assign(bodyJSON, {
            $and: filterArray,
          })
        ),
      })
        .then((res) => {
          console.log("res", res);
          return res.json();
        })
        .then((data) => {
          console.log("data2", data);
          Object.keys(data).forEach((element) => {
            testContainer.push(
              <ProductCard
                key={data[element].slug}
                data={data[element]}
                store={this}
              />
            );
          });

          this.productsToRender = testContainer;
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch("http://127.0.0.1:3010/sort-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          const sortData = {};

          Object.keys(data).forEach((name) => {
            if (name !== "_id") sortData[name] = data[name].sort();
          });
          this.createFilterPointsContainers(sortData);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });

  createFilterPointsContainers = (availableFilters) => {
    console.log("availableFilters123", availableFilters);
    const filterPoints = [];
    Object.keys(availableFilters).forEach((filterType) => {
      if (filterType == "brand") {
        if (this.activeFilters.choosePoint.indexOf(filterType) != -1) {
          console.log("categoryFilter", this.categoryFilter);
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
          console.log("categoryFilter", this.categoryFilter);
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
          console.log("categoryFilter", this.categoryFilter);
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
          console.log("categoryFilter", this.categoryFilter);
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
        console.log("availableFilters", availableFilters);
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
              name="Мера измерения"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        } else {
          filterPoints.push(
            <FilterPoint
              name="Мера измерения"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        }
      }
    });
    this.filterPointsContainers = filterPoints;
  };
}

decorate(Store, {
  productsToRender: observable,
  filterPointsContainers: observable,
  activeFilters: observable,
  cartCount: observable,
  productInCart: observable,
  productPage: observable,
  cartPage: observable,
  cardContainer: observable,
});

const store = new Store();

export default store;
