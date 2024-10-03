import heart from "../../img/heart.svg";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Plyr from "plyr-react";

export default function SingleVideo({link, age, city, singer, song, song_icon, likes, name}) {
    const postContainerRef = useRef()
    const infoRef = useRef()
    const [width, setWidth] = useState(window.innerWidth)
    const isInitialRenderRef = useRef(true)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    const renderVideo = useMemo(() => (
    <Plyr
        muted={false}
        options={{
            controls: ['progress', 'play-large', 'play', 'current-time', 'duration', ...[...(width > 768 ? ["volume", "mute"] : [])], 'fullscreen'],
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
                    src: link,
                    size: 720
                }
            ]
        }}/>
), [width])

    function classObserver(targetElement, observableClassName, callback){
        const ref = {prevStateHasClass: targetElement.classList.contains(observableClassName)};
        return new MutationObserver(function(mutations, observer) {
            for(const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const currentStateHasClass = mutation.target.classList.contains(observableClassName);
                    if(ref.prevStateHasClass !== currentStateHasClass){
                        ref.prevStateHasClass = currentStateHasClass;
                        const classAdded = currentStateHasClass;
                        callback.call(classAdded, classAdded, mutation, observer);
                    }
                }
            }
        }).observe(targetElement, { attributes: true });
    };

    useEffect(() => {
        const container = postContainerRef.current.getElementsByTagName('div')[0]
        container.classList.add('plyr--hide-controls')

        classObserver(container, 'plyr--hide-controls', (classAdded, mutation, observer) => {
            if (isInitialRenderRef.current) {
                container.classList.add('plyr--hide-controls')
                infoRef.current.classList.remove('up')
                return
            }

            if (classAdded) {
                infoRef.current.classList.remove('up')
                return
            }

            infoRef.current.classList.add('up')
        })
    }, [])


    useEffect(() => {
        const videoElement = postContainerRef.current.getElementsByTagName('video')[0]
        videoElement.addEventListener('play', () => {
            Array.from(document.body.getElementsByTagName('video')).forEach((element, indx) => {
                if (element != videoElement && !element.paused) {
                    element.pause()
                }

                if (element == videoElement && !element.paused) {
                    isInitialRenderRef.current = false
                }
            })
        })
    }, []);



    return (
        <li ref={postContainerRef} className="videos-result__item">
            {renderVideo}

            <div className="real-winners__author">
                <div className="real-winners__author-icon">
                    {/*<img src={userPhoto} alt="img"/>*/}
                    <span>{name.split('')[0]}</span>
                </div>
                <div className="real-winners__author-info">
              <span className="real-winners__author-nickname"
              >{name}</span
              >
                    <span className="real-winners__author-city"
                    >г. <span>{city}</span>, <span>{age}</span> лет</span
                    >
                </div>
            </div>
            <div ref={infoRef} className="videos-result__info up">
                <div className="videos-result__song-info">
                    <div className="real-winners__song-img">
                        <img src={song_icon} alt="iocn"/>
                    </div>
                    <div className="real-winners__song">
                        <div className="real-winners__song-singer">{singer}</div>
                        <div className="real-winners__song-name">{song}</div>
                    </div>
                </div>

                <div className="real-winners__likes">
                    <span><img src={heart} alt="icon"/></span>
                    <span>{likes}</span>
                </div>
            </div>
        </li>
    )
}
