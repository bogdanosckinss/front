import React, {useEffect} from "react";
import '../css/login.css'
import '../css/styles.css'
import smallPrize from '../img/prizes-small-1.svg'
import smallPrize2 from '../img/prizes-small-2.svg'
import MainHeader from "../components/Header/MainHeader";
import Hero from "./Index/Hero";
import Rules from "./Index/Rules";
import Songs from "./Index/Songs";
import Winners from "./Index/Winners";
import FAQ from "./Index/FAQ";
import Join from "./Index/Join";
import Login from "./Index/Login";
import Footer from "../components/Footer/Footer";
import {Helmet} from "react-helmet";
export default function Index() {
    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('body-main')
    }, [])

    return(
        <>
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
                                        Вытупление на премии «СуперЛайкШоу-2024»
                                    </div>
                                    <p>
                                        Победители исполнят трек детского мира и выступят
                                        с ним на розовой дорожке Музыкальной Премии СТС Kids х Kids
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
                                        Каждый победитель получит подарочный сертификат на запись
                                        своей песни в профессиональной студии звукозаписи
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
            <script src="https://unpkg.com/accordion-js@3.3.4/dist/accordion.min.js"></script>
        </>
    )
}
