import React, {useEffect, useRef, useState} from "react";
import photo from '../../img/photo.jpg'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Songs() {
    const privateAxios = useAxiosPrivate()
    const [songs, setSongs] = useState([])
    const [showAll, setShowAll] = useState(false)
    const songsList = useRef()
    const songsShowMore = useRef()
    const showMoreText = useRef()

    useEffect(() => {
        privateAxios.get('/content/songs').then(data => setSongs(data.data))
    }, [])

    function downloadMinus(link) {

        new Promise((res, rej) => {
            fetch(link).then(res => res.blob()).then(file => {
                const tempUrl = URL.createObjectURL(file);
                const aTag = document.createElement("a");
                aTag.href = tempUrl;
                aTag.download = link.replace(/^.*[\\\/]/, '');
                document.body.appendChild(aTag);
                aTag.click();
                URL.revokeObjectURL(tempUrl);
                aTag.remove();
                res();
            }).catch(err => {
                rej(err);
            });
        });

        // var xhr = new XMLHttpRequest();
        // console.log(link)
        // xhr.open('GET', link, true);
        // xhr.responseType = 'blob';
        // xhr.onload = function () {
        //     var urlCreator = window.URL || window.webkitURL;
        //     var imageUrl = urlCreator.createObjectURL(this.response);
        //     var tag = document.createElement('a');
        //     tag.href = imageUrl;
        //     tag.target = '_blank';
        //     tag.download = 'minus.mp3';
        //     document.body.appendChild(tag);
        //     tag.click();
        //     document.body.removeChild(tag);
        // };
        // xhr.onerror = err => {
        //     alert('Failed to download');
        //     console.log(err)
        // };
        // xhr.send();
    }

    const getMaxHeight = () => {
        return window.innerWidth <= 650 ? '600px' : '955px';
    }

    const toggleSongsList = () => {
        setShowAll(p => !p)
        if (showAll) {
            showMoreText.current.textContent = 'Показать ещё';
        } else {
            showMoreText.current.textContent = 'Скрыть';
        }
    };

    return (
        <div className="songs">
            <div className="songs__wrapper">
                <div className="container">
                    <div className="songs__title">
                        Выбирай песню и покажи свой талант всей стране
                    </div>
                    <div className="songs__subtitle">
                        Сними видео и выступи на одной сцене с любимыми блогерами
                    </div>
                    <ul ref={songsList} className={'songs__list ' + (showAll ? 'expanded' : '')}  style={showAll ? {maxHeight: '2000px'} : {maxHeight: `${songsList.scrollHeight}px`}}>
                        {
                            songs.map((song, key) => {
                                return (
                                    <li key={key} className="songs__item">
                                        <div className="songs__img">
                                            <img src={song?.image_link} alt="img"/>
                                        </div>
                                        <div className="songs__info">
                                            <div className="songs__item-title">{song?.author_name}</div>
                                            <div className="songs__item-singer">{song?.title}</div>
                                            <a
                                                onClick={() => downloadMinus(song?.minus_link)}
                                                role='button'
                                                className="songs__item-download button-special"
                                                style={{cursor: 'pointer'}}
                                            >
                                                <span>скачать минус</span>
                                                <svg
                                                    width="229"
                                                    height="54"
                                                    viewBox="0 0 229 54"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M110.786 0.352816C145.379 0.26901 200.983 -0.521653 216.252 5.99617C231.522 12.514 232.33 37.8743 221.833 46.4403C213.964 52.8604 206.54 54.3269 103.19 53.9435C32.1741 53.6806 22.089 52.5985 10.0619 46.7537C-1.96515 40.9088 -4.46727 16.5942 9.50406 8.50436C28.9169 -2.73328 78.1412 0.431953 110.786 0.352816Z"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={'songs-show-more ' + (showAll ? 'active' : '')}>
                        <button onClick={toggleSongsList} className={'songs-show-more__button button-special ' + (showAll ? 'active' : '')}>
                            <span ref={showMoreText} className="songs-show-more__span">Показать ещё</span>
                            <svg
                                width="240"
                                height="54"
                                viewBox="0 0 240 54"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M116.181 0.352816C152.459 0.26901 210.771 -0.521653 226.784 5.99617C242.797 12.514 243.645 37.8743 232.636 46.4403C224.384 52.8604 216.599 54.3269 108.215 53.9435C33.741 53.6806 23.1648 52.5985 10.552 46.7537C-2.06085 40.9088 -4.68483 16.5942 9.96692 8.50436C30.3252 -2.73328 81.9467 0.431953 116.181 0.352816Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
