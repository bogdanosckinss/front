import React, { useEffect, useMemo, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { UploadFileService } from "../../services/uploadFileService.js";
import uploadIcon from "../../img/account__upload-video-icon.svg";
import photo from "../../img/photo.jpg";
import heart from "../../img/heart.svg";
import applicationSent from "../../img/application-sent.svg";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/posts/postsSlice.js";
import SupportOthers from "./SupportOthers.js";
import Support from "./Support.js";
import Share from "./Share.js";
import UnderReview from "./UnderReview.js";
import ShareWithFriends from "./ShareWithFriends.js";
import UnderReviewMob from "./UnderReviewMob.js";
import TryAgain from "./TryAgain.js";
import NetworkError from "./Errors/NetworkError.js";
import MemoryLimitation from "./Errors/MemoryLimitation.js";

export default function AccountInfo({ setNotInitialLoading }) {
  const privateAxios = useAxiosPrivate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [canUpload, setCanUpload] = useState(false);
  const [video, setVideo] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [videoId, setVideoId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState(null);
  const [isPhoneFieldTouched, setIsPhoneFieldTouched] = useState(false);
  const [phoneclear, setPhoneClear] = useState(null);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState(null);
  const [city, setCity] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [acceptRules, setAcceptRules] = useState(false);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorDuringLoading, setErrorDuringLoading] = useState(false);
  const [underModeration, setUnderModeration] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [memoryLimitError, setMemoryLimitError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const uploadFileService = new UploadFileService();
  const ref = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.classList.remove("active");
        ref.current.classList.remove("active");
      } else {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    dispatch(setLoading(true));
    getProfile().then(() => {
      getSongs().then(() => {
        setNotInitialLoading();
      });
    });

    const videos = document.querySelectorAll(".video-main__video");

    function playVisibleVideo() {
      videos.forEach((video) => {
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
    window.addEventListener("scroll", playVisibleVideo);
  }, [authLoading]);

  useEffect(() => {
    const fieldsToValidate = [video, name, lastname, age, phone, city, email];

    if (
      isPhoneValid() &&
      !errorDuringLoading &&
      !alreadyUploaded &&
      !fieldsToValidate.some((field) => field == "" || field == null) &&
      selectedSong &&
      acceptRules &&
      acceptPrivacyPolicy &&
      isEmailValid() &&
      !uploadingVideo
    ) {
      setCanUpload(true);
      return;
    }

    setCanUpload(false);
  }, [
    errorDuringLoading,
    alreadyUploaded,
    video,
    selectedSong,
    name,
    lastname,
    age,
    phone,
    city,
    email,
    acceptRules,
    acceptPrivacyPolicy,
    uploadingVideo,
  ]);

  function removeVideo() {
    setVideo("");
    setVideoId("");
    setAlreadyUploaded(false);
    setAllowed(false);
  }

  function cleanedNumber(value) {
    return ("" + value).replace(/\D/g, "");
  }

  function handleNumberInput(phone) {
    const cleaned = cleanedNumber(phone);
    let value = "";

    if (cleaned.length == 1 && cleaned != "7") {
      value = "+ 7 (" + cleaned.slice(0, 4);
    } else {
      value = "+ 7 (" + cleaned.slice(1, 4);
    }

    if (cleaned.length > 4) {
      value += ") " + cleaned.slice(4, 7);
    }

    if (cleaned.length > 7) {
      value += "-" + cleaned.slice(7, 9);
    }

    if (cleaned.length > 9) {
      value += "-" + cleaned.slice(9, 11);
    }

    setPhone(value);
  }

  function isEmailValid() {
    if (email == null) {
      return true;
    }
    return email?.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  function isPhoneValid() {
    if (phone == null) {
      return true;
    }

    return ("+" + cleanedNumber(phone))?.match(/^\+\d{11,15}$/);
  }

  async function getProfile() {
    try {
      const response = await privateAxios.get("users");
      setPhone(response.data.phone_number);
      setPhoneClear(response.data.phone_number);
      setCity(response.data.city);
      setAge(response.data.age);
      setName(response.data.name);
      setLastname(response.data.lastname);
      setSocialMediaLink(response.data.social_media_link);
      setEmail(response.data.email);
      setImage(response.data.image);

      const videosCount = response.data.videos.length;

      if (videosCount > 0) {
        setShowInputs(false);
        setAllowed(response.data.videos[videosCount - 1].allowed);
        setUnderModeration(
          response.data.videos[videosCount - 1].under_moderation
        );
        setVideo(response.data.videos[videosCount - 1].link);
        setVideoId(response.data.videos[videosCount - 1].id);
        setAlreadyUploaded(true);
        setSelectedSong(response.data.videos[videosCount - 1].song);
      }
      handleNumberInput(response.data.phone_number);
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      setErrorDuringLoading(true);
    }
  }

  async function getSongs() {
    try {
      const response = await privateAxios.get("content/songs");
      setSongs(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function sendVideoRequest(event) {
    event.preventDefault();
    if (uploading || alreadyUploaded) {
      return;
    }

    setUploading(true)
    try {
      await privateAxios.post("/content/create", {
        video: video,
        songId: selectedSong.id,
        image: image,
        name: name,
        lastname: lastname,
        phone_number: phoneclear ?? "+" + cleanedNumber(phone),
        email: email,
        city: city,
        social_media_link: socialMediaLink,
        age: age,
        preview_url: previewImage,
      });
      window.ym(98274871, "reachGoal", "videoUploaded");
      setErrorDuringLoading(false);
      setAlreadyUploaded(true);
      setUnderModeration(true);
      setUploading(false)
    } catch (e) {
      setNetworkError(true);
      setErrorDuringLoading(true);
      setAlreadyUploaded(false);
      setUploading(false);
    }
  }

  function videoLink() {
    return window.location.origin + "/video/" + videoId;
  }

  async function uploadImage(image) {
    setUploadingImage(true);
    const link = await uploadFileService.upload(image, "images");
    setImage(link);
    setUploadingImage(false);
  }

  async function uploadVideo(video) {
    setUploadingVideo(true);
    try {
      const link = await uploadFileService.uploadVideo(video, "videos");
      getVideoImage(link);
    } catch (err) {
      setUploadingVideo(false);
      window.alert('Произошла ошибка')
    }
  }

  function getVideoImage(path) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let video;

    function exportFrame(path) {
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
            setVideo(path);
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
        setVideo(path);
        setUploadingVideo(false);
      })
    }

    exportFrame(path);
  }

  function onDropDownClick(event) {
    event.preventDefault();

    const selectButton = ref.current;
    const selectDropdown = dropdownRef.current;

    const isExpanded = selectButton.getAttribute("aria-expanded") === "true";
    selectButton.setAttribute("aria-expanded", !isExpanded);
    selectDropdown.classList.toggle("active");
    selectButton.classList.toggle("active"); // Добавляем или удаляем активный класс
  }

  function selectOption(song) {
    setSelectedSong(song);
    const selectButton = ref.current;
    const selectDropdown = dropdownRef.current;

    const isExpanded = selectButton.getAttribute("aria-expanded") === "true";
    selectButton.setAttribute("aria-expanded", !isExpanded);
    selectDropdown.classList.toggle("active");
    selectButton.classList.toggle("active");
  }

  function formatPhoneNumber(number) {
    const cleaned = ("" + number).replace(/\D/g, "");
    let value = "+ 7 (" + cleaned.slice(1, 4);

    if (cleaned.length > 2) {
      value += ") " + cleaned.slice(4, 7);
    }

    if (cleaned.length > 6) {
      value += "-" + cleaned.slice(7, 9);
    }

    if (cleaned.length > 8) {
      value += "-" + cleaned.slice(9, 11);
    }

    if (value == "+ 7 (") {
      return "";
    }

    return value;
  }

  const renderVideo = useMemo(
    () => (
      <Plyr
        clickToPlay={true}
        options={{
          controls: [
            "progress",
            "play-large",
            "play",
            "current-time",
            "duration",
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
              src: video,
              size: 720,
            },
          ],
        }}
      />
    ),
    [video]
  );

  const renderImage = useMemo(() => <img src={image} alt="" />, [image]);

  return (
      <>
        <div
            className="loader-popup"
            style={uploading ? {display: "block"} : {display: "none"}}
        >
          <div className="loader-popup__loading loader"></div>
        </div>


        <div className="account">
          <div className="account__wrapper">
            <div className="account-container">
              <div className="account-info">
                {/*<div className="account__image">*/}
                {/*  {uploadingImage ? (*/}
                {/*      ""*/}
                {/*  ) : (*/}
                {/*      <div className="account__letter">*/}
                {/*        {name.split("")[0]?.toUpperCase()}*/}
                {/*      </div>*/}
                {/*  )}*/}
                {/*  <div className="account__image-icon">*/}
                {/*    <label className="account__upload-label">*/}
                {/*      <input*/}
                {/*          onChange={async (e) => {*/}
                {/*            if (e.target.files.length == 0) {*/}
                {/*              return;*/}
                {/*            }*/}

                {/*            await uploadImage(e.target.files[0]);*/}
                {/*          }}*/}
                {/*          accept="image/*"*/}
                {/*          type="file"*/}
                {/*          className="account__upload-input"*/}
                {/*          name="filename"*/}
                {/*          hidden*/}
                {/*      />*/}
                {/*    </label>*/}

                {/*    <svg*/}
                {/*        style={{pointerEvents: "none"}}*/}
                {/*        width="36"*/}
                {/*        height="29"*/}
                {/*        viewBox="0 0 36 29"*/}
                {/*        fill="none"*/}
                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                {/*    >*/}
                {/*      <g clip-path="url(#clip0_38_4924)">*/}
                {/*        <path*/}
                {/*            d="M36 25.179C35.8749 25.5855 35.7958 26.0147 35.6156 26.3956C34.8661 27.9812 33.5923 28.8405 31.8294 28.9882C31.6896 29 31.5489 29 31.4082 29C22.4679 29 13.5283 29 4.58925 29C2.53107 29 0.8573 27.8718 0.24849 26.0329C0.0946321 25.5587 0.0158337 25.0638 0.0148982 24.5658C-0.00165559 19.3758 -0.00441421 14.1861 0.00662162 8.99673C0.00662162 6.57458 1.82845 4.77665 4.27381 4.76662C6.05426 4.75933 7.83563 4.76662 9.61607 4.76662H9.98394C10.1458 4.25449 10.2534 3.75056 10.4603 3.29128C11.3257 1.36941 12.8312 0.215743 14.9473 0.0936332C16.9824 -0.0312111 19.0233 -0.0312111 21.0584 0.0936332C23.5654 0.259484 25.3247 1.91617 25.8765 4.35291C25.905 4.47775 25.9381 4.60077 25.9795 4.76389H26.3473C28.0947 4.76389 29.842 4.79851 31.5893 4.75568C34.0568 4.69645 35.7342 6.50259 35.9485 8.30143C35.9485 8.33242 35.9816 8.35975 35.9991 8.39256L36 25.179ZM18.0217 27.2066C22.4728 27.2066 26.9249 27.2139 31.376 27.1957C31.8308 27.2028 32.2821 27.1159 32.7012 26.9405C33.7542 26.4566 34.191 25.5736 34.1892 24.4336C34.1806 19.3269 34.1806 14.2195 34.1892 9.11155C34.1892 8.98398 34.1837 8.8564 34.1763 8.72973C34.1498 8.26325 33.9757 7.81688 33.6788 7.45395C33.1518 6.79146 32.4419 6.54268 31.6105 6.54724C29.5725 6.55332 27.5343 6.55332 25.4957 6.54724C24.7664 6.54724 24.4896 6.31942 24.3268 5.61137C24.257 5.30761 24.1864 5.00386 24.1153 4.7001C23.7309 3.07804 22.4682 1.90979 20.8965 1.86514C18.9653 1.81046 17.034 1.81958 15.1027 1.86514C14.0847 1.88974 13.2579 2.39094 12.6086 3.1801C12.0329 3.86447 11.8895 4.70557 11.6908 5.52571C11.4876 6.38048 11.276 6.54997 10.3858 6.54997C8.37178 6.54997 6.35682 6.54177 4.34186 6.54997C2.80696 6.55818 1.81558 7.51501 1.81282 9.0186C1.8024 14.1825 1.80485 19.3478 1.82018 24.5147C1.81849 24.9422 1.9101 25.365 2.08872 25.7541C2.57429 26.7637 3.44061 27.2121 4.56166 27.2121C9.04896 27.206 13.5356 27.2042 18.0217 27.2066Z"*/}
                {/*            fill="white"*/}
                {/*        />*/}
                {/*        <path*/}
                {/*            d="M24.9999 16.4885C25.0254 20.5805 21.6675 23.965 17.5465 23.9997C13.4256 24.0344 10.0257 20.6745 10.0001 16.5149C9.97459 12.4074 13.3581 9.0119 17.4845 9.00003C21.6109 8.98817 24.9743 12.3426 24.9999 16.4885ZM17.4863 22.2116C20.6124 22.228 23.1908 19.6722 23.2155 16.5314C23.2401 13.3905 20.6735 10.8064 17.5128 10.7936C16.002 10.7917 14.5518 11.3873 13.4785 12.4506C12.4052 13.5139 11.7959 14.9585 11.7836 16.4693C11.759 19.6074 14.3255 22.1915 17.4863 22.2089V22.2116Z"*/}
                {/*            fill="white"*/}
                {/*        />*/}
                {/*        <path*/}
                {/*            d="M5.98606 10.9999C5.85401 11 5.7233 10.9736 5.60168 10.9222C5.48006 10.8708 5.37001 10.7955 5.27808 10.7008C5.18615 10.6061 5.1142 10.4939 5.06651 10.3709C5.01883 10.2479 4.99637 10.1165 5.00048 9.98466C5.00329 9.72345 5.10876 9.47382 5.29415 9.28962C5.47953 9.10541 5.72996 9.00139 5.99142 9C6.25783 9.0018 6.51286 9.10811 6.70153 9.29603C6.8902 9.48395 6.99739 9.73842 7 10.0046C6.9991 10.1365 6.97213 10.267 6.92064 10.3885C6.86915 10.51 6.79415 10.6201 6.69994 10.7126C6.60574 10.8051 6.49418 10.8781 6.37168 10.9274C6.24917 10.9767 6.11813 11.0014 5.98606 10.9999Z"*/}
                {/*            fill="white"*/}
                {/*        />*/}
                {/*      </g>*/}
                {/*      <defs>*/}
                {/*        <clipPath id="clip0_38_4924">*/}
                {/*          <rect width="36" height="29" fill="white"/>*/}
                {/*        </clipPath>*/}
                {/*      </defs>*/}
                {/*    </svg>*/}
                {/*    <div className="account__img">*/}
                {/*      {uploadingImage ? (*/}
                {/*          <div*/}
                {/*              style={{left: "50%", top: "50%"}}*/}
                {/*              className="loading"*/}
                {/*          ></div>*/}
                {/*      ) : (*/}
                {/*          renderImage*/}
                {/*      )}*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="account__full-name">*/}
                {/*  <span>{lastname}</span> <span>{name}</span>*/}
                {/*</div>*/}
                {/*<div className="account__phone">{formatPhoneNumber(phone)}</div>*/}
                <div className="account-data">
                  <h1 className="account__title">Конкурс талантов завершен</h1>
                  <h2 className="account__title2">Спасибо всем участникам
                    за видео и эмоции!</h2>



                  {/*<h1 className="account__title">Видео-заявка участника</h1>*/}
                  {!showInputs ? (
                      // <button
                      //     onClick={() => setShowInputs(false)}
                      //     className="account__add-video-btn"
                      // >
                      //   <span>Загрузить видео</span>
                      //   <svg
                      //       width="240"
                      //       height="50"
                      //       viewBox="0 0 240 50"
                      //       fill="none"
                      //       xmlns="http://www.w3.org/2000/svg"
                      //   >
                      //     <path
                      //         d="M116.181 0.326681C152.459 0.249083 210.771 -0.483012 226.784 5.55201C242.797 11.587 243.645 35.0688 232.636 43.0003C224.384 48.9448 216.599 50.3027 108.215 49.9476C33.741 49.7043 23.1648 48.7023 10.552 43.2905C-2.06085 37.8786 -4.68483 15.365 9.96692 7.8744C30.3252 -2.53081 81.9468 0.399956 116.181 0.326681Z"/>
                      //   </svg>
                      // </button>
                      <></>
                  ) : (
                      <>
                        <form action="" className="account__form">
                          <div className="account__form-cover">
                            <div className="account__upload-video">
                              <label className="account__upload-video-label">
                                {networkError ? <NetworkError/> : ""}
                                {memoryLimitError ? <MemoryLimitation/> : ""}

                                <div
                                    className="videos-result__info"
                                    style={{display: "none"}}
                                >
                                  <div className="videos-result__song-info">
                                    <div className="videos-result__song-img">
                                      <img src={photo} alt="iocn"/>
                                    </div>
                                    <div className="videos-result__song">
                                      <div className="videos-result__song-singer">
                                        Марьяна Локель
                                      </div>
                                      <div className="videos-result__song-name">
                                        Нано краска топ!
                                      </div>
                                    </div>
                                  </div>
                                  <div className="videos-result__likes">
                              <span>
                                <img src={heart} alt="icon"/>
                              </span>
                                    <span>1203</span>
                                  </div>
                                </div>
                                {(alreadyUploaded && underModeration) ||
                                (alreadyUploaded && !underModeration && !allowed) ? (
                                    <div className="account__video-nor-posted-icon">
                                      <svg
                                          width="33"
                                          height="32"
                                          viewBox="0 0 33 32"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                            d="M16.0964 19.3334V22M9.42969 13.3717C10.0582 13.3334 10.8331 13.3334 11.8297 13.3334H20.363C21.3596 13.3334 22.1345 13.3334 22.763 13.3717M9.42969 13.3717C8.64526 13.4196 8.08874 13.5273 7.61373 13.7693C6.86108 14.1528 6.24915 14.7648 5.86566 15.5174C5.42969 16.373 5.42969 17.4932 5.42969 19.7334V21.6C5.42969 23.8402 5.42969 24.9603 5.86566 25.816C6.24915 26.5686 6.86108 27.1806 7.61373 27.5641C8.46937 28 9.58948 28 11.8297 28H20.363C22.6032 28 23.7233 28 24.579 27.5641C25.3316 27.1806 25.9436 26.5686 26.327 25.816C26.763 24.9603 26.763 23.8402 26.763 21.6V19.7334C26.763 17.4932 26.763 16.373 26.327 15.5174C25.9436 14.7648 25.3316 14.1528 24.579 13.7693C24.104 13.5273 23.5474 13.4196 22.763 13.3717M9.42969 13.3717V10.6667C9.42969 6.9848 12.4145 4.00003 16.0964 4.00003C19.7783 4.00003 22.763 6.9848 22.763 10.6667V13.3717"
                                            stroke="white"
                                            stroke-width="2.6"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                      </svg>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {video ? (
                                    <>
                              <span style={{height: "100%", width: "100%"}}>
                                {renderVideo}
                              </span>
                                    </>
                                ) : (
                                    <>
                                      {uploadingVideo ? (
                                          <div className="loading"></div>
                                      ) : (
                                          <div className="account__for-upload">
                                            <div className="account__upload-video-icon">
                                              <img src={uploadIcon} alt="plus"/>
                                            </div>
                                            <div className="account__upload-video-title">
                                              Загрузите видео длительностью 30-60 сек
                                            </div>
                                            <p className="account__upload-video-p">
                                              Видео .mp4, .mov, .avi не более 150 Мб
                                            </p>
                                          </div>
                                      )}
                                      <input
                                          onChange={async (e) => {
                                            if (e.target.files.length == 0 || video) {
                                              return;
                                            }

                                            if (
                                                Math.round(e.target.files[0].size / 1024) /
                                                1000 >
                                                150
                                            ) {
                                              setMemoryLimitError(true);
                                              return;
                                            }
                                            setMemoryLimitError(false);

                                            await uploadVideo(e.target.files[0]);
                                          }}
                                          type="file"
                                          accept=".mp4, .avi, .mov"
                                          className="account__upload-video-input"
                                          name="filename"
                                          hidden
                                      />
                                    </>
                                )}
                              </label>
                            </div>

                            <div className="account__form-info">
                              {alreadyUploaded && underModeration && !allowed ? (
                                  <UnderReviewMob/>
                              ) : (
                                  ""
                              )}
                              {alreadyUploaded ? (
                                  <ShareWithFriends
                                      removeVideo={removeVideo}
                                      canShare={!underModeration && allowed}
                                      tryAgain={
                                          alreadyUploaded && !underModeration && !allowed
                                      }
                                      link={videoLink()}
                                  />
                              ) : (
                                  ""
                              )}

                              <>
                                <label className="account__form-labels" htmlFor="">
                                  <input
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      type="text"
                                      className={
                                          "account__form-input " +
                                          (name && !alreadyUploaded ? "active" : "")
                                      }
                                      placeholder="Имя участника"
                                  />
                                </label>
                                <label className="account__form-labels" htmlFor="">
                                  <input
                                      value={lastname}
                                      onChange={(e) => setLastname(e.target.value)}
                                      type="text"
                                      className={
                                          "account__form-input " +
                                          (lastname && !alreadyUploaded ? "active" : "")
                                      }
                                      placeholder="Фамилия участника"
                                  />
                                </label>
                                <label className="account__form-labels" htmlFor="">
                                  <input
                                      value={age}
                                      onChange={(e) => setAge(e.target.value)}
                                      type="number"
                                      className={
                                          "account__form-input " +
                                          (age && !alreadyUploaded ? "active" : "")
                                      }
                                      placeholder="Возраст ребенка"
                                  />
                                </label>
                                <label
                                    className="account__form-labels ja-mask-account__form-labels"
                                    htmlFor=""
                                >
                                  <input
                                      value={phone}
                                      onChange={(e) =>
                                          handleNumberInput(e.target.value)
                                      }
                                      onFocus={(e) => {
                                        setIsPhoneFieldTouched(true)
                                        handleNumberInput(e.target.value)
                                      }}
                                      type="phone"
                                      className={
                                          "account__form-input js-account__form-input " +
                                          ((phone && !alreadyUploaded && isPhoneFieldTouched) ? "active" : "")
                                      }
                                      placeholder="+ 7 (___) ___-__-__"
                                      readOnly={phoneclear}
                                  />
                                </label>
                                {!isPhoneValid() && isPhoneFieldTouched ? (
                                    <div className="account-typing-error">
                                      Номер указан неверно. Пожалуйста, попробуйте ещё.
                                    </div>
                                ) : (
                                    ''
                                )}
                                <label className="account__form-labels" htmlFor="">
                                  <input
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      type="email"
                                      className={
                                          "account__form-input " +
                                          (email && !alreadyUploaded ? "active" : "")
                                      }
                                      placeholder="Почта участника/родителя"
                                      readOnly={!phoneclear}
                                  />
                                </label>
                                {!isEmailValid() && isPhoneValid() ? (
                                    <div className="account-typing-error">
                                      Почта указана неверно. Пожалуйста, попробуйте ещё.
                                    </div>
                                ) : (
                                    ""
                                )}
                                {!isEmailValid() && !isPhoneValid() ? (
                                    <div className="account-typing-error">
                                      Номер и почта указаны неверно. Пожалуйста,
                                      попробуйте ещё.
                                    </div>
                                ) : (
                                    ""
                                )}
                                <label className="account__form-labels" htmlFor="">
                                  <input
                                      value={city}
                                      onChange={(e) => setCity(e.target.value)}
                                      type="text"
                                      className={
                                          "account__form-input " +
                                          (city && !alreadyUploaded ? "active" : "")
                                      }
                                      placeholder="Город участника"
                                  />
                                </label>
                                <label className="account__form-labels" htmlFor="">
                                  <input
                                      value={socialMediaLink}
                                      onChange={(e) =>
                                          setSocialMediaLink(e.target.value)
                                      }
                                      type="text"
                                      className={
                                          "account__form-input " +
                                          (socialMediaLink && !alreadyUploaded
                                              ? "active"
                                              : "")
                                      }
                                      placeholder="Ссылка на соцсеть участника/родителя"
                                  />
                                </label>
                              </>

                              <div
                                  className="custom-select"
                                  style={alreadyUploaded ? {marginBottom: 0} : {}}
                              >
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
                              {selectedSong ? (
                                  <span className="account__select-content">
                                  {selectedSong.image_link ? (
                                      <img
                                          src={selectedSong.image_link}
                                          alt=""
                                          className="account__select-img"
                                      />
                                  ) : (
                                      ""
                                  )}
                                    <span className="account__select-song-info">
                                    <span className="account__select-song-info-singer">
                                      {selectedSong.author_name}
                                    </span>
                                    <span className="account__select-song">
                                      {selectedSong.title}
                                    </span>
                                  </span>
                                </span>
                              ) : (
                                  "Выбрать песню"
                              )}
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
                                  {songs.map((song, key) => {
                                    return (
                                        <li
                                            key={key}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              selectOption(song);
                                            }}
                                            role="option"
                                        >
                                          <label htmlFor="song1">
                                    <span className="account__select-content">
                                      {song.image_link ? (
                                          <img
                                              src={song.image_link}
                                              alt=""
                                              className="account__select-img"
                                          />
                                      ) : (
                                          ""
                                      )}
                                      <span className="account__select-song-info">
                                        <span className="account__select-song-info-singer">
                                          {song.author_name}
                                        </span>
                                        <span className="account__select-song">
                                          {song.title}
                                        </span>
                                      </span>
                                    </span>
                                          </label>
                                        </li>
                                    );
                                  })}
                                </ul>
                              </div>

                              {alreadyUploaded ? (
                                  ""
                              ) : (
                                  <div className="account-form__radios">
                                    <label className="account-form__label-check">
                                      <input
                                          value={acceptRules}
                                          onChange={(e) =>
                                              setAcceptRules((value) => !value)
                                          }
                                          className="account-form__check-input"
                                          type="checkbox"
                                      />
                                      <span className="account-form__checkmark"></span>
                                      <p>
                                        С
                                        <a target="_blank" href="/rules">
                                          {" "}
                                          правилами конкурса{" "}
                                        </a>
                                        ознакомлен и согласен
                                      </p>
                                    </label>
                                    <label className="account-form__label-check">
                                      <input
                                          value={acceptPrivacyPolicy}
                                          onChange={(e) =>
                                              setAcceptPrivacyPolicy((value) => !value)
                                          }
                                          className="account-form__check-input"
                                          type="checkbox"
                                      />
                                      <span className="account-form__checkmark"></span>
                                      <p>
                                        Выражаю свое согласие на
                                        <a
                                            target="_blank"
                                            href="https://bonus.detmir.ru/pdn_lk"
                                        >
                                          {" "}
                                          обработку персональных данных
                                        </a>
                                      </p>
                                    </label>
                                  </div>
                              )}

                              {alreadyUploaded && underModeration && !allowed ? (
                                  <div className="application-sent">
                            <span className="application-sent-span">
                              <img src={applicationSent} alt="icon"/>
                            </span>
                                    <span className="application-sent__text">
                              Заявка отправлена
                            </span>
                                  </div>
                              ) : (
                                  ""
                              )}

                              {alreadyUploaded && !underModeration && allowed ? (
                                  <div className="video-posted">
                            <span className="video-posted__icon">
                              <svg
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                    d="M12.6414 20.8042C14.54 19.8149 20 16.5823 20 12.1212V8.33881C20 7.5393 20 7.13954 19.8692 6.79591C19.7537 6.49235 19.566 6.22149 19.3223 6.00674C19.0465 5.76365 18.6722 5.62328 17.9236 5.34256L12.5618 3.33188C12.3539 3.25392 12.25 3.21494 12.143 3.19949C12.0482 3.18578 11.9518 3.18578 11.857 3.19949C11.75 3.21494 11.6461 3.25392 11.4382 3.33188L6.0764 5.34256C5.3278 5.62328 4.9535 5.76365 4.67766 6.00674C4.43398 6.22149 4.24627 6.49235 4.13076 6.79591C4 7.13954 4 7.5393 4 8.33881V12.1212C4 16.5823 9.45996 19.8149 11.3586 20.8042C11.5639 20.9112 11.6666 20.9647 11.809 20.9924C11.92 21.014 12.08 21.014 12.191 20.9924C12.3334 20.9647 12.4361 20.9112 12.6414 20.8042Z"
                                    fill="white"
                                />
                                <path
                                    d="M9 12.1212L11 14.1212L13 12.1212L15 10.1212"
                                    stroke="#06C92E"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                                    <span className="video-posted__text">
                              Видео опубликовано
                            </span>
                                  </div>
                              ) : (
                                  ""
                              )}

                              {alreadyUploaded && !underModeration && !allowed ? (
                                  <div className="video-not-posted">
                            <span className="video-posted__icon">
                              <svg
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                    cx="12"
                                    cy="11.5996"
                                    r="5.98291"
                                    fill="white"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.6414 20.8042C14.54 19.8149 20 16.5823 20 12.1212V8.33881C20 7.5393 20 7.13954 19.8692 6.79591C19.7537 6.49235 19.566 6.22149 19.3223 6.00674C19.0465 5.76365 18.6722 5.62328 17.9236 5.34256L12.5618 3.33188C12.3539 3.25392 12.25 3.21494 12.143 3.19949C12.0482 3.18578 11.9518 3.18578 11.857 3.19949C11.75 3.21494 11.6461 3.25392 11.4382 3.33188L6.0764 5.34256C5.3278 5.62328 4.9535 5.76365 4.67766 6.00674C4.43398 6.22149 4.24627 6.49235 4.13076 6.79591C4 7.13954 4 7.5393 4 8.33881V12.1212C4 16.5823 9.45996 19.8149 11.3586 20.8042C11.5639 20.9112 11.6666 20.9647 11.809 20.9924C11.92 21.014 12.08 21.014 12.191 20.9924C12.3334 20.9647 12.4361 20.9112 12.6414 20.8042ZM9.25414 10.0579C10.1309 9.34442 11.2978 9.55401 11.9976 10.3331C12.6974 9.55401 13.8492 9.35193 14.7411 10.0579C15.6329 10.7638 15.7413 11.9642 15.0527 12.808C14.664 13.2844 13.7404 14.1195 13.0098 14.7565C12.6633 15.0586 12.4901 15.2097 12.2805 15.2715C12.1018 15.3242 11.8934 15.3242 11.7147 15.2715C11.5051 15.2097 11.3319 15.0586 10.9854 14.7565C10.2548 14.1195 9.33119 13.2844 8.94247 12.808C8.25394 11.9642 8.37738 10.7713 9.25414 10.0579Z"
                                    fill="white"
                                />
                                <path
                                    d="M9.5 9.62122L14.5 14.6212M14.5 9.62122L9.5 14.6212"
                                    stroke="#FF4F3E"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                                    <span className="video-posted__text">
                              Видео не опубликовано
                            </span>
                                  </div>
                              ) : (
                                  ""
                              )}
                            </div>
                          </div>

                          {alreadyUploaded ? (
                              ""
                          ) : (
                              <button
                                  onClick={sendVideoRequest}
                                  disabled={!canUpload || uploading}
                                  className={
                                      "account__sent-btn " +
                                      (canUpload ? "" : "not-allowed")
                                  }
                              >
                                <span>Участвовать в конкурсе</span>
                                <svg
                                    width="296"
                                    height="50"
                                    viewBox="0 0 296 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                      d="M143.29 0.326681C188.033 0.249083 259.951 -0.483012 279.701 5.55201C299.45 11.587 300.496 35.0688 286.918 43.0003C276.74 48.9448 267.139 50.3027 133.465 49.9476C41.614 49.7043 28.5699 48.7023 13.0141 43.2905C-2.54172 37.8786 -5.77796 15.365 12.2925 7.8744C37.4011 -2.53081 101.068 0.399956 143.29 0.326681Z"/>
                                </svg>
                              </button>
                          )}
                        </form>
                        {alreadyUploaded ? (
                            ""
                        ) : (
                            <div className="account__sent-information">
                              Информация о ФИО, возрасте и городе участника является
                              публичной информацией после публикации
                            </div>
                        )}
                        {alreadyUploaded && underModeration && !allowed ? (
                            <UnderReview/>
                        ) : (
                            ""
                        )}

                        <div className="application-approved display-web">
                          {alreadyUploaded && !underModeration && allowed ? (
                              <Share link={videoLink()}/>
                          ) : (
                              ""
                          )}
                          {alreadyUploaded && !underModeration && !allowed ? (
                              <TryAgain removeVideo={removeVideo}/>
                          ) : (
                              ""
                          )}
                        </div>
                      </>
                  )}
                </div>
                {alreadyUploaded ? (
                    <>
                      {/*<SupportOthers/>*/}
                      {/*<Support/>*/}
                    </>
                ) : (
                    ""
                )}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
