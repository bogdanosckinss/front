import React from "react";
import {useDispatch} from "react-redux";
import {setHideNotFoundNote} from "../../features/posts/postsSlice";

export default function NotFound() {
    const dispatch = useDispatch()

    function hideNote(e) {
        e.preventDefault()
        dispatch(setHideNotFoundNote(true))
    }

    return (
        <div className="videos-not-found">
            <div className="videos-not-found__container">
                <div className="videos-not-found__block">
                    <button onClick={hideNote}>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="28" height="28" rx="14" fill="#E1F0FF"/>
                            <path
                                d="M9 9L14 14M14 14L9 19M14 14L19 9M14 14L19 19"
                                stroke="#0647C7"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <p className="videos-not-found__text">
                        По вашему запросу «Елизавета» ничего не найдено
                    </p>
                </div>
            </div>
        </div>
    )
}
