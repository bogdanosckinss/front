import React, {useEffect} from "react";
import AuthForm from "./Auth/AuthForm";
import Upload from "./Content/Upload";
import Posts from "./Content/Posts";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import useRefreshToken from "./Hooks/useRefreshToken";
import SinglePost from "./Content/SinglePost";
import Search from "./Content/Search";

function App() {
        const refresh = useRefreshToken()

        useEffect(() => {
            async function checkAuth() {
                await refresh()
            }
            checkAuth()
        }, []);

    return (

            <Router>
                <div>
                    <Search />
                    <Routes>
                        <Route path="/auth" element={<AuthForm />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/post/:id" element={<SinglePost />} />
                        <Route path="/search" element={<Posts />} />
                        <Route path="/" element={<Upload />} />
                    </Routes>
                </div>
            </Router>
    )

}

export default App;
