import React, {useEffect, useRef, useState} from "react";
import '../../css/login.css'
import '../../css/styles.css'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useDispatch} from "react-redux";
import {setIsAuthenticated} from "../../features/auth/authSlice";
import Timer from "../Timer/Timer";

export default function CodeInput({phone}) {
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()
    const [code, setCode] = useState('');
    const inputsRef = useRef([]);
    const codeListRef = useRef(null);
    const [error, setError] = useState(false);

    const handleCodeInputChange = (e, index) => {
        setError(false)
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;

        setCode(inputsRef.current.reduce((acc, value) => acc + value.value, ''))

        if (value.length === 1 && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleCodeInputKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (e.target.value === '' && index > 0) {
                inputsRef.current[index - 1].focus();
            } else {
                e.target.value = '';
                setCode(inputsRef.current.reduce((acc, value) => acc + value.value, ''))
            }
        }
    };

    const updateButtonState = () => {
        const codeList = codeListRef.current;
        if (codeList.classList.contains('accept')) {
        } else if (codeList.classList.contains('error')) {
        }
    };

    function isCodeValid() {
        return code.length == 6
    }

    async function confirmPhone(event) {
        event.preventDefault()
        setError(false)

        try {
            await privateAxios.post('auth/confirm-phone', {
                    confirmationToken: localStorage.getItem('confirmationToken'),
                    confirmationCode: code
                },
                {
                    withCredentials: true
                })
            dispatch(setIsAuthenticated(true))
        } catch (err) {
            console.log(err)
            dispatch(setIsAuthenticated(false))
            setError(true)
        }
    }

    function formatPhoneNumber(number) {
        const cleaned = ('' + number).replace(/\D/g, '');
        const formatted = '+ (' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7, 9) + '-' + cleaned.slice(9, 11);

        return formatted;
    }

    useEffect(() => {
        const codeList = codeListRef.current;
        const observer = new MutationObserver(updateButtonState);
        observer.observe(codeList, { attributes: true });
        updateButtonState(); // Initial check

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);

    return (
        <main className="login">
            <div className="login__container">
                <form className="form">
                    <h1 className="login__title">Введите код из СМС</h1>
                    <p className="code__text">Код был отправлен на номер</p>
                    {/*<p className="code__text">+ 7 (___) ___-__-__</p>*/}
                    <p className="code__text">{formatPhoneNumber(phone)}</p>
                    <ul className={'code__list js-code__list ' + (error ? 'error' : '')} ref={codeListRef}>
                        {[...Array(6)].map((_, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        className="js-code__input"
                                        maxLength="1"
                                        type="text"
                                        ref={(el) => inputsRef.current[index] = el}
                                        onInput={(e) => handleCodeInputChange(e, index)}
                                        onKeyDown={(e) => handleCodeInputKeyDown(e, index)}
                                    />
                                </label>
                            </li>
                        ))}
                    </ul>
                    <p className={'code__error-text ' + (error ? 'error' : '')}>Введён неверный код</p>
                    <code className="code__text-p">
                        Запросить код в СМС через 00:<Timer />
                    </code>
                    <code className="code__text-p">Не приходит СМС</code>
                    <div className="code__agree"></div>
                    <button
                        onClick={confirmPhone}
                        className={'login__button js-code-login__button ' + (isCodeValid() ? 'accept active' : 'error')}
                        disabled={!isCodeValid()}
                    >
                        <span>Ввести код</span>
                        <svg width="160" height="54" viewBox="0 0 160 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M80 0.410836C103.165 0.334295 143.15 -1.58022 153.375 4.37261C161.519 6.365 162.294 43.7203 154.926 49.1991C149.657 55.0626 144.774 54.0599 75.5679 53.7097C28.0143 53.4697 13.8666 55.0339 5.81303 49.6957C-1.36144 44.9403 -2.13706 11.3442 4.84351 4.86947C9.30332 -2.10367 58.1405 0.483113 80 0.410836Z" />
                        </svg>
                    </button>
                </form>
            </div>
        </main>
    )
}
