import React, {useMemo} from "react";
import videoMp4 from '../img/video.mp4'
import photo from '../img/photo.jpg'
import heart from '../img/heart.svg'
import Plyr from "plyr-react";
export default function RealWinners() {
    const renderVideo = useMemo(() => (
        <Plyr
            poster={photo}
            muted={false}
            options={{
                controls: ['progress', 'play-large', 'play', 'current-time', 'duration', "volume", "mute", 'fullscreen'],
                invertTime: false,
                i18n: {
                    restart: "Restart",
                    rewind: "Rewind {seektime}s",
                    play: "Play",
                    pause: "Pause",
                    fastForward: "Forward {seektime}s",
                    seek: "Seek",
                    seekLabel: "{currentTime} of {duration}",
                    played: "Played",
                    buffered: "Buffered",
                    currentTime: "Current time",
                    duration: "Duration",
                    volume: "Volume",
                    mute: "Mute",
                    unmute: "Unmute",
                    enableCaptions: "Enable captions",
                    disableCaptions: "Disable captions",
                    download: "Download",
                    enterFullscreen: "Enter fullscreen",
                    exitFullscreen: "Exit fullscreen",
                    frameTitle: "Player for {title}",
                    captions: "Captions",
                    settings: "Settings",
                    menuBack: "Go back to previous menu",
                    speed: "Speed",
                    normal: "Normal",
                    quality: "Quality",
                    loop: "Loop"
                }
            }}
            source={{
                type: 'video', title: 'Video', sources: [
                    {
                        src: videoMp4,
                        size: 720
                    }
                ]
            }}/>
    ), [])

    return (
        <div className="real-winners">
            <div className="real-winners__wrapper">
                <div className="container">
                    <div className="real-winners__title">Победители конкурса</div>
                    <div lang="ru" className="real-winners__subtitle">
                        Для получения призов мы свяжемся <br/>с вами по телефону или почте,
                        которую вы указывали при регистрации заявки
                    </div>
                    <ul className="videos-result__list">
                        <li className="videos-result__item">
                            {renderVideo}

                            <div className="real-winners__author">
                                <div className="real-winners__author-icon">
                                    <span>К</span>
                                </div>
                                <div className="real-winners__author-info">
              <span className="real-winners__author-nickname"
              >Светлана Иванова</span
              >
                                    <span className="real-winners__author-city"
                                    >г. <span>Москва</span>, <span>10</span> лет</span
                                    >
                                </div>
                            </div>
                            <div className="videos-result__info up">
                                <div className="videos-result__song-info">
                                    <div className="real-winners__song-img">
                                        <img src={photo} alt="iocn"/>
                                    </div>
                                    <div className="real-winners__song">
                                        <div className="real-winners__song-singer">Марьяна Локель</div>
                                        <div className="real-winners__song-name">Нано краска топ!</div>
                                    </div>
                                </div>

                                <div className="real-winners__likes">
                                    <span><img src={heart} alt="icon"/></span>
                                    <span>1203</span>
                                </div>
                            </div>
                        </li>
                        <li className="videos-result__item">
                            {renderVideo}

                            <div className="real-winners__author">
                                <div className="real-winners__author-icon">
                                    <span>К</span>
                                </div>
                                <div className="real-winners__author-info">
              <span className="real-winners__author-nickname"
              >Светлана Иванова</span
              >
                                    <span className="real-winners__author-city"
                                    >г. <span>Москва</span>, <span>10</span> лет</span
                                    >
                                </div>
                            </div>
                            <div className="videos-result__info up">
                                <div className="videos-result__song-info">
                                    <div className="real-winners__song-img">
                                        <img src={photo} alt="iocn"/>
                                    </div>
                                    <div className="real-winners__song">
                                        <div className="real-winners__song-singer">Марьяна Локель</div>
                                        <div className="real-winners__song-name">Нано краска топ!</div>
                                    </div>
                                </div>

                                <div className="real-winners__likes">
                                    <span><img src={heart} alt="icon"/></span>
                                    <span>1203</span>
                                </div>
                            </div>
                        </li>

                        <li className="videos-result__item">
                            {renderVideo}

                            <div className="real-winners__author">
                                <div className="real-winners__author-icon">
                                    <span>К</span>
                                </div>
                                <div className="real-winners__author-info">
              <span className="real-winners__author-nickname"
              >Светлана Иванова</span
              >
                                    <span className="real-winners__author-city"
                                    >г. <span>Москва</span>, <span>10</span> лет</span
                                    >
                                </div>
                            </div>
                            <div className="videos-result__info up">
                                <div className="videos-result__song-info">
                                    <div className="real-winners__song-img">
                                        <img src={photo} alt="icon"/>
                                    </div>
                                    <div className="real-winners__song">
                                        <div className="real-winners__song-singer">Марьяна Локель</div>
                                        <div className="real-winners__song-name">Нано краска топ!</div>
                                    </div>
                                </div>

                                <div className="real-winners__likes">
                                    <span><img src={heart} alt="icon"/></span>
                                    <span>1203</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}
