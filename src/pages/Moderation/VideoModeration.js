import React, {useCallback, useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import debounce from "lodash/debounce";

export default function VideoModeration() {
    const privateAxios = useAxiosPrivate()
    const [videos, setVideos] = useState([])
    const [noMoreVideosFound, setNoMoreVideosFound] = useState(false)
    const [skipVideosCount, setSkipVideosCount] = useState(0)

    useEffect(() => {
        findMore()
    }, [])

    const findMore = useCallback(
        debounce(async () => {
            let response = {}
            try {
                response = await privateAxios.get('content/videos-to-moderate?skip=' + skipVideosCount)

                const allVideos = [...videos, ...response.data]
                setVideos(allVideos)
                setSkipVideosCount(allVideos.length)

                if (response.data.length == 0) {
                    setNoMoreVideosFound(true)
                    return
                }
            } catch (err) {
                console.log(err)
            }
        }, 1000),
        [privateAxios, skipVideosCount]
    )

    function acceptVideo(videoId) {
        try {
            privateAxios.post('content/update-video-moderation/status', {
                allowed: true,
                videoId: videoId
            })
        } catch (e) {
            console.log(e)
        }
    }

    function declineVideo(videoId) {
        try {
            privateAxios.post('content/update-video-moderation/status', {
                allowed: false,
                videoId: videoId
            })
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div>
            {videos.map(video => {
                return(
                    <article style={{border: 'solid green', marginBottom: 10}}>
                        <p>Username: {video?.users?.name}</p>
                        {video?.link ? <video src={video?.link} style={{width: 200}}></video> : ''}
                        <button onClick={() => acceptVideo(video.id)} style={{background: 'green'}}>Accept</button>
                        <button onClick={() => declineVideo(video.id)} style={{background: 'crimson', color: 'white'}}>Decline</button>
                    </article>
                )
            })}

            <button onClick={findMore}>Load more</button>
        </div>
    )
}
