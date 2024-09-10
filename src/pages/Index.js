import React, {useEffect} from "react";
import '../css/login.css'
import '../css/styles.css'
import smallPrize from '../img/prizes-small-1.svg'
import smallPrize2 from '../img/prizes-small-2.svg'
import MainHeader from "../components/Header/MainHeader.js";
import Hero from "./Index/Hero.js";
import Rules from "./Index/Rules.js";
import Songs from "./Index/Songs.js";
import Winners from "./Index/Winners.js";
import FAQ from "./Index/FAQ.js";
import Join from "./Index/Join.js";
import Login from "./Index/Login.js";
import Footer from "../components/Footer/Footer.js";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
export default function Index() {
    const { loading, isAuthenticated } = useSelector((state) => state.auth)
    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('body-main')

        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const targetPosition =
                        targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - window.innerHeight / 3.5;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            });
        });
    }, [])

    return(
        <>
            <div className="loader-popup" style={loading ? {display: 'block'} : {display: 'none'}}>
                <div className="loader-popup__loading loader"></div>
            </div>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/accordion-js@3.3.4/dist/accordion.min.css"
                />
            </Helmet>
            <MainHeader/>

            <main>
                <Hero/>
                <div className="prizes">
                    <div className="container">
                        <div id="prizes" className="prizes__title">
                            Призы победителей конкурса
                        </div>
                        <div className="prizes__flex">
                            <div className="prizes__right-block">
                                <div className="prizes__right-img">
                                    <img src={smallPrize} alt=""/>
                                </div>
                                <div className="prizes__left-text">
                                    <div className="prizes__subtitle">
                                        Выступление на премии «СуперЛайкШоу-2024»
                                    </div>
                                    <p>
                                        Победители исполнят трек детского мира и выступят
                                        с ним на розовой дорожке Музыкальной Премии СТС Kids х Kids
                                        Project
                                    </p>
                                </div>
                            </div>
                            <div className="prizes__right-block">
                                <div className="prizes__right-img">
                                    <img src={smallPrize2} alt=""/>
                                </div>
                                <div className="prizes__left-text">
                                    <div className="prizes__subtitle">Подарочный сертификат</div>
                                    <p>
                                        Каждый победитель получит подарочный сертификат на запись
                                        своей песни в профессиональной студии звукозаписи
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Rules/>
                <Songs/>
                <Winners/>
                <FAQ/>
                <Join/>
                <Login/>
            </main>

            <Footer/>
        </>
    )
}
