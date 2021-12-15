const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
// const routerIndex = require("./routes/index");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
// const all = require("./all.json");
const all = require("./all1.json");
const ids = require("./json/ids.json");
const tr = require("transliteration").transliterate;
const slugify = require("slugify");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const mongoose = require("mongoose");
var WPAPI = require("wpapi/superagent");
// import { transliterate as tr, slugify } from "transliteration";
const Brand = require("./models/brand");
const Category = require("./models/category");
const Color = require("./models/color");
const Tag = require("./models/tags");
const Material = require("./models/material");
const Country = require("./models/country");
const Options = require("./models/options");
const Stores = require("./models/stores");
const Product = require("./models/product");
const cors = require("cors");

const db = all.items;

const { requestLogger, errorLogger } = require("./middlewares/logger");
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@cluster0-ftb6g.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect("mongodb://localhost:27017/queensand", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// var wp = new WPAPI({
//   endpoint: "http://qsand.guys.agency/wp-json",
//   username: "admin",
//   password: "131313",
// });

// wp.products = wp.registerRoute("wc/v3", "/products/(?P<id>)");

// wp.products()
//   .id(10)
//   .get()
//   .then((data) => {
//     console.log("data", data);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });

// const tagsMod = mongoose.model("tag");
// const categoriesMod = mongoose.model("category");
// const brandMod = mongoose.model("brand");

// tagsMod
//   .find({})
//   .then((Message) => console.log({ data: Message }))
//   .catch(() => res.status(500).send({ message: "Произошла ошибка" }));

const app = express();
app.use(cors());
const { PORT = 3010 } = process.env;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fsPromises
//   .readFile("all.json", { encoding: "utf8" })
//   .then((data) => {
//     const a = JSON.stringify(data);
//     console.log("a", a);
//     const b = JSON.parse(JSON.parse(a));
//     // const c = JSON.parse(b);
//     console.log("b", typeof b);
//     console.log(Object.keys(b));
//     // Object.keys(b).forEach((el, i) => {
//     //   console.log("el", i);
//     // });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log("all", Object.keys(all.items));

const wooApi = new WooCommerceRestApi({
  url: "http://qsand.guys.agency",
  consumerKey: "ck_940e5ddb20e0679cb240a65585385eee26e776cb",
  consumerSecret: "cs_9d12aa9b415063636cb6b2a4de94bb1c0037254e",
  version: "wc/v3",
});

// wooApi
//   .get("products", {
//     per_page: 20, // 20 products per page
//   })
//   .then((response) => {
//     // Successful request
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     // console.log("Response Data err:", error.response.data);
//   });

// wooApi
//   .post("products", {
//     name: "test", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
//     type: "simple",
//     regular_price: "21.99",
//     attributes: [
//       {
//         id: 1,
//         options: ["Black"],
//       },
//     ],
//     categories: [
//       {
//         id: 16,
//       },
//     ],
//   })
//   .then((response) => {
//     // Successful request
//     console.log("Response Data:", response.data);
//   })
//   .catch((error) => {
//     // Invalid request, for 4xx and 5xx statuses
//     // console.log("Response Status:", error.response.status);
//     // console.log("Response Headers:", error.response.headers);
//     // console.log("Response Data:", error.response.data);
//   });

// const data = {
//   name: "Color",
//   slug: "pa_color",
//   type: "select",
//   order_by: "menu_order",
//   has_archives: true,
// };

// wooApi
//   .post("products/attributes", data)
//   .then((response) => {
// console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error.response.data);
//   });
const start = new Date();

function clone(
  o, // The only argument passed by user: object to clone
  h // Cache (organized as array: [key,value,key,value,...])
) {
  var i,
    r,
    x, // Property indexer, result, temporary variable
    t = [Array, Date, Number, String, Boolean], // Types to treat in a special way
    s = Object.prototype.toString; // Shortcut to Object.prototype.toString
  h = h || []; // If cache is not created yet, create it!
  for (
    i = 0;
    i < h.length;
    i += 2 // Search cache for our object
  )
    if (o === h[i]) r = h[i + 1];
  if (!r && o && typeof o == "object") {
    // Clone o if it is uncached object and not null
    r = {}; // Default result template: plain hash
    for (
      i = 0;
      i < t.length;
      i++ // To handle multiframe environment, search for type by
    )
      if (
        s.call(o) ==
        s.call(
          //   comparing Object.prototype.toString's of our object
          (x = new t[i](o))
        )
      )
        //   and new object x created with the constructor t[i]
        // Notice that it will create new Date(o), new String(o)
        //   which is good and new Array(o) which is bad
        r = i ? x : []; // If i==0, t==Array. We need to recreate it. Else use x
    h.push(o, r); // Add object to cache before (!) making recursive call
    for (i in o) // Just copy properties recoursively
      if (h.hasOwnProperty.call(o, i))
        // As o might have key 'hasOwnProperty', use something
        r[i] = clone(o[i], h); //   we defined right instead
  }
  return r || o; // Return r if it was found in cache or built in if(){}
}

// const copydb = clone(db);

// copydb.forEach((el) => {
//   el.categories = [];
// });

// Product.find({})
//   .then((data) => {
//     console.log("data", data[0]);
//     data.forEach((el) => {
//       const newCat = [];
//       el.categories.forEach((cat) => {
//         const childsSlug = [];
//         cat.childs.forEach((ch) => {
//           childsSlug.push(
//             slugify(ch, {
//               replacement: "_", // replace spaces with replacement character, defaults to `-`
//               remove: undefined, // remove characters that match regex, defaults to `undefined`
//               lower: true, // convert to lower case, defaults to `false`
//             })
//           );
//         });
//         const slugName = slugify(cat.name, {
//           replacement: "_", // replace spaces with replacement character, defaults to `-`
//           remove: undefined, // remove characters that match regex, defaults to `undefined`
//           lower: true, // convert to lower case, defaults to `false`
//         });
//         newCat.push(Object.assign(cat, { childsSlug, slugName }));
//       });

//       Product.findByIdAndUpdate(el._id, {
//         categories: newCat,
//       })
//         .then((ok) => console.log("ok", ok))
//         .catch((err) => console.log("err", err));
//     });
//   })
//   .catch((err) => console.log("err", err));

const dbLength = db.length;
let dbNumber = 0;
let dbElementKeys = Object.keys(db[dbNumber]);
let dbElementKeysLength = dbElementKeys.length;

let dbElemNumber = 0;

let dbAddCount = 42;

const addProductToDB = () => {
  wooApi
    .post("products", { ...copydb[dbAddCount] })
    .then((response) => {
      // console.log("response", response.data);
      // console.log("db[dbAddCount]", db[dbAddCount]);
      // console.log("response.data.id", response.data.id);
      Product.create(
        Object.assign({ ...db[dbAddCount] }, { dbid: response.data.id })
      )
        .then((ok) => {
          // console.log("ok", ok);
          if (dbAddCount < db.length - 1) {
            dbAddCount += 1;
            console.log("dbAddCount", dbAddCount);
            addProductToDB();
          } else {
            const end = new Date();
            console.log("time", end - start);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    })
    .catch((err) => {
      console.log("err upload products", err);
    });
};

const checkEach = () => {
  if (dbElemNumber < dbElementKeysLength - 1) {
    dbElemNumber += 1;
    console.log("dbNumber", dbNumber);
    console.log("dbElemNumberName", dbElementKeys[dbElemNumber]);
    console.log("dbElemNumber", dbElemNumber);
    console.log("dbElementKeysLength", dbElementKeysLength);
    // console.log("test", dbNumber, dbElementKeys[dbElemNumber], dbElemNumber);
    test(dbNumber, dbElementKeys[dbElemNumber]);
  } else {
    if (dbNumber < dbLength - 1) {
      dbNumber += 1;
      dbElemNumber = 0;
      dbElementKeys = Object.keys(db[dbNumber]);
      dbElementKeysLength = dbElementKeys.length;
      console.log("dbNumber", dbNumber);
      // console.log("test2", dbNumber, dbElementKeys[dbElemNumber]);
      test(dbNumber, dbElementKeys[dbElemNumber]);
    } else {
      const end = new Date();
      // addProductToDB();
      // console.log("copycat", copydb[0].categories);
    }
  }
};

const test = (el, e) => {
  if (e === "regular_price") {
    db[el][e] = db[el][e].split(",").join(".");
    copydb[el][e] = db[el][e].split(",").join(".");
    checkEach();
  } else if (e === "storage") {
    if (db[el][e].includes(" ")) {
      db[el][e] = db[el][e].split(" ").join("");
      copydb[el][e] = db[el][e].split(" ").join("");
      checkEach();
    } else {
      checkEach();
    }
  } else if (e === "stock_quantity") {
    if (db[el][e].includes(" ")) {
      db[el][e] = db[el][e].split(" ").join("");
      copydb[el][e] = db[el][e].split(" ").join("");
      checkEach();
    } else {
      checkEach();
    }
  } else if (e === "slug") {
    copydb[el]["sku"] = db[el][e];
    checkEach();
  } else if (e === "tags") {
    if (db[el][e][0].id != "") {
      Tag.find({ name: db[el][e][0].id })
        .then((tag) => {
          // console.log("tag", tag);
          if (tag.length === 0) {
            // console.log("object", db[el][e][0].id, typeof db[el][e][0].id);
            wooApi
              .post("products/tags", {
                name: db[el][e][0].id,
                slug: tr(db[el][e][0].id),
              })
              .then((response) => {
                // console.log(response.data);
                Tag.create({ name: db[el][e][0].id, dbid: response.data.id })
                  .then((tagCreated) => {
                    copydb[el][e][0].id = tagCreated.dbid;
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            copydb[el][e][0].id = tag.dbid;
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      delete copydb[el][e];
      checkEach();
    }
  } else if (e === "microwave") {
    if (db[el][e]) {
      Options.find({ name: e })
        .then((opt) => {
          if (opt.length === 0) {
            wooApi
              .post("products/categories", {
                name: e,
                slug: e,
                parent: 26,
              })
              .then((response) => {
                // console.log(response.data);
                Options.create({ name: e, dbid: response.data.id })
                  .then((countryCreated) => {
                    copydb[el]["categories"].push({
                      id: countryCreated.dbid,
                    });
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            copydb[el]["categories"].push({ id: opt.dbid });
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      checkEach();
    }
  } else if (e === "pm") {
    if (db[el][e]) {
      Options.find({ name: e })
        .then((opt) => {
          if (opt.length === 0) {
            wooApi
              .post("products/categories", {
                name: e,
                slug: e,
                parent: 26,
              })
              .then((response) => {
                // console.log(response.data);
                Options.create({ name: e, dbid: response.data.id })
                  .then((countryCreated) => {
                    copydb[el]["categories"].push({
                      id: countryCreated.dbid,
                    });
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            copydb[el]["categories"].push({ id: opt.dbid });
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      checkEach();
    }
  } else if (e == "categories") {
    const catsLength = db[el][e].length;
    let catsItter = 0;

    const checkEachCats = () => {
      if (catsItter < catsLength - 1) {
        catsItter += 1;
        catsEach(db[el][e][catsItter]);
      } else {
        checkEach();
      }
    };

    const catsEach = (cat) => {
      Category.find({ name: cat.name }).then((category) => {
        if (category.length === 0) {
          // console.log("object", db[el][e][0].id, typeof db[el][e][0].id);
          wooApi
            .post("products/categories", {
              name: cat.name,
              slug: tr(cat.name),
            })
            .then((response) => {
              // console.log("response.data cat", response.data);
              Category.create({ name: cat.name, dbid: response.data.id })
                .then((categoryCreated) => {
                  // console.log("categoryCreated", categoryCreated);
                  copydb[el][e].push({ id: categoryCreated.dbid });

                  workWithCategoryChilds(
                    el,
                    e,
                    cat.childs,
                    categoryCreated.dbid,
                    checkEachCats.bind(this)
                  );
                })
                .catch((err) => console.log("Произошла ошибка", err));
            })
            .catch((error) => {
              console.log("error api", error.response.data, el, e);
            });
        } else {
          copydb[el][e].push({ id: category[0].dbid });
          workWithCategoryChilds(
            el,
            e,
            cat.childs,
            category[0].dbid,
            checkEachCats.bind(this)
          );
        }
      });
    };
    catsEach(db[el][e][catsItter]);
  } else if (e === "attributes") {
    checkEach();
  } else if (e === "brand") {
    Brand.find({ name: db[el][e] })
      .then((brand) => {
        if (brand.length === 0) {
          wooApi
            .post("products/categories", {
              name: db[el][e],
              slug: tr(db[el][e]),
              parent: 21,
            })
            .then((response) => {
              // console.log(response.data);
              Brand.create({ name: db[el][e], dbid: response.data.id })
                .then((brandCreated) => {
                  // console.log("tag", tagCreated);
                  copydb[el]["categories"].push({ id: brandCreated.dbid });
                  checkEach();
                })
                .catch((err) => console.log("Произошла ошибка", err));
            })
            .catch((error) => {
              console.log("error api", error.response.data, el, e);
            });
        } else {
          copydb[el]["categories"].push({ id: brand[0].dbid });
          checkEach();
        }
      })
      .catch((err) => console.log("Произошла ошибка", err));
  } else if (e === "color") {
    console.log("color1", db[el][e]);
    if (db[el][e] != "") {
      Color.find({ name: db[el][e] })
        .then((color) => {
          console.log("color2");
          if (color.length === 0) {
            console.log("color3");
            wooApi
              .post("products/categories", {
                name: db[el][e],
                slug: tr(db[el][e]),
                parent: 20,
              })
              .then((response) => {
                console.log("color4");
                // console.log(response.data);
                Color.create({ name: db[el][e], dbid: response.data.id })
                  .then((colorCreated) => {
                    // console.log("tag", tagCreated);
                    console.log("color5");
                    copydb[el]["categories"].push({ id: colorCreated.dbid });
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            console.log("color6");
            copydb[el]["categories"].push({ id: color[0].dbid });
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      checkEach();
    }
  } else if (e === "material") {
    if (db[el][e] != "") {
      Material.find({ name: db[el][e] })
        .then((material) => {
          if (material.length === 0) {
            wooApi
              .post("products/categories", {
                name: db[el][e],
                slug: tr(db[el][e]),
                parent: 24,
              })
              .then((response) => {
                // console.log(response.data);
                Material.create({ name: db[el][e], dbid: response.data.id })
                  .then((materialCreated) => {
                    copydb[el]["categories"].push({
                      id: materialCreated.dbid,
                    });
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            copydb[el]["categories"].push({ id: material[0].dbid });
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      checkEach();
    }
  } else if (e === "country") {
    if (db[el][e] != "") {
      Country.find({ name: db[el][e] })
        .then((country) => {
          if (country.length === 0) {
            wooApi
              .post("products/categories", {
                name: db[el][e],
                slug: tr(db[el][e]),
                parent: 25,
              })
              .then((response) => {
                // console.log(response.data);
                Country.create({ name: db[el][e], dbid: response.data.id })
                  .then((countryCreated) => {
                    copydb[el]["categories"].push({
                      id: countryCreated.dbid,
                    });
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            copydb[el]["categories"].push({ id: country[0].dbid });
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      checkEach();
    }
  } else if (e === "new") {
    if (db[el][e]) {
      Options.find({ name: e })
        .then((opt) => {
          if (opt.length === 0) {
            wooApi
              .post("products/categories", {
                name: e,
                slug: e,
                parent: 26,
              })
              .then((response) => {
                // console.log(response.data);
                Options.create({ name: e, dbid: response.data.id })
                  .then((countryCreated) => {
                    copydb[el]["categories"].push({
                      id: countryCreated.dbid,
                    });
                    checkEach();
                  })
                  .catch((err) => console.log("Произошла ошибка", err));
              })
              .catch((error) => {
                console.log("error api", error.response.data, el, e);
              });
          } else {
            copydb[el]["categories"].push({ id: opt[0].dbid });
            checkEach();
          }
        })
        .catch((err) => console.log("Произошла ошибка", err));
    } else {
      checkEach();
    }
  } else if (e === "stores") {
    db[el][e].forEach((s, i) => {
      if (parseInt(s.count) >= 0) {
        Stores.find({ name: s.name })
          .then((store) => {
            if (store.length === 0) {
              wooApi
                .post("products/categories", {
                  name: s.name,
                  slug: tr(s.name),
                  parent: 27,
                })
                .then((response) => {
                  // console.log(response.data);
                  Stores.create({
                    name: s.name,
                    dbid: response.data.id,
                    address: s.address,
                    tel: s.tel,
                  })
                    .then((storeCreated) => {
                      if (parseInt(s.count) > 0) {
                        copydb[el]["categories"].push({
                          id: storeCreated.dbid,
                        });
                        copydb[el]["meta_data"].push({
                          key: e.name,
                          value: e.count,
                        });
                        if (i == db[el][e].length - 1) {
                          checkEach();
                        }
                      }
                    })
                    .catch((err) => console.log("Произошла ошибка", err));
                })
                .catch((error) => {
                  console.log("error api", error.response.data, s.name, el, e);
                  if (
                    error.response.data.data.status === 400 &&
                    error.response.data.code == "term_exists"
                  ) {
                    Stores.create({
                      name: s.name,
                      dbid: error.response.data.data.resource_id,
                      address: s.address,
                      tel: s.tel,
                    })
                      .then((storeCreated) => {
                        if (parseInt(s.count) > 0) {
                          copydb[el]["categories"].push({
                            id: storeCreated.dbid,
                          });
                          copydb[el]["meta_data"].push({
                            key: e.name,
                            value: e.count,
                          });
                          if (i == db[el][e].length - 1) {
                            checkEach();
                          }
                        }
                      })
                      .catch((err) => console.log("Произошла ошибка", err));
                  }
                });
            } else {
              if (parseInt(s.count) > 0) {
                copydb[el]["categories"].push({ id: store[0].dbid });
                copydb[el]["meta_data"].push({
                  key: e.name,
                  value: e.count,
                });
                if (i == db[el][e].length - 1) {
                  checkEach();
                }
              }
            }
          })
          .catch((err) => console.log("Произошла ошибка", err));
      } else {
        db[el]["stock_quantity"] = String(
          parseInt(db[el]["stock_quantity"]) - parseInt(s.count)
        );
        copydb[el]["stock_quantity"] = String(
          parseInt(copydb[el]["stock_quantity"]) - parseInt(s.count)
        );
        if (i == db[el][e].length - 1) {
          checkEach();
        }
      }
    });
  } else if (e === "storage") {
    copydb[el]["meta_data"].push({
      key: e,
      value: db[el][e],
    });
    checkEach();
  } else {
    checkEach();
  }
};

console.log("object", dbNumber, dbElementKeys[dbElemNumber]);

// test(dbNumber, dbElementKeys[dbElemNumber]);

const workWithCategoryChilds = (el, e, arr, parentID, check) => {
  const arrLength = arr.length;
  let itter = 0;

  const checkArr = () => {
    if (itter < arrLength - 1) {
      itter += 1;
      createSubcat(arr[itter]);
    } else {
      check();
    }
  };

  const createSubcat = (elem) => {
    Category.find({ name: elem })
      .then((category) => {
        if (category.length === 0) {
          // console.log("object", db[el][e][0].id, typeof db[el][e][0].id);
          wooApi
            .post("products/categories", {
              name: elem,
              slug: tr(elem),
              parent: parentID,
            })
            .then((response) => {
              Category.create({
                name: elem,
                dbid: response.data.id,
                parent: parentID,
              })
                .then((categoryCreated) => {
                  copydb[el][e].push({ id: categoryCreated.dbid });
                  checkArr();
                })
                .catch((err) => console.log("Произошла ошибка", err));
            })
            .catch((error) => {
              console.log("error api", error.response.data, el, e);
            });
        } else {
          copydb[el][e].push({ id: category[0].dbid });
          checkArr();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  createSubcat(arr[itter]);
};

app.use(requestLogger);

const getProducts = (req, res) => {
  const { body } = req;
  const { start, stop } = body;
  delete body.start;
  delete body.stop;
  Product.find(body)
    .skip(start)
    .limit(stop - start)
    .then((product) => res.send({ ...product }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const getCats = (req, res) => {
  Category.find({ parent: { $exists: false } })
    .then((mainCats) => {
      mainCats.forEach((elem, i) => {
        Category.find({ parent: elem.dbid })
          .then((childCats) => {
            mainCats[i]._doc.childs = childCats;

            if (i === mainCats.length - 1) {
              setTimeout(() => {
                res.send(mainCats);
              }, 500);
            }
          })
          .catch((err) => console.log("err", err));
      });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const getSortNames = (req, res) => {
  const { body } = req;
  Product.aggregate([
    { $match: body },
    {
      $group: {
        _id: "$title",
        minPrice: { $min: "$regular_price" },
        maxPrice: { $max: "$regular_price" },
        brand: { $addToSet: "$brand" },
        material: { $addToSet: "$material" },
        country: { $addToSet: "$country" },
        color: { $addToSet: "$color" },
        measure: {
          $addToSet: {
            name: "$attributes.name",
            value: "$attributes.value",
            unit: "$attributes.unit",
          },
        },
      },
    },
  ])
    .then((data) => {
      console.log("body", body);
      // if (data[0]) {
      //   const newMeas = data[0].measure.map((el) => (el.length ? el[0] : ""));
      //   data[0].measure = newMeas;
      // }
      console.log("data[0]", data[0]);
      res.send({ ...data[0] });
    })
    .catch((err) => console.log("err", err));
};

const getMainPage = (req, res) => {
  Product.aggregate([
    {
      $facet: {
        hit: [{ $match: { new: true } }, { $limit: 16 }],
        new: [{ $match: { new: true } }, { $limit: 16 }],
        all: [{ $match: {} }, { $limit: 8 }],
      },
    },
  ])
    .then((data) => {
      res.send({ ...data });
    })
    .catch((err) => console.log("err", err));
};

app.post("/", getProducts);
app.get("/categories", getCats);
app.post("/sort-names", getSortNames);
app.get("/main-page", getMainPage);
app.all("/*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
