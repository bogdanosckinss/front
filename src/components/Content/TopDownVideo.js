import React, {useEffect, useMemo, useRef, useState} from "react";
import videoHeartBtn from "../../img/video-heart-btn.svg";
import {addLike, removeLike} from "../../features/posts/postsSlice.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useFetchProfile from "../../hooks/useFetchProfile.js";
import {useDispatch} from "react-redux";
import Plyr from "plyr-react";
import { useInView } from 'react-intersection-observer'

export default function TopDownVideo({video, userInteracts, isLastLine, findMoreAsync}) {
    const privateAxios = useAxiosPrivate()
    const profile = useFetchProfile()
    const dispatch = useDispatch()
    const [share, setShare] = useState(false)
    const [firstRender, setFirstRender] = useState(true)
    const postRef = useRef()
    const copyBtnRef = useRef(null)
    const playerRef = useRef()
    const inputREF = useRef()
    const { ref, inView } = useInView({
        threshold: 0.5,
        rootMargin: '0px',
        triggerOnce: false,
        root: document.getElementById('postlist'),
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (copyBtnRef.current && !copyBtnRef.current.contains(event.target)) {
                copyBtnRef.current.classList.remove('active');
            }else {

            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    useEffect(() => {
        if (firstRender) {
            setFirstRender(value => !value)
            return
        }

        if (isLastLine) {
            findMoreAsync()
        }
        // try {
        //     if (inView == true) {
        //         const promise = playerRef.current.plyr.play()
        //         if(promise !== undefined){
        //             promise.then(() => {}).catch(error => {
        //                 playerRef.current.plyr.config.muted = true;
        //                 playerRef.current.plyr.play()
        //             });
        //         }
        //         return
        //     }
        //     playerRef.current.plyr.pause()
        // } catch (e) {
        //     console.log(e)
        // }
    }, [inView])

    function runHeartsAnimation() {
        const post = postRef.current

        const hearts = post.querySelectorAll('.video-heart');
        const likeText = post.querySelector('.video__btn-span-text');
        const likesContainer = post.querySelector('.video__likes');
        const heartsContainer = post.querySelector('.video__hearts');

        if (post.classList.contains('liked')) {
            post.classList.remove('liked');
            likesContainer.classList.remove('active');
            likeText.textContent = 'голосовать';

            hearts.forEach(heart => {
                heart.style.animation = 'none';
            });

            heartsContainer.style.display = 'none';
        } else {
            post.classList.add('liked');
            likesContainer.classList.add('active');
            likeText.textContent = 'ГОЛОС ПРИНЯТ';

            heartsContainer.style.display = 'flex';
            hearts.forEach((heart, index) => {
                const offsetX = Math.random() * 100 - 10;
                heart.style.setProperty('--offset-x', `${offsetX}px`);
                heart.style.animation = `heartAnimation 3s forwards`;
                heart.style.animationDelay = `${index * 0.3}s`;
            });
        }
    }

    function toggleShare(e) {
        e.preventDefault()
        setShare(share => !share)
        copyBtnRef.current.classList.add('active')
    }

    function videoLink() {
        return window.location.origin + '/video/' + video.id
    }

    function copyLink(e) {
        e.preventDefault()
        navigator.clipboard.writeText(videoLink())

        inputREF.current.select()
        inputREF.current.setSelectionRange(0, 99999);

        const tooltip = document.querySelector('.tooltiptext');
        tooltip.textContent = 'скопировано: ' + videoLink();
        tooltip.classList.add('active');
    }

    function getLikes() {
        return video?.videoLikes?.length ?? 0
    }

    function isLiked() {
        return video?.videoLikes?.filter(video => video.user.id == profile.id)?.length > 0
    }

    async function toggleLike() {
        runHeartsAnimation()
        try {
            privateAxios.post('content/toggle-like', {
                videoId: video.id
            })
        } catch (err) {
            console.log(err)
        }

        if (isLiked()) {
            dispatch(removeLike({postId: video.id, userId: profile.id}))
            return
        }

        dispatch(addLike({postId: video.id, userId: profile.id}))
    }

    async function vote() {
        try {
            privateAxios.post('content/vote', {
                videoId: video.id
            })
        } catch (err) {
            console.log(err)
        }
    }

    const renderVideo = useMemo(() => (
        <Plyr
            muted={true}
            ref={playerRef}
            options={{controls: ['progress', 'play-large', 'play', 'current-time', 'fullscreen']}}
            source={{
                type: 'video', title: 'Video', sources: [
                    {
                        src: video?.link,
                        size: 720
                    }
                ]
            }}/>
    ), [video])

    return (
        <>
            {/*<Helmet>*/}
            {/*    <meta property="og:url" content={window.location.href} />*/}
            {/*    <meta property="og:type" content='article' />*/}
            {/*    <meta property="og:title" content={video?.users?.name} />*/}
            {/*    <meta property="og:site_name" content={video?.song?.title} />*/}
            {/*    <meta name="twitter:title" content={video?.users?.name} />*/}

            {/*    <meta name="description" content={video?.song?.title} />*/}
            {/*    <meta property="og:description" content={video?.song?.title} />*/}
            {/*    <meta name="twitter:description" content={video?.song?.title} />*/}

            {/*    <meta property="og:image" content={video?.users?.image} />*/}
            {/*    <meta name="twitter:image" content={video?.users?.image} />*/}
            {/*</Helmet>*/}

            <li ref={postRef} className={'video-main__item ' + (isLiked() ? 'liked' : '')}>
                <div ref={ref} className="video-main__item-cover">
                    <span>
                        {renderVideo}
                    </span>

                    <div className="video__author-info">
                        <div className="video__author-img">
                            <div className="video__author-name">{video?.users?.name.split('')[0]?.toUpperCase()}</div>
                        </div>
                        <div className="video__author-data">
                            <div className="video__author-name">{video?.users?.name}</div>
                            <div className="video__author-ditails">
                    <span className="video__author-city"
                    >г. <span>{video?.users?.city}</span>, <span>{video?.users?.age}</span> лет</span
                    >
                            </div>
                        </div>
                    </div>
                    <div className="video__bottom">
                        <div className="video__hearts">
                            <div className="video__hearts-cover">
                                <img
                                    src={videoHeartBtn}
                                    alt=""
                                    className="video-heart"
                                />
                                <img
                                    src={videoHeartBtn}
                                    alt=""
                                    className="video-heart"
                                />
                                <img
                                    src={videoHeartBtn}
                                    alt=""
                                    className="video-heart"
                                />
                                <img
                                    src={videoHeartBtn}
                                    alt=""
                                    className="video-heart"
                                />
                                <img
                                    src={videoHeartBtn}
                                    alt=""
                                    className="video-heart"
                                />
                                <img
                                    src={videoHeartBtn}
                                    alt=""
                                    className="video-heart"
                                />
                            </div>
                        </div>
                        <button className="video__btn" onClick={toggleLike}>
                  <span className="video__btn-span">
                    <svg
                        width="160"
                        height="51"
                        viewBox="0 0 160 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M77.4541 0.855978C101.639 0.77838 140.514 0.0462847 151.189 6.08131C161.865 12.1163 162.43 35.5981 155.091 43.5296C149.589 49.4741 144.399 50.832 72.1434 50.4769C22.494 50.2336 15.4432 49.2316 7.03464 43.8197C-1.3739 38.4079 -3.12322 15.8943 6.64461 8.4037C20.2168 -2.00152 54.6312 0.929253 77.4541 0.855978Z"
                      />
                    </svg>
                  </span>
                            <span className="video__btn-span-text">{isLiked() ? 'Голос Принят' : 'Голосовать'}</span>
                        </button>
                        <div className="video__song-info">
                  <span className="video__song-icon">
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M1.28235 13.9402L1.28237 13.9402C1.21935 13.2059 1.6095 12.5318 2.26382 12.0162L2.26621 12.0143L2.26622 12.0143C2.97901 11.462 3.95644 11.1219 5.01189 11.0325L5.01301 11.0324C6.23276 10.9326 7.4087 11.1801 8.23333 11.7614L8.24185 11.7674C8.30262 11.8102 8.38874 11.8709 8.46657 11.946L11.0604 2.91091L11.0631 2.90118L11.0633 2.90123C11.1383 2.66403 11.3521 2.49263 11.6127 2.48566L11.6187 2.4855L11.6187 2.48555L21.1853 2.38386C21.3081 2.38133 21.4301 2.41591 21.5337 2.48891C21.5341 2.48922 21.5348 2.4897 21.5358 2.49036C21.5498 2.49969 21.6169 2.54454 21.6705 2.62389C21.7783 2.77031 21.8122 2.96142 21.7586 3.13518L18.7432 13.6655C18.6017 14.343 18.1067 14.9088 17.46 15.3152C16.8035 15.7276 15.9554 16.0005 15.0351 16.0775L15.0347 16.0775C14.0451 16.1593 13.0731 16.01 12.294 15.6396L12.292 15.6386C12.1174 15.5543 11.9509 15.4566 11.8008 15.3508C11.2556 14.9664 10.9061 14.4445 10.8477 13.8397L10.8475 13.8379C10.7754 13.0513 11.221 12.3394 11.9551 11.8169L11.9554 11.8167C12.6521 11.3217 13.5875 11.0096 14.5823 10.9306C15.8006 10.8311 16.9796 11.074 17.8049 11.6558L17.8134 11.6618C17.8742 11.7046 17.9603 11.7653 18.0381 11.8404L20.4125 3.56902L12.0695 3.65553L9.17429 13.7672C9.03283 14.4447 8.53787 15.0105 7.8911 15.4169C7.23467 15.8294 6.38658 16.1022 5.46625 16.1792L5.46585 16.1793C4.47621 16.261 3.50424 16.1117 2.72518 15.7413L2.72316 15.7403C2.55009 15.6568 2.38497 15.56 2.23585 15.4552L1.28235 13.9402ZM1.28235 13.9402L1.28274 13.9442C1.34101 14.5475 1.689 15.0684 2.23194 15.4525L1.28235 13.9402ZM7.56325 12.712L7.66899 12.7865C7.90796 12.9836 8.01319 13.1894 8.03184 13.3751C8.05703 13.6684 7.87077 14.0286 7.37971 14.3621C6.89903 14.6885 6.19193 14.9364 5.37341 15.0034L5.37191 15.0036C4.57267 15.0723 3.7961 14.9452 3.24144 14.6776C3.11925 14.6177 3.0128 14.5568 2.92467 14.4947C2.60751 14.2711 2.47778 14.0384 2.46017 13.8365L2.46012 13.8359C2.43409 13.5424 2.62012 13.1814 3.11211 12.8473C3.59279 12.5209 4.29989 12.273 5.11841 12.206L5.11979 12.2059C6.11288 12.1208 7.02501 12.3325 7.56325 12.712ZM17.1348 12.6064L17.2406 12.6809C17.4796 12.878 17.5848 13.0839 17.6034 13.2696C17.6286 13.5628 17.4423 13.923 16.9513 14.2565C16.4706 14.5829 15.7635 14.8308 14.945 14.8978L14.9435 14.898C14.1444 14.9666 13.368 14.8396 12.8133 14.5721C12.691 14.5122 12.5845 14.4513 12.4963 14.3891C12.1791 14.1655 12.0494 13.9328 12.0318 13.7309L12.0316 13.7287C12.007 13.4649 12.1638 13.1177 12.6479 12.7738C13.1513 12.4193 13.8936 12.1654 14.6899 12.1004L14.6914 12.1003C15.6845 12.0152 16.5966 12.2269 17.1348 12.6064Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.75"
                      />
                    </svg>
                  </span>
                            <span className="video__song-full-name">
                    <div className="video__song-full-name-cover">
                      <span>{video?.song?.author_name}</span> -
                      <span> {video?.song?.title}</span>
                    </div>
                  </span>
                        </div>
                    </div>
                </div>

                <div className="video__down">
                    <div className={'video__likes ' + (isLiked() ? 'active' : '')}>
                        <div className="video__like-icon" onClick={toggleLike}>
                            <svg fill={isLiked() ? '#FF0199' : 'none'} xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.59537 9.27992L6.89484 14.6395L10.5 18.2609L14.1052 14.6395L19.4046 9.27992C21.5318 7.14318 21.5318 3.73929 19.4046 1.60255C17.3138 -0.534184 13.8889 -0.534184 11.7617 1.60255L10.5 2.86993L9.23831 1.60255C7.11115 -0.534184 3.68625 -0.534184 1.59537 1.60255C-0.53179 3.73929 -0.53179 7.14318 1.59537 9.27992Z"
                                />
                            </svg>
                        </div>
                        <div className="video__like-info"><span>{getLikes()}</span> лайков</div>
                    </div>
                    <a onClick={toggleShare} style={{cursor: 'pointer'}} role='button' className="video__share">
                        <div className="video__share-icon">
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.3733 4.06285V1.50022C10.3733 1.3906 10.3695 1.28049 10.3772 1.17136C10.4017 0.825942 10.5691 0.569679 10.8796 0.429368C11.19 0.289056 11.4937 0.329006 11.7557 0.552628C12.2101 0.942382 12.6577 1.33701 13.1068 1.73066C14.7005 3.12728 16.2941 4.5239 17.8877 5.92052C18.189 6.1836 18.3378 6.50271 18.2005 6.891C18.1288 7.07026 18.0148 7.22887 17.8685 7.35286C16.4262 8.62996 14.9792 9.9012 13.5276 11.1666C12.9648 11.6601 12.3996 12.1512 11.8401 12.6486C11.546 12.9103 11.2236 13.0014 10.8623 12.8299C10.501 12.6584 10.3709 12.3549 10.3724 11.9676C10.3757 11.0292 10.3724 10.0909 10.3724 9.15304V8.95475C10.3479 8.94306 10.3326 8.92893 10.3172 8.92942C8.92863 8.94355 7.54821 9.02686 6.21097 9.44925C5.69325 9.61197 5.20336 9.84437 4.77968 10.1942C4.12714 10.7301 3.79655 11.437 3.70826 12.2711C3.59598 13.3346 3.82773 14.3528 4.11274 15.3633C4.12762 15.4159 4.14537 15.4675 4.16072 15.5206C4.24037 15.8178 4.16552 16.0541 3.94097 16.2154C3.70106 16.3874 3.40598 16.401 3.17327 16.2008C2.79901 15.8787 2.41612 15.5582 2.08985 15.1889C1.20507 14.1877 0.561163 13.0399 0.353404 11.6996C0.0818293 9.9457 0.328454 8.28437 1.42291 6.83546C2.08457 5.95852 2.98614 5.4114 3.98511 5.01629C5.13666 4.55979 6.34484 4.32691 7.5722 4.22021C8.46753 4.14275 9.36718 4.11693 10.2654 4.06821C10.2942 4.06821 10.323 4.06285 10.3733 4.06285Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <div className="video__share-text">Поделиться</div>
                    </a>
                </div>

                <div ref={copyBtnRef} className={'share-popup js-share-popup'}>
                    <ul className="account-share-socials">
                        <li className="account-share-social">
                            <a href={'https://vk.com/share.php?url=' + videoLink()}>
                                <svg
                                    width="29"
                                    height="19"
                                    viewBox="0 0 29 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.0238 18.5C6.4573 18.5 1.0008 11.7432 0.773438 0.5H5.56544C5.72285 8.75225 9.25555 12.2477 12.0538 12.9685V0.5H16.5662V7.61712C19.3294 7.31081 22.2323 4.06757 23.2117 0.5H27.7239C26.9719 4.8964 23.8239 8.13964 21.5853 9.47297C23.8239 10.5541 27.4093 13.3829 28.7734 18.5H23.8064C22.7395 15.0766 20.0815 12.4279 16.5662 12.0676V18.5H16.0238Z"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li className="account-share-social">
                            <a href="">
                                <svg
                                    width="26"
                                    height="23"
                                    viewBox="0 0 26 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.42965 11.9715L11.9838 2.42607C12.256 2.15412 12.189 1.69663 11.8501 1.51395C10.7741 0.934405 9.5434 0.605469 8.23557 0.605469C4.02139 0.605469 0.56519 4.09365 0.605823 8.30397C0.617545 9.51666 0.91292 10.662 1.42892 11.6761C1.43777 11.6933 1.47215 11.7565 1.5193 11.8421C1.70397 12.1773 2.15902 12.2421 2.42965 11.9715Z"
                                    />
                                    <path
                                        d="M22.9439 3.25309C23.1828 3.01446 23.164 2.6241 22.9064 2.40629C21.5772 1.28286 19.8586 0.605469 17.9814 0.605469C16.206 0.605469 14.5724 1.21129 13.276 2.22777C13.1702 2.31052 13.0707 2.40082 12.9757 2.49555C11.7595 3.71058 2.62138 12.8401 2.62138 12.8401C2.42837 13.0329 2.39815 13.3343 2.54766 13.5623C3.7599 15.4123 5.21125 17.0918 6.85796 18.5572C7.08587 18.7602 7.43282 18.7503 7.64875 18.5346L22.9439 3.25309Z"
                                    />
                                    <path
                                        d="M23.4012 3.85407L8.30527 18.9362C8.05782 19.1834 8.08699 19.5912 8.36543 19.8025C9.53652 20.6915 10.7886 21.4797 12.1087 22.154C12.1136 22.1566 12.1186 22.1592 12.1238 22.1615C12.1269 22.1634 12.1306 22.1649 12.1337 22.1665C12.136 22.1675 12.1379 22.1688 12.1402 22.1696C12.4309 22.3138 12.7586 22.3944 13.105 22.3944C13.4514 22.3944 13.7791 22.3138 14.0698 22.1696C14.0721 22.1686 14.0739 22.1673 14.0763 22.1665C14.0794 22.1649 14.0831 22.1634 14.0862 22.1615C14.0911 22.1592 14.0961 22.1566 14.1013 22.154C18.5533 19.8795 22.2327 16.3107 24.6423 11.9442C24.6598 11.9133 24.6767 11.8823 24.6937 11.8508C25.2769 10.7737 25.6079 9.54044 25.6079 8.23016C25.6079 6.63753 25.119 5.15914 24.2832 3.9363C24.08 3.63885 23.6562 3.5993 23.4015 3.85381L23.4012 3.85407Z"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li className="account-share-social">
                            <a href={'https://t.me/share/url?url=' + videoLink()}>
                                <svg
                                    width="24"
                                    height="19"
                                    viewBox="0 0 24 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.4682 8.67443C1.52005 8.6485 1.57192 8.62386 1.62248 8.60052C2.50137 8.19336 3.39192 7.81214 4.28118 7.43092C4.32915 7.43092 4.4095 7.37516 4.45487 7.35701C4.52357 7.32718 4.59228 7.29866 4.66099 7.26883L5.05637 7.09897C5.32081 6.98616 5.58394 6.87335 5.84838 6.76053C6.37598 6.53491 6.90356 6.30929 7.43116 6.08237C8.48634 5.63113 9.54284 5.17859 10.598 4.72735C11.6532 4.2761 12.7097 3.82356 13.7649 3.37232C14.8201 2.92107 15.8765 2.46853 16.9317 2.01729C17.9869 1.56605 19.0434 1.11351 20.0986 0.662262C20.3332 0.561121 20.5873 0.410707 20.8388 0.36662C21.0501 0.329016 21.2562 0.256403 21.4687 0.216206C21.8719 0.139702 22.3165 0.108582 22.7028 0.275853C22.8363 0.334203 22.9595 0.415894 23.0619 0.518331C23.5519 1.00329 23.4832 1.79945 23.3795 2.4815C22.6574 7.23512 21.9354 11.99 21.2121 16.7437C21.1136 17.3959 20.9787 18.1116 20.4641 18.524C20.0286 18.8728 19.4089 18.9117 18.871 18.7639C18.333 18.6148 17.8586 18.3023 17.3932 17.9949C15.463 16.7164 13.5315 15.4379 11.6014 14.1594C11.1425 13.856 10.6317 13.4592 10.6369 12.9081C10.6395 12.5761 10.8378 12.2805 11.0401 12.0173C12.7175 9.82847 15.1376 8.32433 16.9382 6.23668C17.1923 5.94233 17.3919 5.41069 17.0432 5.24083C16.8358 5.13969 16.5973 5.27714 16.408 5.4081C14.028 7.06136 11.6493 8.71592 9.26933 10.3692C8.49285 10.9086 7.67877 11.4636 6.74285 11.5958C5.90544 11.7151 5.06285 11.4817 4.25267 11.2431C3.57341 11.0435 2.89542 10.8386 2.22005 10.6272C1.86098 10.5157 1.49024 10.3951 1.21283 10.1423C0.935422 9.88942 0.775999 9.46411 0.943221 9.12697C1.04822 8.91561 1.25174 8.78205 1.46563 8.67313L1.4682 8.67443Z"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div className="share-popup-copy-block">
                        <input
                            className="share-popup-input js-share-popup-input"
                            type="text"
                            value={videoLink()}
                            id="myInput"
                            ref={inputREF}
                        />
                        <div className="tooltip">
                            <button onClick={copyLink} className="js-copy-btn">
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.5309 3.17432C19.975 3.17432 21.5312 4.72987 21.5312 10.1743C21.5312 15.6188 19.9151 17.1743 14.5309 17.1743C9.14663 17.1743 7.53125 15.6188 7.53125 10.1743C7.53125 4.72987 9.0868 3.17432 14.5309 3.17432Z"
                                        stroke="#0647C7"
                                        stroke-width="1.6"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M4.23383 9.17432C3.73068 10.2837 3.53125 11.7874 3.53125 13.7897C3.53125 19.5333 5.23539 21.1743 10.9155 21.1743C12.9126 21.1743 14.4183 20.9714 15.5312 20.4587"
                                        stroke="#0647C7"
                                        stroke-width="1.6"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span className="tooltiptext js-myTooltip"
                                >Копировать ссылку</span
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
