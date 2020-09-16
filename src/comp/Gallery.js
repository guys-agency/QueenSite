import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import PinchZoom from "pinch-zoom-js";

const Gallery = (props) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    slidesPerView: 1,
    speed: 800,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    centeredSlides: true,
    slidesPerView: "auto",
    touchRatio: 0.2,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slideToClickedSlide: true,
  };
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  useEffect(() => {
    if (typeDevice) {
      let els = document.querySelectorAll("#imgs");
      els.forEach((el) => {
        let pz = new PinchZoom(el, {
          minZoom: 1,
          verticalPadding: 0,
          horizontalPadding: 0,
          lockDragAxis: true,
          draggableUnzoomed: false,
        });
        // el.setAttribute("style", "margin:50% 0");
      });
    }
  }, [props.path, typeDevice]);

  const main = [];
  const small = [];
  props.path.forEach((p, i) => {
    main.push(
      <div className="main-img" key={i}>
        <img
          id="imgs"
          className="drift"
          src={"/image/items/" + p}
          data-zoom={"/image/items/" + p}
          alt=""
        />
      </div>
    );
    small.push(
      <div className="thumb-img" key={i}>
        <img src={"/image/items/" + p} alt="" />
      </div>
    );
  });

  // clickThumb = () => {
  //     var indexSlide = thumbnailSwiper.clickedIndex;
  //     // imgCarousel.slideTo(indexSlide, 300, true);
  //     console.log(indexSlide);
  // }
  return (
    <div>
      {/* <Swiper {...gallerySwiperParams}>
                <div style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/1)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/2)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/3)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/4)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/5)' }} />
            </Swiper>
            <Swiper {...thumbnailSwiperParams}>
                <div style={{ backgroundImage: 'url(http://lorempixel.com/300/300/nature/1)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/300/300/nature/2)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/300/300/nature/3)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/300/300/nature/4)' }} />
                <div style={{ backgroundImage: 'url(http://lorempixel.com/300/300/nature/5)' }} />
            </Swiper> */}

      <div className="product-p__image-block">
        <div className="main">
          <Swiper {...gallerySwiperParams}>{main}</Swiper>
        </div>
        <div className="thumb">
          <Swiper {...thumbnailSwiperParams}>{small}</Swiper>
        </div>
      </div>
    </div>
  );
};
export default Gallery;
