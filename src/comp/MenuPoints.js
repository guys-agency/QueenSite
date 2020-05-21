import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import Cart from "./Cart";
const { Component } = React;

const MenuPoints = observer(
  class MenuPoints extends Component {
    state = {
      ready: false,
    };

    menuContainer = [];

    createMenu = () => {
      fetch("http://134.122.81.119/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("res", res);
          return res.json();
        })
        .then((data) => {
          console.log("dataCat", data);
          data.forEach((elem, i) => {
            const childsPoints = [];

            elem.childs.sort((prev, next) => {
              if (prev.name < next.name) return -1;
              if (prev.name < next.name) return 1;
            });
            elem.childs.sort().forEach((child, iCh) => {
              //убрать tr, так как будут поля с транскрипцией в бд
              childsPoints.push(
                <NavLink to={`/catalog/${elem.slug}/${child.slug}`}>
                  <Dropdown.Item
                    // onClick={() => {
                    //   this.props.chooseMenuPoint(elem.name, child.name, 0, 50);
                    // }}
                    key={iCh}
                  >
                    {child.name}
                  </Dropdown.Item>
                </NavLink>
              );
            });
            this.menuContainer.push(
              <Dropdown key={i} text={elem.name} pointing className="link item">
                <Dropdown.Menu>{childsPoints}</Dropdown.Menu>
              </Dropdown>
            );
          });
          this.setState({ ready: true });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    render() {
      return (
        this.state.ready && (
          <>
            <Menu>{this.menuContainer}</Menu>
              <div className="header">
                <div className="container container_f">
                  <div className="left">
                    <Link className="point">О нас</Link>
                    <Link className="point">Магазины</Link>
                    <Link className="point">Помощь</Link>
                    <Link className="point">Бонусы</Link>
                    <div className="point">город</div>
                  </div>
                  <Link className="logo" to="/">
                    <img src="/image/logo.svg" />
                  </Link>
                  <div className="right">
                    <Link className="bold-point">Задать вопрос</Link>
                    <a className="phone">+7 495 744-00-50</a>
                  </div>
                </div>
              </div>
              <div className="navigation">
                <div className="container container_f">
                  <div className="left">
                    <button className="btn btn_primary"> <span className="ic i_menu"></span> Каталог</button>
                    <Link className="menu-point">Коллекции</Link>
                    <Link className="menu-point">Премиум</Link>
                    <Link className="menu-point">Милениум</Link>
                    <Link className="menu-point">Интерьер</Link>
                    <Link className="menu-point">Подарки</Link>
                    <Link className="sale-point">Акции</Link>
                  </div>
                  <div className="right">
                    <input className="search" placeholder="Поиск"></input>
                    <div className="liked">L</div>
                    <div className="cart">C</div>
                    <div className="profile">P</div>
                  </div>
                </div>
              </div>
            <div className="pop-catalog">
              <div className="colum">
                <div>
                  <h5 className="catalog-title">Сервировка стола</h5>
                </div>
                <div>
                  <h5 className="catalog-title">Кофе и чай</h5>
                </div>
              </div>

              <div className="colum">
                <div>
                  <h5 className="catalog-title">Напитки</h5>
                </div>
                <div>
                  <h5 className="catalog-title">Интерьер</h5>
                </div>
              </div>
              <div className="colum">
                <div>
                  <h5 className="catalog-title">Хранение</h5>
                </div>
                <div>
                  <h5 className="catalog-title">Для приготовления</h5>
                </div>
              </div>
              <div className="colum">
                <div>
                  <h5 className="catalog-title">Наборы</h5>
                </div>
                <div>
                  <h5 className="catalog-title">Сервизы</h5>
                </div>
              </div>
            </div>
          </>
        )
      );
    }

    componentDidMount() {
      this.createMenu();
    }
  }
);

export default MenuPoints;
