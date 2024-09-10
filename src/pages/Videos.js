import React, {useEffect} from "react";
import '../css/styles.css'
import '../css/videos/videos.css'
import Header from "../components/Header/Header.js";
import NotFound from "../components/NotFound/NotFound.js";
import VideosResult from "../components/VideosResult/VideosResult.js";
import Footer from "../components/Footer/Footer.js";
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
            <Footer/>
        </>
    )
}
