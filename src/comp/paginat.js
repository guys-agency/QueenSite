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
      const { productValue } = this.props.store;
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
              console.log(
                "this.props.store.startPag",
                this.props.store.startPag
              );
              console.log("this.props.store.stopPag", this.props.store.stopPag);
              $("html, body").animate({ scrollTop: 0 }, 500);
              this.setState({ midlPage: i + 1 < 3 ? 3 : i + 1 });
            }}
          >
            {i + 1}
          </div>
        );
      }
      return <div className="paginat">{pointCont}</div>;
    }
  }
);

export default Paginat;