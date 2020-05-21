import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
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

    toggleMenu = (e) => {
      $('.menu_mega').toggleClass('visible');
      e.stopPropagation();
    }

    closeAll = (e) => {
      $('.menu_mega').removeClass('visible');
    }

    componentDidMount() {
      this.createMenu();
    }

    componentDidUpdate(){
      $('.btn-menu').off('click', this.toggleMenu);
      $('.btn-menu').on('click', this.toggleMenu);
      $('html').off('click', this.closeAll);
      $('html').on('click', this.closeAll);
    }

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
                    <Link>О нас</Link>
                    <Link>Магазины</Link>
                    <Link>Помощь <span className="ic i_drop"></span></Link>
                    <Link>Бонусы</Link>
                    <button className="link dotted">Москва <span className="ic i_drop"></span></button>
                  </div>
                  <Link className="logo" to="/">
                    <img src="/image/logo.svg" />
                  </Link>
                  <div className="right">
                    <button className="link dotted ask">Задать вопрос</button>
                    <a href="tel:+7 495 744-00-50" className="phone">+7 495 744-00-50</a>
                  </div>
                </div>
              </div>
              <div className="navigation">
                <div className="container container_f">
                  <div className="left">
                    <button className="btn btn_primary btn-menu"> <span className="ic i_menu"></span> Каталог</button>
                    <Link className="menu-point">Коллекции</Link>
                    <Link className="menu-point">Премиум</Link>
                    <Link className="menu-point">Милениум</Link>
                    <Link className="menu-point">Интерьер</Link>
                    <Link className="menu-point">Подарки</Link>
                    <Link className="sale-point">Акции</Link>
                  </div>
                  <div className="right">
                    <input className="search" placeholder="Поиск"></input>
                    <button className="liked ic i_fav"></button>
                    <button className="cart ic i_bag"></button>
                    <button className="profile ic i_user"></button>
                  </div>
                  <div className="menu menu_mega">
                    <div className="container container_f">
                      <div className="column">
                        <div>
                          <h5>Сервировка стола</h5>
                          <ul>
                            <li><a href="">Блюда</a></li>
                            <li><a href="">Блюда для сервировки</a></li>
                            <li><a href="">Горки</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                          </ul>
                        </div>
                        <div>
                          <h5>Кофе и чай</h5>
                          <ul>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                          </ul>
                        </div>
                      </div>

                      <div className="column">
                        <div>
                          <h5>Напитки</h5>
                          <ul>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                          </ul>
                        </div>
                        <div>
                          <h5>Интерьер</h5>
                          <ul>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                            <li><a href="">Тест</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="column">
                        <div>
                          <h5>Хранение</h5>
                        </div>
                        <div>
                          <h5>Для приготовления</h5>
                        </div>
                      </div>
                      <div className="column">
                        <div>
                          <h5>Наборы</h5>
                        </div>
                        <div>
                          <h5>Сервизы</h5>
                        </div>
                      </div>
                    </div>
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
