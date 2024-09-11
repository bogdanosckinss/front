import React, {useEffect, useRef, useState} from "react";
export default function Check() {
    const [state, setState] = useState('')
   useEffect(() => {
       setState(localStorage.getItem('checks') ?? '')
   }, [])

    return (
        <>
            <h1>{{state}}</h1>
        </>
    )
}
