import { observer } from "mobx-react";
import React from "react";
import api from "./api";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
const { Component } = React;

const Actions = observer(
  class Actions extends Component {
    state = {
      renCont: [],
    };
    render() {
      const { renCont } = this.state;
      return (
        renCont.length !== 0 && (
          <div>
            <div className="actions">{renCont}</div>
          </div>
        )
      );
    }

    componentDidMount() {
      const typeDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      api
        .getActions()
        .then((data) => {
          const renConTime = [];
          Object.keys(data).forEach((nEl) => {
            const prod = data[nEl].products.map((elProd) => {
              return (
                <div className="col col-3 col-t-4 col-s-6" key={elProd.slug}>
                  <ProductCard data={elProd} store={this.props.store} />
                </div>
              );
            });
            renConTime.push(
              <div className="action">
                {/**
                 * ! У первой акции .head_big нет .head_list как у последующих
                 */}

                <div
                  className={`head ${
                    +nEl === 0 ? "head_big" : "head_sm head_list"
                  }`}
                >
                  <Link
                    to={"actions/" + data[nEl].slug}
                    className="head-banner head-banner_action"
                    style={{
                      backgroundImage: `url(/image/banners/${
                        typeDevice
                          ? data[nEl]["image-mob-large"]
                          : data[nEl]["image-desc-large"]
                      })`,
                    }}
                  >
                    <div className="text">
                      <div className="label">Акция</div>
                      <h1>
                        {data[nEl].name} <span className="ic i_right"></span>
                      </h1>
                      <p>{data[nEl].description}</p>
                    </div>
                  </Link>
                </div>
                <div className="container container_f">
                  <div className="row">{prod}</div>
                  <Link
                    to={"actions/" + data[nEl].slug}
                    className="btn btn_primary"
                  >
                    Посмотреть еще
                  </Link>
                </div>
              </div>
            );
          });
          this.setState({ renCont: renConTime });
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
  }
);

export default Actions;
