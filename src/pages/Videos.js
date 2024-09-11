import React, {useEffect} from "react";
import '../css/styles.css'
import '../css/videos/videos.css'
import footerLogo from '../img/footer_logo.svg'
import footerLogoMob from '../img/footer_logo-mob.svg'
import footerLogoSupport from '../img/footer-support.svg'
import Header from "../components/Header/Header.js";
import NotFound from "../components/NotFound/NotFound.js";
import VideosResult from "../components/VideosResult/VideosResult.js";
import {useSelector} from "react-redux";

export default function Videos() {
    const { searchOptions, query, loading, hideNotFoundNote } = useSelector((state) => state.posts)

    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('videos-body')
    }, []);

    return (
        <>
            <main className="videos-main-block-cover">
                <Header/>
                <div className='videos-cover-main'>
                    {searchOptions.length == 0 && query != '' && !loading && !hideNotFoundNote ?
                        <NotFound query={query}/> : ''}
                    <VideosResult/>
                </div>
            </main>
            <footer className="footer footer-videos">
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
                                                    media="(min-width: 551px)"
                                                />

                                                <img
                                                    src={footerLogoMob}
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
                                    <div className="footer-support footer-support-web">
                                        <a target="_blank" href="https://t.me/kidsprojecttop">
                                            <div className="footer-support__icon">
                                                <img src={footerLogoSupport} alt="" />
                                            </div>
                                            <div className="footer-support__text">Служба поддержки</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="footer__end">
                                    <div className="footer__date">3 октября 2024 года</div>
                                    <div className="footer__apply">Объявление результатов</div>
                                </div>
                                <div className="footer-support footer-support-mob">
                                    <a target="_blank" href="https://t.me/kidsprojecttop">
                                        <div className="footer-support__icon">
                                            <img src={footerLogoSupport} alt=""/>
                                        </div>
                                        <div className="footer-support__text">Служба поддержки</div>
                                    </a>
                                </div>
                            </div>

                            <div className="footer__botton">
                                <div className="footer__polits">
                                    <div className="footer__polit">
                                        <a
                                            target="_blank"
                                            href="https://www.detmir.ru/privacy_policy/"
                                        >Политика конфиденциальности</a
                                        >
                                    </div>
                                    <div className="footer__polit">
                                        <a target="_blank" href="https://bonus.detmir.ru/pdn_lk"
                                        >Политика обработки персональных данных
                                        </a>
                                    </div>
                                    <div className="footer__polit">
                                        <a target="_blank" href="/rules"
                                        >Правила участия в конкурсе</a
                                        >
                                    </div>
                                </div>

                                <p className="footer__botton-p">© KIDS PROJECT, 2024</p>
                                <p className="footer__botton-rights">Все права защищены</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
