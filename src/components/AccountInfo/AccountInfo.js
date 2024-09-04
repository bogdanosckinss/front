import React, {useEffect, useRef, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {UploadFileService} from "../../services/uploadFileService";
import uploadIcon from '../../img/account__upload-video-icon.svg'
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../features/posts/postsSlice";
import ApplicationSent from "./ApplicationSent";
import ApplicationPosted from "./ApplicationPosted";
import ApplicationNotPosted from "./ApplicationNotPosted";

export default function AccountInfo() {
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.posts)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const [canUpload, setCanUpload] = useState(false)
    const [video, setVideo] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [socialMediaLink, setSocialMediaLink] = useState('')
    const [songs, setSongs] = useState([])
    const [selectedSong, setSelectedSong] = useState(null)
    const [acceptRules, setAcceptRules] = useState(false)
    const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false)
    const [alreadyUploaded, setAlreadyUploaded] = useState(false)
    const [errorDuringLoading, setErrorDuringLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const uploadFileService = new UploadFileService()
    const ref = useRef()
    const dropdownRef = useRef()

    useEffect(() => {
        if (authLoading) {
            return
        }

        dispatch(setLoading(true))
        getProfile()
        getSongs()


        const videos = document.querySelectorAll('.video-main__video');

        function playVisibleVideo() {
            videos.forEach(video => {
                const rect = video.getBoundingClientRect();
                const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                if (inView) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
        // Initial check to pause all videos except the one in view
        playVisibleVideo();
        // Add event listener for scrolling
        window.addEventListener('scroll', playVisibleVideo);
    }, [authLoading])

    useEffect(() => {
        const fieldsToValidate = [video, image, name, lastname, age, phone, city, email]

        if (!errorDuringLoading && !alreadyUploaded && !fieldsToValidate.some(field => field == '') && selectedSong && acceptRules && acceptPrivacyPolicy) {
            setCanUpload(true)
            return
        }

        setCanUpload(false)
    }, [errorDuringLoading, alreadyUploaded, video, image, selectedSong, name, lastname, age, phone, city, email, acceptRules, acceptPrivacyPolicy])

    function toggleAcceptRules() {
        setAcceptRules(value => !value)
    }

    function toggleAcceptPrivacyPolicy() {
        setAcceptPrivacyPolicy(value => !value)
    }

    async function getProfile() {
        try {
            const response = await privateAxios.get('users')
            setPhone(response.data.phone_number)
            setCity(response.data.city)
            setAge(response.data.age)
            setName(response.data.name)
            setLastname(response.data.lastname)
            setSocialMediaLink(response.data.social_media_link)
            setEmail(response.data.email)
            setConfirmed(response.data.confirmed)
            setImage(response.data.image)

            const videosCount = response.data.videos.length

            if (videosCount > 0) {
                setAlreadyUploaded(true)
                setVideo(response.data.videos[videosCount - 1])
            }

            dispatch(setLoading(false))
        }catch (e) {
            setErrorDuringLoading(true)
        }
    }

    async function getSongs() {
        try {
            const response = await privateAxios.get('content/songs')
            setSongs(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    async function sendVideoRequest() {
        try {
            await privateAxios.post('/content/create', {
                video: video,
                songId: selectedSong.id,
                image: image,
                name: name,
                lastname: lastname,
                phone_number: phone,
                email: email,
                city: city,
                social_media_link: socialMediaLink,
                age: age,
            })
            setErrorDuringLoading(false)
            setAlreadyUploaded(true)
        } catch (e) {
            setErrorDuringLoading(true)
            setAlreadyUploaded(false)
        }
    }

    async function uploadImage(image) {
        await uploadFileService.upload(image, setImage)
    }

    async function uploadVideo(video) {
        await uploadFileService.upload(video, setVideo)
    }

    function onDropDownClick(event) {
        event.preventDefault()

        const selectButton = ref.current
        const selectDropdown = dropdownRef.current

        const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
        selectButton.setAttribute('aria-expanded', !isExpanded);
        selectDropdown.classList.toggle('active');
        selectButton.classList.toggle('active'); // Добавляем или удаляем активный класс
    }

    function selectOption(song) {
        setSelectedSong(song)
        const selectButton = ref.current
        const selectDropdown = dropdownRef.current

        const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
        selectButton.setAttribute('aria-expanded', !isExpanded);
        selectDropdown.classList.toggle('active');
        selectButton.classList.toggle('active');
    }

    return (
        <div className="account">
            <div className="account__wrapper">
                <div className="account-container">
                    {loading ? '' :
                        <div className="account-info">
                            <div className="account__image">
                                <div className="account__letter">К</div>
                                <div className="account__image-icon">
                                    <label className="account__upload-label">
                                        <input
                                            onChange={async (e) => {
                                                if (e.target.files.length == 0) {
                                                    return
                                                }
                                                await uploadImage(e.target.files[0])
                                            }}
                                            accept='image/*'
                                            type="file"
                                            className="account__upload-input"
                                            name="filename"
                                            hidden
                                        />
                                    </label>

                                    <svg
                                        width="36"
                                        height="29"
                                        viewBox="0 0 36 29"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_38_4924)">
                                            <path
                                                d="M36 25.179C35.8749 25.5855 35.7958 26.0147 35.6156 26.3956C34.8661 27.9812 33.5923 28.8405 31.8294 28.9882C31.6896 29 31.5489 29 31.4082 29C22.4679 29 13.5283 29 4.58925 29C2.53107 29 0.8573 27.8718 0.24849 26.0329C0.0946321 25.5587 0.0158337 25.0638 0.0148982 24.5658C-0.00165559 19.3758 -0.00441421 14.1861 0.00662162 8.99673C0.00662162 6.57458 1.82845 4.77665 4.27381 4.76662C6.05426 4.75933 7.83563 4.76662 9.61607 4.76662H9.98394C10.1458 4.25449 10.2534 3.75056 10.4603 3.29128C11.3257 1.36941 12.8312 0.215743 14.9473 0.0936332C16.9824 -0.0312111 19.0233 -0.0312111 21.0584 0.0936332C23.5654 0.259484 25.3247 1.91617 25.8765 4.35291C25.905 4.47775 25.9381 4.60077 25.9795 4.76389H26.3473C28.0947 4.76389 29.842 4.79851 31.5893 4.75568C34.0568 4.69645 35.7342 6.50259 35.9485 8.30143C35.9485 8.33242 35.9816 8.35975 35.9991 8.39256L36 25.179ZM18.0217 27.2066C22.4728 27.2066 26.9249 27.2139 31.376 27.1957C31.8308 27.2028 32.2821 27.1159 32.7012 26.9405C33.7542 26.4566 34.191 25.5736 34.1892 24.4336C34.1806 19.3269 34.1806 14.2195 34.1892 9.11155C34.1892 8.98398 34.1837 8.8564 34.1763 8.72973C34.1498 8.26325 33.9757 7.81688 33.6788 7.45395C33.1518 6.79146 32.4419 6.54268 31.6105 6.54724C29.5725 6.55332 27.5343 6.55332 25.4957 6.54724C24.7664 6.54724 24.4896 6.31942 24.3268 5.61137C24.257 5.30761 24.1864 5.00386 24.1153 4.7001C23.7309 3.07804 22.4682 1.90979 20.8965 1.86514C18.9653 1.81046 17.034 1.81958 15.1027 1.86514C14.0847 1.88974 13.2579 2.39094 12.6086 3.1801C12.0329 3.86447 11.8895 4.70557 11.6908 5.52571C11.4876 6.38048 11.276 6.54997 10.3858 6.54997C8.37178 6.54997 6.35682 6.54177 4.34186 6.54997C2.80696 6.55818 1.81558 7.51501 1.81282 9.0186C1.8024 14.1825 1.80485 19.3478 1.82018 24.5147C1.81849 24.9422 1.9101 25.365 2.08872 25.7541C2.57429 26.7637 3.44061 27.2121 4.56166 27.2121C9.04896 27.206 13.5356 27.2042 18.0217 27.2066Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M24.9999 16.4885C25.0254 20.5805 21.6675 23.965 17.5465 23.9997C13.4256 24.0344 10.0257 20.6745 10.0001 16.5149C9.97459 12.4074 13.3581 9.0119 17.4845 9.00003C21.6109 8.98817 24.9743 12.3426 24.9999 16.4885ZM17.4863 22.2116C20.6124 22.228 23.1908 19.6722 23.2155 16.5314C23.2401 13.3905 20.6735 10.8064 17.5128 10.7936C16.002 10.7917 14.5518 11.3873 13.4785 12.4506C12.4052 13.5139 11.7959 14.9585 11.7836 16.4693C11.759 19.6074 14.3255 22.1915 17.4863 22.2089V22.2116Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M5.98606 10.9999C5.85401 11 5.7233 10.9736 5.60168 10.9222C5.48006 10.8708 5.37001 10.7955 5.27808 10.7008C5.18615 10.6061 5.1142 10.4939 5.06651 10.3709C5.01883 10.2479 4.99637 10.1165 5.00048 9.98466C5.00329 9.72345 5.10876 9.47382 5.29415 9.28962C5.47953 9.10541 5.72996 9.00139 5.99142 9C6.25783 9.0018 6.51286 9.10811 6.70153 9.29603C6.8902 9.48395 6.99739 9.73842 7 10.0046C6.9991 10.1365 6.97213 10.267 6.92064 10.3885C6.86915 10.51 6.79415 10.6201 6.69994 10.7126C6.60574 10.8051 6.49418 10.8781 6.37168 10.9274C6.24917 10.9767 6.11813 11.0014 5.98606 10.9999Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_38_4924">
                                                <rect width="36" height="29" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="account__img">
                                        <img src={image} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="account__full-name">
                                <span>{lastname}</span> <span>{name}</span>
                            </div>
                            <div className="account__phone">{phone}</div>
                            <div className="account-data">
                                <h1 className="account__title">Видео-заявка участника</h1>
                                <button onClick={sendVideoRequest} disabled={!canUpload}
                                        className="account__add-video-btn">
                                    <span>Загрузить видео</span>
                                    <svg
                                        width="240"
                                        height="50"
                                        viewBox="0 0 240 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M116.181 0.326681C152.459 0.249083 210.771 -0.483012 226.784 5.55201C242.797 11.587 243.645 35.0688 232.636 43.0003C224.384 48.9448 216.599 50.3027 108.215 49.9476C33.741 49.7043 23.1648 48.7023 10.552 43.2905C-2.06085 37.8786 -4.68483 15.365 9.96692 7.8744C30.3252 -2.53081 81.9468 0.399956 116.181 0.326681Z"
                                        />
                                    </svg>
                                </button>
                                <form action="" className="account__form">
                                    <div className="account__form-cover">
                                        <div className="account__upload-video">
                                            <label className="account__upload-video-label">
                                                {video ?
                                                    <Plyr
                                                        options={{controls: ['play', 'current-time', 'progress', 'fullscreen']}}
                                                        source={{
                                                            type: 'video', title: 'Video', sources: [
                                                                {
                                                                    src: video.link,
                                                                    size: 720
                                                                }
                                                            ]
                                                        }}/>
                                                    : <input
                                                        onChange={async (e) => {
                                                            if (e.target.files.length == 0 || video) {
                                                                return
                                                            }
                                                            await uploadVideo(e.target.files[0])
                                                        }}
                                                        type="file"
                                                        className="account__upload-video-input"
                                                        name="filename"
                                                        hidden
                                                    />}

                                                <div className="account__for-upload"
                                                     style={video ? {display: 'none'} : {}}>
                                                    <div className="account__upload-video-icon">
                                                        <img
                                                            src={uploadIcon}
                                                            alt="plus"
                                                        />
                                                    </div>
                                                    <div className="account__upload-video-title">
                                                        Загрузите видео длительностью 30-60 сек
                                                    </div>
                                                    <p className="account__upload-video-p">
                                                        Видео .mp4, .mov, .avi не более 50 Мб
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="account__form-info">
                                            <label className="account__form-labels" htmlFor="">
                                                <input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    type="text"
                                                    className="account__form-input"
                                                    placeholder="Имя участника"
                                                />
                                            </label>
                                            <label className="account__form-labels" htmlFor="">
                                                <input
                                                    value={lastname}
                                                    onChange={(e) => setLastname(e.target.value)}
                                                    type="text"
                                                    className="account__form-input"
                                                    placeholder="Фамилия участника"
                                                />
                                            </label>
                                            <label className="account__form-labels" htmlFor="">
                                                <input
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    type="text"
                                                    className="account__form-input"
                                                    placeholder="Возраст"
                                                />
                                            </label>
                                            <label
                                                className="account__form-labels ja-mask-account__form-labels"
                                                htmlFor=""
                                            >
                                                <input
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    type="phone"
                                                    className="account__form-input js-account__form-input"
                                                    placeholder="+ 7 (___) ___-__-__"
                                                />
                                            </label>
                                            <label className="account__form-labels" htmlFor="">
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    className="account__form-input"
                                                    placeholder="Почта участника/родителя"
                                                />
                                            </label>
                                            <label className="account__form-labels" htmlFor="">
                                                <input
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    type="text"
                                                    className="account__form-input"
                                                    placeholder="Город участника"
                                                />
                                            </label>
                                            <label className="account__form-labels" htmlFor="">
                                                <input
                                                    value={socialMediaLink}
                                                    onChange={(e) => setSocialMediaLink(e.target.value)}
                                                    type="text"
                                                    className="account__form-input"
                                                    placeholder="Ссылка на соцсеть участника/родителя"
                                                />
                                            </label>
                                            <div className="custom-select">
                                                <button
                                                    ref={ref}
                                                    onClick={onDropDownClick}
                                                    className="select-button"
                                                    role="combobox"
                                                    aria-label="select button"
                                                    aria-haspopup="listbox"
                                                    aria-expanded="false"
                                                    aria-controls="select-dropdown"
                                                >
                                                <span className="selected-value">
                                                    {selectedSong ?
                                                        <span className="account__select-content">
                                                        {selectedSong.image_link ?
                                                            <img
                                                                src={selectedSong.image_link} alt="img"
                                                                className="account__select-img"/> : ''}
                                                            <span className="account__select-song-info">
                                                            <span
                                                                className="account__select-song-info-singer">
                                                                {selectedSong.author_name}
                                                            </span>
                                                            <span
                                                                className="account__select-song">
                                                                {selectedSong.title}
                                                            </span>
                                                        </span>
                                                    </span>
                                                        : 'Выбрать песню'}
                                                </span>
                                                    <span className="account__select-arrow">
                                                  <svg
                                                      width="24"
                                                      height="24"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                        d="M18 9.99951L12 14.9995L6 9.99951"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                </span>
                                                </button>
                                                <ul
                                                    ref={dropdownRef}
                                                    className="select-dropdown"
                                                    role="listbox"
                                                    id="select-dropdown"
                                                >
                                                    {
                                                        songs.map((song, key) => {
                                                            return (
                                                                <li key={key} onClick={(e) => {
                                                                    e.preventDefault()
                                                                    selectOption(song)
                                                                }} role="option">
                                                                    <label htmlFor="song1">
                                                                    <span className="account__select-content">
                                                                        {song.image_link ?
                                                                            <img
                                                                                src={song.image_link}
                                                                                alt="img"
                                                                                className="account__select-img"
                                                                            /> : ''
                                                                        }
                                                                        <span className="account__select-song-info">
                                                                          <span
                                                                              className="account__select-song-info-singer">
                                                                              {song.author_name}
                                                                          </span>
                                                                          <span className="account__select-song">
                                                                              {song.title}
                                                                          </span>
                                                                      </span>
                                                                    </span>
                                                                    </label>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            {alreadyUploaded ?
                                                <>
                                                    {   !confirmed ?
                                                        <ApplicationSent />
                                                        : ''
                                                    }
                                                    { confirmed && video.allowed ?
                                                        <ApplicationPosted />
                                                        : ''
                                                    }
                                                    { confirmed && !video.allowed ?
                                                        <ApplicationNotPosted />
                                                        : ''
                                                    }
                                                </> :
                                                <div className="account-form__radios">
                                                    <label className="account-form__label-check">
                                                        <input value={acceptRules} onChange={toggleAcceptRules}
                                                               className="account-form__check-input" type="checkbox"/>
                                                        <span className="account-form__checkmark"></span>
                                                        <p>
                                                            С
                                                            <a href="https://www.eapteka.ru/company/policy/"
                                                            > правилами конкурса </a
                                                            > ознакомлен и согласен
                                                        </p>
                                                    </label>
                                                    <label className="account-form__label-check">
                                                        <input value={acceptPrivacyPolicy}
                                                               onChange={toggleAcceptPrivacyPolicy}
                                                               className="account-form__check-input" type="checkbox"/>
                                                        <span className="account-form__checkmark"></span>
                                                        <p>
                                                            Выражаю свое согласие на
                                                            <a href="https://www.eapteka.ru/company/policy/"
                                                            > обработку персональных данных
                                                            </a>
                                                        </p>
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <button className="account__sent-btn"></button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
