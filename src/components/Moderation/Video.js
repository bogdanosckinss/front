import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Plyr from "plyr-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import {UploadFileService} from "../../services/uploadFileService.js";

export default function Video({ video, approved, declined, deleted }) {
  const privateAxios = useAxiosPrivate();
  const ref = useRef()
  const uploadFileService = new UploadFileService();
  const [previewImage, setPreviewImage] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);

    function getVideoImage(path, videoId) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let video;

        function exportFrame(path, videoId) {
            video = document.createElement("video");
            let img = new Image();

            function initCanvas() {
                canvas.width = this.videoWidth;
                canvas.height = this.videoHeight;
            }

            function drawFrame(e) {
                video.pause();
                ctx.drawImage(this, 0, 0);

                canvas.toBlob((blob) => {
                    img.onload = URL.revokeObjectURL(path);
                    img.src = URL.createObjectURL(blob);
                    img.style.visibility = "hidden";

                    uploadFileService.uploadBlob(blob, "images").then((response) => {
                        setPreviewImage(response);
                        privateAxios.post("content/update-video-moderation/status", {
                            allowed: true,
                            videoId: videoId,
                            previewImage: response
                        }).then(() => {
                            if (ref.current) {
                                ref.current.style.display = 'none'
                            }
                            approved()
                        })
                        setUploadingVideo(false);
                    });
                }, "image/jpeg");

                URL.revokeObjectURL(this.src);
            }

            video.addEventListener("loadedmetadata", initCanvas, false);
            video.addEventListener("timeupdate", drawFrame, false);

            video.muted = true;
            video.autoplay = false;
            video.setAttribute("crossOrigin", "anonymous");
            video.src = path;
            video.play().catch(err => {
                setPreviewImage('');
                privateAxios.post("content/update-video-moderation/status", {
                    allowed: true,
                    videoId: videoId,
                    previewImage: ''
                }).then(() => {
                    if (ref.current) {
                        ref.current.style.display = 'none'
                    }
                    approved()
                })
                setUploadingVideo(false);
            })
        }

        exportFrame(path, videoId);
    }

  function acceptVideo(videoId) {
    try {
        setUploadingVideo(true)
        getVideoImage(video?.link, videoId)
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
          declined()
      })
    } catch (e) {
      console.log(e);
    }
  }

    function deleteVideo(videoId) {
        try {
            privateAxios.delete("content/update-video-moderation/delete/" + videoId).then(() => {
                if (ref.current) {
                    ref.current.style.display = 'none'
                }
                deleted()
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
          <div>{uploadingVideo ? 'Обработка ...' : ''}</div>
          <p>ID: {video?.id}</p>
          <img
              src={video?.users?.image}
              style={{width: "100%"}}
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
          <p>Дата и время публикации: {video?.created_at?.replace('T', ' ')?.replace('Z', '')}</p>
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
          <button
              onClick={() => {
                  if (window.confirm('Вы уверенны что хотите удалить это видео с ID ' + video.id + '?')) {
                      deleteVideo(video.id)
                  }
              }}
              style={{
                  display: 'flex',
                  margin: '10px auto',
                  background: "black",
                  color: "white",
                  padding: "8px 13px",
                  borderRadius: "10px",
                  fontSize: "20px",
              }}
          >
              Удалить
          </button>
      </article>
  );
}
