import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import PinchZoom from "pinch-zoom-js";
import VideoPlayer from "react-video-js-player";
import Drift from "drift-zoom";
import $ from "jquery";

let d = "";

const Gallery = (props) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    slidesPerView: 1,
    speed: 800,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // preventClicksPropagation: false,
    // preventClicks: false,
    // allowSlideNext: typeDevice,
    // allowSlidePrev: typeDevice,
    // noSwiping: false,
    allowTouchMove: typeDevice,
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
    if (gallerySwiper !== null && gallerySwiper.controller && thumbnailSwiper !== null && thumbnailSwiper.controller) {
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

  const zoomInit = () => {
    if (document.querySelector(".swiper-slide-active .drift") !== null && $(window).width() > 425) {
      if (d !== "") {
        d.destroy();
      }

      const driftImg = document.querySelector(".swiper-slide-active .drift");
      const pane = document.querySelector(".product-p__description");

      d = new Drift(driftImg, {
        paneContainer: pane,
        inlinePane: true,
        hoverDelay: 200,
      });
    }
  };

  useEffect(() => {
    zoomInit();
    $(".swiper-button-next").on("click", () => {
      zoomInit();
    });
    $(".swiper-button-prev").on("click", () => {
      zoomInit();
    });

    return () => {
      if (d !== "") {
        d.destroy();
      }

      $(".swiper-button-next").off("click");
      $(".swiper-button-prev").off("click");
    };
  }, [gallerySwiper, thumbnailSwiper]);

  let player = {};

  const onPlayerReady = (player1) => {
    // console.log("Player is ready: ", player1);

    player = player1;
    player.tech_.off("dblclick");
    player.muted(true);
    player.playsinline(true);
    // $(".vjs-progress-holder").on("click", (e) => {
    //   console.log("e :>> ", e);
    // });
    // $(".vjs-control-bar").on("click", (e) => {
    //   console.log("e2 :>> ", e);
    // });
    // $(".videoQB").on("click", () => {
    //   player.pause();
    // });
  };

  const onVideoPlay = (duration) => {
    // console.log("Video played at: ", duration);
    if (!$(".videoQB").hasClass("vjs-has-started")) {
      $(".videoQB").addClass("vjs-has-started");
    }

    // $(".vjs-progress-holder.vjs-slider.vjs-slider-horizontal").off("click");
    // document
    //   .querySelector(".vjs-progress-holder.vjs-slider.vjs-slider-horizontal")
    //   .removeEventListener("click");
    // console.log("object122 :>> ", $(".vjs-progress-holder"));
    // $(".vjs-progress-holder").on("click", (e) => {
    //   console.log("e :>> ", e);
    // });
    // $(".vjs-control-bar").on("click", (e) => {
    //   console.log("e2 :>> ", e);
    // });
    // $(".videoQB").on("click", (e) => {
    //   console.log("e3 :>> ", e);
    // });
    // $("body").on("click", (e) => {
    //   console.log("e3 :>> ", e.target);
    // });
  };

  const onVideoPause = (duration) => {
    // console.log("Video paused at: ", duration);
  };

  const onVideoTimeUpdate = (duration) => {
    // console.log("Time updated: ", duration);
  };

  const onVideoSeeking = (duration) => {
    // console.log("Video seeking: ", duration);
  };

  const onVideoSeeked = (from, to) => {
    // console.log(`Video seeked from ${from} to ${to}`);
  };

  const onVideoEnd = () => {
    // player.reset();
    // console.log("player :>> ", player);
    // player.currentTime(0).trigger("loadstart");
    $(".videoQB").removeClass("vjs-has-started");
    player.currentTime(0); // 2 minutes into the video
    player.pause();
    player.trigger("loadstart");
    // player.posterImage.el.style.display = "block";
    player.bigPlayButton.show();
    // console.log("Video ended");
  };

  const main = [];
  const small = [];
  // main.push(
  //   <div className="main-img" key={"12"}>
  //     <VideoPlayer
  //       controls={true}
  //       src="/image/videos/IMG_3292.MOV"
  //       poster="/image/items/1000cert.png"
  //       // width="100%"
  //       // height="100%"
  //       onReady={onPlayerReady}
  //       onPlay={onVideoPlay}
  //       onPause={onVideoPause}
  //       onTimeUpdate={onVideoTimeUpdate}
  //       onSeeking={onVideoSeeking}
  //       onSeeked={onVideoSeeked}
  //       onEnd={onVideoEnd}
  //       className="videoQB"
  //       hideControls={["volume", "timer", "fullscreen"]}
  //     />
  //   </div>
  // );
  // small.push(
  //   <div className="thumb-img video" key="12">
  //     <img src="/image/items/1000cert.png" alt="" />
  //   </div>
  // );
  props.path.forEach((p, i) => {
    main.push(
      <div className="main-img" key={i}>
        <img id="imgs" className="drift" src={"/image/items/" + p} data-zoom={"/image/items/" + p} alt="" />
      </div>
    );
    small.push(
      <div className="thumb-img" key={i}>
        <img src={"/image/items/" + p} alt="" />
      </div>
    );

    if (i === 0) {
      // console.log("props.video1 :>> ", props.video);
      if (props.video !== undefined && props.video !== null) {
        // console.log("props.video2 :>> ", props.video);
        props.video.forEach((el, i) => {
          main.push(
            <div className="main-img" key={`v-${i}`}>
              <VideoPlayer
                controls={true}
                src={`/image/videos/${el.src}`}
                poster={`/image/videos/${el.prev}`}
                // width="100%"
                // height="100%"
                onReady={onPlayerReady}
                onPlay={onVideoPlay}
                onPause={onVideoPause}
                onTimeUpdate={onVideoTimeUpdate}
                onSeeking={onVideoSeeking}
                onSeeked={onVideoSeeked}
                onEnd={onVideoEnd}
                className="videoQB"
                hideControls={["volume", "timer", "fullscreen"]}
              />
            </div>
          );
          small.push(
            <div className="thumb-img video" key={`v_p-${i}`}>
              <img src={`/image/videos/${el.prev}`} alt="" />
            </div>
          );
        });
      }
    }
  });

  // clickThumb = () => {
  //     var indexSlide = thumbnailSwiper.clickedIndex;
  //     // imgCarousel.slideTo(indexSlide, 300, true);
  //     console.log(indexSlide);
  // }
  // if (document.querySelector(".drift") !== null && $(window).width() > 425) {
  //   this.drafts.forEach((el) => {
  //     el.disable();
  //   });
  //   var driftImgs = document.querySelectorAll(".drift");
  //   var pane = document.querySelector(".product-p__description");
  //   driftImgs.forEach((img) => {
  //     const d = new Drift(img, {
  //       paneContainer: pane,
  //       inlinePane: true,
  //       hoverDelay: 200,
  //     });
  //     this.drafts.push(d);
  //   });
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

// const video = [
//   {
//     src: "имя видео",
//     prev: "имя превью",
//   },
//   {
//     src: "имя видео",
//     prev: "имя превью",
//   },
// ];

// const position =
//   "тут число от 0 до 10, 0 и отсутсвие поля равносильны, данное поле отражает позицию в выводе, если 10, то попадает в начало вывода";
