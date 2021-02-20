import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import moment from "moment";
import Swiper from "react-id-swiper";
import ProductCard from "../ProductCard";
import { SERVER_URL } from "../../constants";
import { Formik } from "formik";
import api from "../api";
import { withRouter } from "react-router";
import SuscribeSchema from "../../schemas/suscribeSchema";
import localStorage from "mobx-localstorage";

const { Component } = React;

const BB = {
  1: "5637246426",
  2: "5637284605",
  3: "5637284599",
  4: "5637287639",
  5: "5637287624",
  6: "5637287652",
  7: "5637255873",
  8: "5637257355",
  9: "5637286882",
  10: "5637276091",
  11: "5637253467",
  12: "5637242668",
  13: "5637259848",
  14: "5637237331",
  15: "5637253926",
};

const CyberMonday = observer(
  class CyberMonday extends Component {
    state = {
      days: "",
      h: "",
      m: "",
      s: "",
      hitCont: [],
      YBCont: [],
    };

    getData = () => {
      const hitContTime = [];

      fetch(SERVER_URL + "/bf-nosale", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          Object.keys(data[0].hit).forEach((element, i) => {
            hitContTime.push(
              <div className="swiper-slide col col-3 col-t-4 col-s-6" key={data[0].hit[element].slug}>
                <ProductCard data={data[0].hit[element]} store={this.props.store} />
              </div>
            );
          });

          // console.log("cert :>> ", this.props.gift);

          this.setState({
            hitCont: hitContTime,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    checkTimer = () => {
      const time = moment("01.02.2021", "DD.MM.YYYY").diff(moment()).toPrecision();
      const dur = moment.duration(time, "milliseconds");

      this.setState({
        days: dur.days() + 31 * dur.months(),
        h: dur.hours(),
        m: dur.minutes(),
        s: dur.seconds() + 1,
      });
    };

    productCar = {
      slidesPerView: "auto",
      slidesPerGroup: 2,
      speed: 800,
      draggable: true,
      preventClicksPropagation: false,
      preventClicks: false,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        760: {
          slidesPerGroup: 3,
        },
        951: {
          slidesPerGroup: 4,
        },
      },
    };

    typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    scrollToSubs = () => {
      let destination = $(".subscribe_cyber-monday").offset().top;

      if (this.typeDevice) {
        destination -= 200;
      } else {
        destination -= 300;
      }
      $("html, body").animate({ scrollTop: destination }, 600);
      return false;
    };

    YBrender = () => {
      let nR = Math.floor(Math.random() * 10) + 1;
      const YBContTime = [];
      //!убрать
      // if (nR <= 3) {
      //   nR = 4;
      // }

      for (let i = nR; i < nR + 4; i++) {
        const style = { backgroundColor: "transparent", display: "flex" };
        if (YBContTime.length === 0 || YBContTime.length === 2) {
          style.marginBottom = this.typeDevice ? "18px" : "0px";
        }
        YBContTime.push(
          <div className="col col-6 col-s-12">
            <Link
              className="banner"
              style={style}
              onClick={(e) => {
                e.preventDefault();
                this.scrollToSubs();
              }}
            >
              <img
                src={`/image/CM/BB/${i}.jpg`}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
            </Link>
          </div>
        );
      }
      this.setState({ YBCont: YBContTime });
    };

    render() {
      //   const time = moment("20.11.2020", "DD.MM.YYYY")
      //     .diff(moment())
      //     .toPrecision();
      //   console.log("object :>> ", moment.duration(time, "milliseconds"));
      const { days, h, m, s, hitCont } = this.state;
      this.typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return (
        <div className="main-page cyber-monday">
          <div className="head head_big">
            <div className="head-cont">
              <div
                className="head-banner cyber-monday__banner"
                style={{
                  backgroundImage: `url(/image/CM/${this.typeDevice ? "banner-m" : "banner"}.jpg?v2)`,
                  border: "none",
                  marginBottom: "110px",
                }}
              >
                {/* <img className="gift__img" src={`/image/BF/BF-pl.jpg`}></img> */}

                <div className="cyber-monday__timer-cont" style={{ background: "#fff", border: "1px solid #C4DCF3" }}>
                  <h3>До конца распродажи</h3>
                  <div className="cyber-monday__timer">
                    <div className="days">
                      <p className="num">{days}</p>
                      <p className="str">дней</p>
                    </div>
                    <div className="hours">
                      <p className="num">{h}</p>
                      <p className="str">часов</p>
                    </div>
                    <div className="minuts">
                      <p className="num">{m}</p>
                      <p className="str">минут</p>
                    </div>
                    <div className="sec">
                      <p className="num">{s}</p>
                      <p className="str">секунд</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="subscribe subscribe_cyber-monday">
              <div className="container">
                <div className="row">
                  <div className="col col-6 col-t-12 col-s-12 col-middle subscribe__form">
                    <h3>Доступ в закрытый раздел</h3>
                    <p>
                      Закрытый раздел на <b>229 товаров</b> со <b>скидками до 67%</b>
                      <br /> для наших подписчиков!
                    </p>
                    <Formik
                      //инициализируем значения input-ов
                      initialValues={{
                        email: "",
                        acceptedTerms: true,
                      }}
                      //подключаем схему валидации, которую описали выше
                      validationSchema={SuscribeSchema}
                      //определяем, что будет происходить при вызове onsubmit
                      onSubmit={(values, { setSubmitting }) => {
                        $("#subscription").addClass("deactive");
                        $("#subscription").text("Загрузка");
                        api
                          .addSubs({
                            email: values.email.toLowerCase(),
                          })
                          .then((data) => {
                            $("#subscription").removeClass("deactive");
                            $("#subscription").text(data.message);
                            if (data.status === 200) {
                              $("#subscription").addClass("success");
                            } else {
                              $("#subscription").addClass("error");
                            }
                            setTimeout(() => {
                              $("#subscription").removeClass("success");
                              $("#subscription").removeClass("error");
                              $("#subscription").text("Подписаться");
                              if (data.bfok !== undefined && data.bfok) {
                                localStorage.setItem("CMcheck", true);
                                window.location.replace("/close-sale");
                              }
                            }, 2000);
                          });
                      }}
                      //свойство, где описывыем нашу форму
                      //errors-ошибки валидации формы
                      //touched-поля формы, которые мы "затронули",
                      //то есть, в которых что-то ввели
                    >
                      {({ errors, touched, handleSubmit, isSubmitting, values, handleChange }) => (
                        <form className="row row_inner col-top" onSubmit={handleSubmit}>
                          <div className="col col-7 col-s-12">
                            <div className="input-field">
                              <label className="required" htmlFor="emailSubs">
                                E-mail
                              </label>
                              <input
                                id="emailSubs"
                                name="email"
                                type="text"
                                value={values.email}
                                onFocus={(e) => {
                                  $(e.target).parent().find("label").addClass("active");
                                }}
                                onBlur={(e) => {
                                  if (e.target.value === "") {
                                    $(e.target).parent().find("label").removeClass("active");
                                  }
                                }}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="field-error">{errors.email}</div>
                            <label className="checkbox checkbox_margin">
                              <input
                                type="checkbox"
                                name="acceptedTerms"
                                id=""
                                value={values.acceptedTerms}
                                onChange={handleChange}
                                checked={values.acceptedTerms}
                              />
                              <span className="checkbox-btn"></span>
                              <i>
                                Согласен с{" "}
                                <Link className="underline" to="/help/offer">
                                  "Публичной офертой"
                                </Link>{" "}
                                и{" "}
                                <Link className="underline" to="/help/cppd">
                                  "Обработкой персональных данных"
                                </Link>
                              </i>
                            </label>
                          </div>
                          <div className="col col-4 col-s-12">
                            <button
                              className="btn btn_primary btn_wide"
                              type="submit"
                              id="subscription"
                              style={{ marginTop: this.typeDevice ? "10px" : "0px" }}
                            >
                              Получить доступ
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="subscribe__img">
                <img className="disc" src="/image/CM/sc.jpg"></img>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", backgroundColor: "#F6E8FB", overflow: "visible", marginBottom: "10px" }}>
            <div className="kosa-cont" style={{ position: "relative", top: "-6px" }}>
              <div className="kosa">
                <div className="kosa-in"></div>
              </div>
            </div>
            <div className="container bf-c" style={{ marginBottom: "60px" }}>
              <div className="container">
                <div className="title">
                  <h2>
                    Закрытый раздел{" "}
                    <button className="btn btn_yellow" style={{ border: "none" }} onClick={this.scrollToSubs}>
                      Получить доступ
                    </button>
                  </h2>

                  <p className="subtitle" style={{ marginTop: "5px" }}>
                    Самые большие скидки для подписчиков
                  </p>
                  <button
                    className="btn btn_yellow"
                    style={{ marginLeft: "0px", background: "#BA250D", borderColor: "#59160C", color: "#fff" }}
                    onClick={() => {
                      this.props.history.push("/main/novyj_god");
                    }}
                  >
                    Посмотреть все
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginBottom: "18px" }}>
                {this.state.YBCont[0]}
                {this.state.YBCont[1]}
              </div>
              <div className="row">
                {this.state.YBCont[2]}
                {this.state.YBCont[3]}
              </div>
            </div>

            <div className="kosa-cont" style={{ position: "relative", bottom: "-6px" }}>
              <div className="kosa" style={{ marginBottom: "0px" }}>
                <div className="kosa-in"></div>
              </div>
            </div>
          </div>

          <div className="carousel carousel_product">
            <div className="container">
              <div className="title">
                <Link to="/catalog/?attr=sale">
                  <h2 className="tilda">
                    Скидки{" "}
                    <button className="btn btn_yellow" style={{ border: "none" }}>
                      В каталог
                    </button>
                  </h2>
                </Link>
                <p className="subtitle" style={{ marginTop: "5px" }}>
                  Скидки из открытых разделов!
                </p>
              </div>
            </div>
            <div className="container container_s">
              <div className="slider-cont">
                {/* <Slider {...settingsMulti}>{hitCont}</Slider> */}

                {hitCont.length !== 0 && <Swiper {...this.productCar}>{hitCont}</Swiper>}
              </div>
            </div>
          </div>

          {/* <div className="actions">
            <div className="action">
              <div className="head head_sm head_list"> */}

          {/* <a
                  href="#"
                  className="head-banner head-banner_action"
                  style={{
                    backgroundImage: "url(" + "/image/actions/1.jpg" + ")",
                  }}
                >
                  <div className="text">
                    <div className="label">Акция</div>
                    <h1>
                      Пасха <span className="ic i_right"></span>
                    </h1>
                    <p>Подготовьтесь к любимому семейному празднику.</p>
                  </div>
                </a> */}
          {/* </div> */}
          {/* <div className="actions_banner">
              <div className="banner__desc">
                  Вкусное вино
                </div>
            </div> */}
          {/* <div className="container container_f">
                <div className="row">{allCont}</div>
                <button className="btn btn_primary">Посмотреть еще</button>
              </div>
            </div>
          </div> */}
          <div className="subscribe">
            <div className="container">
              <div className="row">
                <div className="col col-6 col-s-12 col-middle subscribe__form" style={{ paddingTop: "25px" }}>
                  <h3>Доступ в закрытый раздел</h3>
                  <p>
                    Закрытый раздел на <b>229 товаров</b> со <b>скидками до 67%</b>
                    <br /> для наших подписчиков!
                  </p>
                  <p>{/* <b>Скидка 5%</b> на первую покупку */}</p>
                  <Formik
                    //инициализируем значения input-ов
                    initialValues={{
                      email: "",
                      acceptedTerms: true,
                    }}
                    //подключаем схему валидации, которую описали выше
                    validationSchema={SuscribeSchema}
                    //определяем, что будет происходить при вызове onsubmit
                    onSubmit={(values, { setSubmitting }) => {
                      api
                        .addSubs({
                          email: values.email.toLowerCase(),
                        })
                        .then((data) => {
                          $("#subscription").removeClass("deactive");
                          $("#subscription").text(data.message);
                          if (data.status === 200) {
                            $("#subscription").addClass("success");
                          } else {
                            $("#subscription").addClass("error");
                          }
                          setTimeout(() => {
                            $("#subscription").removeClass("success");
                            $("#subscription").removeClass("error");
                            $("#subscription").text("Подписаться");
                            if (data.bfok !== undefined && data.bfok) {
                              localStorage.setItem("CMcheck", true);
                              window.location.replace("/close-sale");
                            }
                          }, 2000);
                        });
                    }}
                    //свойство, где описывыем нашу форму
                    //errors-ошибки валидации формы
                    //touched-поля формы, которые мы "затронули",
                    //то есть, в которых что-то ввели
                  >
                    {({ errors, touched, handleSubmit, isSubmitting, values, handleChange }) => (
                      <form className="row row_inner col-bottom" onSubmit={handleSubmit}>
                        <div className="col col-7 col-s-12">
                          <div className="input-field">
                            <label className="required" htmlFor="emailSubs">
                              E-mail
                            </label>
                            <input
                              id="emailSubs"
                              name="email"
                              type="text"
                              value={values.email}
                              onFocus={(e) => {
                                $(e.target).parent().find("label").addClass("active");
                              }}
                              onBlur={(e) => {
                                if (e.target.value === "") {
                                  $(e.target).parent().find("label").removeClass("active");
                                }
                              }}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="field-error">{errors.email}</div>
                        </div>
                        <div className="col col-4 col-s-12">
                          <button className="btn btn_primary btn_wide" type="submit" id="subscription">
                            Подписаться
                          </button>
                        </div>
                        <div className="col col-12 col-s-12">
                          <label className="checkbox checkbox_margin">
                            <input
                              type="checkbox"
                              name="acceptedTerms"
                              id=""
                              value={values.acceptedTerms}
                              onChange={handleChange}
                              checked={values.acceptedTerms}
                            />
                            <span className="checkbox-btn"></span>
                            <i>
                              Согласен с{" "}
                              <Link className="underline" to="/help/offer">
                                "Публичной офертой"
                              </Link>{" "}
                              и{" "}
                              <Link className="underline" to="/help/cppd">
                                "Обработкой персональных данных"
                              </Link>
                            </i>
                          </label>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div
              className="subscribe__img"
              style={{
                backgroundImage: "url(" + "/image/subs/1.jpg" + ")",
              }}
            ></div>
          </div>
        </div>
      );
    }

    componentDidMount() {
      console.log("object :>> ", $(".header"));
      $("#root").addClass("header_cm");
      this.getData();
      this.checkTimer();
      window.timerInt = setInterval(() => {
        this.checkTimer();
      }, 1000);
      this.YBrender();
    }

    componentWillUnmount() {
      clearInterval(window.timerInt);
      $("#root").removeClass("header_cm");
    }
  }
);

export default withRouter(CyberMonday);
