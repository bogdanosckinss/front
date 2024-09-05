import React, {useEffect, useRef, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "axios";

export default function Songs() {
    const privateAxios = useAxiosPrivate()
    const [songs, setSongs] = useState([])
    const [showAll, setShowAll] = useState(false)
    const songsList = useRef()
    const songsListRef = useRef()
    const songsShowMore = useRef()
    const showMoreText = useRef()

    useEffect(() => {
        songsListRef.current.style.maxHeight = getMaxHeight()

        window.addEventListener('resize', function () {
            if (!songsListRef.current.classList.contains('expanded')) {
                songsListRef.current.style.maxHeight = getMaxHeight()
            }
        })

        privateAxios.get('/content/songs').then(data => setSongs(data.data))
    }, [])

   async function downloadMinus(link) {

       const { data } = await axios.get(link, {
           responseType: 'arraybuffer',
           withCredentials: false,
           headers: {
               'Content-Type': 'audio/wav',
           }
       });
       const blob = new Blob([data], {
           type: 'audio/wav'
       });
       const url = URL.createObjectURL(blob);
       console.log(url)

       var a = document.createElement('a');
       a.href = url;
       a.target = '_blank';
       a.download = 'minus.mp3';
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
    }

    const getMaxHeight = () => {
        return window.innerWidth <= 650 ? '600px' : '955px';
    }

    const toggleSongsList = () => {
        setShowAll(p => !p)
        if (showAll) {
            songsListRef.current.style.maxHeight = getMaxHeight()
        } else {
            songsListRef.current.style.maxHeight = songsListRef.current.scrollHeight + 'px'
        }
    };

    return (
        <>
            <div id="songminus" className="songs">
                <div className="songs__wrapper">
                    <div className="container">
                        <div className="songs__title">
                            Выбирайте песню и покажите талант ребёнка всей стране
                        </div>
                        <div className="songs__subtitle">
                            Для участия в конкурсе необходимо использовать представленные песни
                        </div>
                        <ul ref={songsListRef} className={'songs__list ' + (showAll ? 'expanded' : '')}>
                            {
                                songs.map((song, key) => {
                                    return (
                                        <li className="songs__item">
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
                                                    <span>Скачать минус</span>
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
                            <button onClick={toggleSongsList} className="songs-show-more__button button-special">
                                <span className="songs-show-more__span">
                                    {
                                        showAll ?
                                            'Скрыть'
                                            :
                                            'Показать ещё'
                                    }
                                </span>
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
        </>
    )
}
