import React, {useEffect, useState} from "react";
export default function Check() {
    const [check, setCheck] = useState('')

   useEffect(() => {
       setCheck(localStorage.getItem('checks') ?? '')
       alert(localStorage.getItem('checks') ?? '')
   }, [])

    return (
        <div>

        </div>
    )
}
