import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../Content/Post";
import {setPosts} from "../../features/posts/postsSlice";
import {useSearchParams} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import debounce from "lodash/debounce";

export default function VideosResult() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [skipVideosCount, setSkipVideosCount] = useState(0)
    const [noMoreVideosFound, setNoMoreVideosFound] = useState(false)
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
        } catch (err) {
            console.log(err)
        }

        dispatch(setPosts(response.data))
    }

    function findMoreAsync() {
        findMore(searchParams.get('query') ?? query)
    }

    const findMore = useCallback(
        debounce(async (query) => {
            let response = {}
            try {
                response = await privateAxios.get('content/search/videos?query=' + query + '&skip=' + skipVideosCount)

                const allVideos = [...posts, ...response.data]
                dispatch(setPosts(allVideos))
                setSkipVideosCount(allVideos.length)

                if (response.data.length == 0) {
                    setNoMoreVideosFound(true)
                    return
                }
                setSearchParams({skip: allVideos.length})
            } catch (err) {
                console.log(err)
            }
        }, 1000),
        [privateAxios, dispatch, skipVideosCount]
    )

    useEffect(() => {
        document.body.classList.add('videos-body')
        dispatch(setPosts([]))
        async function fetchPosts() {
            await getContent()
        }

        fetchPosts()
    }, [])

    return (
        <div className="videos-result">
            <div className="videos-result__wrapper">
                <div className="videos-result__container">
                    <ul className="videos-result__list">
                        {
                            posts?.map(post => {
                                return (
                                    <Post post={post} />
                                )
                            })
                        }

                        { !noMoreVideosFound ? <button onClick={findMoreAsync}>LOAD MORE</button> : 'No more videos found' }
                    </ul>
                </div>
            </div>
        </div>

    )
}
