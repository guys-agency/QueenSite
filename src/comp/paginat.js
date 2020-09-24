import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import $ from "jquery";

const Paginat = observer(
  class Paginat extends React.Component {
    state = {
      midlPage: 3,
    };
    render() {
      if (this.props.store.startPag === 0 && this.state.midlPage !== 3) {
        this.setState({ midlPage: 3 });
      }
      const { productValue, filtration, productsToRender } = this.props.store;

      const { midlPage } = this.state;
      const page = midlPage - 3;
      const countPage = Math.ceil(productValue / 42);
      const pointCont = [];

      if (countPage > 5 && this.props.store.startPag / 42 > 4) {
        pointCont.push(
          <>
            <div
              className={"pagination__page"}
              key={1}
              onClick={() => {
                $("html, body").animate({ scrollTop: 0 }, 500);

                let searchQt = window.location.href.split("?")[1];
                if (
                  searchQt !== "undefined" &&
                  searchQt !== "" &&
                  searchQt !== undefined
                ) {
                  if (searchQt.includes("page=")) {
                    const searchQtParts = searchQt.split(
                      "page=" + this.props.store.startPag / 42
                    );

                    searchQt = searchQtParts[0] + `page=0` + searchQtParts[1];
                  } else {
                    searchQt += `&&page=0`;
                  }

                  this.props.history.replace({ search: searchQt });
                } else {
                  this.props.history.replace({
                    search: `page=0`,
                  });
                }
                this.props.store.startPag = 0;
                this.props.store.stopPag = 42;

                filtration();
                this.setState({ midlPage: countPage });
              }}
            >
              1
            </div>
            <div className="pagination__more"> ... </div>
          </>
        );
      }

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
              let searchQt = window.location.href.split("?")[1];
              if (
                searchQt !== "undefined" &&
                searchQt !== "" &&
                searchQt !== undefined
              ) {
                if (searchQt.includes("page=")) {
                  const searchQtParts = searchQt.split(
                    "page=" + this.props.store.startPag / 42
                  );

                  searchQt = searchQtParts[0] + `page=${i}` + searchQtParts[1];
                } else {
                  searchQt += `&&page=${i}`;
                }

                this.props.history.replace({ search: searchQt });
              } else {
                this.props.history.replace({ search: `page=${i}` });
              }
              if (i === countPage - 1) {
                this.props.store.startPag = 42 * i;
                this.props.store.stopPag = productValue;
              } else {
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
            <div className="pagination__more"> ... </div>
            <div
              className={"pagination__page"}
              key={countPage}
              onClick={() => {
                $("html, body").animate({ scrollTop: 0 }, 500);

                let searchQt = window.location.href.split("?")[1];
                if (
                  searchQt !== "undefined" &&
                  searchQt !== "" &&
                  searchQt !== undefined
                ) {
                  if (searchQt.includes("page=")) {
                    const searchQtParts = searchQt.split(
                      "page=" + this.props.store.startPag / 42
                    );

                    searchQt =
                      searchQtParts[0] +
                      `page=${countPage - 1}` +
                      searchQtParts[1];
                  } else {
                    searchQt += `&&page=${countPage - 1}`;
                  }

                  this.props.history.replace({ search: searchQt });
                } else {
                  this.props.history.replace({
                    search: `page=${countPage - 1}`,
                  });
                }
                this.props.store.startPag = 42 * (countPage - 1);
                this.props.store.stopPag = productValue;

                filtration();
                this.setState({ midlPage: countPage });
              }}
            >
              {countPage}
            </div>
          </>
        );
      }
      return (
        productsToRender.length !== 0 && (
          <div className="pagination">{pointCont}</div>
        )
      );
    }
  }
);

export default withRouter(Paginat);
