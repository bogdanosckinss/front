import React from "react";
import '../css/styles.css'
import '../css/videos/videos.css'
import Header from "../components/Header/Header";
import NotFound from "../components/NotFound/NotFound";
import VideosResult from "../components/VideosResult/VideosResult";
import Footer from "../components/Footer/Footer";
import {useSelector} from "react-redux";

export default function Videos() {
    const { searchOptions, query, loading, hideNotFoundNote } = useSelector((state) => state.posts)

    return (
        <>
            <main>
                <Header/>
                { searchOptions.length == 0 && query != '' && !loading && !hideNotFoundNote ? <NotFound/> : '' }
                <VideosResult/>
            </main>
            <Footer />
        </>
    )
}
