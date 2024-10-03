import React, {useEffect} from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import useRefreshToken from "./hooks/useRefreshToken.js";
import Videos from "./pages/Videos.js";
import UploadSong from "./pages/Moderation/UploadSong.js";
import VideoModeration from "./pages/Moderation/VideoModeration.js";
import TopDownVideos from "./pages/TopDownVideos.js";
import Account from "./pages/Account.js";
import {useDispatch} from "react-redux";
import {setLoading} from "./features/auth/authSlice.js";
import Middleware from "./middleware/Middleware.js";
import Index from "./pages/Index.js";
import Rules from "./pages/Rules.js";
import DeclinedVideos from "./pages/Moderation/DeclinedVideos.js";
import AcceptedVideos from "./pages/Moderation/AcceptedVideos.js";
import UsersModeration from "./pages/Moderation/UsersModeration.js";
import Results from "./pages/Results.js";
import ClosedAccess from "./pages/ClosedAccess.js";

function App() {
    const refresh = useRefreshToken()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        async function checkAuth() {
            await refresh()
        }
        checkAuth().then(() => dispatch(setLoading(false)))
    }, [])

    function AuthenticatedRouteComponent(props) {
        return(
            props.children
        )
    }

    return (
        <Router>
            <Middleware>
                <Routes>
                    <Route path="/closed-access-upload" element={<ClosedAccess />} />
                    <Route path="/results-lcfssa" element={<Results />} />
                    <Route path="/users-moderation" element={<UsersModeration />} />
                    <Route path="/video-moderation/accepted" element={<AcceptedVideos />} />
                    <Route path="/video-moderation/declined" element={<DeclinedVideos />} />
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
                            <Results />
                    } />
                </Routes>
            </Middleware>
        </Router>
    )
}

export default App
