import React from "react";
import { observer } from "mobx-react";
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const Help = observer(
  class Help extends Component {
    state = {};
    payment = (
      <div className="col col-8 col-t-7 col-s-12 help__desc">
        <h3>Банковской картой</h3>
      </div>
    );

    offer = (<div className="col col-8 col-t-7 col-s-12 help__desc"></div>);

    delivery = (
      <div className="col col-8 col-t-7 col-s-12 help__desc">
        <p>
          Мы оперативно доставляем заказы по всем регионам России различными
          способами, которые доступны на странице оформления заказа.
        </p>
      </div>
    );
    return = (
      <div className="col col-8 col-t-7 col-s-12 help__desc">
        <p>
          Вернуть товар, приобретенный в онлайн магазине Queen of Bohemia совсем
          не сложно. Правила возврата просты и регламентируются Законом «О
          защите правпотребителей».
        </p>
        <p>
          <Link
            className="underline"
            to="/image/docs/obrazec_vozvrata.docx"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Скачать заявление о возврате
          </Link>
        </p>
        <h3>Общие правила</h3>
        <ol>
          <li>Срок возврата — 14 дней с момента получения товара</li>
          <li>
            Пожалуйста, верните нам товар в полной комплектации, со всеми
            упаковками и наклейками
          </li>
          <li>Не забудьте приложить чек от покупки. </li>
          <li>
            Способ возврата денежных средств равен способу оплаты покупки.
          </li>
        </ol>
        <h3>При оплате картой:</h3>
        <ol>
          <li>
            Товар необходимо отправить по адресу: 105082, г. Москва,
            Переведеновский пер, д.13 к.18 офис 307.
          </li>
          <li>
            Пожалуйста, не забудьте заполнить заявление о возврате и положить
            его вместе с товаром и чеком от покупки.
          </li>
          <li>
            В течение 5 дней после получения возврата вам на карту будет
            перечислена оплата за товар.
          </li>
        </ol>
        <h3>
          При оплате наличными курьеру:{" "}
          <small>(для жителей Москвы и ближайшего Подмосковья)</small>
        </h3>
        <ol>
          <li>
            В случае возврата наличными вам будет предложено подъехать в любой
            наш розничный магазин по адресам, указанным на сайте.{" "}
          </li>
          <li>Пожалуйста, не забудьте кассовый чек и паспорт. </li>
        </ol>
        <h3>
          Выявили скрытые дефекты?{" "}
          <small>(любые дефекты кроме боя и сколов)</small>
        </h3>
        <ol>
          <li>
            Вернуть их можно по всем указанным вверху правилам в течении 2 лет с
            момента приобретения товара, за исключением требований к
            использованию по назначению. В этом случае требование к наличию
            упаковки и стикеров/наклеек не обязательно.
          </li>
          <li>
            Начать общение рекомендуем со звонка менеджеру интернет-магазина и
            высылкой фото, подтверждающего брак.
          </li>
          <li>
            Мы работаем только с качественными европейскими производителями и
            вероятность производственного дефекта крайне мала.
          </li>
        </ol>
      </div>
    );
    garantie = (
      <div className="col col-8 col-t-7 col-s-12 help__desc">
        <h3>Общие положения</h3>
        <p>
          Наш сайт является мультибрендовой торговой площадкой. Мы сотрудничаем
          на договорной основе в качестве продавца товаров только с официальными
          дитсрибьюторами, осуществляющими поставки товаров на территорию
          Российской Федерации по контрактам с производителями.
        </p>
        <p>
          Согласно закону РФ «О защите прав потребителей» продавец не несет
          ответственности за качество товаров и соответствию их заявленным
          характеристикам. Тем не менее, в случае наступления гарантийных
          случаев с приобретенными товарами на нашем сайте, мы прилагаем все
          усилия для разрешения сложившейся ситуации в пользу наших клиентов.
        </p>
        <h3>Гарантийный случай</h3>
        <p>
          Если наступил гарантийный случай с приобретенным на нашем сайте
          товаром, Вам необходимо связаться с нами по телефону{" "}
          <a className="underline" href="+78008085878">
            +7 800 808-58-78
          </a>{" "}
          и подробно рассказать об обстоятельствах, а также прислать фотографии
          товара на почту{" "}
          <a className="underline" href="mailto:help@queenbohemia.ru">
            help@queenbohemia.ru
          </a>{" "}
          или через мессенджеры по номеру мобильного телефона менеджера.
        </p>
        <p>
          В свою очередь, мы незамедлительно свяжемся с поставщиком товара и
          перешлем полученные фотографии для согласования способа ремонта,
          возврата или обмена товара на аналогичный. В случае отказа поставщика
          в удовлетворении гарантийных обязательств, мы перешлем вам письменный
          ответ, полученный от поставщика и предоставим контактную информацию
          для дальнейшего согласования.
        </p>
        <h3>Изъетие поставщиком</h3>
        <p>
          Помимо этого, на нашей практике были случаи, когда поставщики товаров
          сами инициировали изъятие из продажи продукции, с которыми произошли
          неоднократные гарантийные случаи. При наступлении такого события, мы
          производим выборку из базы клиентов, которые приобретали ранее такие
          товары а нашем сайте и делаем рассылки на указанныей email о
          возможности возврата или обмена на аналогичный товар.
        </p>
      </div>
    );
    renderBlock = [];

    render() {
      if (this.props.path === "garantie") {
        this.renderBlock = this.garantie;
      } else if (this.props.path === "return") {
        this.renderBlock = this.return;
      } else if (this.props.path === "payment") {
        this.renderBlock = this.payment;
      } else if (this.props.path === "offer") {
        this.renderBlock = this.offer;
      } else if (this.props.path === "delivery") {
        this.renderBlock = this.delivery;
      }
      return (
        <div className="help">
          <ul className="small-nav">
            <div className="container container_f">
              <li>
                <NavLink
                  activeClassName="active"
                  className="small-nav__btn"
                  to="/help/payment"
                >
                  Оплата
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/help/delivery"
                  className="small-nav__btn"
                >
                  Доставка
                </NavLink>
              </li>

              <li>
                <NavLink
                  activeClassName="active"
                  to="/help/return"
                  className="small-nav__btn"
                >
                  Возврат
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active"
                  to="/help/garantie"
                  className="small-nav__btn"
                >
                  Гарантия
                </NavLink>
              </li>

              <li>
                <NavLink
                  activeClassName="active"
                  to="/help/offer"
                  className="small-nav__btn"
                >
                  Публичная оферта
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  activeClassName="active"
                  to="/help/bonus"
                  className="small-nav__btn"
                >
                  Бонусы
                </NavLink>
              </li> */}
            </div>
          </ul>
          <div className="container help__cont">
            <div className="row">
              {this.renderBlock}
              <div className="col col-4 col-t-5 col-s-12">
                <div className="help__contact">
                  <h4>Остались вопросы?</h4>
                  <div>
                    <a href="tel:+74957440050">
                      <b>+7 495 744-00-50</b>
                    </a>{" "}
                    — центральный офис
                  </div>
                  <div>
                    <a href="tel:+78008085878">
                      <b>+7 800 808-58-78</b>
                    </a>{" "}
                    — центральный офис
                  </div>
                  <a href="mailto:info@queenbohemia.ru" className="underline">
                    info@queenbohemia.ru
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
