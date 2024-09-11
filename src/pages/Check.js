import React, {useEffect, useRef, useState} from "react";
export default function Check() {
    const [state, seState] = useState('')
   useEffect(() => {
       seState(localStorage.getItem('check') ?? '')
   }, [])

    return (
        <>
            <h1>{{state}}</h1>
        </>
    )
}
