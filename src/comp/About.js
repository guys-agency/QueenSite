import React from "react";
import { observer } from "mobx-react";
import HelmetHead from "./common/Helmet";
const { Component } = React;

const About = observer(
  class About extends Component {
    state = {};
    render() {
      return (
        <div className="">
          <HelmetHead
            title="О магазине - Queen of Bohemia"
            description="Queen of Bohemia - сеть магазинов оригинальной Богемии. Большой выбор посуды и подарков из богемского стекла, хрусталя и фарфора в Москве. Доставка по всей России. Оплата онлайн."
            keywords="о компании"
          />
          <div
            className="about__head"
            style={{
              backgroundImage: "url(" + "/image/about.png" + ")",
            }}
          >
            <div className="container">
              <div className="about__logo">
                <span className="i_qf"></span>
                <span className="logo logo_sq">
                  <span className="i_queen"></span>
                  <span className="i_of"></span>
                  <span className="i_line-h"></span>
                  <span className="i_bohemia"></span>
                </span>
              </div>
            </div>
          </div>
          <div className="container help__cont">
            <div className="row">
              <div className="col col-8 col-t-7 col-s-12 help__desc">
                <h1 className="h3">О нас</h1>
                <p>
                  Queen of Bohemia — сеть магазинов оригинальной Богемии. Мы предлагаем большой выбор посуды и подарков из богемского стекла, хрусталя
                  и фарфора нашим покупателям с 1993 года. Мы знаем всё о знаменитом богемском стекле, хрустале и карловарском фарфоре и предложим
                  нашему покупателю только лучшее!
                </p>
                <p>
                  Покупайте изделия всемирно известных Чешских производителей в уютном и с любовью созданном магазине, когда и где вам удобно. Прямые
                  закупки на заводах и фабриках в Чехии и других странах Европы позволяют нам предлагать нашим покупателям низкие цены и постоянно
                  обновляющиеся коллекции. Постоянно проводимые акции и распродажи порадуют вас приятными скидками и доступными ценами. Вся
                  предлагаемая продукция оригинальная, имеет сертификаты соответствия производителя и обладает заводской гарантией.
                </p>
                <p>
                  Чтобы ознакомиться с продукцией, перейдите в каталог или посмотрите специально для вас подготовленные коллекции, акции и идеи. В
                  разделе подарки наши покупатели смогут воспользоваться удобной формой поиска и подобрать подарки к торжеству в комфортном для себя
                  бюджете. Если у вас остались вопросы,{" "}
                  <span className="dib">
                    <a
                      href=""
                      className="link dotted"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(".sidebar-overlay").classList.add("active");

                        document.querySelector("body").classList.add("no-scroll");

                        this.props.store.sideAsk = true;
                      }}
                    >
                      задайте его на сайте
                    </a>
                  </span>{" "}
                  или по телефону{" "}
                  <a className="underline" href="88006003421">
                    8 800 600-34-21
                  </a>
                  .
                </p>
                <h3>Концепция</h3>
                <p>
                  Создавая наши уникальные магазины, мы стремились передать дух эпохи правления Королевы Елизаветы Стюарт после коронования названной
                  Королевой Богемии “Queen of Bohemia”. Известная своей эрудицией, отличавшаяся изысканным вкусом и обладавшая блестящим образованием
                  Королева Богемии Елизавета в период своего правления уделяла особое внимание развитию искусства и культуры.
                </p>
                <p>
                  Этот период знаменовался рассветом стекольного и хрустального производства. Весть об искусности и виртуозности стекольных дел
                  мастеров Богемии быстро разошлась по всей Европе. Изысканные изделия украшали королевские залы и замки. Пройдя сквозь глубь веков,
                  легендарная слава богемского стекла и хрусталя и сегодня радует ценителей красоты и практичности по всему миру.
                </p>
                <h3>Реквизиты</h3>
                <p>Наименование юр. лица - ИП Шевченко О.А</p>
                <p>ОГРНИП - 317774600370306</p>
                <p>ИНН - 771680629670</p>
                {/* <p>Адрес регистрации организации - г. Москва</p> */}
                <p>
                  <h4>Банковские реквизиты</h4> р/с 40802810938000118864 в Московский банк ПАО «Сбербанк» Г. Москва
                  <br /> БИК 044525225
                </p>
              </div>
              <div className="col col-4 col-t-5 col-s-12">
                <div className="help__contact">
                  <div>
                    <a href="tel:88006003421">
                      <b>8 800 600-34-21</b>
                    </a>{" "}
                    — центральный офис
                  </div>
                  <a href="mailto:info@queenbohemia.ru" className="underline">
                    info@queenbohemia.ru
                  </a>
                  <button
                    className="link dotted ask"
                    onClick={() => {
                      document.querySelector(".sidebar-overlay").classList.add("active");

                      document.querySelector("body").classList.add("no-scroll");

                      this.props.store.sideAsk = true;
                    }}
                  >
                    Задать вопрос
                  </button>
                  <br />
                  <br />
                  <p>105082, г. Москва, Переведёновский переулок, д. 13, стр. 13</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default About;
