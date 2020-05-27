import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Actions = observer(
    class Actions extends Component {
        state = {}
        render() {
            return (
              <div>
                <div className="actions">
                  <div className="action">
                    {
                    /**
                     * ! У первой акции .head_big нет .head_list как у последующих
                     */
                    }
                    <div className="head head_big">
                      <a
                        href="#"
                        className="head-banner head-banner_action"
                        style={{
                          backgroundImage:
                            "url(" + "/image/actions/1.jpg" + ")",
                        }}
                      >
                        <div className="text">
                          <div className="label">Акция</div>
                          <h1>
                            Пасха <span className="ic i_right"></span>
                          </h1>
                          <p>Подготовьтесь к любимому семейному празднику.</p>
                        </div>
                      </a>
                    </div>
                    <div className="container container_f">
                      <div className="row">
                        {
                        /** 
                        * ! Список продуктов из акции 
                        */
                        }
                      </div>
                      <button className="btn btn_primary">
                        Посмотреть еще
                      </button>
                    </div>
                  </div>

                  <div className="action">
                    <div className="head head_sm head_list">
                      <a
                        href="#"
                        className="head-banner head-banner_action"
                        style={{
                          backgroundImage:
                            "url(" + "/image/actions/1.jpg" + ")",
                        }}
                      >
                        <div className="text">
                          <div className="label">Акция</div>
                          <h1>
                            Пасха <span className="ic i_right"></span>
                          </h1>
                          <p>Подготовьтесь к любимому семейному празднику.</p>
                        </div>
                      </a>
                    </div>
                    <div className="container container_f">
                      <div className="row">
                        {
                        /**
                         * ! Список продуктов из акции
                         */
                         }
                      </div>
                      <button className="btn btn_primary">
                        Посмотреть еще
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
        }
    }
);
 
export default Actions;