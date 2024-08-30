import React from "react";
import '../../css/footer.css'
import footerLogo from '../../img/footer_logo.svg'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__container">
                    <div className="footer__block">
                        <div className="footer__s">
                            <div className="footer__left">
                                <div className="footer__logo">
                                    <a href="">
                                        <img src={footerLogo} alt="logo"/>
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
                                <div className="footer__date">1 октября 2024 года</div>
                                <div className="footer__apply">Объявление результатов</div>
                            </div>
                        </div>

                        <div className="footer__botton">
                            <div className="footer__polits">
                                <div className="footer__polit">
                                    <a href="">Политика конфиденциальности</a>
                                </div>
                                <div className="footer__polit">
                                    <a href="">Правила участия в конкурсе</a>
                                </div>
                            </div>

                            <p className="footer__botton-p">© KIDS PROJECT, 2024</p>
                            <p>Все права защищены</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
