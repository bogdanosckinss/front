import {useDispatch, useSelector} from "react-redux";
import TopDownVideo from "./TopDownVideo.js";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {setPosts} from "../../features/posts/postsSlice.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import {InView} from "react-intersection-observer";

export default function VideoMain() {
    const [skipVideosCount, setSkipVideosCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [videos, setVideos] = useState([])
    const [userInteracts, setUserInteracts] = useState(true)
    const dispatch = useDispatch()
    const privateAxios = useAxiosPrivate()
    const { posts, query } = useSelector((state) => state.posts)

    useEffect(() => {
        const id = searchParams.get('video')
        const videoIndex = posts.findIndex(video => video.id == id)
        setVideos(posts) // .filter((video, index) => index >= videoIndex)
        setSkipVideosCount(posts.length)
    }, [posts])

    useEffect(() => {
        document.body.addEventListener("mousemove", function () {
            if (!userInteracts) {
                setUserInteracts(true)
            }
        })
    }, [])

    function findMoreAsync() {
        const composedQuery = searchParams.get('query') ?? query
        const amountToSkipFromParams = parseInt(searchParams.get('skip')) ?? 0
        const amountToSkip = amountToSkipFromParams > posts.length ? amountToSkipFromParams + posts.length : posts.length
        privateAxios
            .get('content/search/videos?query=' + composedQuery + '&skip=' + amountToSkip)
            .then(response => {
                if (response.data.length == 0) {
                    return
                }

                const allVideos = [...posts, ...response.data]
                dispatch(setPosts(allVideos))
                setSkipVideosCount(allVideos.length)
                setSearchParams({skip: allVideos.length})
            })
            .catch(error => {
                console.log(error)
            })
    }

    function isLastLine(key) {
        return key == posts.length - 1
    }

    return (
        <div className="video-main">
            <div className="video-main__wrapper">
                <div className="video-main__container">
                    <div className="video-main__block">
                        <ul className="video-main__list">
                            {
                                videos.map((video, key) => {
                                    return(
                                        <InView onChange={(inView, entry) => {
                                            console.log(video.id)
                                            if (isLastLine(key) && inView) {
                                                findMoreAsync()
                                            }
                                        }} threshold={0.4} triggerOnce={true} key={video.id + 'view'}>
                                            {({ref, inView}) => {
                                                return(
                                                    <TopDownVideo
                                                        postRef={ref}
                                                        key={video.id + '-topdown'}
                                                        video={video}
                                                        userInteracts={userInteracts}
                                                        isLastLine={isLastLine}
                                                        findMoreAsync={findMoreAsync}
                                                        inView={inView}
                                                    />
                                                )
                                            }}
                                        </InView>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
