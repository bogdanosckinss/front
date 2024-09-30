import photo from "../../img/photo.jpg";
import heart from "../../img/heart.svg";
import React, {useEffect, useMemo, useRef} from "react";
import Plyr from "plyr-react";
import videoMp4 from "../../img/video.mp4";

export default function SingleVideo() {
    const postContainerRef = useRef()
    const infoRef = useRef()
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

    function classObserver(targetElement, observableClassName, callback){
        const ref = {prevStateHasClass: targetElement.classList.contains(observableClassName)};
        return new MutationObserver(function(mutations, observer) {
            // Use traditional 'for loops' for IE 11
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
        const videoElement = postContainerRef.current.getElementsByTagName('video')[0]
        videoElement.addEventListener('play', () => {
            Array.from(document.body.getElementsByTagName('video')).forEach((element, indx) => {
                if (element != videoElement && !element.paused) {
                    element.pause()
                }
            })
        })

        const container = postContainerRef.current.getElementsByTagName('div')[0]
        classObserver(container, 'plyr--hide-controls', (classAdded, mutation, observer) => {
            console.log('Change detected. Class ', classAdded? 'added': 'removed')
            if (classAdded) {
                infoRef.current.classList.remove('up')
                return
            }

            infoRef.current.classList.add('up')
        })

        // postContainerRef.current.addEventListener('mouseover', () => {
        //     console.log('pause')
        //     infoRef.current.classList.add('up')
        // })
        // postContainerRef.current.addEventListener('mouseout', () => {
        //     if (videoElement.paused) {
        //         return
        //     }
        //     infoRef.current.classList.remove('up')
        // })
        // videoElement.addEventListener('pause', () => {
        //     console.log('pause')
        //     infoRef.current.classList.add('up')
        // })
    }, []);

    return (
        <li ref={postContainerRef} className="videos-result__item">
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
            <div ref={infoRef} className="videos-result__info up">
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
    )
}
