import {useSelector} from "react-redux";
import TopDownVideo from "./TopDownVideo";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function VideoMain() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [videos, setVideos] = useState([])
    const { posts } = useSelector((state) => state.posts)

    useEffect(() => {
        const id = searchParams.get('video')
        const videoIndex = posts.findIndex(video => video.id == id)
        setVideos(posts.filter((video, index) => index >= videoIndex))
    }, [posts]);

    return (
        <div className="video-main">
            <div className="video-main__wrapper">
                <div className="video-main__container">
                    <div className="video-main__block">
                        <ul className="video-main__list">
                            {
                                videos.map((video, key) => {
                                    return(
                                        <TopDownVideo key={key} video={video} />
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
