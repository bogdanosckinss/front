import React from "react";
import rule1 from '../../img/roules-1.svg'
import rule2 from '../../img/roules-2.svg'
import rule3 from '../../img/roules-3.svg'
import rule4 from '../../img/roules-4.svg'
import rule1Mobile from '../../img/roules-1-mob.svg'
import rule2Mobile from '../../img/roules-2-mob.svg'
import rule3Mobile from '../../img/roules-3-mob.svg'
import rule4Mobile from '../../img/roules-4-mob.svg'
export default function Rules() {
    return (
        <>
            <div className="roules" id="rules">
                <div className="roules__wrapper">
                    <div className="container">
                        <h1 className="roules__title">Правила участия</h1>
                        <ul className="roules__list">
                            <li className="roules__item">
                                <div className="roules__img">
                                    <picture>
                                        <source
                                            srcSet={rule1}
                                            media="(min-width: 768px)"
                                        />

                                        <img src={rule1Mobile} alt="Описание изображения"/>
                                    </picture>
                                </div>
                                <div className="roules__roulet__item-flex">
                                    <div className="roules__item-title">1 шаг</div>
                                    <div className="roules__item-text">
                                        Запишите видео, где ваш  ребёнок  поёт песню любимого блогера
                                        под фонограмму или аккомпанемент инструмента
                                    </div>
                                </div>
                            </li>
                            <li className="roules__item">
                                <div className="roules__img">
                                    <picture>
                                        <source
                                            srcSet={rule2}
                                            media="(min-width: 768px)"
                                        />
                                        <img src={rule2Mobile} alt="Описание изображения"/>
                                    </picture>
                                </div>
                                <div className="roules__roulet__item-flex">
                                    <div className="roules__item-title">2 шаг</div>
                                    <div className="roules__item-text">
                                        Нажмите на кнопку «Участвовать в конкурсе», заполните заявку
                                        и отправьте нам свой ролик
                                    </div>
                                </div>
                            </li>
                            <li className="roules__item">
                                <div className="roules__img">
                                    <picture>
                                        <source
                                            srcSet={rule3}
                                            media="(min-width: 768px)"
                                        />

                                        <img src={rule3Mobile} alt="Описание изображения"/>
                                    </picture>
                                </div>
                                <div className="roules__roulet__item-flex">
                                    <div className="roules__item-title">3 шаг</div>
                                    <div className="roules__item-text">
                                        Отправьте ссылку на видео друзьям и попросите голосовать за вас
                                    </div>
                                </div>
                            </li>
                            <li className="roules__item">
                                <div className="roules__absolute-block">
                                    Заявки и голоса принимаются с 9.09.2024 по 29.09.2024
                                </div>
                                <div className="roules__img">
                                    <picture>
                                        <source
                                            srcSet={rule4}
                                            media="(min-width: 768px)"
                                        />

                                        <img src={rule4Mobile} alt="Описание изображения"/>
                                    </picture>
                                </div>
                                <div className="roules__roulet__item-flex">
                                    <div className="roules__item-title">4 шаг </div>
                                    <div className="roules__item-text">
                                        Собирайте лайки от зрителей  со всей страны и ждите  результатов
                                        конкурса
                                    </div>
                                </div>
                            </li>
                        </ul>
                        {/*<div className="roules-attention">*/}
                        {/*    <div className="roules-attention__left">*/}
                        {/*        <div className="roules-attention__title">Обратите внимание!</div>*/}
                        {/*        <div className="roules-attention__text">*/}
                        {/*            Список треков ограничен в целях соблюдения авторских прав юных*/}
                        {/*            артистов*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <a href="#songminus" className="roules-attention__btn">*/}
                        {/*        <span> Треки для участия </span>*/}
                        {/*        <svg*/}
                        {/*            width="320"*/}
                        {/*            height="54"*/}
                        {/*            viewBox="0 0 320 54"*/}
                        {/*            fill="none"*/}
                        {/*            xmlns="http://www.w3.org/2000/svg"*/}
                        {/*        >*/}
                        {/*            <path*/}
                        {/*                d="M154.908 0.352816C203.279 0.26901 281.028 -0.521653 302.379 5.99617C323.73 12.514 324.86 37.8743 310.182 46.4403C299.179 52.8604 288.799 54.3269 144.287 53.9435C44.9881 53.6806 30.8864 52.5985 14.0693 46.7537C-2.74781 40.9088 -6.24645 16.5942 13.2892 8.50436C40.4336 -2.73328 109.262 0.431953 154.908 0.352816Z"*/}
                        {/*                fill="white"*/}
                        {/*            />*/}
                        {/*        </svg>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        {/*<div className="roules-apply">*/}
                        {/*    <div className="roules-apply__text">*/}
                        {/*        Заявки принимаются с 2.09.2024 по 22.09.2024*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
