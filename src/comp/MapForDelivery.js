import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";
import { Link, NavLink } from "react-router-dom";
const { Component } = React;

const MapDel = observer(
  class MapDel extends Component {
    state = {};

    checkData = () => {
      if (this.props.pointsData.length) {
        $("#map").removeClass("loading");
        this.createMAP();
      } else {
        setTimeout(() => {
          this.checkData();
        }, 500);
      }
    };

    createMAP = () => {
      const { ymaps } = window;
      const that = this;
      ymaps.ready(function () {
        console.log("123 :>> ", 123);
        // if (window.geoMap !== undefined) {
        //   console.log("321 :>> ", 321);
        //   window.geoMap.destroy();
        // }
        console.log("ymaps :>> ", window.ymaps);
        var geoMap = new ymaps.Map(
          "map",
          {
            center: that.props.mapCoor,
            zoom: 10,
            controls: ["zoomControl"],
          },
          {
            suppressMapOpenBlock: true,
            autoFitToViewport: "always",
          }
        );
        window.geoMap = geoMap;

        console.log("geoMap :>> ", geoMap);
        const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
          '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            `$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=${
              $("#map").height() - 100
            } maxWidth=${$("#map").width() - 100}]]` +
            "</div>" +
            "</div>",
          {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
              this.constructor.superclass.build.call(this);

              this._$element = $(".popover", this.getParentElement());

              this.applyElementOffset();

              //   this._$element
              //     .find(".close")
              //     .on("click", this.onCloseClick.bind(this));

              this._$element
                .find(".i_close")
                .on("click", this.onCloseClick.bind(this));

              //   const properties = this._$element.properties();

              this._$element.find(".popover-content__btn").on("click", () => {
                console.log(
                  "properties :>> ",
                  this._renderedTemplate.data._dataManager._data.properties
                    ._data
                );
                const dData = this._renderedTemplate.data._dataManager._data
                  .properties._data.data;
                geoMap.geoObjects.removeAll();

                // $("#map").animate(
                //   { height: "218px" },
                //   {
                //     duration: 100,
                //     easing: "linear",
                //     done: function () {

                //     },
                //   }
                // );

                $("#map").addClass("choose");

                setTimeout(() => {
                  geoMap.geoObjects.add(
                    new ymaps.Placemark(
                      dData.GPS.split(","),
                      {},
                      {
                        preset: "islands#nightDotIcon",
                        iconColor: "#000166",
                      }
                    )
                  );
                  // geoMap.removeControl(ymaps.Zoom());
                  //   geoMap.controls.remove("zoomControl");
                  //   geoMap.container.fitToViewport(); // объект класса ymaps.Map
                  geoMap.setCenter(dData.GPS.split(","));
                }, 350);

                that.props.setPVZChooseData({
                  ...dData,
                  pvz: true,
                });
              });

              //   this._$element.css({ width: "388px", height: "232px" });
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
              this._$element.find(".close").off("click");

              this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
              MyBalloonLayout.superclass.onSublayoutSizeChange.apply(
                this,
                arguments
              );

              if (!this._isElement(this._$element)) {
                return;
              }

              this.applyElementOffset();

              this.events.fire("shapechange");
            },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            applyElementOffset: function () {
              this._$element.css({
                left: -$("#map").width() / 2,
                top: -(
                  this._$element[0].offsetHeight +
                  this._$element.find(".arrow")[0].offsetHeight
                ),
              });
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            onCloseClick: function (e) {
              e.preventDefault();

              this.events.fire("userclose");
            },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getShape: function () {
              if (!this._isElement(this._$element)) {
                return MyBalloonLayout.superclass.getShape.call(this);
              }

              var position = this._$element.position();

              return new ymaps.shape.Rectangle(
                new ymaps.geometry.pixel.Rectangle([
                  [position.left, position.top],
                  [
                    position.left + this._$element[0].offsetWidth,
                    position.top +
                      this._$element[0].offsetHeight +
                      this._$element.find(".arrow")[0].offsetHeight,
                  ],
                ])
              );
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
              return element && element[0] && element.find(".arrow")[0];
            },
          }
        );

        const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
            '<div class="popover-content">$[properties.balloonContent]</div>'
        );

        var clusterer = new ymaps.Clusterer({
          /**
           * Через кластеризатор можно указать только стили кластеров,
           * стили для меток нужно назначать каждой метке отдельно.
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
           */
          preset: "islands#nightClusterIcons",

          /**
           * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
           */
          groupByCoordinates: false,
          /**
           * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
           */
          clusterDisableClickZoom: false,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
        });

        if (window.mapClusterer !== undefined) {
          window.mapClusterer.removeAll();
        }
        let geoObjects = [];
        const addObject = () => {
          geoObjects = [];

          that.props.pointsData.forEach((element) => {
            geoObjects.push(
              new ymaps.Placemark(
                element.geometry.coordinates,
                element.properties,
                {
                  balloonShadow: false,
                  balloonLayout: MyBalloonLayout,
                  balloonContentLayout: MyBalloonContentLayout,
                  balloonPanelMaxMapArea: 0,
                  preset: "islands#nightStretchyIcon",

                  // Не скрываем иконку при открытом балуне.
                  // hideIconOnBalloonOpen: false,
                  // И дополнительно смещаем балун, для открытия над иконкой.
                  // balloonOffset: [3, -40],
                }
              )
            );
          });
        };
        addObject();
        clusterer.options.set({
          gridSize: 80,
        });

        const revertMap = () => {
          clusterer.removeAll();
          clusterer.add(geoObjects);

          geoMap.geoObjects.add(clusterer);
        };

        revertMap();

        window.revertMap = revertMap;
        window.addObject = addObject;
      });
    };

    render() {
      return (
        <div id="map" className="loading">
          <p className="msg">Загрузка данных</p>
        </div>
      );
    }

    componentDidMount() {
      this.checkData();
      window.checkData = this.checkData;
    }

    componentWillUnmount() {
      window.geoMap.destroy();
    }
  }
);

export default MapDel;
