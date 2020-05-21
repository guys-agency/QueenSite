import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const { Component } = React;

const MainPage = observer(
  class MainPage extends Component {
    state = {
      hitCont: [],
      newCont: [],
      allCont: [],
      ready: false,
    };

    getData = () => {
      const hitContTime = [];
      const newContTime = [];
      const allContTime = [];
      fetch("http://134.122.81.119/main-page", {
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
          console.log("data 123", data);
          console.log("object", Object.keys(data));
          Object.keys(data[0].hit).forEach((element) => {
            hitContTime.push(
              <ProductCard
                key={data[0].hit[element].slug}
                data={data[0].hit[element]}
              />
            );
          });
          Object.keys(data[0].new).forEach((element) => {
            newContTime.push(
              <ProductCard
                key={data[0].new[element].slug}
                data={data[0].new[element]}
              />
            );
          });
          Object.keys(data[0].all).forEach((element) => {
            allContTime.push(
              <ProductCard
                key={data[0].all[element].slug}
                data={data[0].all[element]}
              />
            );
          });
          this.setState({
            hitCont: hitContTime,
            newCont: newContTime,
            allCont: allContTime,
            ready: true,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    render() {
      const { hitCont, newCont, allCont, ready } = this.state;
      //   this.getData();
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      const settingsMulti = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // appendDots: (dots) => (
        //   <div
        //     style={{
        //       backgroundColor: "#ddd",
        //       borderRadius: "10px",
        //       padding: "10px",
        //     }}
        //   >
        //     <ul style={{ margin: "0px" }}> {dots} </ul>
        //   </div>
        // ),
      };
      const settingsBrand = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 5,
        variableWidth: true,
      };
      return (
        <div className="main-page">
          {!ready && (
            <div className="slider-cont">
              <Slider {...settings}></Slider>
            </div>
          )}
          <div className="head head_big">
            <div className="head-banner"></div>
          </div>
          <div className="container">
            <div className="carousel carousel_product">
              <div className="title">
                <a href=""><h2 className="tilda">Хиты продаж <span className="link">Ко всем хитам <span className="ic i_right"></span></span></h2></a>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>

              <div className="slider-cont">
                <Slider {...settingsMulti}>{hitCont}</Slider>
              </div>
            </div>
          </div>

          <div className="carousel carousel_brand">
            <div className="container">
              <div className="title">
                <h2>Бренды</h2>
              </div>

              <div className="slider-cont slider-cont_brand">
                <Slider {...settingsBrand}>
                  <div className="slider-brand">
                    <img src="/image/logos/Bohemia Crystall.png" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/Aurum design.jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/Crystal Art.JPG" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/Czech_Gold_Hands_Logo_1(1).jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/diva.jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/easylife logo.jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/G. Benedikt logo white on color.png" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/Lilien Austria logo white on color.png" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/MZ logo.jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/queen anne.jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/Queen of Bohemia NEW.jpg" />
                  </div>
                  <div className="slider-brand">
                    <img src="/image/logos/Suisse Lagenthal logo white on color.png" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>

          <div className="main-background">
            <div className="container">
              <div className="title">
                <h2 className="tilda">Идеи:</h2>
              </div>
              <div className="ideas-block">
                <div className="banner main-idea"></div>
                <div className="ideas">
                  <div className="banner small"></div>
                  <div className="banner small"></div>
                  <div className="banner large"></div>
                </div>
              </div>
              <div className="title">
                <h2>Подарки:</h2>
              </div>
              <div className="gifts">
                <div className="gift">
                  <img src="/image/gifts/1.jpg" />
                  <p>До 500₽</p>
                </div>
                <div className="gift">
                  <img src="/image/gifts/2.jpg" />
                  <p>До 1 000₽</p>
                </div>
                <div className="gift">
                  <img src="/image/gifts/3.jpg" />
                  <p>До 1 500₽</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="carousel carousel_product">
              <div className="title">
                <a href=""><h2 className="tilda">Новинки <span className="link">Все новинки <span className="ic i_right"></span></span></h2></a>
                <p className="subtitle">Сложно определиться? Мы поможем</p>
              </div>

              <div className="slider-cont">
                <Slider {...settingsMulti}>{hitCont}</Slider>
              </div>
            </div>
          </div>
        </div>
      );
    }
    componentWillMount() {
      this.getData();
    }
  }
);

export default MainPage;
