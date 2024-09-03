import React from "react";
import logo from '../../img/logo-main.svg'
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthenticated, setShowAuth, setUserInfo} from "../../features/auth/authSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function MainHeader() {
    const dispatch = useDispatch()
    const privateAxios = useAxiosPrivate()
    const { isAuthenticated } = useSelector((state) => state.auth)

    async function toggleAuth(e) {
        e.preventDefault()

        if (!isAuthenticated) {
            dispatch(setShowAuth(true))
            return
        }

        try {
            await privateAxios.delete('/auth/logout')
            localStorage.clear()
            dispatch(setIsAuthenticated(false))
            dispatch(setUserInfo({}))
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <header className="header">
                <div className="header__container">
                    <div className="header__wrapper">
                        <div className="header__block">
                            <div className="header__logo">
                                <a href="/">
                                    <img src={logo} alt="logo"/>
                                </a>
                            </div>
                            <nav className="header__nav">
                                <ul className="header__list">
                                    <li><a href="">Правила конкурса</a></li>
                                    <li><a href="">Призы</a></li>
                                    <li><a href="">Как проголосовать</a></li>
                                </ul>
                                <button
                                    onClick={toggleAuth}
                                    className="header__button-block header__button-real js-header__button-block"
                                >
                                    <span>{isAuthenticated ? 'Выйти' : 'Войти'}</span>
                                    <svg
                                        width="91"
                                        height="44"
                                        viewBox="0 0 91 44"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M44.052 0.28748C57.8075 0.219193 79.9174 -0.425051 85.989 4.88577C92.0606 10.1966 92.3821 30.8606 88.2079 37.8403C85.079 43.0714 82.1271 44.2664 41.0316 43.9539C12.7935 43.7398 8.78331 42.8581 4.00095 38.0956C-0.781407 33.3331 -1.77633 13.5212 3.77912 6.92948C11.4983 -2.22711 31.0715 0.351962 44.052 0.28748Z"
                                            fill="white"
                                            fillOpacity="0.3"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="header__mobile mobile__menu">
                <a id="mobile_menu_toggle" href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div className="top__hamburger">
                <div className="top__hamburger-cover">
                    <div className="top__hamburger-logo">
                        <a href="./">
                            <img src={logo} alt="logo"/>
                        </a>
                    </div>
                    <ul>
                        <li>
                            <a href="#">Правила конкурса</a>
                        </li>

                        <li>
                            <a href="#">Как проголосовать</a>
                        </li>
                        <li>
                            <a href="#"> Призы</a>
                        </li>
                    </ul>
                    <button
                        className="button-special join__button header-hamb-btn js-header__button-block-mob"
                    >
                        <span className="">{isAuthenticated ? 'Выйти' : 'Войти'}</span>
                        <svg
                            width="188"
                            height="45"
                            viewBox="0 0 188 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M91.0085 0.78748C119.426 0.719193 165.104 0.0749492 177.648 5.38577C190.191 10.6966 190.855 31.3606 182.232 38.3403C175.768 43.5714 169.669 44.7664 84.7685 44.4539C26.4305 44.2398 18.1457 43.3581 8.2657 38.5956C-1.61434 33.8331 -3.66979 14.0212 7.80742 7.42948C23.7547 -1.72711 64.1916 0.851962 91.0085 0.78748Z"
                                fill="white"
                                fillOpacity="0.3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

        </>
    )
}
