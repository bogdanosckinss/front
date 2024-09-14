import VideoHeader from "../components/Header/VideoHeader.js";
import VideoMain from "../components/Content/VideoMain.js";
import '../css/styles.css'
import '../css/videos/videos.css'
import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {useDispatch} from "react-redux";
import {setPosts} from "../features/posts/postsSlice.js";
import {useParams, useSearchParams} from "react-router-dom";

export default function TopDownVideos() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [initialLoading, setInitialLoading] = useState(true)
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()

    async function getContent(event) {
        const query = searchParams.get('query')
        const skip = searchParams.get('skip') ?? 0
        const videoIdFromUrl = searchParams.get('video') ?? 0
        const videoId = params.id
        let requestUrl = 'content/search/videos?query=' + query + '&skip=' + skip + '&video=' + videoIdFromUrl

        if (videoId) {
            requestUrl = 'content/video/' + videoId
        }

        if (event) {
            event.preventDefault()
        }

        let response = {}
        try {
            response = await privateAxios.get(requestUrl)
        } catch (err) {
            console.log(err)
        }

        dispatch(setPosts(response.data))
    }

    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('video-body')
        dispatch(setPosts([]))
        async function fetchPosts() {
            await getContent()
            setInitialLoading(false)
        }

        fetchPosts()
    }, [])

    return(
        <>
            <div className="loader-popup" style={initialLoading ? {display: 'block'} : {display: 'none'}}>
                <div className="loader-popup__loading loader"></div>
            </div>
            <div>
                <main>
                    <VideoHeader/>
                    <VideoMain/>
                </main>
            </div>
        </>
    )
}
