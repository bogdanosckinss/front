import React, {useEffect, useState} from "react";
import AccountHeader from "../components/Header/AccountHeader.js";
import AccountInfo from "../components/AccountInfo/AccountInfo.js";
import footerLogo from '../img/footer_logo.svg'
import footerLogoMobile from '../img/footer_logo-mob.svg'

export default function Account() {
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('videos-body')
        document.body.classList.add('body-account')

        const appRoot = document.querySelector('html')
        appRoot.setAttribute('notranslate', true)
    }, [])

    function setNotInitialLoading() {
        setInitialLoading(false)
    }

    return (
        <>
            <div className="loader-popup" style={initialLoading ? {display: 'block'} : {display: 'none'}}>
                <div className="loader-popup__loading loader"></div>
            </div>
            <div className="account-wrapper100vh">
                <main className="account-main videos-main-block-cover">
                    <AccountHeader/>
                    <AccountInfo setNotInitialLoading={setNotInitialLoading} />
                </main>
                <footer className="footer footer-account-page">
                    <div className="footer__wrapper">
                        <div className="footer__container">
                            <div className="footer__block">
                                <div className="footer__s">
                                    <div className="footer__left">
                                        <div className="footer__logo">
                                            <a href="/">
                                                <picture>
                                                    <source
                                                        srcSet={footerLogo}
                                                        media="(min-width: 550px)"
                                                    />

                                                    <img
                                                        src={footerLogoMobile}
                                                        alt="Описание изображения"
                                                    />
                                                </picture>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="footer__temp">
                                        <div className="footer__start">
                                            <div className="footer__date">9 - 29 сентября 2024 года</div>
                                            <div className="footer__apply">Приём заявок</div>
                                        </div>
                                    </div>
                                    <div className="footer__end">
                                        <div className="footer__date">3 октября 2024 года</div>
                                        <div className="footer__apply">Объявление результатов</div>
                                    </div>
                                </div>

                                <div className="footer__botton">
                                    <div className="footer__polits">
                                        <div className="footer__polit">
                                            <a target="_blank" href="https://www.detmir.ru/privacy_policy/"
                                            >Политика конфиденциальности</a
                                            >
                                        </div>
                                        <div className="footer__polit">
                                            <a target="_blank" href="https://bonus.detmir.ru/pdn_lk"
                                            >Политика обработки персональных данных
                                            </a>
                                        </div>
                                        <div className="footer__polit">
                                            <a target="_blank" href="/rules">Правила участия в конкурсе</a>
                                        </div>
                                    </div>

                                    <p className="footer__botton-p">© KIDS PROJECT, 2024</p>
                                    <p className="footer__botton-rights">Все права защищены</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
