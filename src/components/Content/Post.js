import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedVideoIndex} from "../../features/posts/postsSlice.js";
import playImage from "../../img/play.svg";
import heart from "../../img/heart.svg";
import {createSearchParams, useNavigate} from "react-router-dom";
import {LazyLoadComponent} from "react-lazy-load-image-component";

export default function Post({postRef, post, inView}) {
    const { query, posts } = useSelector((state) => state.posts)
    const [fetchedPost, setFetchedPost] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setFetchedPost(post)
    }, [post])

    function getLikes() {
        return fetchedPost?.videoLikes
    }

    function selectVideoIndex() {
        dispatch(setSelectedVideoIndex(fetchedPost?.id))

        const postIndex = posts.findIndex(post => post.id == fetchedPost?.id)
        const postsBeforeSelected = posts.filter((post, index) => index < postIndex)

        navigate({
            pathname: '/valerie-top-down',
            search: createSearchParams({
                video: fetchedPost?.id,
                query: query,
                skip: (postsBeforeSelected?.length) ?? 0
            }).toString(),
        }, {replace: false})
    }

    return (
        <li ref={postRef} className="videos-result__item" onClick={selectVideoIndex}>
            <LazyLoadComponent>
                <video className="videos-result__video" poster={fetchedPost?.preview_url} preload={'none'}>
                    {fetchedPost?.link ? <source type="video/mp4" src={fetchedPost?.link + '#t=0.1'}/> : ''}
                </video>
            </LazyLoadComponent>
            <div className="videos-result__play">
                <a href=""> <img src={playImage} alt="img"/> </a>
            </div>


            <div className="videos-result__author">
                <div className="videos-result__author-icon">
                    {fetchedPost?.users?.image ? <img src={fetchedPost?.users?.image} alt="img"/> : fetchedPost?.users?.name.split('')[0]?.toUpperCase()}
                </div>


                <div className="videos-result__author-info">
              <span className="videos-result__author-nickname"
              >{fetchedPost?.users?.name + ' ' + fetchedPost?.users?.lastname}</span>
                    <span className="videos-result__author-city"
                    >г. <span>{fetchedPost?.users?.city}</span>{fetchedPost?.users?.age ? <>, <span>{fetchedPost?.users?.age}</span> лет</> : ''}</span>
                </div>
            </div>


            <div className="videos-result__info">
                <div className="videos-result__song-info">
                    <div className="videos-result__song-img">
                        {fetchedPost?.song?.image_link ? <img src={fetchedPost?.song?.image_link} alt="iocn"/> : '' }
                    </div>
                    <div className="videos-result__song">
                        <div className="videos-result__song-singer">{fetchedPost?.song?.author_name}</div>
                        <div className="videos-result__song-name">{fetchedPost?.song?.title}</div>
                    </div>
                </div>

                <div className="videos-result__likes">
                    <span><img src={heart} alt="icon"/></span>
                    <span>{getLikes()}</span>
                </div>
            </div>
        </li>
)
}
