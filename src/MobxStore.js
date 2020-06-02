import { observable, decorate, autorun } from "mobx";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
import FilterPoint from "./comp/FilterPoint";
import ProductCard from "./comp/ProductCard";
import React from "react";
import Paginat from "./comp/paginat";
import localStorage from "mobx-localstorage";
import getCookie from "./ulits/getCookie";
import { SERVER_URL } from "./constants";
import api from "./comp/api";
import { useHistory } from "react-router-dom";

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

  bannId = "";

  productValue = 0;

  filtCount = 0;

  categoryFilter = {};
  nameMainCat = "";

  nameSecondCat = "";

  bannerFilter = {};

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

  bannersData = {};
  collInMenu = [];
  dataColl = [];

  searchQ = "";

  auth = getCookie("auth") === undefined ? false : true;
  //подумать НАД РЕШЕНИЕМ
  menuInFilt = autorun(() => {
    if (this.prodCats.length) {
      this.activeCats = this.prodCats;
    } else {
      this.activeCats = this.fullCats;
    }
  });

  getCollections = () => {
    api
      .getAllCollections()
      .then((data) => {
        console.log("dataBanners :>> ", data);
        this.bannersData = data[0];
        const timeCollInMenu = [];
        let ind = 0;
        let sum = 0;
        let timeCont = [];

        this.bannersData.collections.forEach((elem) => {
          if (ind < 4 && sum < this.bannersData.collections.length - 1) {
            timeCont.push(
              <li key={elem.slug}>
                <NavLink to={"/collections/" + elem.slug}>{elem.name}</NavLink>
              </li>
            );
            ind += 1;
            sum += 1;
          } else {
            timeCont.push(
              <li key={elem.slug}>
                <NavLink to={"/collections/" + elem.slug}>{elem.name}</NavLink>
              </li>
            );
            timeCollInMenu.push(
              <div className="column">
                <ul>{timeCont}</ul>
              </div>
            );
            timeCont = [];
            ind = 0;
            sum += 1;
          }
        });
        this.collInMenu = timeCollInMenu;
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

  getData = (bodyJSON, clearJSON) => {
    const testContainer = [];
    console.log("this.categoryFilter :>> ", this.categoryFilter);
    if (!Object.keys(this.categoryFilter).length) {
      fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(clearJSON),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //продукты
          // console.log("dataData1 :>> ", data);
          // data[0].product.forEach((element) => {
          //   testContainer.push(
          //     <div className="col col-4 col-s-6">
          //       <ProductCard key={element.slug} data={element} store={this} />
          //     </div>
          //   );
          // });

          // this.productsToRender = testContainer;

          //Сортировка
          const sortData = {};
          console.log("data[0] :>> ", data[0]);
          Object.keys(data[0].sort[0]).forEach((name) => {
            if (
              (name !== "_id") &
              (name !== "minPrice") &
              (name !== "maxPrice") &
              (name !== "measure") &
              (name !== "count")
            ) {
              sortData[name] = data[0].sort[0][name].sort();
            } else if (name == "measure") {
              const newMeasure = [];
              const sortObj = {
                names: [],
              };
              data[0].sort[0][name].forEach((elem) => {
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
              sortData[name] = data[0].sort[0][name];
            }
          });
          // this.productValue = data[0].sort[0].count;
          // this.paginatCont = [<Paginat store={this} />];
          this.categoryFilter = sortData;
          this.getData(bodyJSON, clearJSON);

          // //временная заплатка
          // // if (Object.keys(data).length === 0) {
          // //   console.log("object123");
          // //   this.filtration();
          // //   return;
          // // }
          // console.log("data :>> ", data);
          // this.createFilterPointsContainers(sortData);
          //СОЗДАНИЕ КАТЕГОРИЙ ПО ВЫБОРКЕ

          // if (data[0].cats !== undefined && !this.prodCats.length) {
          //   const cats = {};
          //   data[0].cats[0].cats.forEach((elemMain) => {
          //     elemMain.forEach((elem) => {
          //       if (cats[elem.slugName] !== undefined) {
          //         elem.childs.forEach((child, i) => {
          //           if (
          //             !cats[elem.slugName].childsNameArr.includes(
          //               elem.childsSlug[i]
          //             )
          //           ) {
          //             cats[elem.slugName].childs.push({
          //               name: child,
          //               slug: elem.childsSlug[i],
          //             });
          //             cats[elem.slugName].childsNameArr.push(
          //               elem.childsSlug[i]
          //             );
          //           }
          //         });
          //       } else {
          //         cats[elem.slugName] = {
          //           name: elem.name,
          //           slug: elem.slugName,
          //         };
          //         if (cats[elem.slugName].childs === undefined) {
          //           cats[elem.slugName].childs = [];
          //           cats[elem.slugName].childsNameArr = [];
          //         }
          //         elem.childs.forEach((child, i) => {
          //           if (
          //             !cats[elem.slugName].childsNameArr.includes(
          //               elem.childsSlug[i]
          //             )
          //           ) {
          //             cats[elem.slugName].childs.push({
          //               name: child,
          //               slug: elem.childsSlug[i],
          //             });
          //             cats[elem.slugName].childsNameArr.push(
          //               elem.childsSlug[i]
          //             );
          //           }
          //         });
          //       }
          //     });
          //   });
          //   const catsArr = [];
          //   Object.keys(cats).forEach((name) => {
          //     catsArr.push(cats[name]);
          //   });

          //   catsArr.forEach((elem) => {
          //     elem.childs.sort((a, b) => {
          //       if (a < b) return -1; // a расположится раньше b
          //       if (b < a) return 1; // b расположится раньше a
          //       return 0;
          //     });
          //   });

          //   //данные баннера
          //   if (data.collData !== undefined && !this.dataColl.length) {
          //     this.dataColl = data.collData;
          //   }

          //   console.log("data :>> ", data);
          //   console.log("cats :>> ", catsArr);
          //   this.prodCats = catsArr;
          //   this.activeCats = this.prodCats;
          // }
        })
        .catch((err) => {
          console.log("err", err);
        });

      // fetch(SERVER_URL + "/sort-names", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     credentials: "include",
      //   },
      //   body: JSON.stringify(bodyJSONFilter),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     const sortData = {};

      //     Object.keys(data).forEach((name) => {
      //       if (
      //         (name !== "_id") &
      //         (name !== "minPrice") &
      //         (name !== "maxPrice") &
      //         (name !== "measure") &
      //         (name !== "count")
      //       ) {
      //         sortData[name] = data[name].sort();
      //       } else if (name == "measure") {
      //         const newMeasure = [];
      //         const sortObj = {
      //           names: [],
      //         };
      //         data[name].forEach((elem) => {
      //           if (elem.name != "") {
      //             if (!sortObj.names.includes(elem.name[0])) {
      //               sortObj.names.push(elem.name[0]);
      //             }
      //             if (sortObj[elem.name]) {
      //               sortObj[elem.name].push(Number(elem.value[0]));
      //             } else {
      //               sortObj[elem.name] = [Number(elem.value[0])];
      //             }
      //             if (!sortObj[elem.name + "Unit"]) {
      //               sortObj[elem.name + "Unit"] = elem.unit;
      //             }
      //           }
      //         });
      //         sortObj.names.sort();

      //         sortObj.names.forEach((sn) => {
      //           newMeasure.push({
      //             name: sn,
      //             value: sortObj[sn].sort(function (a, b) {
      //               return a - b;
      //             }),
      //             unit: sortObj[sn + "Unit"][0],
      //           });
      //         });
      //         sortData[name] = newMeasure;
      //       } else {
      //         sortData[name] = data[name];
      //       }
      //     });
      //     this.productValue = data.count;
      //     this.paginatCont = [<Paginat store={this} />];
      //     this.categoryFilter = sortData;

      //     //временная заплатка
      //     // if (Object.keys(data).length === 0) {
      //     //   console.log("object123");
      //     //   this.filtration();
      //     //   return;
      //     // }
      //     console.log("data :>> ", data);
      //     this.createFilterPointsContainers(sortData);
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //   });
    } else {
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
          //продукты
          console.log("dataData2 :>> ", data);
          console.log("Object.keys(data).length :>> ", data[0].product.length);
          if (!data[0].product.length) {
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
            data[0].product.forEach((element) => {
              testContainer.push(
                <div className="col col-4 col-s-6" key={element.slug}>
                  <ProductCard data={element} store={this} />
                </div>
              );
            });
          }
          this.productsToRender = testContainer;
          //сортировка
          const sortData = {};
          if (Object.keys(data[0].sort[0]).length) {
            Object.keys(data[0].sort[0]).forEach((name) => {
              if (
                (name !== "_id") &
                (name !== "minPrice") &
                (name !== "maxPrice") &
                (name !== "measure") &
                (name !== "count")
              ) {
                sortData[name] = data[0].sort[0][name].sort();
              } else if (name == "measure") {
                const newMeasure = [];
                const sortObj = {
                  names: [],
                };
                data[0].sort[0][name].forEach((elem) => {
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
                sortData[name] = data[0].sort[0][name];
              }
            });
            this.productValue = data[0].sort[0].count;
            this.paginatCont.push(<Paginat store={this} />);
            this.createFilterPointsContainers(sortData);

            //КАТЕГОРИИ БАННЕРА
            if (data[0].cats !== undefined && !this.prodCats.length) {
              const cats = {};
              data[0].cats[0].cats.forEach((elemMain) => {
                elemMain.forEach((elem) => {
                  if (cats[elem.slugName] !== undefined) {
                    elem.childs.forEach((child, i) => {
                      if (
                        !cats[elem.slugName].childsNameArr.includes(
                          elem.childsSlug[i]
                        )
                      ) {
                        cats[elem.slugName].childs.push({
                          name: child,
                          slug: elem.childsSlug[i],
                        });
                        cats[elem.slugName].childsNameArr.push(
                          elem.childsSlug[i]
                        );
                      }
                    });
                  } else {
                    cats[elem.slugName] = {
                      name: elem.name,
                      slug: elem.slugName,
                    };
                    if (cats[elem.slugName].childs === undefined) {
                      cats[elem.slugName].childs = [];
                      cats[elem.slugName].childsNameArr = [];
                    }
                    elem.childs.forEach((child, i) => {
                      if (
                        !cats[elem.slugName].childsNameArr.includes(
                          elem.childsSlug[i]
                        )
                      ) {
                        cats[elem.slugName].childs.push({
                          name: child,
                          slug: elem.childsSlug[i],
                        });
                        cats[elem.slugName].childsNameArr.push(
                          elem.childsSlug[i]
                        );
                      }
                    });
                  }
                });
              });
              const catsArr = [];
              Object.keys(cats).forEach((name) => {
                catsArr.push(cats[name]);
              });

              catsArr.forEach((elem) => {
                elem.childs.sort((a, b) => {
                  if (a < b) return -1; // a расположится раньше b
                  if (b < a) return 1; // b расположится раньше a
                  return 0;
                });
              });

              //данные баннера
              if (data.collData !== undefined && !this.dataColl.length) {
                this.dataColl = data.collData;
              }

              console.log("data :>> ", data);
              console.log("cats :>> ", catsArr);
              this.prodCats = catsArr;
              this.activeCats = this.prodCats;
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });

      // fetch(SERVER_URL + "/sort-names", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     credentials: "include",
      //   },
      //   body: JSON.stringify(
      //     Object.assign(bodyJSONFilter, {
      //       $and: filterArray,
      //     })
      //   ),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     console.log("data2 :>> ", data);
      //     const sortData = {};
      //     if (Object.keys(data).length) {
      //       Object.keys(data).forEach((name) => {
      //         if (
      //           (name !== "_id") &
      //           (name !== "minPrice") &
      //           (name !== "maxPrice") &
      //           (name !== "measure") &
      //           (name !== "count")
      //         ) {
      //           sortData[name] = data[name].sort();
      //         } else if (name == "measure") {
      //           const newMeasure = [];
      //           const sortObj = {
      //             names: [],
      //           };
      //           data[name].forEach((elem) => {
      //             if (elem.name != "") {
      //               if (!sortObj.names.includes(elem.name[0])) {
      //                 sortObj.names.push(elem.name[0]);
      //               }
      //               if (sortObj[elem.name]) {
      //                 sortObj[elem.name].push(Number(elem.value[0]));
      //               } else {
      //                 sortObj[elem.name] = [Number(elem.value[0])];
      //               }
      //               if (!sortObj[elem.name + "Unit"]) {
      //                 sortObj[elem.name + "Unit"] = elem.unit;
      //               }
      //             }
      //           });
      //           sortObj.names.sort();

      //           sortObj.names.forEach((sn) => {
      //             newMeasure.push({
      //               name: sn,
      //               value: sortObj[sn].sort(function (a, b) {
      //                 return a - b;
      //               }),
      //               unit: sortObj[sn + "Unit"][0],
      //             });
      //           });
      //           sortData[name] = newMeasure;
      //         } else {
      //           sortData[name] = data[name];
      //         }
      //       });
      //       this.productValue = data.count;
      //       this.paginatCont.push(<Paginat store={this} />);
      //       this.createFilterPointsContainers(sortData);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //   });
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
    this.bannerFilter = {};
    this.prodCats = [];
    this.dataColl = [];
  };

  filtration = () => {
    const filterArray = [];

    this.activeFilters = {
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

    console.log("search :>> ", window.location.href.split("?")[1]);

    const decodSearch = decodeURIComponent(window.location.href.split("?")[1]);
    console.log("ddecodSearche :>> ", decodSearch);
    if (decodSearch !== "undefined") {
      decodSearch.split("&&").forEach((elem) => {
        const elemSp = elem.split("=");
        if (elemSp[0] !== "measure") {
          this.activeFilters[elemSp[0]] = elemSp[1].split(",");
          this.activeFilters.choosePoint.push(elemSp[0]);
          this.activeFilters.count += elemSp.length;
        } else {
          const measEl = elemSp[1].split("!~");
          this.activeFilters.measure[measEl[0]] = measEl[1].split(",");
          this.activeFilters.count += measEl[1].split(",").length;
          this.activeFilters.choosePoint.push("measure");
        }
      });
      console.log(" this.activeFilters:>> ", this.activeFilters);
    }
    console.log("this.activeFilters :>> ", this.activeFilters);
    if (this.activeFilters.count) {
      // let searchQt = "";
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
              // if (!searchQt.length) {
              //   searchQt =
              //     filterName + "=" + this.activeFilters[filterName].join();
              // } else {
              //   searchQt +=
              //     ":" +
              //     filterName +
              //     "=" +
              //     this.activeFilters[filterName].join();
              // }
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
                // if (!searchQt.length) {
                //   searchQt =
                //     name + "=" + this.activeFilters[filterName][name].join();
                // } else {
                //   searchQt +=
                //     ":" +
                //     name +
                //     "=" +
                //     this.activeFilters[filterName][name].join();
                // }
              });
            }
          }
        }
        // this.searchQ = searchQt;
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

    const prodJSON = {
      start: this.startPag,
      stop: this.stopPag,
    };

    // if (this.prodSlugs.length) {
    //   prodJSON.slug = { $in: this.prodSlugs };

    //   this.activeCats = this.prodCats;
    // } else {
    //   this.activeCats = this.fullCats;
    // }

    if (this.nameMainCat !== "" && this.nameMainCat !== undefined) {
      prodJSON["categories.slugName"] = this.nameMainCat;
    }

    if (this.nameSecondCat !== "" && this.nameSecondCat !== undefined) {
      prodJSON["categories.childsSlug"] = this.nameSecondCat;
    }

    //переделать, что бы не было лишних запросов
    console.log("activeFilters :>> ", this.activeFilters);

    console.log("filterArray :>> ", filterArray, "bodyJSON :>> ", prodJSON);
    const bodyJSON = {};
    if (this.bannerFilter.slug !== undefined) {
      bodyJSON.banner = this.bannerFilter;
    }
    const clearJSON = Object.assign({ ...bodyJSON }, prodJSON);
    if (!filterArray.length) {
      bodyJSON.prod = prodJSON;
    } else {
      bodyJSON.prod = Object.assign(prodJSON, { $and: filterArray });
    }

    console.log("filterArray :>> ", filterArray);
    console.log("bodyJSON :>> ", bodyJSON);
    this.getData(bodyJSON, { prod: clearJSON });
  };

  createFilterPointsContainers = (availableFilters) => {
    this.minPrice = availableFilters.minPrice;
    this.maxPrice = availableFilters.maxPrice;

    const filterPoints = [];
    const measurePoints = [];
    const optPoints = [];
    Object.keys(availableFilters).forEach((filterType) => {
      if (filterType == "brand") {
        if (this.activeFilters.choosePoint.includes(filterType)) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (
              name !== filterType &&
              this.activeFilters.choosePoint.indexOf(name) === -1
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
  bannersData: observable,
  activeCats: observable,
  fullCats: observable,
  countInProdPage: observable,
  collInMenu: observable,
  dataColl: observable,
});

const store = new Store();
store.addToLike();
store.addtoCart(true);

export default store;
