import React, {useEffect, useState} from "react";
import '../css/login.css'
import '../css/styles.css'
import CodeInput from "../components/CodeInput/CodeInput";
import { useSearchParams} from "react-router-dom";

export default function CodeConfirmation() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [phone, setPhone] = useState('')


    useEffect(() => {
        setPhone(searchParams.get('phone'))
    }, []);

    return (
        <div>
            <CodeInput phone={phone} />
        </div>
    )
}
