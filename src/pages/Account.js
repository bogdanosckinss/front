import React, {useEffect} from "react";
import AccountHeader from "../components/Header/AccountHeader";
import AccountInfo from "../components/AccountInfo/AccountInfo";

export default function Account() {
    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('videos-body')
    }, [])

    return (
        <main className="videos-main-block-cover">
            <AccountHeader />
            <AccountInfo />
        </main>
    )
}
