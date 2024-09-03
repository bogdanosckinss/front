import VideoHeader from "../components/Header/VideoHeader";
import VideoMain from "../components/Content/VideoMain";
import '../css/styles.css'
import '../css/videos/videos.css'
import {useEffect} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useDispatch} from "react-redux";
import {setPosts} from "../features/posts/postsSlice";
import {useParams, useSearchParams} from "react-router-dom";

export default function TopDownVideos() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()

    async function getContent(event) {
        const query = searchParams.get('query')
        const skip = searchParams.get('skip') ?? 0
        const videoId = params.id
        let requestUrl = 'content/search/videos?query=' + query + '&skip=' + skip

        if (videoId) {
            requestUrl = 'content/video/' + videoId
        }

        if (event) {
            event.preventDefault()
        }

        let response = {}
        try {
            response = await privateAxios.get(requestUrl)
        } catch (err) {
            console.log(err)
        }

        dispatch(setPosts(response.data))
    }

    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('video-body')
        dispatch(setPosts([]))
        async function fetchPosts() {
            await getContent()
        }

        fetchPosts()
    }, [])

    return(
        <>
            <div>
                <main>
                    <VideoHeader/>
                    <VideoMain/>
                </main>
            </div>
        </>
    )
}
