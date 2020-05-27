import { observer } from "mobx-react";
import React from "react";
const { Component } = React;

const Collections = observer(
    class Collections extends Component {
        state = {  }
        render() { 
            return ( 
                <div className="collections">
                    <div className="head head_big">
                        <div className="head-cont">
                            <a
                                className="head-banner"
                                style={{
                                    backgroundImage: "url(" + "/image/hb/1.jpg" + ")",
                                }}
                            ></a>
                        </div>
                    </div>
                    <div className="container collections__list">
                        <div className="row">
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay main"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Индиго</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Натура</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Пасха</div>
                                </a>
                            </div>

                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay main"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Индиго</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Натура</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Пасха</div>
                                </a>
                            </div>

                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay main"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Индиго</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Натура</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Пасха</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay main"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Индиго</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Натура</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Пасха</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay main"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/1.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Индиго</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/2.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Натура</div>
                                </a>
                            </div>
                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Пасха</div>
                                </a>
                            </div>

                            <div className="col">
                                <a
                                    href="#"
                                    className="banner banner_overlay small"
                                    style={{
                                        backgroundImage: "url(" + "/image/ideas/3.jpg" + ")",
                                    }}
                                >
                                    <div className="banner__desc">Пасха</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
             );
        }
    }     
);

export default Collections;
