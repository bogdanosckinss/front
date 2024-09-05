import React from "react";
import join from '../../img/join-bear.svg'
import joinMobile from '../../img/join-bear-mob.svg'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setShowAuth} from "../../features/auth/authSlice";

export default function Join() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)

    function toggleModal(link) {
        if (!isAuthenticated) {
            dispatch(setShowAuth(true))
            return
        }
        navigate('/' + link)
    }

    return (
        <>
            <div className="join">
                <div className="join__wrapper">
                    <div className="container">
                        <div className="join__flex">
                            <div className="join__left">
                                <div className="join__title">Присоединяйся  к «Звёздам  будущего»</div>
                                <div className="join__subtitle">
                                    И зажги свою звезду на небосклоне талантов СуперЛайкШоу!
                                </div>
                                <div className="join__btns">
                                    <button onClick={() => toggleModal('account')} className="button-special join__button">
                                        <span className="">Участвовать в конкурсе</span>
                                        <svg
                                            width="320"
                                            height="55"
                                            viewBox="0 0 320 55"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M154.908 1.00516C203.279 0.921354 281.028 0.130691 302.379 6.64852C323.73 13.1663 324.86 38.5267 310.182 47.0927C299.179 53.5127 288.799 54.9793 144.287 54.5958C44.9881 54.333 30.8864 53.2509 14.0693 47.406C-2.74781 41.5612 -6.24645 17.2465 13.2892 9.1567C40.4336 -2.08093 109.262 1.0843 154.908 1.00516Z"
                                            />
                                        </svg>
                                    </button>
                                    <button onClick={() => toggleModal('videos')} className="button-special join__button">
                                        <span className="">Голосовать</span>
                                        <svg
                                            width="320"
                                            height="55"
                                            viewBox="0 0 320 55"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M154.908 1.00516C203.279 0.921354 281.028 0.130691 302.379 6.64852C323.73 13.1663 324.86 38.5267 310.182 47.0927C299.179 53.5127 288.799 54.9793 144.287 54.5958C44.9881 54.333 30.8864 53.2509 14.0693 47.406C-2.74781 41.5612 -6.24645 17.2465 13.2892 9.1567C40.4336 -2.08093 109.262 1.0843 154.908 1.00516Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <p className="join__p">
                                    Нажимая кнопку вы соглашаетесь с <a href="/rules">
                                    Правилами участия в конкурсе</a>
                                </p>
                            </div>
                            <div className="join__img">
                                <picture>
                                    <source srcSet={join} media="(min-width: 550px)"/>

                                    <img src={joinMobile} alt="Описание изображения"/>
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
