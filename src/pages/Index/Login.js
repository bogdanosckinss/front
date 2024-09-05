import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {setIsAuthenticated, setShowAuth} from "../../features/auth/authSlice";
import Timer from "../../components/Timer/Timer";
import Support from "../../components/Support/Support";

export default function Login() {
    const dispatch = useDispatch()
    const { showAuth } = useSelector((state) => state.auth)
    const [isChecked, setIsChecked] = useState(false);
    const privateAxios = useAxiosPrivate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('+7 (___) ___-__-__')
    const [code, setCode] = useState('')
    const [token, setToken] = useState('')
    const [restart, setRestart] = useState(false)
    const inputsRef = useRef([]);
    const codeListRef = useRef(null);
    const [error, setError] = useState(false);
    const [support, setSupport] = useState(false);
    const [hideConfirmation, setHideConfirmation] = useState(false);
    const [isMasked, setIsMasked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
    }

    async function sendCodeViaSms(event) {
        event.preventDefault()

        const formattedPhone = phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '')

        let response = {}
        try {
            response = await privateAxios.post('auth/create', {
                phone_number: formattedPhone,
                name: name
            },{
                withCredentials: true
            })

            setRestart(true)
            setToken(response.data.confirmationToken)
            localStorage.setItem('confirmationToken', response.data.confirmationToken)
            localStorage.setItem('confirmationCode', response.data.confirmationCode)
        } catch (err) {
            console.log(err)
        }
    }

    function handleNumberInput(event) {
        const value = event.target.value

        let input = value.replace(/\D/g, '');

        if (input.length > 1) {
            input = `+7 (${input.substring(1, 4)}) ${input.substring(4, 7)}-${input.substring(7, 9)}-${input.substring(9, 11)}`;
        }

        setPhone(input)
    }

    const handleInputFocus = () => {
        if (!isMasked) {
            setPhone('+7 (___) ___-__-__');
            setIsMasked(true);
        }
    };


    function hideModal() {
        dispatch(setShowAuth(false))
        setToken('')
        setSupport(false)
        setHideConfirmation(false)
    }

    function showModal() {
        dispatch(setShowAuth(true))
        setToken('')
        setSupport(false)
        setHideConfirmation(false)
    }

    function resetRestart() {
        setRestart(false)
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

        try {
            await privateAxios.post('auth/confirm-phone', {
                    confirmationToken: localStorage.getItem('confirmationToken'),
                    confirmationCode: code
                },
                {
                    withCredentials: true
                })
            dispatch(setIsAuthenticated(true))
            hideModal()
        } catch (err) {
            console.log(err)
            dispatch(setIsAuthenticated(false))
            setError(true)
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
    }, []);

    return (
        <div className="login">
            <div id='login-bg' onClick={hideModal} className="login-bg js-login-bg" style={showAuth ? {display: 'block'} : {display: 'none'}}></div>
            <div className="login__container forms-popup js-forms-popup" style={showAuth && !token ? {display: 'block'} : {display: 'none'}}>
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
                        <label className="login__label"
                        ><input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ваше имя"
                        /></label>
                        <label className="login__label"
                        ><input value={phone} onFocus={handleInputFocus} className="js-phone-input" onChange={handleNumberInput} type="text" placeholder="Ваш номер телефона"
                        /></label>
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
                                    Даю согласие на обработку данных в соответствии c
                                    <a
                                        href="https://bonus.detmir.ru/pdn_lk
"
                                    >
                                        политикой обработки персональных данных
                                    </a>
                                    <br/>
                                    и
                                    <a href="https://www.detmir.ru/privacy_policy/"
                                    >политикой конфиденциальности</a
                                    >.
                                </p>
                            </label>
                        </div>
                        <button
                            onClick={sendCodeViaSms}
                            className={'login__button js-login__button ' + ((isChecked && phone.length == 18) ? 'active' : '')}
                            disabled={!isChecked || phone.length < 18   }>
                            <span>Получить код по СМС</span>
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
            <div className="login__container forms-popup js-forms-popup" style={showAuth && token && !hideConfirmation ? {display: 'block'} : {display: 'none'}}>
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
                        <h1 className="login__title">Введите код из СМС</h1>
                        <p className="code__text">Код был отправлен на номер</p>
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
                        <code className="code__text-p">Запросить код в СМС через 00:<Timer restart={restart} resetRestart={resetRestart} /></code>
                        <code className="code__text-p" style={{cursor: 'pointer'}} onClick={() => {
                            setSupport(true)
                            setHideConfirmation(true)
                        }}>Не приходит СМС</code>
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
            <Support support={support} showAuth={showAuth} token={token} close={() => hideModal()} tryAgain={showModal} />
        </div>
    )
}
