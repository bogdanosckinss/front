import React, {useState} from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

export default function AuthForm() {
    const [isRequestSent, setIsRequestSent] = useState(false)
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [confirmationCode, setConfirmationCode] = useState()
    const [error, setError] = useState('')
    const privateAxios = useAxiosPrivate()

    async function sendCodeViaSms(event) {
        event.preventDefault()
        setIsRequestSent(true)

        let response = {}
        try {
            response = await privateAxios.post('http://localhost:3000/auth/create', {
                phone_number: phone,
                name: name
            },{
                withCredentials: true
            })
        } catch (err) {
            console.log(err)
        }

        localStorage.setItem('confirmationToken', response.data.confirmationToken)
        localStorage.setItem('confirmationCode', response.data.confirmationCode)
        setConfirmationCode(response.data.confirmationCode)
    }

    async function confirmPhone(event) {
        event.preventDefault()
        setIsRequestSent(true)

        let response = {}
        try {
            response = await privateAxios.post('http://localhost:3000/auth/confirm-phone', {
                confirmationToken: localStorage.getItem('confirmationToken'),
                confirmationCode: confirmationCode
            },
                {
                    withCredentials: true
                })
        } catch (err) {
            console.log(err)
        }

        console.log(response.data)
    }

    function onCodeInput(e) {
        setConfirmationCode(e.target.value)
    }

    function onNameChange(e) {
        setName(e.target.value)
    }

    function onPhoneChange(e) {
        setPhone(e.target.value)
    }

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10}}>
            {
                isRequestSent ?
                    <div>
                        <div>
                            <label>Enter the code</label>
                            <input value={confirmationCode} onChange={onCodeInput} type='text'/>
                        </div>

                        <button onClick={async (e) => {
                            await confirmPhone(e)
                        }}>Send Code</button>
                    </div>
                    :
                    <div>
                        <div>
                        <label>Name</label>
                            <input value={name} onChange={onNameChange} type='text'/>
                        </div>

                        <div>
                            <label>Phone</label>
                            <input value={phone} onChange={onPhoneChange} type='tel'/>
                        </div>

                        <button onClick={async (e) => {
                            await sendCodeViaSms(e)
                        }}>Get code via SMS</button>
                    </div>
            }
        </form>
    )
}
