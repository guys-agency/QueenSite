import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Collection = observer(
    class Collection extends Component {
        state = {}
        render() {
            return (
                <div className="collections">
                    <div className="head head_big">
                        <div className="head-cont">
                            <div
                                className="head-banner"
                                style={{
                                    backgroundImage: "url(" + "/image/hb/1.jpg" + ")",
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col col-3"></div>
                            <div className="col col-8">
                                <div className="collections__desc">
                                    Коллекция Натура – это уникальное сочетание натуральных цветов,  воссозданное в наших изделиях из выдувного богемского стекла, кристалайта и фарфора. 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row"></div>
                    </div>
                    {/* место для каталога */}
                </div>
            );
        }
    }
);

export default Collection;
