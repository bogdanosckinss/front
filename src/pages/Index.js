import React, {useEffect} from "react";
import '../css/login.css'
import '../css/styles.css'
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
