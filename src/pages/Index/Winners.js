import React from "react";
import bear from '../../img/winners-bear.svg'
import prizes from '../../img/prizes.svg'
import prizesSmall1 from '../../img/prizes-small-1.svg'
import prizesSmall2 from '../../img/prizes-small-2.svg'

export default function Winners() {
    return (
        <>
            <div className="winners">
                <div className="winners__wrapper">
                    <div className="container">
                        <div className="winners__title">
                            <span className="winners__title-span">
                                <span className="winners__title-span-first">
                                    <span className="winners__title-span-we">
                                        <span className="winners__title-span-special"> 1.10.2024</span>мы </span>
                                     объявим
                                </span>
                                3 победителей конкурса
                            </span>
                        </div>

                        <div className="winners__block">
                            <div className="winners__block-bear">
                                <img src={bear} alt="bear"/>
                            </div>
                            <div className="winners__block-number winners__block-number-f">1</div>
                            <div className="winners__block-number winners__block-number-s">2</div>
                            <div className="winners__block-info winners__block-info-f">
                                <div className="winners__block--title">1-ым победителем</div>
                                <p className="winners__block-text">
                                    Станет участник, набравший рекордное количество лайков под своим
                                    видео на сайте конкурса
                                </p>
                            </div>
                            <div className="winners__block-info winners__block-info-s">
                                <div className="winners__block--title">2-x победителей</div>
                                <p className="winners__block-text">
                                    Определит профессиональное жюри СуперЛайкШоу
                                </p>
                            </div>
                        </div>
                        <div id="prizes" className="prizes__title">Призы победителей конкурса</div>
                        <div className="prizes__flex">
                            <div className="prizes__left">
                                <div className="prizes__img">
                                    <img src={prizes} alt=""/>
                                </div>
                                <div className="prizes__left-block">
                                    <div className="prizes__left-title">
                                        Вытупление на премии «СуперЛайкШоу-2024»
                                    </div>
                                    <div className="prizes__left-text">
                                        Победители запишут трек детского мира и выступят с ним на розовой
                                        дорожке Музыкальной Премии СТС Kids х Kids Project
                                    </div>
                                </div>
                            </div>
                            <div className="prizes__right">
                                <div className="prizes__right-block">
                                    <div className="prizes__right-img">
                                        <img src={prizesSmall1} alt=""/>
                                    </div>
                                    <div className="prizes__left-text">
                                        Победителей наградят на главной сцене премии вместе с артистами
                                        премии «СуперЛайкШоу-2024»
                                    </div>
                                </div>
                                <div className="prizes__right-block">
                                    <div className="prizes__right-img">
                                        <img src={prizesSmall2} alt=""/>
                                    </div>
                                    <div className="prizes__left-text">
                                        Каждый победитель получит подарочный сертификат на запись своей
                                        песни в профессиональной студии звукозаписи
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
