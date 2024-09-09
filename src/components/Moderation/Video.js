import React, {useCallback, useEffect, useMemo, useState} from "react";
import Plyr from "plyr-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

export default function Video({video}) {
    const privateAxios = useAxiosPrivate()

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

    const renderVideo = useMemo(() => (
        <Plyr
            style={{height: '440px'}}
            clickToPlay={true}
            options={{controls: ['progress', 'play-large', 'play', 'current-time', 'volume', 'mute', 'fullscreen']}}
            source={{
                type: 'video', title: 'Video', sources: [
                    {
                        src: video?.link,
                        size: 720
                    }
                ]
            }}/>
    ), [video])

    return (
        <article style={{border: 'solid green', marginBottom: 10}}>
            <p>Username: {video?.users?.name}</p>
            {renderVideo}
            <button onClick={() => acceptVideo(video.id)} style={{background: 'green'}}>Accept</button>
            <button onClick={() => declineVideo(video.id)} style={{background: 'crimson', color: 'white'}}>Decline
            </button>
        </article>
    )
}
