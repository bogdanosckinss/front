import React from "react";
import supportOthers from '../../img/support-others.svg'
import supportOthersMob from '../../img/support-others-mob.svg'
import {useNavigate} from "react-router-dom";

export default function SupportOthers() {
    const navigate = useNavigate()
    return (
        <div className="support-others">
            <div className="support-others__left">
                <div className="support-others__title">Поддержи других участников</div>
                <div className="support-others__text">
                    Голосуй за других учатсников и находи новых творческих друзей на
                    конкурсе
                </div>
                <button onClick={() => navigate('/videos')} className="support-others__btn button-special">
                    <span>
                        <a href='/videos'>Голосовать</a>
                    </span>
                    <svg
                        width="226"
                        height="43"
                        viewBox="0 0 226 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M109.693 0.677244C143.721 0.612062 198.416 -0.00289822 213.436 5.06652C228.456 10.1359 229.251 29.8607 218.925 36.5231C211.185 41.5165 203.882 42.6571 102.222 42.3589C32.3673 42.1544 22.4471 41.3128 10.6166 36.7668C-1.21378 32.2208 -3.67499 13.3094 10.0679 7.01733C29.1633 -1.72305 77.5827 0.738795 109.693 0.677244Z"
                        />
                    </svg>
                </button>
            </div>
            <div className="support-others__img">
                <picture>
                    <source
                        srcSet={supportOthers}
                        media="(min-width: 650px)"
                    />

                    <img
                        src={supportOthersMob}
                        alt="Описание изображения"
                    />
                </picture>
            </div>
        </div>
    )
}
