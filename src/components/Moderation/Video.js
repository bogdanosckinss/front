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
        <article style={{border: 'solid green', marginBottom: 10, width: '277px'}}>
            <img src={video?.users?.image} alt='Нету фото' />
            <p>Имя: {video?.users?.name + ' ' + video?.users?.name}</p>
            <p>Возраст: {video?.users?.age}</p>
            <p>Номер телефона: {video?.users?.phone_number}</p>
            <p>Адрес электронной почты: {video?.users?.email}</p>
            <p>Город: {video?.users?.city}</p>
            <p>Ссылка на соцсеть: {video?.users?.social_media_link}</p>
            <p>Выбранная песня: {video?.song?.author_name + ' | ' + video?.song?.title}</p>
            {renderVideo}
            <button onClick={() => acceptVideo(video.id)} style={{background: 'green', color: 'white'}}>Принять</button>
            <button onClick={() => declineVideo(video.id)} style={{background: 'crimson', color: 'white'}}>Отклонить
            </button>
        </article>
    )
}
