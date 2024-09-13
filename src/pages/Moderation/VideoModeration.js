import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import debounce from "lodash/debounce.js";
import Video from "../../components/Moderation/Video.js";

export default function VideoModeration() {
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

  function getTotals() {
    privateAxios.get('content/videos-to-moderate/count').then(response => {
      setAcceptedVideosCount(response?.data?.accepted ?? 0)
      setDeclinedVideosCount(response?.data?.declined ?? 0)
      setUnderModerationVideosCount(response?.data?.underModeration ?? 0)
      setTotalVideosCount(response?.data?.total ?? 0)
    })
  }

  function approved() {
    setAcceptedVideosCount(count => count + 1)
    setUnderModerationVideosCount(count => count - 1)
  }

  function declined() {
    setDeclinedVideosCount(count => count + 1)
    setUnderModerationVideosCount(count => count - 1)
  }

  const findMore = useCallback(
    debounce(async () => {
      let response = {};
      try {
        response = await privateAxios.get(
          "content/videos-to-moderate?skip=" + skipVideosCount
        )

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
    [privateAxios, skipVideosCount]
  );

  return (
    <>
      {accessApproved ? (
          <>
            <h1>Общее количество загруженных видео {totalVideosCount}</h1>
            <h2>
              Принятых видео {acceptedVideosCount} | Отклонённых видео {declinedVideosCount} | Под модерацией {underModerationVideosCount}
            </h2>
            <div className="moderation">
              {videos.map((video) => {
                return <Video approved={approved} declined={declined} video={video}/>;
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
