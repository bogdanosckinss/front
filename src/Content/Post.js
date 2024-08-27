import React, {useEffect, useState} from "react";
import useFetchProfile from "../Hooks/useFetchProfile";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import {useDispatch} from "react-redux";
import {addLike, removeLike} from "../features/posts/postsSlice";

export default function Post({post}) {
    const privateAxios = useAxiosPrivate()
    const [fetchedPost, setFetchedPost] = useState({})
    const profile = useFetchProfile()
    const dispatch = useDispatch()

    useEffect(() => {
        setFetchedPost(post)
    }, [post])

    function getLikes() {
        return fetchedPost?.videoLikes?.length ?? 0
    }

    function isLiked() {
        return fetchedPost?.videoLikes?.filter(video => video.user.id == profile.id)?.length > 0
    }

    async function toggleLike() {
        try {
            privateAxios.post('http://localhost:3000/content/toggle-like', {
                videoId: post.id
            })
        } catch (err) {
            console.log(err)
        }

        if (isLiked()) {
            dispatch(removeLike({postId: fetchedPost.id, userId: profile.id}))
            return
        }

        dispatch(addLike({postId: fetchedPost.id, userId: profile.id}))
    }


    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10, width: 300}}>
            <div>
                <h2>{fetchedPost?.id}</h2>
                {fetchedPost?.users?.image ? <img style={{width: 100}} src={fetchedPost?.users?.image}/> : '' }
                <p>{fetchedPost?.users?.name}</p>
                <p>{fetchedPost?.users?.city}</p>
            </div>

            {fetchedPost?.links ? <video style={{width: 100}} src={fetchedPost?.link} /> : '' }

            <input checked={isLiked()} onChange={toggleLike} type='checkbox' name='liked' />
            <p>Likes: {getLikes()}</p>
        </form>
    )
}
