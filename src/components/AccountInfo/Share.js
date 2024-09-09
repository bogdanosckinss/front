import React, {useEffect, useRef} from "react";

export default function Share({link}) {
    const tooltip = useRef()
    const input = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltip.current && !tooltip.current.contains(event.target)) {
                tooltip.current.innerHTML = 'Копировать ссылку'
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])


    return (
        <>
            <div className="application-approved__title">
                Поделись ссылкой с друзьями, чтобы собрать больше голосов
            </div>
            <div className="account-share-block">
                <div className="account-share-block-left">
                    <input
                        ref={input}
                        className="account-share-block-left__input"
                        type="text"
                        value={link}
                        id="application-approved-myInput"
                    />
                    <div className="application-approved-tooltip">
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigator.clipboard.writeText(link)

                            input.current.select()
                            input.current.setSelectionRange(0, 99999);

                            tooltip.current.innerHTML = 'скопировано: ' + link
                        }} id="application-approved-button">
                            <span
                                ref={tooltip}
                                className="application-approved-tooltiptext"
                                id="application-approved-myTooltip"
                            >Копировать ссылку</span>
                            <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.9996 3.64258C19.4437 3.64258 21 5.19813 21 10.6426C21 16.087 19.3839 17.6426 13.9996 17.6426C8.61538 17.6426 7 16.087 7 10.6426C7 5.19813 8.55555 3.64258 13.9996 3.64258Z"
                                    stroke="#0647C7"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M3.70258 9.64258C3.19943 10.752 3 12.2557 3 14.258C3 20.0016 4.70414 21.6426 10.3842 21.6426C12.3814 21.6426 13.887 21.4397 15 20.927"
                                    stroke="#0647C7"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <ul className="account-share-socials">
                    <li className="account-share-social">
                        <a href={'https://vk.com/share.php?url=' + link}>
                            <svg
                                width="29"
                                height="19"
                                viewBox="0 0 29 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.0238 18.5C6.4573 18.5 1.0008 11.7432 0.773438 0.5H5.56544C5.72285 8.75225 9.25555 12.2477 12.0538 12.9685V0.5H16.5662V7.61712C19.3294 7.31081 22.2323 4.06757 23.2117 0.5H27.7239C26.9719 4.8964 23.8239 8.13964 21.5853 9.47297C23.8239 10.5541 27.4093 13.3829 28.7734 18.5H23.8064C22.7395 15.0766 20.0815 12.4279 16.5662 12.0676V18.5H16.0238Z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li className="account-share-social">
                        <a href="">
                            <svg
                                width="26"
                                height="23"
                                viewBox="0 0 26 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.42965 11.9715L11.9838 2.42607C12.256 2.15412 12.189 1.69663 11.8501 1.51395C10.7741 0.934405 9.5434 0.605469 8.23557 0.605469C4.02139 0.605469 0.56519 4.09365 0.605823 8.30397C0.617545 9.51666 0.91292 10.662 1.42892 11.6761C1.43777 11.6933 1.47215 11.7565 1.5193 11.8421C1.70397 12.1773 2.15902 12.2421 2.42965 11.9715Z"
                                />
                                <path
                                    d="M22.9439 3.25309C23.1828 3.01446 23.164 2.6241 22.9064 2.40629C21.5772 1.28286 19.8586 0.605469 17.9814 0.605469C16.206 0.605469 14.5724 1.21129 13.276 2.22777C13.1702 2.31052 13.0707 2.40082 12.9757 2.49555C11.7595 3.71058 2.62138 12.8401 2.62138 12.8401C2.42837 13.0329 2.39815 13.3343 2.54766 13.5623C3.7599 15.4123 5.21125 17.0918 6.85796 18.5572C7.08587 18.7602 7.43282 18.7503 7.64875 18.5346L22.9439 3.25309Z"
                                />
                                <path
                                    d="M23.4012 3.85407L8.30527 18.9362C8.05782 19.1834 8.08699 19.5912 8.36543 19.8025C9.53652 20.6915 10.7886 21.4797 12.1087 22.154C12.1136 22.1566 12.1186 22.1592 12.1238 22.1615C12.1269 22.1634 12.1306 22.1649 12.1337 22.1665C12.136 22.1675 12.1379 22.1688 12.1402 22.1696C12.4309 22.3138 12.7586 22.3944 13.105 22.3944C13.4514 22.3944 13.7791 22.3138 14.0698 22.1696C14.0721 22.1686 14.0739 22.1673 14.0763 22.1665C14.0794 22.1649 14.0831 22.1634 14.0862 22.1615C14.0911 22.1592 14.0961 22.1566 14.1013 22.154C18.5533 19.8795 22.2327 16.3107 24.6423 11.9442C24.6598 11.9133 24.6767 11.8823 24.6937 11.8508C25.2769 10.7737 25.6079 9.54044 25.6079 8.23016C25.6079 6.63753 25.119 5.15914 24.2832 3.9363C24.08 3.63885 23.6562 3.5993 23.4015 3.85381L23.4012 3.85407Z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li className="account-share-social">
                        <a href={'https://t.me/share/url?url=' + link} >
                            <svg
                                width="24"
                                height="19"
                                viewBox="0 0 24 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.4682 8.67443C1.52005 8.6485 1.57192 8.62386 1.62248 8.60052C2.50137 8.19336 3.39192 7.81214 4.28118 7.43092C4.32915 7.43092 4.4095 7.37516 4.45487 7.35701C4.52357 7.32718 4.59228 7.29866 4.66099 7.26883L5.05637 7.09897C5.32081 6.98616 5.58394 6.87335 5.84838 6.76053C6.37598 6.53491 6.90356 6.30929 7.43116 6.08237C8.48634 5.63113 9.54284 5.17859 10.598 4.72735C11.6532 4.2761 12.7097 3.82356 13.7649 3.37232C14.8201 2.92107 15.8765 2.46853 16.9317 2.01729C17.9869 1.56605 19.0434 1.11351 20.0986 0.662262C20.3332 0.561121 20.5873 0.410707 20.8388 0.36662C21.0501 0.329016 21.2562 0.256403 21.4687 0.216206C21.8719 0.139702 22.3165 0.108582 22.7028 0.275853C22.8363 0.334203 22.9595 0.415894 23.0619 0.518331C23.5519 1.00329 23.4832 1.79945 23.3795 2.4815C22.6574 7.23512 21.9354 11.99 21.2121 16.7437C21.1136 17.3959 20.9787 18.1116 20.4641 18.524C20.0286 18.8728 19.4089 18.9117 18.871 18.7639C18.333 18.6148 17.8586 18.3023 17.3932 17.9949C15.463 16.7164 13.5315 15.4379 11.6014 14.1594C11.1425 13.856 10.6317 13.4592 10.6369 12.9081C10.6395 12.5761 10.8378 12.2805 11.0401 12.0173C12.7175 9.82847 15.1376 8.32433 16.9382 6.23668C17.1923 5.94233 17.3919 5.41069 17.0432 5.24083C16.8358 5.13969 16.5973 5.27714 16.408 5.4081C14.028 7.06136 11.6493 8.71592 9.26933 10.3692C8.49285 10.9086 7.67877 11.4636 6.74285 11.5958C5.90544 11.7151 5.06285 11.4817 4.25267 11.2431C3.57341 11.0435 2.89542 10.8386 2.22005 10.6272C1.86098 10.5157 1.49024 10.3951 1.21283 10.1423C0.935422 9.88942 0.775999 9.46411 0.943221 9.12697C1.04822 8.91561 1.25174 8.78205 1.46563 8.67313L1.4682 8.67443Z"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </>
)
}
