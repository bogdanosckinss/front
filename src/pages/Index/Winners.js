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
                                        <span className="winners__title-span-special">3.10.2024</span>мы </span>
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
                                    Станет участник, набравший рекордное количество лайков  под своим
                                    видео на сайте конкурса
                                </p>
                            </div>
                            <div className="winners__block-info winners__block-info-s">
                                <div className="winners__block--title">2-x победителей</div>
                                <p className="winners__block-text">
                                    Определит профессиональное жюри команды Детского мира и СуперЛайкШоу
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
