import React, {useEffect, useMemo, useRef} from "react";
import photo from '../../img/photo.jpg'
import heart from '../../img/heart.svg'
import SingleVideo from "./SingleVideo.js";
export default function RealWinners() {
    return (
        <div id="winnersnew" className="real-winners">
            <div className="real-winners__wrapper">
                <div className="container">
                    <div className="real-winners__title">Победители конкурса</div>
                    <div lang="ru" className="real-winners__subtitle">
                        Для получения призов мы свяжемся <br/>с вами по телефону или почте,
                        которую вы указывали при регистрации заявки
                    </div>
                    <ul className="videos-result__list">
                        <SingleVideo />
                        <SingleVideo />
                        <SingleVideo />
                    </ul>
                </div>
            </div>
        </div>

    )
}
