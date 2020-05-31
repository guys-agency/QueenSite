import { observable, decorate, autorun } from "mobx";
import $ from "jquery";
import FilterPoint from "./comp/FilterPoint";
import ProductCard from "./comp/ProductCard";
import React from "react";
import Paginat from "./comp/paginat";
import localStorage from "mobx-localstorage";
import getCookie from "./ulits/getCookie";
import { SERVER_URL } from "./constants";
import api from "./comp/api";

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

  countInProdPage = 1;

  prodSlugs = [];

  productValue = 0;

  filtCount = 0;

  categoryFilter = {};
  nameMainCat = "";

  nameSecondCat = "";

  fullCats = [];

  prodCats = [];

  activeCats = [];

  cartCount = 0;
  productInCart = {};
  productInCartList =
    localStorage.get("productInCart") === null
      ? {}
      : localStorage.get("productInCart");

  cardContainer = [];

  productPage = false;
  cartPage = false;

  minPrice = 0;
  maxPrice = 0;

  startPag = 0;
  stopPag = 42;

  paginatCont = [];

  likeData = [];
  likeContainer =
    localStorage.get("like") === null ? [] : localStorage.get("like");

  city = "";

  collectionsData = {};

  auth = getCookie("auth") === undefined ? false : true;

  menuInFilt = autorun(() => {
    if (this.prodSlugs.length) {
      this.activeCats = this.prodCats;
    } else {
      this.activeCats = this.fullCats;
    }
  });

  getCollections = () => {
    api
      .getAllCollections()
      .then((data) => {
        const sortData = [];
        Object.keys(data).forEach((el) => {
          sortData.push(data[el]);
        });
        sortData.sort((a, b) => {
          return a.order - b.order;
        });
        this.collectionsData = sortData;
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  addToLike = () => {
    console.log("likeContainer :>> ", this.likeContainer);
    localStorage.set("like", this.likeContainer);
    if (this.auth) {
    }
    if (this.likeContainer.length) {
      api
        .getAnyProd({ slugs: this.likeContainer })
        .then((data) => {
          console.log("dataSLUGS :>> ", data);
          const timeCont = [];
          Object.keys(data).forEach((prod) => {
            timeCont.push(data[prod]);
          });
          this.likeData = timeCont;
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    } else {
      this.likeData = [];
    }
  };

  addtoCart = (give) => {
    console.log(
      'localStorage.get("productInCart") :>> ',
      this.productInCartList
    );
    console.log(
      'localStorage.get("productInCart") :>> ',
      localStorage.get("productInCart")
    );
    localStorage.set("productInCart", this.productInCartList);
    this.cartCount = Object.keys(this.productInCartList).length;

    if (this.auth) {
    }
    if (this.cartCount) {
      if (give) {
        api
          .getAnyProd({ slugs: Object.keys(this.productInCartList) })
          .then((data) => {
            const timeCont = {};
            console.log("prodCart :>> ", data);
            Object.keys(data).forEach((prod) => {
              timeCont[data[prod].slug] = {
                ...data[prod],
                countInCart: this.productInCartList[data[prod].slug],
              };
            });
            this.productInCart = timeCont;
            console.log("object :>> ", this.productInCart);
          })
          .catch((err) => {
            console.log("err :>> ", err);
          });
      }
      // else {
      //   Object.keys(this.productInCartList).forEach((el) => {
      //     this.productInCart[el].countInCart = this.productInCartList[el];
      //   });
      // }
    } else {
      this.productInCart = {};
    }
  };

  cityCheck = autorun(() => {
    console.log('localStorage.get("city") :>> ', localStorage.get("city"));
    if (localStorage.get("city")) {
      this.city = localStorage.get("city").name;
    } else {
      const init = () => {
        const geolocation = window.ymaps.geolocation;
        if (geolocation) {
          localStorage.set("city", { name: geolocation.city, sourse: "Y" });
          this.city = geolocation.city;
        } else {
          console.log("Не удалось установить местоположение");
        }
      };
      window.ymaps.ready(init);
    }
  });

  getData = (filterArray, bodyJSON, bodyJSONFilter) => {
    const testContainer = [];
    if (!filterArray.length) {
      fetch(SERVER_URL, {
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
          console.log("dataData1 :>> ", data);
          Object.keys(data).forEach((element) => {
            testContainer.push(
              <div className="col col-4 col-s-6">
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

      fetch(SERVER_URL + "/sort-names", {
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
      fetch(SERVER_URL, {
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
          console.log("dataData2 :>> ", data);
          console.log(
            "Object.keys(data).length :>> ",
            Object.keys(data).length
          );
          if (!Object.keys(data).length) {
            if (this.activeFilters.choosePoint.length) {
              this.activeFilters[
                this.activeFilters.choosePoint[
                  this.activeFilters.choosePoint.length - 1
                ]
              ] = [];
              this.activeFilters.choosePoint.pop();
              this.filtration();
            }
          } else {
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
          }
        })
        .catch((err) => {
          console.log("err", err);
        });

      fetch(SERVER_URL + "/sort-names", {
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
          if (Object.keys(data).length) {
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
          }
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
    this.prodSlugs = [];
  };

  filtration = () => {
    const filterArray = [];

    if (this.activeFilters.count) {
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

    if (this.prodSlugs.length) {
      bodyJSON.slug = { $in: this.prodSlugs };
      bodyJSONFilter.slug = { $in: this.prodSlugs };
      this.activeCats = this.prodCats;
    } else {
      this.activeCats = this.fullCats;
    }

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
    console.log("activeFilters :>> ", this.activeFilters);

    console.log(
      "filterArray :>> ",
      filterArray,
      "bodyJSON :>> ",
      bodyJSON,
      "bodyJSONFilter :>> ",
      bodyJSONFilter
    );

    this.getData(filterArray, bodyJSON, bodyJSONFilter);
  };

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
  city: observable,
  auth: observable,
  likeContainer: observable,
  likeData: observable,
  productInCartList: observable,
  collectionsData: observable,
  activeCats: observable,
  fullCats: observable,
  countInProdPage: observable,
});

const store = new Store();
store.addToLike();
store.addtoCart(true);

export default store;
