import React from "react";

export default function Support({support, showAuth, token, close, tryAgain, tryEmail}) {
    return (
        <div className={'login__container forms-popup js-forms-popup ' + ((support && showAuth && token) ? 'active' : '')}>
            <div className="login__forw-wrapper">
                <button onClick={close} className="login-btn-close js-login-btn-close">
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
                <form className="form form-problems">
                    <h1 className="login__title">Проблемы со входом?</h1>
                    <p className="code__text">
                        Обратитесь в службу поддержки
                    </p>
                    <div className="form-problems__btns">
                        <button onClick={(e) => {
                            e.preventDefault()
                            tryAgain()
                        }} className="form-problems__buttin">
                            <span>Попробовать снова</span>
                            <svg
                                width="203"
                                height="54"
                                viewBox="0 0 203 54"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M101.5 0.410836C130.89 0.334295 181.621 -1.58022 194.594 4.37261C204.927 6.365 205.911 43.7203 196.562 49.1991C189.877 55.0626 183.682 54.0599 95.8767 53.7097C35.5432 53.4697 17.5933 55.0339 7.37528 49.6957C-1.72733 44.9403 -2.71139 11.3442 6.1452 4.86947C11.8036 -2.10367 73.7658 0.483113 101.5 0.410836Z"
                                />
                            </svg>
                        </button>
                        {/*<button onClick={(e) => {*/}
                        {/*    e.preventDefault()*/}
                        {/*    tryEmail()*/}
                        {/*}} className="form-problems__buttin">*/}
                        {/*    <span>Получить Email-код</span>*/}
                        {/*    <svg*/}
                        {/*        width="203"*/}
                        {/*        height="54"*/}
                        {/*        viewBox="0 0 203 54"*/}
                        {/*        fill="none"*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*    >*/}
                        {/*        <path*/}
                        {/*            d="M101.5 0.410836C130.89 0.334295 181.621 -1.58022 194.594 4.37261C204.927 6.365 205.911 43.7203 196.562 49.1991C189.877 55.0626 183.682 54.0599 95.8767 53.7097C35.5432 53.4697 17.5933 55.0339 7.37528 49.6957C-1.72733 44.9403 -2.71139 11.3442 6.1452 4.86947C11.8036 -2.10367 73.7658 0.483113 101.5 0.410836Z"*/}
                        {/*        />*/}
                        {/*    </svg>*/}
                        {/*</button>*/}
                        <a target="_blank" href='https://t.me/kidsprojecttop' class="form-problems__buttin">
                            <span>Служба поддержки </span>
                            <svg
                                width="203"
                                height="54"
                                viewBox="0 0 203 54"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M101.5 0.410836C130.89 0.334295 181.621 -1.58022 194.594 4.37261C204.927 6.365 205.911 43.7203 196.562 49.1991C189.877 55.0626 183.682 54.0599 95.8767 53.7097C35.5432 53.4697 17.5933 55.0339 7.37528 49.6957C-1.72733 44.9403 -2.71139 11.3442 6.1452 4.86947C11.8036 -2.10367 73.7658 0.483113 101.5 0.410836Z"
                                />
                            </svg>
                        </a>
                    </div>
                    {/*<a target="_blank" href="https://t.me/kidsprojecttop" className="form-problems__support-link">Служба поддержки</a>*/}
                </form>
            </div>
        </div>
    )
}
