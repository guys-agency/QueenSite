import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Profile = observer(
    class Profile extends Component {
        state = {}
        render() {
            return ( 
                <div className="profile-p">
                    <ul className="small-nav">
                        <div className="container container_f">
                            <li><a className="active" href=""><span className="ic i_user"></span>Профиль</a></li>
                            <li><a href=""><span className="ic i_fav"></span>Избранное</a></li>
                            <li><a href="">Выход</a></li>
                        </div>
                    </ul>
                    <div className="container">
                        <div className="row">
                            <div className="col col-7">
                                <h4>Последние заказы</h4>
                                <div className="orders">
                                    <div className="orders-item">
                                        <div className="orders-item__head">
                                            <h4>Заказ №210 на сумму 5 200₽</h4>
                                            <div className="date">17.12.2018</div>
                                        </div>
                                        <div className="orders-item__desc">
                                            <div className="status">В обработке</div>
                                            <button className="link dotted" onClick={(e) => {
                                                e.target.classList.toggle('active')
                                                e.target.closest('.orders-item').classList.toggle('active');
                                            }}>состав заказа <span className="ic i_drop"></span></button>
                                        </div>
                                        <div className="orders-item__products">
                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>

                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>

                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="orders-item">
                                        <div className="orders-item__head">
                                            <h4>Заказ №210 на сумму 5 200₽</h4>
                                            <div className="date">17.12.2018</div>
                                        </div>
                                        <div className="orders-item__desc">
                                            <div className="status status_blue">Отправлен</div>
                                            <button className="link dotted" onClick={(e)=>{
                                                e.target.classList.toggle('active')
                                                e.target.closest('.orders-item').classList.toggle('active');
                                            }}>состав заказа <span className="ic i_drop"></span></button>
                                        </div>
                                        <div className="orders-item__products">
                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>

                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>

                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="orders-item">
                                        <div className="orders-item__head">
                                            <h4>Заказ №210 на сумму 5 200₽</h4>
                                            <div className="date">17.12.2018</div>
                                        </div>
                                        <div className="orders-item__desc">
                                            <div className="status status_green">Получен</div>
                                            <button className="link dotted" onClick={(e) => {
                                                e.target.classList.toggle('active')
                                                e.target.closest('.orders-item').classList.toggle('active');
                                            }}>состав заказа <span className="ic i_drop"></span></button>
                                        </div>
                                        <div className="orders-item__products">
                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>

                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>

                                            <div className="item">
                                                <span className="name">Блюдо овальное 32 см Луиза, Роза вензель, кобальт</span>
                                                <span className="price">152 ₽</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-1">
                                <div className="profile-p__divider"></div>
                            </div>
                            <div className="col col-4">
                                <div className="profile-p__side">
                                    <h4>Данные</h4>
                                    <div className="profile-p__card">
                                        <div className="user__name">Данил Леонов</div>
                                        <div className="user__contact">
                                            <div className="user__phone">+7 995 299-22-23</div>
                                            <div className="user__mail">d@guys.agency</div>
                                        </div>
                                        <div className="user__edit">
                                            <button className="link dotted">Редактировать</button>
                                        </div>
                                    </div>
                                    <h4>Избранное</h4>
                                    <div className="product product_h">
                                        <div className="product__image">
                                            <div className="product__image-wrp">
                                                <img src="/image/Category/Product-card/Placeholder.png" />
                                            </div>
                                        </div>
                                        <div className="product__info">
                                            <a className="product__name">
                                                Кружка 370 мл Модерн, черная матовая
                                        </a>
                                            <div className="product__price product__price_disc">
                                                <span className="old">152 ₽</span> 152 ₽{" "}
                                                <span className="disc_perc">-20%</span>
                                            </div>
                                            <button className="ic i_close"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             );
        }
    }
)
 
export default Profile;