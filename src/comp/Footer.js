import React from "react";
import { observer } from "mobx-react";
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const Footer = observer(
  class Footer extends Component {
    state = {};
    render() {
      return (
        <div className="footer">
          <div className="container">
            <div className="footer__logo-m">
              <a className="logo logo_vl" href="/">
                <span className="i_queen"></span>
                <span className="i_of"></span>
                <span className="i_bohemia"></span>
                <span className="i_qr"></span>
              </a>
            </div>
            <div className="footer__row">
              <div className="footer__column">
                <h4 className="white">Наши новости</h4>
                <div className="social">
                  {/* <a className="ic i_fb" href="https://www.instagram.com/queenbohemia.ru/"></a> */}
                  <a
                    className="ic i_inst"
                    href="https://www.instagram.com/queenbohemia.ru/"
                  ></a>
                </div>
                <Link to="/" className="logo logo_sq">
                  <span className="i_queen"></span>
                  <span className="i_of"></span>
                  <span className="i_line-h"></span>
                  <span className="i_bohemia"></span>
                  <span className="i_qr"></span>
                </Link>
              </div>
              <div className="footer__column">
                <h4 className="white">Категории</h4>
                <div className="footer__links-column">
                  <ul className="footer__links">
                    <li>
                      <Link to="/catalog/">Каталог</Link>
                    </li>
                    <li>
                      <Link to="/collections/">Коллекции</Link>
                    </li>
                    <li>
                      <Link to="/catalog/interer/">Интерьр</Link>
                    </li>
                    <li>
                      <Link to="/catalog/podarki/">Подарки</Link>
                    </li>
                  </ul>
                  <ul className="footer__links">
                    <li>
                      <Link to="/catalog/premium/">Premium</Link>
                    </li>
                    {/* <li>
                                            <Link to="">Милениум</Link>
                                        </li> */}
                    <li>
                      <Link to="/actions">Акции</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer__column">
                <h4 className="white">Сервис</h4>
                <div className="footer__links-column">
                  <ul className="footer__links">
                    <li>
                      <Link to="/about">О нас</Link>
                    </li>
                    <li>
                      <Link to="/help/delivery">Доставка</Link>
                    </li>
                    <li>
                      <Link to="/help/payment">Оплата</Link>
                    </li>

                    <li>
                      <Link to="/help/garantie">Гарантия</Link>
                    </li>
                  </ul>
                  <ul className="footer__links">
                    <li>
                      <Link to="/help/return">Возврат</Link>
                    </li>
                    {/* <li>
                      <Link to="/help/Бонусы">Бонусы</Link>
                    </li> */}
                    <li>
                      <Link to="/help/offer">Публичная оферта</Link>
                    </li>
                    <li>
                      <Link to="/help/policy" onClick={this.closeNav}>
                        Политика конфиденциальности
                      </Link>
                    </li>
                    <li>
                      <Link to="/help/bonus" onClick={this.closeNav}>
                        Бонусы
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer__column">
                <a href="tel:88006003421">
                  <h4 className="white">8 800 600-34-21</h4>
                </a>
                <button
                  className="link dotted ask"
                  onClick={() => {
                    document
                      .querySelector(".sidebar-overlay")
                      .classList.add("active");

                    document.querySelector("body").classList.add("no-scroll");

                    this.props.store.sideAsk = true;
                  }}
                >
                  Задать вопрос
                </button>
                <div>
                  <a className="underline" href="mailto:info@queenbohemia.ru">
                    info@queenbohemia.ru
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container container_f ">
              <div className="footer__column">
                <p>queenbohemia.ru © 1993 – 2020. Все права защищены</p>
              </div>
              <div className="footer__column">
                <p>
                  105082, г. Москва, Переведёновский переулок, д. 13, стр. 18
                </p>
              </div>
            </div>
          </div>
          {/* <div
                        onLoad={() => {
                            console.log("test");
                        }}
                    ></div> */}
        </div>
      );
    }
  }
);

export default Footer;
