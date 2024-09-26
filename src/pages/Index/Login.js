import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import {setIsAuthenticated, setLoading, setShowAuth, setShowEmailAuth} from "../../features/auth/authSlice.js";
import Timer from "../../components/Timer/Timer.js";
import Support from "../../components/Support/Support.js";
import {useNavigate} from "react-router-dom";

export default function Login({redirectAfterLogin = true, postLoginAction = () => {}}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { showAuth, showEmailAuth } = useSelector((state) => state.auth)
    const [isChecked, setIsChecked] = useState(false);
    const privateAxios = useAxiosPrivate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [token, setToken] = useState('')
    const [tokenSent, setTokenSent] = useState(false)
    const [restart, setRestart] = useState(false)
    const [isAllowedToResendCode, setIsAllowedToResendCode] = useState(true)
    const inputsRef = useRef([]);
    const codeListRef = useRef(null);
    const [error, setError] = useState(false);
    const [support, setSupport] = useState(false);
    const [hideConfirmation, setHideConfirmation] = useState(true);
    const [isMasked, setIsMasked] = useState(false)
    const [sentViaPhone, setSentViaPhone] = useState(false)
    const phoneRef = useRef(null)
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
    }

    async function sendCodeViaSms(event) {
        event.preventDefault()
        const formattedPhone = unmaskedPhone()
        setSentViaPhone(true)
        setRestart(true)
        setIsAllowedToResendCode(false)
        setTokenSent(true)

        let response = {}
        try {
            response = await privateAxios.post('auth/create', {
                phone: formattedPhone,
                name: name
            },{
                withCredentials: true
            })

            //setToken(response.data.confirmationToken)
            localStorage.setItem('confirmationToken', response.data.confirmationToken)
            localStorage.setItem('confirmationCode', response.data.confirmationCode)
            localStorage.setItem('checks','checked')
        } catch (err) {
            console.log(err)
        }
    }

    async function sendCodeViaEmail(event) {
        event.preventDefault()

        setHideConfirmation(false)
        setSentViaPhone(false)
        setRestart(true)
        setIsAllowedToResendCode(false)
        setTokenSent(true)

        let response = {}
        try {
            response = await privateAxios.post('auth/create/email', {
                email: email,
                name: name
            },{
                withCredentials: true
            })

            setToken(response.data.confirmationToken)
            localStorage.setItem('confirmationToken', response.data.confirmationToken)
            localStorage.setItem('confirmationCode', response.data.confirmationCode)
            localStorage.setItem('checks', 'checked')
            dispatch(setShowEmailAuth(false))
        } catch (err) {
            console.log(err)
        }
    }

    function unmaskedPhone() {
        return phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '')
    }

    function cleanedNumber(value) {
        return ('' + value).replace(/\D/g, '')
    }

    function handleNumberInput(event) {
        const phone = event.target.value
        const cleaned = cleanedNumber(phone)
        let value = ''

        if (cleaned.length == 1 && cleaned != '7') {
            value = '+ 7 (' + cleaned.slice(0, 4)
        }else {
            value = '+ 7 (' + cleaned.slice(1, 4)
        }

        if (cleaned.length > 4) {
            value += ') ' + cleaned.slice(4, 7)
        }

        if (cleaned.length > 7) {
            value += '-' + cleaned.slice(7, 9)
        }

        if (cleaned.length > 9) {
            value += '-' + cleaned.slice(9, 11)
        }

        setPhone(value)
    }

    const handleInputFocus = (event) => {
        if (!isMasked) {
            setPhone('+7 (___) ___-__-__');
            setIsMasked(true)
        }
    }

    useEffect(() => {
        if (isMasked) {
            if (phone == '+7 (___) ___-__-__' || phone == '') {
                phoneRef.current.setSelectionRange(2, 2)
            }
            if (phone == '+ 7 (') {
                phoneRef.current.setSelectionRange(5, 5)
            }
        }
    }, [isMasked])

    useEffect(() => {
        if (!isAllowedToResendCode) {
            setHideConfirmation(false)
        }
    }, [showAuth]);


    function hideModal() {
        dispatch(setShowAuth(false))
        dispatch(setShowEmailAuth(false))
        //setToken('')
        //setTokenSent(false)
        setSupport(false)
        setHideConfirmation(true)
    }

    function showModal() {
        dispatch(setShowAuth(true))
        setToken('')
        setTokenSent(false)
        setSupport(false)
        setHideConfirmation(true)
    }

    function showEmailModal() {
        dispatch(setShowAuth(true))
        dispatch(setShowEmailAuth(true))
        setToken('')
        setTokenSent(false)
        setSupport(false)
        setHideConfirmation(false)
    }

    function resetRestart() {
        setRestart(false)
        setIsAllowedToResendCode(false)
    }

    function allowResendCode() {
        setIsAllowedToResendCode(true)
    }

    function checkReplacement(str) {
        const validChars = /^[\d\+\(\)\-\s]*$/;
        if (!validChars.test(str)) {
            return false
        }

        return !/_/.test(str) && phone.length == 19
    }


    function isEmailValid() {
        if (email == null) {
            return true;
        }
        return email?.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }




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
        dispatch(setLoading(true))

        try {
            const response = await privateAxios.post('auth/confirm-phone', {
                    confirmationToken: localStorage.getItem('confirmationToken'),
                    confirmationCode: code
                },
                {
                    withCredentials: true
                })
            window.ym(98274871,'reachGoal','confirmed')
            localStorage.setItem('rf', response.data.refreshToken)
            dispatch(setIsAuthenticated(true))
            hideModal()
            dispatch(setLoading(false))

            if (postLoginAction) {
                postLoginAction()
            }

            if (redirectAfterLogin) {
                navigate('/videos')
            }
        } catch (err) {
            console.log(err)
            dispatch(setIsAuthenticated(false))
            setError(true)
            dispatch(setLoading(false))
        }
    }

    function formatPhoneNumber(number) {
        const cleaned = ('' + number).replace(/\D/g, '');
        const formatted = '+ 7 (' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7, 9) + '-' + cleaned.slice(9, 11);

        return formatted;
    }

    useEffect(() => {
        const codeList = codeListRef.current;
        const observer = new MutationObserver(updateButtonState);
        observer.observe(codeList, { attributes: true });
        updateButtonState(); // Initial check

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (phoneRef.current && !phoneRef.current.contains(event.target)) {
                if (phone == '+7 (___) ___-__-__') {
                    setPhone('')
                    setIsMasked(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [phone])

    return (
        <div className="login">
            <div id='login-bg' onClick={hideModal} className="login-bg js-login-bg"
                 style={showAuth ? {display: 'block'} : {display: 'none'}}></div>
            {/*<div className="login__container forms-popup js-forms-popup"*/}
            {/*     style={showAuth && !tokenSent && 1 > 2 ? {display: 'block'} : {display: 'none'}}>*/}
            {/*    <div className="login__forw-wrapper">*/}
            {/*        <button className="login-btn-close js-login-btn-close" onClick={hideModal}>*/}
            {/*            <svg*/}
            {/*                width="24"*/}
            {/*                height="24"*/}
            {/*                viewBox="0 0 24 24"*/}
            {/*                fill="none"*/}
            {/*                xmlns="http://www.w3.org/2000/svg"*/}
            {/*            >*/}
            {/*                <path*/}
            {/*                    d="M7 7L12 12M12 12L7 17M12 12L17 7M12 12L17 17"*/}
            {/*                    stroke="black"*/}
            {/*                    strokeOpacity="0.25"*/}
            {/*                    strokeWidth="2"*/}
            {/*                    strokeLinecap="round"*/}
            {/*                    strokeLinejoin="round"*/}
            {/*                ></path>*/}
            {/*            </svg>*/}
            {/*        </button>*/}
            {/*        <form className="form">*/}
            {/*            <h1 className="login__title">Вход или регистрация</h1>*/}
            {/*            <label className="login__label"*/}
            {/*            ><input value={name} onChange={(e) => setName(e.target.value)} type="text"*/}
            {/*                    placeholder="Ваше имя"*/}
            {/*            /></label>*/}
            {/*            <label className="login__label"*/}
            {/*            ><input ref={phoneRef} onClick={(event) => {*/}
            {/*                if (phone == '+7 (___) ___-__-__') {*/}
            {/*                    event.target.setSelectionRange(2, 2)*/}
            {/*                }*/}
            {/*                if (phone == '+ 7 (') {*/}
            {/*                    event.target.setSelectionRange(5, 5)*/}
            {/*                }*/}
            {/*            }} value={phone} pattern='[0-9]*' className="js-phone-input"*/}
            {/*                    onChange={(e) => handleNumberInput(e)} onFocus={handleInputFocus} inputMode='tel'*/}
            {/*                    placeholder="Ваш номер телефона"/>*/}
            {/*            </label>*/}
            {/*            <div className="login__agree">*/}
            {/*                <label className="login__label-check">*/}
            {/*                    <input*/}
            {/*                        className="login__check-input js-login__check-input"*/}
            {/*                        type="checkbox"*/}
            {/*                        checked={isChecked}*/}
            {/*                        onChange={handleCheckboxChange}*/}
            {/*                    />*/}
            {/*                    <span className="checkmark"></span>*/}
            {/*                    <p>*/}
            {/*                        Даю согласие на обработку данных в соответствии c <a*/}
            {/*                        target="_blank"*/}
            {/*                        href="https://bonus.detmir.ru/pdn_lk">*/}
            {/*                        политикой обработки персональных данных*/}
            {/*                    </a>*/}
            {/*                        <br/>*/}
            {/*                        и <a target="_blank" href="https://www.detmir.ru/privacy_policy/"*/}
            {/*                    >политикой конфиденциальности</a*/}
            {/*                    >.*/}
            {/*                    </p>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*            <button*/}
            {/*                onClick={sendCodeViaSms}*/}
            {/*                className={'login__button js-login__button ' + ((isChecked && checkReplacement(phone) && name) ? 'active' : '')}*/}
            {/*                disabled={!isChecked || !checkReplacement(phone) || !name}>*/}
            {/*                <span>Получить код по СМС</span>*/}
            {/*                <svg*/}
            {/*                    width="361"*/}
            {/*                    height="55"*/}
            {/*                    viewBox="0 0 361 55"*/}
            {/*                    fill="none"*/}
            {/*                    xmlns="http://www.w3.org/2000/svg"*/}
            {/*                >*/}
            {/*                    <path*/}
            {/*                        d="M180.5 0.413057C232.765 0.336102 322.982 -1.58876 346.051 4.39624C364.426 6.3994 366.176 43.9566 349.551 49.465C337.663 55.3602 326.645 54.3521 170.5 54C63.2073 53.7586 31.2866 55.3313 13.1157 49.9643C-3.07175 45.1832 -4.82174 11.4056 10.9282 4.89578C20.9906 -2.11504 131.18 0.485724 180.5 0.413057Z"*/}
            {/*                    />*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="login__container forms-popup js-forms-popup"
                 style={showAuth && !hideConfirmation && !support ? {display: 'block'} : {display: 'none'}}>
                <div className="login__forw-wrapper">
                    <button onClick={hideModal} className="login-btn-close js-login-btn-close">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 7L12 12M12 12L7 17M12 12L17 7M12 12L17 17"
                                stroke="black"
                                strokeOpacity="0.25"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <form className="form">
                        <h1 className="login__title">Введите код из {sentViaPhone ? 'СМС' : 'Email'}</h1>
                        <p className="code__text">Код был отправлен на {sentViaPhone ? 'номер' : 'почту'}</p>
                        <p className="code__text">{sentViaPhone ? phone : email}</p>
                        <ul className={'code__list js-code__list ' + (error ? 'error' : '')} ref={codeListRef}>
                            {[...Array(6)].map((_, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            className="js-code__input"
                                            maxLength="1"
                                            type="text"
                                            pattern="\d*"
                                            ref={(el) => inputsRef.current[index] = el}
                                            onInput={(e) => handleCodeInputChange(e, index)}
                                            onKeyDown={(e) => handleCodeInputKeyDown(e, index)}
                                        />
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p className={'code__error-text ' + (error ? 'error' : '')}>Введён неверный код</p>
                        <code className="code__text-p">Запросить код в {sentViaPhone ? 'СМС' : 'Email'} через 00:<Timer restart={restart}
                                                                                           resetRestart={resetRestart}
                                                                                           allowResendCode={allowResendCode}
                        /></code>
                        <code id="code__dont-receive" className="code__text-p" style={isAllowedToResendCode ? {cursor: 'pointer'} : {cursor: 'not-allowed'}} onClick={() => {
                            if (isAllowedToResendCode) {
                                setSupport(true)
                                setHideConfirmation(true)
                            }
                        }}>Не приходит {sentViaPhone ? 'СМС' : 'Email'}</code>
                        <div className="code__agree"></div>
                        <button onClick={confirmPhone}
                                className={'login__button js-code-login__button ' + (isCodeValid() ? 'accept active' : 'error')}
                                disabled={!isCodeValid()}>
                            <span>Ввести код</span>
                            <svg
                                width="160"
                                height="54"
                                viewBox="0 0 160 54"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M80 0.410836C103.165 0.334295 143.15 -1.58022 153.375 4.37261C161.519 6.365 162.294 43.7203 154.926 49.1991C149.657 55.0626 144.774 54.0599 75.5679 53.7097C28.0143 53.4697 13.8666 55.0339 5.81303 49.6957C-1.36144 44.9403 -2.13706 11.3442 4.84351 4.86947C9.30332 -2.10367 58.1405 0.483113 80 0.410836Z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <div
                className="login__container forms-popup js-forms-popup"
                style={showAuth && isAllowedToResendCode && hideConfirmation && !support ? {display: 'block'} : {display: 'none'}}
            >
                <div className="login__forw-wrapper">
                    <button className="login-btn-close js-login-btn-close" onClick={hideModal}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 7L12 12M12 12L7 17M12 12L17 7M12 12L17 17"
                                stroke="black"
                                strokeOpacity="0.25"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <form className="form">
                        <h1 className="login__title">Вход или регистрация</h1>
                        <label className="login__label">
                            <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="login__label">
                            <input
                                className="js-phone-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <div className="login__agree">
                            <label className="login__label-check">
                                <input
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="login__check-input js-login__check-input"
                                    type="checkbox"
                                />
                                <span className="checkmark"></span>
                                <p>
                                    Даю согласие на обработку данных в соответствии c <a
                                        target="_blank"
                                        href="https://bonus.detmir.ru/pdn_lk
"
                                    >
                                        политикой обработки персональных данных
                                    </a>
                                    <br/>
                                    и <a target="_blank" href="https://www.detmir.ru/privacy_policy/">
                                        политикой конфиденциальности
                                    </a>.
                                </p>
                            </label>
                        </div>
                        <button
                            onClick={sendCodeViaEmail}
                            className={'login__button js-login__button ' + ((isChecked && isEmailValid() && name) ? 'active' : '')}
                            disabled={!isChecked || !isEmailValid() || !name}>
                            <span>Получить код по Email</span>
                            <svg
                                width="361"
                                height="55"
                                viewBox="0 0 361 55"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M180.5 0.413057C232.765 0.336102 322.982 -1.58876 346.051 4.39624C364.426 6.3994 366.176 43.9566 349.551 49.465C337.663 55.3602 326.645 54.3521 170.5 54C63.2073 53.7586 31.2866 55.3313 13.1157 49.9643C-3.07175 45.1832 -4.82174 11.4056 10.9282 4.89578C20.9906 -2.11504 131.18 0.485724 180.5 0.413057Z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <Support
                support={support}
                showAuth={showAuth}
                token={tokenSent}
                close={() => hideModal()}
                tryAgain={showModal}
                tryEmail={showEmailModal}
            />
        </div>
    )
}
