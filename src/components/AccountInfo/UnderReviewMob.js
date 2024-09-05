import React from "react";
import appChecking from "../../img/application-checking.svg";

export default function UnderReviewMob() {
    return (
        <div className="application-checking-block display-mob">
            <div className="application-checking__icon">
                <img src={appChecking} alt=""/>
            </div>
            <div className="application-checking__title">
                Видео на ходится на проверке модератором
            </div>
            <div className="application-checking__text">
                Видео, загруженные после 20:00 по МСК, публикуются на
                следующий день
            </div>
        </div>
    )
}
