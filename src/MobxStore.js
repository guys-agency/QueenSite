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

window.dataLayer = window.dataLayer || [];

class Store {
  productsToRender = [];
  lastSeenProds =
    localStorage.get("lastSeenProds") === null
      ? []
      : localStorage.get("lastSeenProds");

  withProds = [];
  likeProds = [];

  lastSeenProdsData = {};
  filterPointsContainers = [];
  measurePointsContainers = [];
  optPointsContainers = [];
  activeFilters = {
    brand: [],
    material: [],
    glassType: [],
    country: [],
    color: [],
    measure: [],
    count: 0,
    choosePoint: [],
    attr: [],
    minPrice: "",
    maxPrice: "",
    premium: false,
  };

  countInProdPage = 1;

  bannId = "";

  productValue = 0;

  filtCount = 0;
  pathS = "";

  categoryFilter = {};
  dirtyFilter = {};
  nameMainCat = "";

  nameSecondCat = "";
  firstBread = "";
  secondBread = "";

  sideAsk = false;
  sideLogin = false;
  changeSide = false;
  sideGift = false;

  menuAccor = {};

  bannerFilter = {};

  fullCats = [];

  prodCats = [];

  activeCats = [];

  searchText = "";

  sortInProd = "";

  certInCart = 0;

  canSale = false;
  canPremium = false;
  canHit = false;

  cartCount = 0;

  coupDisc = 0;
  certDisc = 0;

  resetPage = false;

  productInCart = {};
  productInCartList =
    localStorage.get("productInCart") === null
      ? {}
      : localStorage.get("productInCart");
  dontSaleProdCount = [];
  // seenProd =
  //   localStorage.get("seenProd") === null ? [] : localStorage.get("seenProd");

  cardContainer = {};

  userData = {};

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
  brandSlugs = {};
  collInMenu = [];
  dataColl = [];

  searchQ = "";

  auth =
    getCookie("auth") === undefined || getCookie("auth") === null
      ? false
      : true;

  // seenProdAdd = autorun(() => {
  //   localStorage.set("seenProd", this.seenProd);
  // });

  //подумать НАД РЕШЕНИЕМ
  menuInFilt = autorun(() => {
    if (this.prodCats.length) {
      this.activeCats = this.prodCats;
    } else {
      this.activeCats = this.fullCats;
    }
  });
  cityCheck = autorun(() => {
    if (this.auth) {
      api
        .getUserData()
        .then((data) => {
          // console.log("123123123 :>> ", data);
          this.userData = data;
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  });
  // e-com метрика
  eComMetric = autorun(() => {
    // console.log("this.cardContainer :>> ", this.cardContainer.slug);
    if (process.env.REACT_APP_TYPE === "prod") {
      if (this.cardContainer.slug !== undefined) {
        window.dataLayer.push({
          ecommerce: {
            detail: {
              products: [
                {
                  id: this.cardContainer.slug,
                  name: this.cardContainer.name,
                  price: this.cardContainer.price,
                  brand: this.cardContainer.brand,
                },
              ],
            },
          },
        });
      }
    }
  });

  lastSeenProdsGetData = autorun(() => {
    localStorage.set("lastSeenProds", this.lastSeenProds);
    if (this.lastSeenProds.length > 0) {
      api
        .getAnyProd({ slugs: this.lastSeenProds })
        .then((data) => {
          const lastSeenProdsDataTime = {};
          Object.keys(data).forEach((prod) => {
            lastSeenProdsDataTime[data[prod].slug] = {
              ...data[prod],
            };
          });
          this.lastSeenProdsData = lastSeenProdsDataTime;
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  });

  getCollections = () => {
    const closeNav = (e) => {
      $("body").removeClass("no-scroll");
      $(".navigation").removeClass("visible");
      $(".sidebar-overlay").removeClass("active");
      $(".menu-point").removeClass("active");
      $(".menu_sub").removeClass("visible");
      $(".header__btn").removeClass("active");
      var mega = $(".menu");
      var trgClass = $(e.target).hasClass("menu");
      if (!trgClass) {
        mega.removeClass("visible");
      }
    };
    api
      .getAllCollections()
      .then((data) => {
        // console.log("dataBanners :>> ", data);
        data[0].podarki_price.sort((a, b) => {
          if (+a.name < +b.name) return -1;
          if (+a.name > +b.name) return 1;
          return 0;
        });
        this.bannersData = data[0];
        const timeCollInMenu = [];
        let ind = 0;
        let sum = 0;
        let timeCont = [];

        const timeBrandSlug = {};
        this.bannersData.brand.forEach((brand) => {
          timeBrandSlug[brand.name] = brand.slug;
        });

        this.brandSlugs = timeBrandSlug;

        this.bannersData.collections.forEach((elem) => {
          if (ind < 5 && sum < this.bannersData.collections.length - 1) {
            timeCont.push(
              <li key={elem.slug}>
                <NavLink to={"/collections/" + elem.slug} onClick={closeNav}>
                  {elem.name}
                </NavLink>
              </li>
            );
            ind += 1;
            sum += 1;
          } else {
            timeCont.push(
              <li key={elem.slug}>
                <NavLink to={"/collections/" + elem.slug} onClick={closeNav}>
                  {elem.name}
                </NavLink>
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

        Object.keys(this.bannersData).forEach((type) => {
          this.bannersData[type].forEach((elem) => {
            this.menuAccor[elem.slug] = elem.name;
          });
        });
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  addToLike = (toUser) => {
    // console.log("likeContainer :>> ", this.likeContainer);
    localStorage.set("like", this.likeContainer);
    if (this.auth && !toUser) {
      const like = this.likeContainer;
      api
        .updateLike(like)
        .then((ok) => {
          // console.log("ok", ok);
        })
        .catch((err) => {
          // console.log("err", err);
        });
    }
    if (this.likeContainer.length) {
      api
        .getAnyProd({ slugs: this.likeContainer })
        .then((data) => {
          // console.log("dataSLUGS :>> ", data);
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
    // console.log(
    //   'localStorage.get("productInCart") :>> ',
    //   this.productInCartList
    // );
    // console.log(
    //   'localStorage.get("productInCart") :>> ',
    //   localStorage.get("productInCart")
    // );
    const productInCartListOld = localStorage.get("productInCart");
    localStorage.set("productInCart", this.productInCartList);
    this.cartCount = Object.keys(this.productInCartList).length;

    if (this.auth) {
      api
        .updateCart(this.productInCartList)
        .then((ok) => {
          // console.log("ok", ok);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    if (this.cartCount) {
      // if (give) {
      api
        .getAnyProd({ slugs: Object.keys(this.productInCartList) })
        .then((data) => {
          const timeCont = {};
          this.certInCart = 0;
          // console.log("prodCart :>> ", data);
          Object.keys(data).forEach((prod) => {
            timeCont[data[prod].slug] = {
              ...data[prod],
              countInCart: this.productInCartList[data[prod].slug],
            };
          });
          // this.productInCart = timeCont;
          // console.log("object :>> ", this.productInCart);

          const dontSaleProd = [];

          let dontSaleProdCount = 0;
          if (Object.keys(timeCont).length) {
            Object.keys(timeCont).forEach((el) => {
              if (typeof this.productInCartList[el] === "number") {
                if (!timeCont[el].sale) {
                  dontSaleProdCount += +this.productInCartList[el];
                  dontSaleProd.push(timeCont[el]);
                }
              } else {
                this.certInCart = el;
              }
            });
            this.dontSaleProdCount = dontSaleProdCount;
            if (
              dontSaleProdCount > 0 &&
              Math.floor(dontSaleProdCount / 3) > 0
            ) {
              let minProdSlug = 0;
              const minProdSlugs = [];

              dontSaleProd.sort((a, b) => {
                if (a.regular_price < b.regular_price) return -1;
                if (a.regular_price > b.regular_price) return 1;
                return 0;
              });

              // console.log("dont :>> ", dontSaleProd);
              minProdSlugs.push(minProdSlug);
              let dontSaleProdCountIn = Math.floor(dontSaleProdCount / 3);
              // console.log("minProdSlugs :>> ", minProdSlugs);
              for (let index = 0; index < dontSaleProd.length; index++) {
                if (
                  this.productInCartList[dontSaleProd[index].slug] ===
                  dontSaleProdCountIn
                ) {
                  timeCont[dontSaleProd[index].slug].sale_price = 0;
                  timeCont[dontSaleProd[index].slug].price = 0;
                  timeCont[dontSaleProd[index].slug].sale = true;
                  break;
                } else if (
                  this.productInCartList[dontSaleProd[index].slug] >
                  dontSaleProdCountIn
                ) {
                  timeCont[dontSaleProd[index].slug].sale_price = Math.floor(
                    timeCont[dontSaleProd[index].slug].regular_price *
                      (1 -
                        dontSaleProdCountIn /
                          this.productInCartList[dontSaleProd[index].slug])
                  );
                  timeCont[dontSaleProd[index].slug].sale = true;
                  timeCont[dontSaleProd[index].slug].price =
                    timeCont[dontSaleProd[index].slug].sale_price;
                  break;
                } else if (
                  this.productInCartList[dontSaleProd[index].slug] <
                  dontSaleProdCountIn
                ) {
                  timeCont[dontSaleProd[index].slug].sale_price = 0;
                  timeCont[dontSaleProd[index].slug].price = 0;
                  timeCont[dontSaleProd[index].slug].sale = true;
                  dontSaleProdCountIn -= this.productInCartList[
                    dontSaleProd[index].slug
                  ];
                }
              }
            }
            // let totalProductSum = 0;
            // let totalSum = 0;

            // Object.keys(timeCont).forEach((prod) => {
            //   timeCont[prod].yaPrice = Math.floor(
            //     timeCont[prod].sale
            //       ? timeCont[prod].sale_price === 0
            //         ? 1
            //         : timeCont[prod].sale_price
            //       : timeCont[prod].regular_price
            //   );

            //   totalProductSum +=
            //     Math.floor(timeCont[prod].yaPrice) * timeCont[prod].count;

            //   totalSum =
            //     Math.floor(
            //       timeCont[prod].sale
            //         ? timeCont[prod].sale_price
            //         : timeCont[prod].regular_price
            //     ) * timeCont[prod].count;
            // });
            // const coupsCont =
            //   localStorage.get("coupsCont") === undefined ||
            //   localStorage.get("coupsCont") === null ||
            //   localStorage.getItem("coupsCont") === "undefined"
            //     ? {}
            //     : localStorage.get("coupsCont");

            // if (Object.keys(coupsCont).length) {
            //   totalProductSum = 0;
            //   this.coupDisc = 0;
            //   this.certDisc = 0;

            //   Object.keys(coupsCont).forEach((coupon) => {
            //     let couponC = coupsCont[coupon].count;
            //     Object.keys(timeCont).forEach((el, i) => {
            //       if (timeCont[el].yaPrice > 1) {
            //         if (coupsCont[coupon].type === "percent") {
            //           if (el !== this.certInCart) {
            //             this.coupDisc +=
            //               Math.round(
            //                 timeCont[el].yaPrice *
            //                   (+coupsCont[coupon].count / 100)
            //               ) * this.productInCartList[el];
            //             timeCont[el].yaPrice = Math.floor(
            //               timeCont[el].yaPrice *
            //                 (1 - +coupsCont[coupon].count / 100)
            //             );
            //           }
            //         } else if (coupsCont[coupon].type === "fixed_cart") {
            //           if (el !== this.certInCart) {
            //             if (couponC > 0) {
            //               if (timeCont[el].yaPrice - couponC >= 1) {
            //                 timeCont[el].yaPrice -= couponC;
            //                 couponC = 0;
            //               } else {
            //                 timeCont[el].yaPrice = 1;
            //                 couponC -= timeCont[el].yaPrice - 1;
            //               }
            //             }
            //             this.certDisc += Math.round(+coupsCont[coupon].count);
            //           }
            //         }
            //       }
            //       totalProductSum += timeCont[el].yaPrice;
            //     });
            //   });
            // }

            // if (totalProductSum !== totalSum) {
            //   let totalDeff = totalProductSum - this.totalPrice;
            //   const timeContArray = Object.keys(timeCont);
            //   let i = 0;
            //   while (totalDeff > 0) {
            //     if (i < timeContArray.length) {
            //       if (timeCont[timeContArray[i]].yaPrice > 1) {
            //         if (
            //           timeCont[timeContArray[i]].yaPrice -
            //             totalDeff / timeCont[timeContArray[i]].count >
            //           1
            //         ) {
            //           timeCont[timeContArray[i]].yaPrice = Math.floor(
            //             timeCont[timeContArray[i]].yaPrice -
            //               totalDeff / timeCont[timeContArray[i]].count
            //           );
            //           totalDeff = 0;
            //         } else {
            //           totalDeff -=
            //             timeCont[timeContArray[i]].yaPrice *
            //             timeCont[timeContArray[i]].count;
            //           timeCont[timeContArray[i]].yaPrice = 1;
            //           i += 1;
            //         }
            //       } else {
            //         i += 1;
            //       }
            //     } else {
            //       break;
            //     }
            //   }
            // }
          } else {
            this.dontSaleProd = [];
            this.dontSaleProdCount = 0;
          }
          this.productInCart = timeCont;
        })
        .catch((err) => {
          console.log("err :>> ", err);
          this.productInCartList = productInCartListOld;
          localStorage.set("productInCart", this.productInCartList);
        });
      // } else {
      //   const dontSaleProd = [];
      //   let dontSaleProdCount = 0;
      //   if (Object.keys(this.productInCart).length) {
      //     Object.keys(this.productInCart).forEach((el) => {
      //       if (!this.productInCart[el].sale) {
      //         dontSaleProdCount += +this.productInCartList[el];
      //         dontSaleProd.push(this.productInCart[el]);
      //       }
      //     });

      //     if (dontSaleProdCount > 0 && dontSaleProdCount % 3 === 0) {
      //       let minProdSlug = 0;
      //       const minProdSlugs = [];

      //       dontSaleProd.sort((a, b) => {
      //         if (a < b) return -1;
      //         if (a > b) return 1;
      //         return 0;
      //       });
      //       console.log("dont :>> ", dontSaleProd);
      //       minProdSlugs.push(minProdSlug);
      //       let dontSaleProdCountIn = dontSaleProdCount / 3;
      //       console.log("minProdSlugs :>> ", minProdSlugs);
      //       for (let index = 0; index < dontSaleProd.length; index++) {
      //         if (
      //           this.productInCartList[dontSaleProd[index].slug] ===
      //           dontSaleProdCountIn
      //         ) {
      //           this.productInCart[dontSaleProd[index].slug].regular_price = 0;
      //           break;
      //         } else if (
      //           this.productInCartList[dontSaleProd[index].slug] >
      //           dontSaleProdCountIn
      //         ) {
      //           this.productInCart[dontSaleProd[index].slug].sale_price =
      //             (this.productInCart[dontSaleProd[index].slug].regular_price *
      //               dontSaleProdCountIn) /
      //             this.productInCartList[dontSaleProd[index].slug];
      //           this.productInCart[dontSaleProd[index].slug].sale = true;
      //           break;
      //         } else if (
      //           this.productInCartList[dontSaleProd[index].slug] <
      //           dontSaleProdCountIn
      //         ) {
      //           this.productInCart[dontSaleProd[index].slug].regular_price = 0;
      //           dontSaleProdCountIn -= this.productInCartList[
      //             dontSaleProd[index].slug
      //           ];
      //         }
      //       }
      //     }
      //   }
      // }
      // else {
      //   Object.keys(this.productInCartList).forEach((el) => {
      //     this.productInCart[el].countInCart = this.productInCartList[el];
      //   });
      // }
    } else {
      this.productInCart = {};
      this.dontSaleProd = [];
      this.dontSaleProdCount = 0;
    }
  };

  cityCheck = autorun(() => {
    // console.log('localStorage.get("city") :>> ', localStorage.get("city"));
    if (
      localStorage.get("city") !== undefined &&
      localStorage.get("city") !== null
    ) {
      this.city = localStorage.get("city").name;
    } else {
      const init = () => {
        // console.log("window.ymaps :>> ", window.ymaps);
        const geolocation = window.ymaps.geolocation;
        // console.log("geolocation :>> ", geolocation);
        if (geolocation) {
          api
            .getCity(geolocation.region + " " + geolocation.city)
            .then((data) => {
              if (data.length) {
                localStorage.set("city", {
                  name:
                    data[0].addressComponents[
                      data[0].addressComponents.length - 1
                    ].name,
                  geoId: data[0].geoId,
                  region: data[0].addressComponents[2].name,
                  sourse: "Y",
                });
                this.city =
                  data[0].addressComponents[
                    data[0].addressComponents.length - 1
                  ].name;
              } else {
                localStorage.set("city", {
                  name: "Москва",
                  geoId: 213,
                  region: "Москва",
                  sourse: "Y",
                });
                this.city = "Москва";
              }
            })
            .catch((err) => {
              console.log("err :>> ", err);
            });
        } else {
          console.log("Не удалось установить местоположение");
        }
      };
      window.ymaps.ready(init);
    }
  });

  getData = (bodyJSON, clearJSON, t) => {
    // console.log("clearJSON :>> ", clearJSON);
    const testContainer = [];
    // console.log("this.categoryFilter :>> ", this.categoryFilter);
    // if (!Object.keys(this.categoryFilter).length) {
    //   fetch(SERVER_URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       credentials: "include",
    //     },
    //     body: JSON.stringify(clearJSON),
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       const TEndT = new Date();
    //       console.log("TTTTTT11", TEndT - t);
    //       //продукты
    //       // console.log("dataData1 :>> ", data);
    //       // data[0].product.forEach((element) => {
    //       //   testContainer.push(
    //       //     <div className="col col-4 col-s-6">
    //       //       <ProductCard key={element.slug} data={element} store={this} />
    //       //     </div>
    //       //   );
    //       // });

    //       // this.productsToRender = testContainer;

    //       //Сортировка
    //       const sortData = {};
    //       console.log("data[0] :>> ", data[0]);
    //       Object.keys(data[0].sort[0]).forEach((name) => {
    //         if (
    //           (name !== "_id") &
    //           (name !== "minPrice") &
    //           (name !== "maxPrice") &
    //           (name !== "measure") &
    //           (name !== "count")
    //         ) {
    //           sortData[name] = data[0].sort[0][name].sort();
    //         } else if (name == "measure") {
    //           const newMeasure = [];
    //           const sortObj = {
    //             names: [],
    //           };
    //           data[0].sort[0][name].forEach((elem) => {
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
    //           sortData[name] = data[0].sort[0][name];
    //         }
    //       });
    //       // this.productValue = data[0].sort[0].count;
    //       // this.paginatCont = [<Paginat store={this} />];
    //       this.categoryFilter = sortData;
    //       this.getData(bodyJSON, clearJSON, t);

    //       // //временная заплатка
    //       // // if (Object.keys(data).length === 0) {
    //       // //   console.log("object123");
    //       // //   this.filtration();
    //       // //   return;
    //       // // }
    //       // console.log("data :>> ", data);
    //       // this.createFilterPointsContainers(sortData);
    //       //СОЗДАНИЕ КАТЕГОРИЙ ПО ВЫБОРКЕ

    //       // if (data[0].cats !== undefined && !this.prodCats.length) {
    //       //   const cats = {};
    //       //   data[0].cats[0].cats.forEach((elemMain) => {
    //       //     elemMain.forEach((elem) => {
    //       //       if (cats[elem.slugName] !== undefined) {
    //       //         elem.childs.forEach((child, i) => {
    //       //           if (
    //       //             !cats[elem.slugName].childsNameArr.includes(
    //       //               elem.childsSlug[i]
    //       //             )
    //       //           ) {
    //       //             cats[elem.slugName].childs.push({
    //       //               name: child,
    //       //               slug: elem.childsSlug[i],
    //       //             });
    //       //             cats[elem.slugName].childsNameArr.push(
    //       //               elem.childsSlug[i]
    //       //             );
    //       //           }
    //       //         });
    //       //       } else {
    //       //         cats[elem.slugName] = {
    //       //           name: elem.name,
    //       //           slug: elem.slugName,
    //       //         };
    //       //         if (cats[elem.slugName].childs === undefined) {
    //       //           cats[elem.slugName].childs = [];
    //       //           cats[elem.slugName].childsNameArr = [];
    //       //         }
    //       //         elem.childs.forEach((child, i) => {
    //       //           if (
    //       //             !cats[elem.slugName].childsNameArr.includes(
    //       //               elem.childsSlug[i]
    //       //             )
    //       //           ) {
    //       //             cats[elem.slugName].childs.push({
    //       //               name: child,
    //       //               slug: elem.childsSlug[i],
    //       //             });
    //       //             cats[elem.slugName].childsNameArr.push(
    //       //               elem.childsSlug[i]
    //       //             );
    //       //           }
    //       //         });
    //       //       }
    //       //     });
    //       //   });
    //       //   const catsArr = [];
    //       //   Object.keys(cats).forEach((name) => {
    //       //     catsArr.push(cats[name]);
    //       //   });

    //       //   catsArr.forEach((elem) => {
    //       //     elem.childs.sort((a, b) => {
    //       //       if (a < b) return -1; // a расположится раньше b
    //       //       if (b < a) return 1; // b расположится раньше a
    //       //       return 0;
    //       //     });
    //       //   });

    //       //   //данные баннера
    //       //   if (data.collData !== undefined && !this.dataColl.length) {
    //       //     this.dataColl = data.collData;
    //       //   }

    //       //   console.log("data :>> ", data);
    //       //   console.log("cats :>> ", catsArr);
    //       //   this.prodCats = catsArr;
    //       //   this.activeCats = this.prodCats;
    //       // }
    //     })
    //     .catch((err) => {
    //       console.log("err", err);
    //     });

    //   // fetch(SERVER_URL + "/sort-names", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //     credentials: "include",
    //   //   },
    //   //   body: JSON.stringify(bodyJSONFilter),
    //   // })
    //   //   .then((res) => {
    //   //     return res.json();
    //   //   })
    //   //   .then((data) => {
    //   //     const sortData = {};

    //   //     Object.keys(data).forEach((name) => {
    //   //       if (
    //   //         (name !== "_id") &
    //   //         (name !== "minPrice") &
    //   //         (name !== "maxPrice") &
    //   //         (name !== "measure") &
    //   //         (name !== "count")
    //   //       ) {
    //   //         sortData[name] = data[name].sort();
    //   //       } else if (name == "measure") {
    //   //         const newMeasure = [];
    //   //         const sortObj = {
    //   //           names: [],
    //   //         };
    //   //         data[name].forEach((elem) => {
    //   //           if (elem.name != "") {
    //   //             if (!sortObj.names.includes(elem.name[0])) {
    //   //               sortObj.names.push(elem.name[0]);
    //   //             }
    //   //             if (sortObj[elem.name]) {
    //   //               sortObj[elem.name].push(Number(elem.value[0]));
    //   //             } else {
    //   //               sortObj[elem.name] = [Number(elem.value[0])];
    //   //             }
    //   //             if (!sortObj[elem.name + "Unit"]) {
    //   //               sortObj[elem.name + "Unit"] = elem.unit;
    //   //             }
    //   //           }
    //   //         });
    //   //         sortObj.names.sort();

    //   //         sortObj.names.forEach((sn) => {
    //   //           newMeasure.push({
    //   //             name: sn,
    //   //             value: sortObj[sn].sort(function (a, b) {
    //   //               return a - b;
    //   //             }),
    //   //             unit: sortObj[sn + "Unit"][0],
    //   //           });
    //   //         });
    //   //         sortData[name] = newMeasure;
    //   //       } else {
    //   //         sortData[name] = data[name];
    //   //       }
    //   //     });
    //   //     this.productValue = data.count;
    //   //     this.paginatCont = [<Paginat store={this} />];
    //   //     this.categoryFilter = sortData;

    //   //     //временная заплатка
    //   //     // if (Object.keys(data).length === 0) {
    //   //     //   console.log("object123");
    //   //     //   this.filtration();
    //   //     //   return;
    //   //     // }
    //   //     console.log("data :>> ", data);
    //   //     this.createFilterPointsContainers(sortData);
    //   //   })
    //   //   .catch((err) => {
    //   //     console.log("err", err);
    //   //   });
    // } else {

    fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ ...bodyJSON, clearJSON }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        const TEnd = new Date();
        // console.log("TTTTTT", TEnd - t);
        //продукты
        // console.log("dataData2 :>> ", data);
        // console.log("Object.keys(data).length :>> ", data[0].product.length);
        if (!data[0].product.length) {
          if (this.activeFilters.choosePoint.length) {
            this.activeFilters[
              this.activeFilters.choosePoint[
                this.activeFilters.choosePoint.length - 1
              ]
            ] = [];
            this.activeFilters.choosePoint.pop();
            if (this.activeFilters.count) {
              let searchQt = "";
              this.activeFilters.choosePoint.forEach((filterName) => {
                if (filterName !== "choosePoint") {
                  if (filterName !== "measure") {
                    if (
                      filterName === "maxPrice" ||
                      filterName === "minPrice"
                    ) {
                      if (!searchQt.length) {
                        searchQt =
                          filterName + "=" + this.activeFilters[filterName];
                      } else {
                        searchQt +=
                          "&&" +
                          filterName +
                          "=" +
                          this.activeFilters[filterName];
                      }
                    } else {
                      if (this.activeFilters[filterName].length) {
                        if (!searchQt.length) {
                          searchQt =
                            filterName +
                            "=" +
                            this.activeFilters[filterName].join();
                        } else {
                          searchQt +=
                            "&&" +
                            filterName +
                            "=" +
                            this.activeFilters[filterName].join();
                        }
                      }
                    }
                  } else {
                    if (Object.keys(this.activeFilters[filterName]).length) {
                      Object.keys(this.activeFilters[filterName]).forEach(
                        (ind) => {
                          // console.log(
                          //   "ind :>> ",
                          //   this.activeFilters[filterName][ind]
                          // );
                          if (!searchQt.length) {
                            searchQt =
                              filterName +
                              "=" +
                              ind +
                              "!~" +
                              this.activeFilters[filterName][ind].join(",");
                          } else {
                            searchQt +=
                              "&&" +
                              filterName +
                              "=" +
                              ind +
                              "!~" +
                              this.activeFilters[filterName][ind].join(",");
                          }
                        }
                      );
                    }
                  }
                }
              });
              window.history.replaceState(null, null, "?" + searchQt);
              this.filtration();
              return;
            }
          }
          //  else {
          //   window.location.replace("/");
          // }
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

        // if (!Object.keys(this.categoryFilter).length) {

        //стартовый фильтр
        const sortDataClear = {};
        // console.log("data[0].clearSort :>> ", data[0].clearSort);
        Object.keys(data[0].clearSort[0]).forEach((name) => {
          if (
            (name !== "_id") &
            (name !== "minPrice") &
            (name !== "maxPrice") &
            (name !== "measure") &
            (name !== "count")
          ) {
            sortDataClear[name] = data[0].clearSort[0][name].sort();
          } else if (name === "measure") {
            const newMeasure = [];
            const sortObj = {
              names: [],
            };
            data[0].sort[0][name].forEach((elem) => {
              if (elem.name !== "") {
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
            // console.log("sortObj :>> ", sortObj);
            sortObj.names.forEach((sn) => {
              // console.log("sn :>> ", sn);
              if (sn !== undefined) {
                newMeasure.push({
                  name: sn,
                  value: sortObj[sn].sort(function (a, b) {
                    return a - b;
                  }),
                  unit: sortObj[sn + "Unit"][0],
                });
              }
            });
            sortDataClear[name] = newMeasure;
          } else {
            sortDataClear[name] = data[0].clearSort[0][name];
          }
        });
        // this.productValue = data[0].sort[0].count;
        // this.paginatCont = [<Paginat store={this} />];
        this.categoryFilter = sortDataClear;
        // }
        //сортировка
        const sortData = {};
        if (Object.keys(data[0].sort[0]).length) {
          Object.keys(data[0].sort[0]).forEach((name) => {
            if (
              (name !== "_id") &
              (name !== "minPrice") &
              (name !== "maxPrice") &
              (name !== "measure") &
              (name !== "count") &
              (name !== "sale") &
              (name !== "hit") &
              (name !== "premium")
            ) {
              sortData[name] = data[0].sort[0][name].sort();
            } else if (name === "measure") {
              const newMeasure = [];
              const sortObj = {
                names: [],
              };
              data[0].sort[0][name].forEach((elem) => {
                if (elem.name !== "") {
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
                if (sortObj[sn] !== undefined) {
                  newMeasure.push({
                    name: sn,
                    value: sortObj[sn].sort(function (a, b) {
                      return a - b;
                    }),
                    unit: sortObj[sn + "Unit"][0],
                  });
                }
              });
              sortData[name] = newMeasure;
            } else {
              sortData[name] = data[0].sort[0][name];
            }
          });
          if (data[0].sort[0].sale.includes(true)) {
            this.canSale = true;
          } else {
            this.canSale = false;
          }
          if (data[0].sort[0].hit.includes(true)) {
            this.canHit = true;
          } else {
            this.canHit = false;
          }
          if (data[0].sort[0].premium[0].includes("premium")) {
            this.canPremium = true;
          } else {
            this.canPremium = false;
          }
          this.productValue = data[0].sort[0].count;
          this.paginatCont = [<Paginat store={this} />];
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
                if (a.name < b.name) return -1; // a расположится раньше b
                if (b.name < a.name) return 1; // b расположится раньше a
                return 0;
              });
            });

            //данные баннера
            if (data.collData !== undefined) {
              this.dataColl = data.collData;
              document.title = data.collData[0].name + " - Queen of Bohemia";
            }

            // console.log("data :>> ", data);
            // console.log("cats :>> ", catsArr);
            this.prodCats = catsArr;
            this.activeCats = this.prodCats;
          }
        }
        const TEndQ = new Date();
        // console.log("TTTTTT", TEndQ - t);
      })
      .catch((err) => {
        console.log("err", err);
        window.location.replace("/");
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
    // }
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
      minPrice: "",
      maxPrice: "",
      premium: false,
    };

    this.activeFilters = Object.assign({}, clearFilters);
    this.categoryFilter = {};
    this.bannerFilter = {};
    this.dirtyFilter = {};
    this.prodCats = [];
    // this.dataColl = [];
    this.pathS = "";
    this.startPag = 0;
    this.stopPag = 42;
    this.firstBread = "";
    this.secondBread = "";

    // console.log("clean :>> 11111111111222222222222");
  };

  filtration = () => {
    const TStart = new Date();
    const filterArray = [];

    this.activeFilters = {
      brand: [],
      material: [],
      glassType: [],
      country: [],
      color: [],
      measure: [],
      count: 0,
      choosePoint: [],
      attr: [],
      minPrice: "",
      maxPrice: "",
      premium: false,
    };

    // console.log("search :>> ", window.location.href.split("?")[1]);

    let decodSearch = decodeURIComponent(window.location.href.split("?")[1]);
    // console.log("ddecodSearche :>> ", decodSearch);
    if (
      decodSearch !== "undefined" &&
      decodSearch !== "" &&
      !window.location.href.includes("?yclid")
    ) {
      // console.log("1111 :>> ", 1111);
      if (decodSearch.includes("&yclid=")) {
        decodSearch = decodSearch.split("&yclid=")[0];
      }
      decodSearch.split("&&").forEach((elem) => {
        const elemSp = elem.split("=");
        if (elemSp[0] !== "measure") {
          if (
            elemSp[0] === "minPrice" ||
            elemSp[0] === "maxPrice" ||
            elemSp[0] === "premium" ||
            elemSp[0] === "sale" ||
            elemSp[0] === "hit"
          ) {
            this.activeFilters[elemSp[0]] = elemSp[1];
          } else if (elemSp[0] === "page") {
            if (!this.resetPage) {
              this.startPag = +elemSp[1] * 42;
              this.stopPag = (+elemSp[1] + 1) * 42;
            }
            this.resetPage = false;
          } else {
            this.activeFilters[elemSp[0]] = elemSp[1].split(",");
            this.activeFilters.choosePoint.push(elemSp[0]);
            this.activeFilters.count += elemSp.length;
          }
        } else {
          const measEl = elemSp[1].split("!~");
          this.activeFilters.measure[measEl[0]] = measEl[1].split(",");
          this.activeFilters.count += measEl[1].split(",").length;
          this.activeFilters.choosePoint.push("measure");
        }
      });
      // console.log(" this.activeFilters:>> ", this.activeFilters);
    }
    // console.log("this.activeFilters :>> ", this.activeFilters);
    const pathname = window.location.pathname;
    // console.log("pathname", pathname);
    if (pathname.includes("hits") || pathname.includes("hit=")) {
      this.activeFilters.attr.push("hit");
      this.activeFilters.count += 1;
    }
    if (pathname.includes("sale")) {
      this.activeFilters.attr.push("sale");
      this.activeFilters.count += 1;
    }
    if (pathname.includes("new")) {
      this.activeFilters.attr.push("new");
      this.activeFilters.count += 1;
    }

    if (this.activeFilters.count) {
      // let searchQt = "";
      this.activeFilters.choosePoint.forEach((filterName) => {
        const onePointFilter = [];
        if (filterName !== "choosePoint" && filterName !== "premium") {
          if (filterName !== "measure") {
            if (
              this.activeFilters[filterName].length &&
              filterName !== "attr"
            ) {
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

    if (this.activeFilters.maxPrice || this.activeFilters.minPrice) {
      const price = { price: {} };
      if (this.activeFilters.maxPrice) {
        price.price["$lte"] = Number(this.activeFilters.maxPrice);
      }
      if (this.activeFilters.minPrice) {
        price.price["$gte"] = Number(this.activeFilters.minPrice);
      }
      filterArray.push(price);
    }

    if (this.activeFilters.attr.length) {
      this.activeFilters.attr.forEach((elem) => {
        filterArray.push({ [elem]: true });
      });
    }
    if (pathname.includes("closeout")) {
      filterArray.push({ closeout: true });
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

    if (this.activeFilters.premium) {
      prodJSON["categories.slugName"] = {
        $all: [prodJSON["categories.slugName"], "premium"],
      };
    }

    //переделать, что бы не было лишних запросов
    // console.log("activeFilters :>> ", this.activeFilters);

    // console.log("filterArray :>> ", filterArray, "bodyJSON :>> ", prodJSON);
    const bodyJSON = {};

    const clearJSON = {};
    clearJSON.prod = Object.assign({ ...bodyJSON }, prodJSON);

    if (!filterArray.length) {
      bodyJSON.prod = prodJSON;
    } else {
      bodyJSON.prod = Object.assign(prodJSON, { $and: filterArray });
    }
    if (this.bannerFilter.slug !== undefined) {
      bodyJSON.banner = this.bannerFilter;
      clearJSON.banner = this.bannerFilter;
    }
    delete clearJSON.prod.start;
    delete clearJSON.prod.stop;
    // console.log("filterArray :>> ", filterArray);
    // console.log("bodyJSON :>> ", bodyJSON);

    if (pathname.includes("hits")) {
      bodyJSON.withCat = true;
    }
    if (pathname.includes("new")) {
      bodyJSON.withCat = true;
    } else if (pathname.includes("closeout")) {
      bodyJSON.withCat = true;
      clearJSON.prod["$and"] = [{ closeout: true }];
    } else if (pathname.includes("search")) {
      bodyJSON.withCat = true;
      bodyJSON.search = this.searchText;
    } else if (pathname.includes("premium")) {
      bodyJSON.withCat = true;
    } else if (pathname.includes("podarki")) {
      bodyJSON.withCat = true;
    }
    if (this.sortInProd === "Сначала дороже") {
      bodyJSON.sort = -1;
    } else if (this.sortInProd === "Сначала дешевле") {
      bodyJSON.sort = 1;
    } else if (this.sortInProd === "Сначала акционные") {
      bodyJSON.sort = 0;
    } else if (this.sortInProd === "Сначала новые") {
      bodyJSON.sort = "date";
    }
    this.getData(bodyJSON, { ...clearJSON }, TStart);
  };

  createFilterPointsContainers = (availableFilters) => {
    this.minPrice = this.categoryFilter.minPrice;
    this.maxPrice = this.categoryFilter.maxPrice;
    if (
      Object.keys(this.dirtyFilter).length === 0 ||
      this.activeFilters.choosePoint.length === 0
    ) {
      this.dirtyFilter = Object.assign({}, this.categoryFilter);
    }

    const filterPoints = [];
    const measurePoints = [];
    const optPoints = [];
    Object.keys(availableFilters).forEach((filterType) => {
      if (
        filterType === "brand" &&
        !window.location.pathname.includes("/brand/")
      ) {
        if (this.activeFilters.choosePoint.indexOf(filterType) === 0) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (!this.activeFilters.choosePoint.includes(name)) {
              this.dirtyFilter[name] = availableFilters[name];
            }
          });
        }
        if (this.activeFilters.choosePoint.includes(filterType)) {
          filterPoints.push(
            <FilterPoint
              name="Бренды"
              objectName={filterType}
              key={filterType}
              data={this.dirtyFilter[filterType]}
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
      } else if (filterType === "glassType") {
        if (this.activeFilters.choosePoint.indexOf(filterType) === 0) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (!this.activeFilters.choosePoint.includes(name)) {
              this.dirtyFilter[name] = availableFilters[name];
            }
          });
        }
        if (this.activeFilters.choosePoint.includes(filterType)) {
          filterPoints.push(
            <FilterPoint
              name="Тип бокалов"
              objectName={filterType}
              key={filterType}
              data={this.dirtyFilter[filterType]}
              store={this}
            />
          );
        } else {
          filterPoints.push(
            <FilterPoint
              name="Тип бокалов"
              objectName={filterType}
              key={filterType}
              data={availableFilters[filterType]}
              store={this}
            />
          );
        }
      } else if (filterType === "material") {
        if (this.activeFilters.choosePoint.indexOf(filterType) === 0) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (!this.activeFilters.choosePoint.includes(name)) {
              this.dirtyFilter[name] = availableFilters[name];
            }
          });
        }
        if (this.activeFilters.choosePoint.includes(filterType)) {
          filterPoints.push(
            <FilterPoint
              name="Материалы"
              objectName={filterType}
              key={filterType}
              data={this.dirtyFilter[filterType]}
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
      } else if (filterType === "country") {
        if (this.activeFilters.choosePoint.indexOf(filterType) === 0) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (!this.activeFilters.choosePoint.includes(name)) {
              this.dirtyFilter[name] = availableFilters[name];
            }
          });
        }
        if (this.activeFilters.choosePoint.includes(filterType)) {
          filterPoints.push(
            <FilterPoint
              name="Страны"
              objectName={filterType}
              key={filterType}
              data={this.dirtyFilter[filterType]}
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
      } else if (filterType === "color") {
        if (this.activeFilters.choosePoint.indexOf(filterType) === 0) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (!this.activeFilters.choosePoint.includes(name)) {
              this.dirtyFilter[name] = availableFilters[name];
            }
          });
        }
        if (this.activeFilters.choosePoint.includes(filterType)) {
          filterPoints.push(
            <FilterPoint
              name="Цвета"
              objectName={filterType}
              key={filterType}
              data={this.dirtyFilter[filterType]}
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
      } else if (filterType === "measure") {
        if (this.activeFilters.choosePoint.indexOf(filterType) === 0) {
          Object.keys(this.categoryFilter).forEach((name) => {
            if (!this.activeFilters.choosePoint.includes(name)) {
              this.dirtyFilter[name] = availableFilters[name];
            }
          });
        }
        if (this.activeFilters.choosePoint.includes(filterType)) {
          this.dirtyFilter[filterType].forEach((meas) => {
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
  sideAsk: observable,
  menuAccor: observable,
  canHit: observable,
  canPremium: observable,
  canSale: observable,
  sideLogin: observable,
  sideGift: observable,
  changeSide: observable,
  userData: observable,
  dontSaleProdCount: observable,
  lastSeenProds: observable,
  lastSeenProdsData: observable,
  withProds: observable,
  likeProds: observable,
  certInCart: observable,
  coupDisc: observable,
  certDisc: observable,
});

const store = new Store();
store.addToLike();
store.addtoCart(true);

export default store;
