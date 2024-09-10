import React from "react";

export default function MemoryLimitation() {
    return (
        <div
            className="account-error-video-gb account-error-video-position"
        >
            <div className="account-error-video__icon">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.53196 5.16459C7.18143 3.98375 7.50616 3.39333 7.93526 3.19799C8.30924 3.02775 8.73862 3.02775 9.1126 3.19799C9.5417 3.39333 9.86643 3.98375 10.5159 5.16459L14.4857 12.3825C15.0957 13.4915 15.4007 14.0461 15.3464 14.4996C15.2989 14.8953 15.0875 15.253 14.7636 15.4852C14.3924 15.7514 13.7595 15.7514 12.4938 15.7514H4.5541C3.28836 15.7514 2.65549 15.7514 2.28428 15.4852C1.96037 15.253 1.74892 14.8953 1.7015 14.4996C1.64716 14.0461 1.95215 13.4915 2.56214 12.3825L6.53196 5.16459Z"
                        fill="#FABC22"
                        stroke="#FABC22"
                        stroke-width="1.42086"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M8.52344 12.9105H8.53054M8.52344 7.9375V10.7792"
                        stroke="white"
                        stroke-width="1.42086"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div className="account-error-video__text">
                Видео превышает допустимый размер в 150Mб. Пожалуйста,
                прикрепите видео соответствующее параметрам загрузки.
            </div>
        </div>
    )
}
