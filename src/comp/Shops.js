import { observer } from "mobx-react";
import React from "react";
import Swiper from "react-id-swiper";

const { Component } = React;

const Shops = observer(
  class Shops extends Component {
    state = {};
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
        <div className="shops">
          <div className="shop">
            <div className="head head_big">
              <div className="head_shop">
                <div className="head-car">
                  <Swiper {...shopCar}>
                    <div
                      className="head-banner"
                      style={{
                        backgroundImage: "url(" + "/image/hb/1.jpg" + ")",
                      }}
                    ></div>
                    <div
                      className="head-banner"
                      style={{
                        backgroundImage: "url(" + "/image/hb/2.jpg" + ")",
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
                      Наши покупатели оценят возможность подобрать себе посуду и
                      подарки от производителей Богемии по самым доступным
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
                    <a className="underline" href="mailto:o11@queenbohemia.ru">
                      o11@queenbohemia.ru
                    </a>
                    <p className="address">
                      ул. Орджоникидзе, 11, стр.1А, Москва
                    </p>
                    <a className="underline" href="">
                      Маршрут на Яндекс.Картах
                    </a>
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
