import React, {useCallback, useEffect, useMemo, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import debounce from "lodash/debounce.js";
import Plyr from "plyr-react";
import Video from "../../components/Moderation/Video.js";

export default function VideoModeration() {
    const privateAxios = useAxiosPrivate()
    const [videos, setVideos] = useState([])
    const [noMoreVideosFound, setNoMoreVideosFound] = useState(false)
    const [skipVideosCount, setSkipVideosCount] = useState(0)
    const [password, setPassword] = useState('')
    const [accessApproved, setAccessApproved] = useState(false)

    useEffect(() => {
        if (accessApproved) {
            findMore()
        }
    }, [accessApproved])

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

    return(
        <>
            {accessApproved ? <div className='moderation'>
                    {videos.map(video => {
                        return (
                            <Video video={video}/>
                        )
                    })}

                    <button style={{border: 'solid', borderRadius: '10px'}} onClick={findMore}>Загрузить ещё видео</button>
                </div> :
                <div>
                    <label>Пароль</label>
                    <input style={{border: 'solid black'}} type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={() => {
                        if (password == process.env.REACT_APP_SECRET_PASSWORD) {
                            setAccessApproved(true)
                        }
                    }}>Войти
                    </button>
                </div>}
        </>
    )
}
