import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

export default function TryAgain({removeVideo}) {
    const privateAxios = useAxiosPrivate()

    async function tryAgain(){
        try {
            await privateAxios.delete('/content/video')
            removeVideo()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="try-again display-web">
            <div className="try-again__left">
                <div className="try-again__title">
                    Убедитесь, что ваше видео соответствует всем требованиям
                    конкурса, и попробуйте снова
                </div>
                <div className="try-again__text">
                    Если у вас возникли вопросы или нужна помощь, не стесняйтесь
                    обратиться в службу поддержки
                </div>
            </div>
            <button onClick={tryAgain} className="try-again__btn button-special">
                <span>Попробовать снова</span>
                <svg
                    width="260"
                    height="50"
                    viewBox="0 0 260 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M125.863 0.326681C165.164 0.249083 228.335 -0.483012 245.683 5.55201C263.03 11.587 263.949 35.0688 252.023 43.0003C243.083 48.9448 234.649 50.3027 117.233 49.9476C36.5528 49.7043 25.0952 48.7023 11.4313 43.2905C-2.23259 37.8786 -5.07524 15.365 10.7975 7.8744C32.8523 -2.53081 88.7757 0.399956 125.863 0.326681Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>
    )
}
