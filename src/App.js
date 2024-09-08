import React, {useEffect} from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import useRefreshToken from "./hooks/useRefreshToken.js";
import Videos from "./pages/Videos.js";
import UploadSong from "./pages/Moderation/UploadSong.js";
import VideoModeration from "./pages/Moderation/VideoModeration.js";
import TopDownVideos from "./pages/TopDownVideos.js";
import Account from "./pages/Account.js";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "./features/auth/authSlice.js";
import Middleware from "./middleware/Middleware.js";
import Index from "./pages/Index.js";
import Rules from "./pages/Rules.js";

function App() {
    const refresh = useRefreshToken()
    const dispatch = useDispatch()
    const { loading, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setLoading(true))
        async function checkAuth() {
            await refresh()
        }
        checkAuth().then(() => dispatch(setLoading(false)))
    }, [])

    function AuthenticatedRouteComponent(props) {
        // if (loading) {
        //     return(
        //         <div>Loading...</div>
        //     )
        // }

        return(
            props.children
        )
    }

    return (
        <Router>
            <Middleware>
                <Routes>
                    <Route path="/video-moderation" element={<VideoModeration />} />
                    <Route path="/song" element={<UploadSong />} />

                    <Route path="/rules" element={<Rules />} />

                    <Route path="/video/:id" element={
                        <TopDownVideos />
                    } />
                    <Route path="/videos-top-down" element={
                        <TopDownVideos />
                    } />
                    <Route path="/account" element={
                        <AuthenticatedRouteComponent>
                            <Account />
                        </AuthenticatedRouteComponent>
                    } />

                    <Route path="/videos" element={
                        <AuthenticatedRouteComponent>
                            <Videos />
                        </AuthenticatedRouteComponent>
                    } />

                    <Route path="/" element={
                            <Index />
                    } />
                </Routes>
            </Middleware>
        </Router>
    )
}

export default App
