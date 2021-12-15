import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Action = observer(
    class Action extends Component {
        state = {  }
        render() { 
            return (
              <div>
                <div className="actions">
                  <div className="action">
                    <div className="head head_big">
                      <div
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
                            Пасха
                          </h1>
                          <p>Подготовьтесь к любимому семейному празднику.</p>
                        </div>
                      </div>
                    </div>
                    <div className="container container_f">
                      {
                      /**
                       * ! Каталог
                       */
                       }
                    </div>
                  </div>
                </div>
              </div>
            );
        }
    }
);


 
export default Action;