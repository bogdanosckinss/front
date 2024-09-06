import {useDispatch, useSelector} from "react-redux";
import TopDownVideo from "./TopDownVideo";
import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import debounce from "lodash/debounce";
import {setPosts} from "../../features/posts/postsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function VideoMain() {
    const [skipVideosCount, setSkipVideosCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [videos, setVideos] = useState([])
    const [userInteracts, setUserInteracts] = useState(true)
    const dispatch = useDispatch()
    const [noMoreVideosFound, setNoMoreVideosFound] = useState(false)
    const privateAxios = useAxiosPrivate()
    const { posts, query } = useSelector((state) => state.posts)

    useEffect(() => {
        const id = searchParams.get('video')
        const videoIndex = posts.findIndex(video => video.id == id)
        setVideos(posts.filter((video, index) => index >= videoIndex))
    }, [posts]);

    useEffect(() => {
        document.body.addEventListener("mousemove", function () {
            if (!userInteracts) {
                setUserInteracts(true)
            }
        })
    }, []);

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
                // setSearchParams({skip: allVideos.length})
            } catch (err) {
                console.log(err)
            }
        }, 1000),
        [privateAxios, dispatch, skipVideosCount]
    )

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
                                        <TopDownVideo key={key} video={video} userInteracts={userInteracts} isLastLine={isLastLine} findMoreAsync={findMoreAsync} />
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
