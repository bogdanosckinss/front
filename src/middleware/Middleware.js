import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Middleware(props) {
    const navigate = useNavigate()
    const { loading, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        const isVideoRoute = window.location.pathname.split('/')[1] == 'videos'
        const isListVideosRoute = window.location.pathname.split('/')[1] == 'videos-top-down'

        if (loading || isVideoRoute || isListVideosRoute) {
            return
        }

        if (!isAuthenticated && window.location.pathname != '/') {
            navigate({
                pathname: '/',
            }, {replace: true})
        }
    }, [isAuthenticated, loading])

    return(
        props.children
    )
}
