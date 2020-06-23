import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import store from "../MobxStore";
const { Component } = React;

// const DynamicBreadcrumb = ({ match }) => {
//   console.log("store :>> ", store.menuAccor);
//   console.log("match.params.parentName", match.params.parentName);
//   console.log(
//     "store.menuAccor[match.params.parentName] :>> ",
//     store.menuAccor
//   );
//   return (
//     <span>{store.menuAccor[match.params.parentName]}</span> >>
//     <span>{store.menuAccor[match.params.childName]}</span>
//   );
// };

// const routes = [
//   {
//     path: "/catalog/:parentName/:childName",
//     breadcrumb: DynamicBreadcrumb,
//   },
//   {
//     path: "/catalog/:parentName",
//     breadcrumb: DynamicBreadcrumb,
//     matchOptions: { strict: true },
//   },
//   { path: "/catalog", breadcrumb: "Каталог" },
//   { path: "/collections/:slug", breadcrumb: "Каталог" },
//   { path: "/collections", breadcrumb: "Коллекции" },
//   { path: "/ideas/:slug", breadcrumb: "Коллекции" },
//   { path: "/ideas", breadcrumb: "Идеи" },
//   { path: "/hits", breadcrumb: "Хиты" },
// ];

// const Breadcrumbs = ({ breadcrumbs }) => (
//   <div>
//     {breadcrumbs.map(({ match, breadcrumb }) => (
//       <span key={match.url}>
//         <NavLink to={match.url}>{breadcrumb}</NavLink>
//       </span>
//     ))}
//   </div>
// );

const Breadcrumbs = observer(
  class Breadcrumbs extends Component {
    state = {};
    render() {
      const brRend = [];

      brRend.push(
        <Link to="/" key="Главная">
          Главная
        </Link>
      );

      if (
        window.location.pathname.includes("collections") ||
        this.props.name === "collections"
      ) {
        this.props.store.firstBread = "collections";

        if (this.props.name) {
          brRend.push(
            <Link to={"/collections"} key="collections">
              Коллекции
            </Link>
          );
        } else {
          brRend.push(
            <NavLink to={"/collections"} key="collections">
              Коллекции
            </NavLink>
          );
        }
      } else if (
        window.location.pathname.includes("closeout") ||
        this.props.name === "closeout"
      ) {
        this.props.store.firstBread = "actions";
        if (this.props.name) {
          brRend.push(
            <Link to={"/closeout"} key="closeout">
              Распродажа
            </Link>
          );
        } else {
          brRend.push(
            <NavLink to={"/closeout"} key="closeout">
              Распродажа
            </NavLink>
          );
        }
      } else if (
        window.location.pathname.includes("actions") ||
        this.props.name === "actions"
      ) {
        this.props.store.firstBread = "actions";
        if (this.props.name) {
          brRend.push(
            <Link to={"/actions"} key="actions">
              Акции
            </Link>
          );
        } else {
          brRend.push(
            <NavLink to={"/actions"} key="actions">
              Акции
            </NavLink>
          );
        }
      } else if (
        !window.location.pathname.includes("premium") &&
        !window.location.pathname.includes("interer") &&
        !window.location.pathname.includes("podarki") &&
        window.location.pathname.includes("catalog") &&
        this.props.name !== "actions" &&
        this.props.name !== "closeout" &&
        this.props.name !== "collections" &&
        this.props.name !== "ideas"
      ) {
        if (this.props.name) {
          brRend.push(
            <Link to={"/catalog"} key="catalog">
              Каталог
            </Link>
          );
        } else {
          brRend.push(
            <NavLink to={"/catalog"} key="catalog">
              Каталог
            </NavLink>
          );
        }
      }

      let inPath = "";

      if (
        window.location.pathname.includes("collections") ||
        this.props.name === "collections"
      ) {
        inPath = "/collections/";
      } else if (
        window.location.pathname.includes("closeout") ||
        this.props.name === "closeout"
      ) {
        inPath = "/closeout/";
      } else if (
        window.location.pathname.includes("actions") ||
        this.props.name === "actions"
      ) {
        inPath = "/actions/";
      } else if (
        window.location.pathname.includes("ideas") ||
        this.props.name === "ideas"
      ) {
        this.props.store.firstBread = "ideas";
        inPath = "/ideas/";
      } else {
        inPath = "/catalog/";
      }
      if (
        this.props.store.firstBread !== "actions" &&
        this.props.store.firstBread !== "closeout" &&
        this.props.store.firstBread !== "collections" &&
        this.props.store.firstBread !== "ideas"
      ) {
        this.props.store.firstBread = this.props.name;
      } else {
        if (this.props.store.secondBread === "") {
          this.props.store.secondBread = this.props.name;
        }
      }
      if (
        this.props.name &&
        this.props.name !== "actions" &&
        this.props.name !== "closeout" &&
        this.props.name !== "collections" &&
        this.props.name !== "ideas"
      ) {
        if (this.props.child) {
          brRend.push(
            <Link
              to={inPath + this.props.name}
              key={this.props.store.menuAccor[this.props.name]}
            >
              {this.props.store.menuAccor[this.props.name]}
            </Link>
          );
        } else {
          brRend.push(
            <NavLink
              to={inPath + this.props.name}
              key={this.props.store.menuAccor[this.props.name]}
            >
              {this.props.store.menuAccor[this.props.name]}
            </NavLink>
          );
        }
      }

      if (this.props.child) {
        if (
          this.props.store.firstBread !== "actions" &&
          this.props.store.firstBread !== "closeout" &&
          this.props.store.firstBread !== "collections" &&
          this.props.store.firstBread !== "ideas"
        ) {
          this.props.store.secondBread = this.props.child;
          if (!this.props.prod) {
            brRend.push(
              <NavLink
                to={"/catalog/" + this.props.name + "/" + this.props.child}
                key={this.props.store.menuAccor[this.props.child]}
              >
                {this.props.store.menuAccor[this.props.child]}
              </NavLink>
            );
          } else {
            brRend.push(
              <Link
                to={"/catalog/" + this.props.name + "/" + this.props.child}
                key={this.props.store.menuAccor[this.props.child]}
              >
                {this.props.store.menuAccor[this.props.child]}
              </Link>
            );
          }
        } else {
          if (this.props.store.secondBread === "") {
            this.props.store.secondBread = this.props.name;
          }
          if (!this.props.prod) {
            brRend.push(
              <NavLink
                to={this.props.name + "/" + this.props.child}
                key={this.props.store.menuAccor[this.props.child]}
              >
                {this.props.store.menuAccor[this.props.child]}
              </NavLink>
            );
          } else {
            brRend.push(
              <Link
                to={"/" + this.props.name + "/" + this.props.child}
                key={this.props.store.menuAccor[this.props.child]}
              >
                {this.props.store.menuAccor[this.props.child]}
              </Link>
            );
          }
        }
      }
      if (this.props.prod) {
        brRend.push(
          <NavLink to={"/product/" + this.props.prodSlug} key={this.props.prod}>
            {this.props.prod}
          </NavLink>
        );
      }
      return <div className="breadcrumbs">{brRend}</div>;
    }
  }
);

export default Breadcrumbs;
