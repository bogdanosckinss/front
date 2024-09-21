import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import debounce from "lodash/debounce.js";
import Video from "../../components/Moderation/Video.js";

export default function AcceptedVideos() {
    const privateAxios = useAxiosPrivate();
    const [videos, setVideos] = useState([]);
    const [noMoreVideosFound, setNoMoreVideosFound] = useState(false);
    const [skipVideosCount, setSkipVideosCount] = useState(0);
    const [password, setPassword] = useState("");
    const [accessApproved, setAccessApproved] = useState(false);
    const [acceptedVideosCount, setAcceptedVideosCount] = useState(0);
    const [declinedVideosCount, setDeclinedVideosCount] = useState(0);
    const [underModerationVideosCount, setUnderModerationVideosCount] = useState(0);
    const [totalVideosCount, setTotalVideosCount] = useState(0);

    useEffect(() => {
        const key = localStorage.getItem('md_key')

        if (key && key == process.env.REACT_APP_SECRET_PASSWORD) {
            setAccessApproved(true)
        }
    }, []);

    useEffect(() => {
        if (accessApproved) {
            getTotals()
            findMore()
        }
    }, [accessApproved]);

    const findMore = useCallback(
        debounce(async () => {
            let response = {};
            try {
                response = await privateAxios.get(
                    "content/videos-to-moderate/approved?skip=" + videos.length
                );

                const allVideos = [...videos, ...response.data];
                setVideos(allVideos);
                setSkipVideosCount(allVideos.length);

                if (response.data.length == 0) {
                    setNoMoreVideosFound(true);
                    return
                }
            } catch (err) {
                console.log(err);
            }
        }, 1000),
        [privateAxios, videos]
    );

    function getTotals() {
        privateAxios.get('content/videos-to-moderate/count').then(response => {
            setAcceptedVideosCount(response?.data?.accepted ?? 0)
            setDeclinedVideosCount(response?.data?.declined ?? 0)
            setUnderModerationVideosCount(response?.data?.underModeration ?? 0)
            setTotalVideosCount(response?.data?.total ?? 0)
        })
    }

    function approved() {
    }

    function declined() {
        setDeclinedVideosCount(count => count + 1)
        setAcceptedVideosCount(count => count - 1)
    }

    function deleted() {
        setAcceptedVideosCount(count => count - 1)
    }

    return (
        <>
            {accessApproved ? (
                <>
                    <nav>
                        <h1 style={{textAlign: 'center', textTransform: 'uppercase'}}>Список принятых видео</h1>
                        <ul style={{display: 'flex', gap: '10px'}}>
                            <li style={{
                                background: 'green',
                                color: 'white',
                                padding: '4px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                <a href='/video-moderation/accepted'>Принятые ({acceptedVideosCount})</a>
                            </li>
                            <li style={{
                                background: 'orange',
                                color: 'white',
                                padding: '4px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                <a href='/video-moderation'>Под модерацией ({underModerationVideosCount})</a>
                            </li>
                            <li style={{
                                background: 'red',
                                color: 'white',
                                padding: '4px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                <a href='/video-moderation/declined'>Отклонённые ({declinedVideosCount})</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="moderation">
                        {videos.map((video) => {
                            return <Video approved={approved} declined={declined} deleted={deleted} video={video}/>;
                        })}

                        <button
                            style={{
                                border: "2px solid blueviolet",
                                borderRadius: "10px",
                                display: "block",
                                margin: "10px auto",
                                fontSize: "28px",
                            }}
                            onClick={findMore}
                        >
                            Загрузить ещё видео
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <label>Пароль</label>
                    <input
                        style={{border: "solid black"}}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (password == process.env.REACT_APP_SECRET_PASSWORD) {
                                localStorage.setItem('md_key', password)
                                setAccessApproved(true)
                            }
                        }}
                    >
                        Войти
                    </button>
                </div>
            )}
        </>
    );
}
