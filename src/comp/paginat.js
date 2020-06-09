import { observer } from "mobx-react";
import React from "react";
import $ from "jquery";

const Paginat = observer(
  class Paginat extends React.Component {
    state = {
      midlPage: 3,
    };
    render() {
      console.log("object :>> 1231231");
      if (this.props.store.startPag === 0 && this.state.midlPage !== 3) {
        this.setState({ midlPage: 3 });
      }
      const { productValue, filtration } = this.props.store;
      console.log("productValue :>> ", productValue);
      const { midlPage } = this.state;
      const page = midlPage - 3;
      const countPage = Math.ceil(productValue / 42);
      const pointCont = [];
      for (
        let i = page;
        i < (countPage > 5 + page ? 5 + page : countPage);
        i++
      ) {
        pointCont.push(
          <div
            className={
              i === this.props.store.startPag / 42
                ? "pagination__page active"
                : "pagination__page"
            }
            key={i}
            onClick={() => {
              if (i === countPage - 1) {
                console.log("42 * i;", 42 * i);
                this.props.store.startPag = 42 * i;
                this.props.store.stopPag = productValue;
              } else {
                console.log("42 * i;", 42 * i);
                this.props.store.startPag = 42 * i;
                this.props.store.stopPag = 42 * (i + 1);
              }

              $("html, body").animate({ scrollTop: 0 }, 500);
              this.setState({ midlPage: i + 1 < 3 ? 3 : i + 1 });
              filtration();
            }}
          >
            {i + 1}
          </div>
        );
      }
      if (countPage > 5 && !(this.props.store.startPag / 42 > countPage - 4)) {
        pointCont.push(
          <>
            <p> ... </p>
            <div
              className={"pagination__page"}
              key={countPage}
              onClick={() => {
                this.props.store.startPag = 42 * (countPage - 1);
                this.props.store.stopPag = productValue;

                $("html, body").animate({ scrollTop: 0 }, 500);
                this.setState({ midlPage: countPage });
                filtration();
              }}
            >
              {countPage}
            </div>
          </>
        );
      }
      return <div className="pagination">{pointCont}</div>;
    }
  }
);

export default Paginat;
