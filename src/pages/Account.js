import React, {useEffect} from "react";
import AccountHeader from "../components/Header/AccountHeader";
import AccountInfo from "../components/AccountInfo/AccountInfo";
import Footer from "../components/Footer/Footer";

export default function Account() {
    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('videos-body')

        const appRoot = document.querySelector('html')
        appRoot.setAttribute('notranslate', true)
    }, [])

    return (
        <>
            <main className="videos-main-block-cover">
                <AccountHeader/>
                <AccountInfo/>
            </main>
            <Footer />
        </>
    )
}
