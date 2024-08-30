import {useNavigate} from "react-router-dom";

export default function VideoHeader() {
    const navigate = useNavigate()

    return (
        <header className="header video-header">
            <div className="header__container">
                <div className="header__wrapper">
                    <div className="header__block">
                        <div className="video-header__back">
                            <a href="././videos.html">
                                <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.0005 27.0002L13.5005 18.0002L21.0005 9.00024"
                                        stroke="#E1F0FF"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </a>
                        </div>
                        <form action="" className="header__form">
                            <div className="header__search-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.6205 15.5338C14.8651 15.7573 15.2446 15.7402 15.4682 15.4955C15.6917 15.2509 15.6745 14.8714 15.4299 14.6479L14.6205 15.5338ZM11.5492 6.50213C11.5492 9.20212 9.32942 11.4043 6.5746 11.4043V12.6043C9.97731 12.6043 12.7492 9.87962 12.7492 6.50213H11.5492ZM6.5746 11.4043C3.81978 11.4043 1.6 9.20212 1.6 6.50213H0.4C0.4 9.87962 3.17189 12.6043 6.5746 12.6043V11.4043ZM1.6 6.50213C1.6 3.80213 3.81978 1.6 6.5746 1.6V0.4C3.17189 0.4 0.4 3.12464 0.4 6.50213H1.6ZM6.5746 1.6C9.32942 1.6 11.5492 3.80213 11.5492 6.50213H12.7492C12.7492 3.12464 9.97731 0.4 6.5746 0.4V1.6ZM9.59531 10.943L14.6205 15.5338L15.4299 14.6479L10.4047 10.057L9.59531 10.943Z"
                                    />
                                </svg>
                            </div>
                            <label>
                                <input
                                    type="text"
                                    className="header__search-input"
                                    placeholder="Поиск"
                                />
                            </label>
                            <div className="header__search-load">
                                <img src="././img/header-loading.svg" alt="img"/>
                            </div>
                            <div className="header__search-close">
                                <img src="././img/header-close.svg" alt="img"/>
                            </div>
                            <ul className="header-search__result-list">
                                <li className="header-search__result-item">
                                    <a href="#">
                <span className="header-search__result-loop">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.6205 15.5338C14.8651 15.7573 15.2446 15.7402 15.4682 15.4955C15.6917 15.2509 15.6745 14.8714 15.4299 14.6479L14.6205 15.5338ZM11.5492 6.50213C11.5492 9.20212 9.32942 11.4043 6.5746 11.4043V12.6043C9.97731 12.6043 12.7492 9.87962 12.7492 6.50213H11.5492ZM6.5746 11.4043C3.81978 11.4043 1.6 9.20212 1.6 6.50213H0.4C0.4 9.87962 3.17189 12.6043 6.5746 12.6043V11.4043ZM1.6 6.50213C1.6 3.80213 3.81978 1.6 6.5746 1.6V0.4C3.17189 0.4 0.4 3.12464 0.4 6.50213H1.6ZM6.5746 1.6C9.32942 1.6 11.5492 3.80213 11.5492 6.50213H12.7492C12.7492 3.12464 9.97731 0.4 6.5746 0.4V1.6ZM9.59531 10.943L14.6205 15.5338L15.4299 14.6479L10.4047 10.057L9.59531 10.943Z"
                    />
                  </svg>
                </span>
                                        <span className="header-search__result-text">
                  Salvador Anna-Maria Garcia Makhuenbaeg
                </span>
                                        <span className="header-search__result-link"
                                        ><img src="././img/search-arrow.svg" alt="icon"
                                        /></span>
                                    </a>
                                </li>
                                <li className="header-search__result-item">
                                    <a href="#">
                <span className="header-search__result-loop">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.6205 15.5338C14.8651 15.7573 15.2446 15.7402 15.4682 15.4955C15.6917 15.2509 15.6745 14.8714 15.4299 14.6479L14.6205 15.5338ZM11.5492 6.50213C11.5492 9.20212 9.32942 11.4043 6.5746 11.4043V12.6043C9.97731 12.6043 12.7492 9.87962 12.7492 6.50213H11.5492ZM6.5746 11.4043C3.81978 11.4043 1.6 9.20212 1.6 6.50213H0.4C0.4 9.87962 3.17189 12.6043 6.5746 12.6043V11.4043ZM1.6 6.50213C1.6 3.80213 3.81978 1.6 6.5746 1.6V0.4C3.17189 0.4 0.4 3.12464 0.4 6.50213H1.6ZM6.5746 1.6C9.32942 1.6 11.5492 3.80213 11.5492 6.50213H12.7492C12.7492 3.12464 9.97731 0.4 6.5746 0.4V1.6ZM9.59531 10.943L14.6205 15.5338L15.4299 14.6479L10.4047 10.057L9.59531 10.943Z"
                    />
                  </svg>
                </span>
                                        <span className="header-search__result-text">
                  Елизавета Кириллова
                </span>
                                        <span className="header-search__result-link"
                                        ><img src="././img/search-arrow.svg" alt="icon"
                                        /></span>
                                    </a>
                                </li>
                            </ul>
                        </form>
                        <a onClick={() => {
                            navigate({
                                pathname: '/account',
                            }, {replace: false})
                        }} style={{cursor: 'pointer'}} role='button' className="header__button-block">
                            <span>участвовать</span>
                            <svg
                                width="149"
                                height="44"
                                viewBox="0 0 149 44"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M72.1291 0.28748C94.6518 0.219193 130.854 -0.425051 140.795 4.88577C150.737 10.1966 151.263 30.8606 144.428 37.8403C139.305 43.0714 134.472 44.2664 67.1835 43.9539C20.9475 43.7398 14.3814 42.8581 6.55099 38.0956C-1.27947 33.3331 -2.90852 13.5212 6.18777 6.92948C18.8269 -2.22711 50.8753 0.351962 72.1291 0.28748Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>

    )
}
