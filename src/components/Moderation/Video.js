import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Plyr from "plyr-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

export default function Video({ video }) {
  const privateAxios = useAxiosPrivate();
  const ref = useRef()

  function acceptVideo(videoId) {
    try {
      privateAxios.post("content/update-video-moderation/status", {
        allowed: true,
        videoId: videoId,
      }).then(() => {
          if (ref.current) {
              ref.current.style.display = 'none'
          }
      })
    } catch (e) {
      console.log(e);
    }
  }

  function declineVideo(videoId) {
    try {
      privateAxios.post("content/update-video-moderation/status", {
        allowed: false,
        videoId: videoId,
      }).then(() => {
          if (ref.current) {
              ref.current.style.display = 'none'
          }
      })
    } catch (e) {
      console.log(e);
    }
  }

  const renderVideo = useMemo(
    () => (
      <Plyr
        style={{ height: "440px" }}
        clickToPlay={true}
        options={{
          controls: [
            "progress",
            "play-large",
            "play",
            "current-time",
            "volume",
            "mute",
            "fullscreen",
          ],
        }}
        source={{
          type: "video",
          title: "Video",
          sources: [
            {
              src: video?.link,
              size: 720,
            },
          ],
        }}
      />
    ),
    [video]
  );

  return (
    <article
        ref={ref}
      style={{
        border: "solid #0647C7",
        margin: "10px auto",
        width: "300px",
        padding: "10px 15px",
        borderRadius: "20px",
      }}
    >
      <img
        src={video?.users?.image}
        style={{ width: "100%" }}
        alt="Нету фото"
      />
      <p>Имя: {video?.users?.name + " " + video?.users?.lastname}</p>
      <p>Возраст: {video?.users?.age}</p>
      <p>Номер телефона: {video?.users?.phone_number}</p>
      <p>Адрес электронной почты: {video?.users?.email}</p>
      <p>Город: {video?.users?.city}</p>
      <p>Ссылка на соцсеть: {video?.users?.social_media_link}</p>
      <p>
        Выбранная песня: {video?.song?.author_name + " | " + video?.song?.title}
      </p>
      {renderVideo}
      <button
        onClick={() => acceptVideo(video.id)}
        style={{
          color: "white",
          backgroundColor: "#06C92E",
          padding: "8px 25px",
          borderRadius: "10px",
          fontSize: "20px",
          margin: "10px 10px 0 0",
        }}
      >
        Принять
      </button>
      <button
        onClick={() => declineVideo(video.id)}
        style={{
          background: "crimson",
          color: "white",
          padding: "8px 13px",
          borderRadius: "10px",
          fontSize: "20px",
        }}
      >
        Отклонить
      </button>
    </article>
  );
}
