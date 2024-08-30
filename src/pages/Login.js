import React, {useEffect, useState} from "react";
import '../css/login.css'
import '../css/styles.css'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {createSearchParams, useNavigate} from "react-router-dom";

export default function Login() {
    const [isChecked, setIsChecked] = useState(false);
    const privateAxios = useAxiosPrivate()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        document.body.classList.remove('videos-body')
        document.body.classList.remove('video-body')
    }, []);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
    }

    async function sendCodeViaSms(event) {
        event.preventDefault()

        let response = {}
        try {
            response = await privateAxios.post('auth/create', {
                phone_number: phone,
                name: name
            },{
                withCredentials: true
            })

            localStorage.setItem('confirmationToken', response.data.confirmationToken)
            localStorage.setItem('confirmationCode', response.data.confirmationCode)

            navigate({
                pathname: '/code-confirmation',
                search: createSearchParams({
                    phone: phone
                }).toString(),
            }, {replace: true})
        } catch (err) {
            console.log(err)
        }
    }

    function handleNumberInput(event) {
        const value = event.target.value

        if (value.length > 12) {
            return
        }

        setPhone(value)
    }

    return (
        <main className="login">
            <div className="login__container">
                <form className="form">
                    <h1 className="login__title">Вход или регистрация</h1>
                    <label className="login__label">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ваше имя"/>
                    </label>
                    <label className="login__label">
                        <input value={phone} onChange={handleNumberInput} type="text" placeholder="Ваш номер телефона"/>
                    </label>
                    <div className="login__agree">
                        <label className="login__label-check">
                            <input
                                className="login__check-input js-login__check-input"
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span className="checkmark"></span>
                            <p>
                                Даю согласие на обработку персональных данных в соответствии с{' '}
                                <a href="https://www.eapteka.ru/company/policy/">политикой конфиденциальности</a>.
                            </p>
                        </label>
                    </div>
                    <button
                        onClick={sendCodeViaSms}
                        className={'login__button js-login__button ' + ((isChecked && phone.length == 12) ? 'active' : '')}
                        disabled={!isChecked || phone.length != 12}
                    >
                        <span>Получить код по СМС</span>
                        <svg width="361" height="55" viewBox="0 0 361 55" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M180.5 0.413057C232.765 0.336102 322.982 -1.58876 346.051 4.39624C364.426 6.3994 366.176 43.9566 349.551 49.465C337.663 55.3602 326.645 54.3521 170.5 54C63.2073 53.7586 31.2866 55.3313 13.1157 49.9643C-3.07175 45.1832 -4.82174 11.4056 10.9282 4.89578C20.9906 -2.11504 131.18 0.485724 180.5 0.413057Z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </main>
    )
}
