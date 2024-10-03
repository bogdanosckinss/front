import React, { useRef } from "react";
import logo from "../../img/logo-main.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsAuthenticated,
    setShowAuth,
    setUserInfo,
} from "../../features/auth/authSlice.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

export default function ResultsHeader() {
    const dispatch = useDispatch()
    const privateAxios = useAxiosPrivate()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const mobhead = useRef()
    const burger = useRef()

    function toggleMob(e) {
        e.preventDefault();

        if (document.getElementById("login-bg").style.display == "none") {
            document.getElementById("login-bg").style.display = "block";
        } else {
            document.getElementById("login-bg").style.display = "none";
        }
        document.querySelector("#mobile_menu_toggle").classList.toggle("active");
        document.querySelector(".mobile__menu").classList.toggle("active");
        document.querySelector(".js-login-bg").classList.toggle("active");

        document.querySelector(".top__hamburger").classList.toggle("active");
        document.body.classList.toggle("hidden");
    }

    async function toggleAuth(e, isMobile) {
        e.preventDefault();

        if (!isAuthenticated) {
            if (isMobile) {
                toggleMob(e);
            }
            dispatch(setShowAuth(true));
            return;
        }

        try {
            await privateAxios.delete("/auth/logout");
            localStorage.clear();
            dispatch(setIsAuthenticated(false));
            dispatch(setUserInfo({}));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <header className="header">
                <div className="header__container">
                    <div className="header__wrapper">
                        <div className="header__block">
                            <div className="header__logo">
                                <a href="/">
                                    <img src={logo} alt="logo" />
                                </a>
                            </div>
                            <nav className="header__nav">
                                <ul className="header__list">
                                    <li>
                                        <a href="#rules">Правила конкурса</a>
                                    </li>
                                    <li>
                                        <a href="#prizes">Призы</a>
                                    </li>
                                    <li>
                                        <a href="#voting">Вопросы и ответы</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div ref={mobhead} className="header__mobile mobile__menu">
                <a onClick={toggleMob} id="mobile_menu_toggle" href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div ref={burger} className="top__hamburger">
                <div className="top__hamburger-cover">
                    <div className="top__hamburger-logo">
                        <a href="./">
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                    <ul>
                        <li>
                            <a href="#rules">Правила конкурса</a>
                        </li>

                        <li>
                            <a href="#voting">Вопросы и ответы</a>
                        </li>
                        <li>
                            <a href="#prizes"> Призы</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
