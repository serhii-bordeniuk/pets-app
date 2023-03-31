import React from "react";
import mainlogo from "../../resources/img/mainlogo.svg";
import mainbanner from "../../resources/img/banner_image.svg";
import "./MainBanner.scss";

export const MainBanner = () => {
    return (
        <div className="mainbanner">
            <div className="wrapper">
                <div className="mainlogoWrapper">
                    <img className="mainlogo" src={mainlogo} alt="logotype" />
                </div>
                <div className="mainbannerWrapper">
                    <img className="mainbanner" src={mainbanner} alt="" />
                </div>
            </div>
        </div>
    );
};
