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

      brRend.push(<Link to="/">Главная</Link>);

      if (window.location.pathname.includes("collections")) {
        if (this.props.name) {
          brRend.push(<Link to={"/collections"}>Коллекции</Link>);
        } else {
          brRend.push(<NavLink to={"/collections"}>Коллекции</NavLink>);
        }
      } else if (window.location.pathname.includes("closeout")) {
        if (this.props.name) {
          brRend.push(<Link to={"/closeout"}>Распродажа</Link>);
        } else {
          brRend.push(<NavLink to={"/closeout"}>Распродажа</NavLink>);
        }
      } else if (window.location.pathname.includes("actions")) {
        if (this.props.name) {
          brRend.push(<Link to={"/actions"}>Акции</Link>);
        } else {
          brRend.push(<NavLink to={"/actions"}>Акции</NavLink>);
        }
      } else if (
        !window.location.pathname.includes("premium") &&
        !window.location.pathname.includes("interer") &&
        !window.location.pathname.includes("podarki") &&
        window.location.pathname.includes("catalog")
      ) {
        if (this.props.name) {
          brRend.push(<Link to={"/catalog"}>Каталог</Link>);
        } else {
          brRend.push(<NavLink to={"/catalog"}>Каталог</NavLink>);
        }
      }

      let inPath = "";

      if (window.location.pathname.includes("collections")) {
        inPath = "/collections/";
      } else if (window.location.pathname.includes("closeout")) {
        inPath = "/closeout/";
      } else if (window.location.pathname.includes("actions")) {
        inPath = "/actions/";
      } else {
        inPath = "/catalog/";
      }

      if (this.props.name) {
        if (this.props.child) {
          console.log("5 :>> ", 5);
          brRend.push(
            <Link to={inPath + this.props.name}>
              {this.props.store.menuAccor[this.props.name]}
            </Link>
          );
        } else {
          console.log("this.props.child :>> ", this.props.child);
          brRend.push(
            <NavLink to={inPath + this.props.name}>
              {this.props.store.menuAccor[this.props.name]}
            </NavLink>
          );
        }
      }

      if (this.props.child) {
        if (!this.props.prod) {
          brRend.push(
            <NavLink
              to={"/catalog/" + this.props.name + "/" + this.props.child}
            >
              {this.props.store.menuAccor[this.props.child]}
            </NavLink>
          );
        } else {
          brRend.push(
            <Link to={"/catalog/" + this.props.name + "/" + this.props.child}>
              {this.props.store.menuAccor[this.props.child]}
            </Link>
          );
        }
      }
      return <div className="breadcrumbs">{brRend}</div>;
    }
  }
);

export default Breadcrumbs;
