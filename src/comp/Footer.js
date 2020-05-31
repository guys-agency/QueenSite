import React from "react";
import { observer } from "mobx-react";
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const Footer = observer(
    class Footer extends Component {
        state = {}
        render() {
            return ( 

                <div className="footer">

                    <div className="container">
                        <div className="footer__logo-m">
                            <a class="logo logo_vl" href="/">
                                <span class="i_queen"></span>
                                <span class="i_of"></span>
                                <span class="i_bohemia"></span>
                                <span class="i_qr"></span>
                            </a>
                        </div>
                        <div className="footer__row">
                            <div className="footer__column">
                                <h4 className="white">Наши новости</h4>
                                <div className="social">
                                    <a className="ic i_fb" href=""></a>
                                    <a className="ic i_inst" href=""></a>
                                </div>
                                <a href="/" className="logo logo_sq">
                                    <span className="i_queen"></span>
                                    <span className="i_of"></span>
                                    <span className="i_line-h"></span>
                                    <span className="i_bohemia"></span>
                                    <span className="i_qr"></span>
                                </a>
                            </div>
                            <div className="footer__column">
                                <h4 className="white">Категории</h4>
                                <div className="footer__links-column">
                                    <ul className="footer__links">
                                        <li>
                                            <a href="/catalog/">Каталог</a>
                                        </li>
                                        <li>
                                            <a href="/collections/">Коллекции</a>
                                        </li>
                                        <li>
                                            <a href="/catalog/interer/">Интерьр</a>
                                        </li>
                                        <li>
                                            <a href="/gifts/">Подарки</a>
                                        </li>
                                    </ul>
                                    <ul className="footer__links">
                                        <li>
                                            <a href="/premium/">Premium</a>
                                        </li>
                                        {/* <li>
                                            <a href="">Милениум</a>
                                        </li> */}
                                        <li>
                                            <a href="actions">Акции</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer__column">
                                <h4 className="white">Сервис</h4>
                                <div className="footer__links-column">
                                    <ul className="footer__links">
                                        <li>
                                            <a href="/about">О нас</a>
                                        </li>
                                        <li>
                                            <a href="/help/delivery">Доставка</a>
                                        </li>
                                        <li>
                                            <a href="/help/payment">Оплата</a>
                                        </li>

                                        <li>
                                            <a href="/help/garantie">Гарантия</a>
                                        </li>
                                    </ul>
                                    <ul className="footer__links">
                                        <li>
                                            <a href="/help/return">Возврат</a>
                                        </li>
                                        <li>
                                            <a href="/help/Бонусы">Бонусы</a>
                                        </li>
                                        <li>
                                            <a href="/help/offer">Публичная оферта</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="footer__column">
                                <a href="tel:+78008085878">
                                    <h4 className="white">+7 800 808-58-78</h4>
                                </a>
                                <button className="link dotted ask">Задать вопрос</button>
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