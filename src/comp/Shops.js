import { observer } from "mobx-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Swiper from "react-id-swiper";

const { Component } = React;

const Shops = observer(
  class Shops extends Component {
    state = {
        list: true,
    };
    render() {
      const shopCar = {
        slidesPerView: 1,
        effect: "fade",
        speed: 500,
        draggable: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 20,
      };

      return (
        <div>
          <div className="shop__tumbler">
            <div className="tumbler">
              <Link className="tumb active" to="/shops">
                Списком
              </Link>
              <Link className="tumb" to="/shops-map">
                Карта
              </Link>
            </div>
          </div>
          <div className="shops">
            {/**
             * * Орджоникидзе
             *
             */}
            <div className="shop">
              <div className="head head_big head_big-f">
                <div className="head_shop">
                  <div className="head-car">
                    <Swiper {...shopCar}>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/o11/01.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/o11/02.jpg" + ")",
                        }}
                      ></div>

                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/o11/03.jpg" + ")",
                        }}
                      ></div>
                    </Swiper>
                  </div>
                  <div className="head-map">
                    <div className="head-banner">
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4ac7df57e8a5a11105a542e70714520d32e3c8e6e9e3eb314d7faeb997c66f4d&amp;source=constructor"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                  <button
                    className="btn btn_primary"
                    onClick={(e) => {
                      if (e.target.textContent == "Открыть фотографии") {
                        e.target.textContent = "Открыть карту";
                      } else {
                        e.target.textContent = "Открыть фотографии";
                      }
                      e.target.closest(".head").classList.toggle("map");
                    }}
                  >
                    Открыть карту
                  </button>
                </div>
              </div>
              <div className="container">
                <div className="row shop__wrp">
                  <div className="col col-8">
                    <div className="shop__info">
                      <h2>ТЦ Орджоникидзе 11</h2>
                      <p>
                        Первый магазин сети в формате дисконт.
                        <br />
                        <br />
                        Огромный ассортимент всем полюбившейся оригинальной
                        Богемии по самым доступным ценам. Постоянные скидки и
                        регулярные распродажи!
                        <br />
                        <br />
                        Наши покупатели оценят возможность подобрать себе посуду
                        и подарки от производителей Богемии по самым доступным
                        ценам.
                      </p>
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="shop__contact">
                      <b>
                        <a href="tel:+79854175838">+7 985 417-58-38</a>
                      </b>
                      <br />
                      <a
                        className="underline"
                        href="mailto:o11@queenbohemia.ru"
                      >
                        o11@queenbohemia.ru
                      </a>
                      <p className="address">
                        ул. Орджоникидзе, 11, стр.1А, Москва
                      </p>
                      <a
                        className="underline"
                        href="https://yandex.ru/maps/213/moscow/?from=tabbar&ll=37.595445%2C55.708904&mode=search&oid=205126676986&ol=biz&source=serp_navig&z=18"
                      >
                        Маршрут на Яндекс.Картах
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**
             * * ТРЦ Пушкино парк
             *
             */}
            <div className="shop">
              <div className="head head_big head_list">
                <div className="head_shop">
                  <div className="head-car">
                    <Swiper {...shopCar}>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/push/01.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/push/02.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/push/03.jpg" + ")",
                        }}
                      ></div>
                    </Swiper>
                  </div>
                  <div className="head-map">
                    <div className="head-banner">
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A44c8313157918bd7d3f3322cb5954d3cb53b2c9f0eb37adf7cf9c9419020a61a&amp;source=constructor"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                  <button
                    className="btn btn_primary"
                    onClick={(e) => {
                      if (e.target.textContent == "Открыть фотографии") {
                        e.target.textContent = "Открыть карту";
                      } else {
                        e.target.textContent = "Открыть фотографии";
                      }
                      e.target.closest(".head").classList.toggle("map");
                    }}
                  >
                    Открыть карту
                  </button>
                </div>
              </div>
              <div className="container">
                <div className="row shop__wrp">
                  <div className="col col-8">
                    <div className="shop__info">
                      <h2>ТРЦ Пушкино парк</h2>
                      <p>
                        Как никогда мы стали ближе к нашим покупателям.
                        <br />
                        <br />
                        Магазин расположен в удобном и современном ТРЦ Пушкино
                        Парк на въезде в город Пушкино.
                        <br />
                        <br />В приятной обстановке профессиональные продавцы
                        помогут подобрать уникальную посуду Богемия от
                        производителя . Действуют акции и скидки на отдельные
                        группы товара.
                      </p>
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="shop__contact">
                      <b>
                        <a href="tel:+79266733701">+7 926 673-37-01</a>
                      </b>
                      <br />
                      <a
                        className="underline"
                        href="mailto:pushkino@queenbohemia.ru"
                      >
                        pushkino@queenbohemia.ru
                      </a>
                      <p className="address">
                        Красноармейское шоссе, с104, Пушкино, Московская область
                      </p>
                      <a
                        className="underline"
                        href="https://yandex.ru/maps/10748/pushkino/?from=tabbar&ll=37.888272%2C56.011552&mode=search&oid=170903927889&ol=biz&source=serp_navig&z=14"
                      >
                        Маршрут на Яндекс.Картах
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**
             * * ТРЦ Саларис
             *
             */}
            <div className="shop">
              <div className="head head_big head_list">
                <div className="head_shop">
                  <div className="head-car">
                    <Swiper {...shopCar}>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/salaris/01.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/salaris/02.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/salaris/03.jpg" + ")",
                        }}
                      ></div>
                    </Swiper>
                  </div>
                  <div className="head-map">
                    <div className="head-banner">
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A84ee6ea71496ec5f826e11cb96031a62f21ccd3623b0adf351e09527cf05643f&amp;source=constructor"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                  <button
                    className="btn btn_primary"
                    onClick={(e) => {
                      if (e.target.textContent == "Открыть фотографии") {
                        e.target.textContent = "Открыть карту";
                      } else {
                        e.target.textContent = "Открыть фотографии";
                      }
                      e.target.closest(".head").classList.toggle("map");
                    }}
                  >
                    Открыть карту
                  </button>
                </div>
              </div>
              <div className="container">
                <div className="row shop__wrp">
                  <div className="col col-8">
                    <div className="shop__info">
                      <h2>ТРЦ Саларис</h2>
                      <p>
                        Уникальная возможность приобрести оригинальную Богемию
                        от известных производителей Чехии, Польши и других стран
                        Европы.
                        <br />
                        <br />
                        Широкий ассортимент, постоянно обновляющиеся коллекции
                        сервировки стола отвечают вкусам самых взыскательных
                        покупателей. Как никогда мы стали ближе к нашим
                        покупателям.
                      </p>
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="shop__contact">
                      <b>
                        <a href="tel:+79265676742">+7 926 567-67-42</a>
                      </b>
                      <br />
                      <a
                        className="underline"
                        href="mailto:salaris@queenbohemia.ru"
                      >
                        salaris@queenbohemia.ru
                      </a>
                      <p className="address">
                        Киевское шоссе, 23-й километр, 1 поселение Московский,
                        Москва
                      </p>
                      <a
                        className="underline"
                        href="https://yandex.ru/maps/213/moscow/?from=tabbar&ll=37.424994%2C55.625218&mode=search&oid=8849034126&ol=biz&sctx=ZAAAAAgBEAAaKAoSCYrIsIo3zEJAEQR62V292ktAEhIJEGj4%2F39meT8RGQY1zaR8ZT8iBQABAgQFKAowADiSl4iM9YfN5cYBQIqfAUgBVc3MzD5YAGIpcmVsZXZfcmFua2luZ19oZWF2eV9mb3JtdWxhPW14XzY2MTUxOF8wXzdqAnJ1cACdAc3MTD2gAQCoAQC9Ad00rGXCAQWOl8b7IA%3D%3D&sll=37.424994%2C55.625218&source=serp_navig&sspn=0.049610%2C0.021028&text=Queen%20of%20Bohemia&z=15"
                      >
                        Маршрут на Яндекс.Картах
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**
             * * Outlet Village Белая Дача
             *
             */}
            <div className="shop">
              <div className="head head_big head_list">
                <div className="head_shop">
                  <div className="head-car">
                    <Swiper {...shopCar}>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/dacha/01.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/dacha/02.jpg" + ")",
                        }}
                      ></div>
                      <div
                        className="head-banner"
                        style={{
                          backgroundImage:
                            "url(" + "/image/shops/dacha/03.jpg" + ")",
                        }}
                      ></div>
                    </Swiper>
                  </div>
                  <div className="head-map">
                    <div className="head-banner">
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A3dd99efbb846b73351b41cbb05a36a8f01b73985eaabf275c121bb9ff5dafe36&amp;source=constructor"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                  <button
                    className="btn btn_primary"
                    onClick={(e) => {
                      if (e.target.textContent == "Открыть фотографии") {
                        e.target.textContent = "Открыть карту";
                      } else {
                        e.target.textContent = "Открыть фотографии";
                      }
                      e.target.closest(".head").classList.toggle("map");
                    }}
                  >
                    Открыть карту
                  </button>
                </div>
              </div>
              <div className="container">
                <div className="row shop__wrp">
                  <div className="col col-8">
                    <div className="shop__info">
                      <h2>Outlet Village Белая Дача</h2>
                      <p>
                        в Аутлете Белая дача. Регулярные поставки самой красивой
                        и качественной посуды для сервировки Вашего стола и
                        украшения интерьера от именитых производителей Чехии,
                        Польши и других стран Европы.
                        <br />
                        <br />
                        Лучшая посуда из фарфора, стекла и хрусталя всем
                        полюбившейся Богемии не оставят равнодушными ни одного
                        взыскательного покупателя.
                        <br />
                        <br />В Аутлете действует постоянная скидка на весь
                        представленный ассортимент.
                      </p>
                    </div>
                  </div>
                  <div className="col col-4">
                    <div className="shop__contact">
                      <b>
                        <a href="tel:+79268975443">+7 926 897-54-43</a>
                      </b>
                      <br />
                      <a
                        className="underline"
                        href="mailto:belayadacha@queenbohemia.ru"
                      >
                        belayadacha@queenbohemia.ru
                      </a>
                      <p className="address">
                        Новорязанское шоссе 8, Котельники, Московская область
                      </p>
                      <a
                        className="underline"
                        href="https://yandex.ru/maps/213/moscow/?from=tabbar&ll=37.878979%2C55.663198&mode=search&oid=38357064842&ol=biz&source=serp_navig&z=13"
                      >
                        Маршрут на Яндекс.Картах
                      </a>
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
);

export default Shops;
