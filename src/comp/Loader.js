import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";

import "react-lazy-load-image-component/src/effects/blur.css";

const StartLoader = observer(function StartLoader(props) {
  const { store } = props;

  const { loaderPercent } = store;

  return (
    // <Link className="product" to={`/product/${data.slug}`}>
    <div className="loader-page">
      <div className="loader-page__container">
        <div className="logo logo_vl">
          <span className="i_queen"></span>
          <span className="i_of"></span>
          <span className="i_line-h"></span>
          <span className="i_bohemia"></span>
          <span className="i_qd"></span>
        </div>

        <div className="loader-page__loader">
          <div className="percent">
            <svg className="circle">
              {/* <circle transform="rotate(-90)" r="30" cx="-37" cy="37" /> */}
              <circle
                // transform="rotate(0)"
                // style={{ "stroke-dasharray": "440" }}
                r="37"
                cx="37"
                cy="37"
              />
              <circle
                // transform="rotate(90)"
                style={{
                  "stroke-dashoffset": 232 - (232 * loaderPercent) / 100,
                }}
                r="37"
                cx="37"
                cy="37"
              />
            </svg>
            <div className="number">
              <p>{loaderPercent}</p>
              <span>%</span>
            </div>
            <div className="shadow"></div>
          </div>
          {/* <div className="pie spinner"></div> */}
        </div>
        <div className="wrapper"></div>
      </div>
    </div>
  );
});

export default withRouter(StartLoader);
