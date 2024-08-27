import React, {useEffect, useState} from "react";
import useFetchProfile from "../Hooks/useFetchProfile";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import {useParams} from "react-router-dom";

export default function SinglePost() {
    const params = useParams()
    const privateAxios = useAxiosPrivate()
    const [fetchedPost, setFetchedPost] = useState({})
    const profile = useFetchProfile()

    useEffect(() => {
        fetchPost(params.id)
    }, [params])

    async function fetchPost(postId) {
        try {
            const response = await privateAxios.get('http://localhost:3000/content/video/' + postId)
            setFetchedPost(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    function getLikes() {
        return fetchedPost?.videoLikes?.length ?? 0
    }

    function isLiked() {
        return fetchedPost?.videoLikes?.filter(video => video.user.id == profile.id)?.length > 0
    }

    async function toggleLike() {
        try {
            privateAxios.post('http://localhost:3000/content/toggle-like', {
                videoId: fetchedPost.id
            })
        } catch (err) {
            console.log(err)
        }

        if (isLiked()) {
            setFetchedPost({
                ...fetchedPost,
                videoLikes: fetchedPost?.videoLikes?.filter(video => video.user.id != profile.id)
            })
            return
        }

        setFetchedPost({
            ...fetchedPost,
            videoLikes: [...fetchedPost?.videoLikes, {user: {id: profile.id}, video_id: fetchedPost.id}]
        })
    }

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10, width: 300}}>
            <div>
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
