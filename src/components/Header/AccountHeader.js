import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useDispatch} from "react-redux";
import {setIsAuthenticated, setUserInfo} from "../../features/auth/authSlice";

export default function AccountHeader() {
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()

    async function logout(e) {
        e.preventDefault()

        try {
            await privateAxios.delete('/auth/logout')
            localStorage.clear()
            dispatch(setIsAuthenticated(false))
            dispatch(setUserInfo({}))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <header className="header video-header account-header">
            <div className="header__container">
                <div className="header__wrapper">
                    <div className="header__block">
                        <div className="video-header__back">
                            <a href="/">
                                <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.0005 27.0002L13.5005 18.0002L21.0005 9.00024"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>

                        <a role='button' onClick={logout} style={{cursor: 'pointer'}} className="header__button-block">
                            <span>Выйти</span>
                            <svg
                                width="91"
                                height="44"
                                viewBox="0 0 91 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M44.052 0.28748C57.8075 0.219193 79.9174 -0.425051 85.989 4.88577C92.0606 10.1966 92.3821 30.8606 88.2079 37.8403C85.079 43.0714 82.1271 44.2664 41.0316 43.9539C12.7935 43.7398 8.78331 42.8581 4.00095 38.0956C-0.781407 33.3331 -1.77633 13.5212 3.77912 6.92948C11.4983 -2.22711 31.0715 0.351962 44.052 0.28748Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>

    )
}
