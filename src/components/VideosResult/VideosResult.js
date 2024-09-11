import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../Content/Post.js";
import {setPosts} from "../../features/posts/postsSlice.js";
import {useSearchParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import {InView} from "react-intersection-observer";

export default function VideosResult() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [skipVideosCount, setSkipVideosCount] = useState(0)
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()
    const { posts, query } = useSelector((state) => state.posts)

    async function getContent(event) {
        if (event) {
            event.preventDefault()
        }

        let response = {}
        try {
            const query = searchParams.get('query') ?? ''
            response = await privateAxios.get('content/search/videos?query=' + query)
            setSkipVideosCount(response.data.length)
            dispatch(setPosts(response.data))
        } catch (err) {
            console.log(err)
        }
    }

    function findMoreAsync() {
        const composedQuery = searchParams.get('query') ?? query
        const toSkip = posts.length
        privateAxios
            .get('content/search/videos?query=' + composedQuery + '&skip=' + toSkip)
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

    useEffect(() => {
        dispatch(setPosts([]))
        async function fetchPosts() {
            await getContent()
        }

        fetchPosts()
    }, [])

    function isLastLine(key) {
        return key == posts.length - 1
    }

    return (
        <div className="videos-result">
            <div className="videos-result__wrapper">
                <div className="videos-result__container">
                    <ul id='videos-result__list' className="videos-result__list">
                        {
                            posts?.map((post, key) => {
                                return (
                                    <InView onChange={(inView, entry) => {
                                        if (isLastLine(key) && inView) {
                                            findMoreAsync()
                                        }
                                    }} threshold={1} triggerOnce={true} key={post.id + 'view'}>
                                        {({ref}) => {
                                            return(
                                                <Post
                                                    postRef={ref}
                                                    key={post.id + '-main'}
                                                    post={post}
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

    )
}
