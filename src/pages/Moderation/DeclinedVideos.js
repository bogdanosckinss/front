import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import debounce from "lodash/debounce.js";
import Video from "../../components/Moderation/Video.js";

export default function DeclinedVideos() {
    const privateAxios = useAxiosPrivate();
    const [videos, setVideos] = useState([]);
    const [noMoreVideosFound, setNoMoreVideosFound] = useState(false);
    const [skipVideosCount, setSkipVideosCount] = useState(0);
    const [password, setPassword] = useState("");
    const [accessApproved, setAccessApproved] = useState(false);

    useEffect(() => {
        const key = localStorage.getItem('md_key')

        if (key && key == process.env.REACT_APP_SECRET_PASSWORD) {
            setAccessApproved(true)
        }
    }, []);

    useEffect(() => {
        if (accessApproved) {
            findMore();
        }
    }, [accessApproved]);

    const findMore = useCallback(
        debounce(async () => {
            let response = {};
            try {
                response = await privateAxios.get(
                    "content/videos-to-moderate/declined?skip=" + videos.length
                );

                const allVideos = [...videos, ...response.data];
                setVideos(allVideos);
                setSkipVideosCount(allVideos.length);

                if (response.data.length == 0) {
                    setNoMoreVideosFound(true);
                    return;
                }
            } catch (err) {
                console.log(err);
            }
        }, 1000),
        [privateAxios, videos]
    );

    function approved() {

    }

    return (
        <>
            {accessApproved ? (
                <div className="moderation">
                    {videos.map((video) => {
                        return <Video approved={approved} declined={approved} video={video} />;
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
            ) : (
                <div>
                    <label>Пароль</label>
                    <input
                        style={{ border: "solid black" }}
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
