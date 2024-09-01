import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Middleware(props) {
    const navigate = useNavigate()
    const { loading, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        const isVideoRoute = window.location.pathname.split('/')[1] == 'video'
        const isListVideosRoute = window.location.pathname.split('/')[1] == 'videos-top-down'

        if (loading || isVideoRoute || isListVideosRoute) {
            return
        }

        if (isAuthenticated && window.location.pathname == '/login' || window.location.pathname == '/code-confirmation') {
            navigate({
                pathname: '/',
            }, {replace: false})
        }

        if (!isAuthenticated && window.location.pathname != '/login') {
            navigate({
                pathname: '/login',
            }, {replace: false})
        }
    }, [isAuthenticated, loading])

    return(
        props.children
    )
}
