import React from 'react';
import { observer } from 'mobx-react';
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const Help = observer(
  class Help extends Component {
    state = {};
    render() {
      return (
        <div className="help">
          <ul className="small-nav">
            <div className="container container_f">
              <li>
                <a className="small-nav__btn" href="">
                  Оплата
                </a>
              </li>
              <li>
                <a href="" className="small-nav__btn">
                  Доставка
                </a>
              </li>

              <li>
                <a href="" className="small-nav__btn active">
                  Гарантия
                </a>
              </li>

              <li>
                <a href="" className="small-nav__btn">
                  Публичная оферта
                </a>
              </li>

              <li>
                <a href="" className="small-nav__btn">
                  Бонусы
                </a>
              </li>
            </div>
          </ul>
          <div className="container help__cont">
            <div className="row">
              <div className="col col-8 col-t-7 col-s-12 help__desc">
                <h3>Общие положения</h3>
                <p>
                  Наш сайт является мультибрендовой торговой площадкой. Мы
                  сотрудничаем на договорной основе в качестве продавца товаров
                  только с официальными дитсрибьюторами, осуществляющими
                  поставки товаров на территорию Российской Федерации по
                  контрактам с производителями.
                </p>
                <p>
                  Согласно закону РФ «О защите прав потребителей» продавец не
                  несет ответственности за качество товаров и соответствию их
                  заявленным характеристикам. Тем не менее, в случае наступления
                  гарантийных случаев с приобретенными товарами на нашем сайте,
                  мы прилагаем все усилия для разрешения сложившейся ситуации в
                  пользу наших клиентов.
                </p>
                <h3>Гарантийный случай</h3>
                <p>
                  Если наступил гарантийный случай с приобретенным на нашем
                  сайте товаром, Вам необходимо связаться с нами по телефону
                  <a href="+74957440050">+7 495 744-00-50</a> и подробно
                  рассказать об обстоятельствах, а также прислать фотографии
                  товара на почту{" "}
                  <a href="mailto:help@queenbohemia.ru">help@queenbohemia.ru</a>
                  или через мессенджеры по номеру мобильного телефона менеджера.
                </p>
                <p>
                  В свою очередь, мы незамедлительно свяжемся с поставщиком
                  товара и перешлем полученные фотографии для согласования
                  способа ремонта, возврата или обмена товара на аналогичный. В
                  случае отказа поставщика в удовлетворении гарантийных
                  обязательств, мы перешлем вам письменный ответ, полученный от
                  поставщика и предоставим контактную информацию для дальнейшего
                  согласования.
                </p>
                <h3>Изъетие поставщиком</h3>
                <p>
                  Помимо этого, на нашей практике были случаи, когда поставщики
                  товаров сами инициировали изъятие из продажи продукции, с
                  которыми произошли неоднократные гарантийные случаи. При
                  наступлении такого события, мы производим выборку из базы
                  клиентов, которые приобретали ранее такие товары а нашем сайте
                  и делаем рассылки на указанныей email о возможности возврата
                  или обмена на аналогичный товар.
                </p>
              </div>
              <div className="col col-4 col-t-5 col-s-12">
                <div className="help__contact">
                  <h4>Остались вопросы?</h4>
                  <div>
                    <a href="+74957440050">
                      <b>+7 495 744-00-50</b>
                    </a>{" "}
                    — центральный офис
                  </div>
                  <div>
                    <a href="+78008085878">
                      <b>+7 800 808-58-78</b>
                    </a>{" "}
                    — центральный офис
                  </div>
                  <a href="" className="underline">
                    info@queenbohemia.ru
                  </a>
                  <button className="link dotted ask">Задать вопрос</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);


 
export default Help;