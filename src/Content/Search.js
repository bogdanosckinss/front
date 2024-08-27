import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import Debouncer from "../Services/debouncer";
import {useSearchParams} from "react-router-dom";
import {setPosts} from "../features/posts/postsSlice";
import {useDispatch, useSelector} from "react-redux";

export default function Search() {
    const privateAxios = useAxiosPrivate()
    const [query, setQuery] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const debouncer = new Debouncer()
    const debouncedRequest = debouncer.debounce(() => getContent(), 2000)
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)

    useEffect(() => {
        saveQueryParameters()
        debouncedRequest()
    }, [query])

    async function getContent() {
        let response = {}
        try {
            const query = new URLSearchParams(window.location.search)
            const token = query.get('name')
            response = await privateAxios.get('http://localhost:3000/content/videos/' + token)
        } catch (err) {
            console.log(err)
        }

        dispatch(setPosts(response.data))
    }

    function saveQueryParameters() {
        setSearchParams({name: query})
    }

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10}}>
            <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={async (e) => {
                await getContent(e)
            }}>Find Content
            </button>
        </form>
    )
}
