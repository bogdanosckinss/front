import React, {useEffect} from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import Post from "./Post";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../features/posts/postsSlice";
import {useSearchParams} from "react-router-dom";

export default function Posts() {
    const privateAxios = useAxiosPrivate()
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)

    async function getContent(event) {
        if (event) {
            event.preventDefault()
        }

        let response = {}
        try {
            response = await privateAxios.get('http://localhost:3000/content')
        } catch (err) {
            console.log(err)
        }

        dispatch(setPosts(response.data))
    }

    useEffect(() => {
        dispatch(setPosts([]))
        async function fetchPosts() {
            await getContent()
        }

        fetchPosts()
        setSearchParams({name: 'YYY'})
    }, [])

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10}}>
            {
                posts?.map(post => {
                    return (<Post key={'post-' + post.id} post={post} />)
                })
            }
                <button onClick={async (e) => {
                    await getContent(e)
                }}>Download Content
                </button>
        </form>
    )
}
