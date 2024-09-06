import React, {useEffect, useRef} from "react";
import supportHeart from '../../img/support-heart.svg'
import supportTelegram from '../../img/support-telegram.svg'

export default function Support() {
    const ref = useRef()
    const tgTef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tgTef.current && !tgTef.current.contains(event.target) && !ref.current.contains(event.target)) {
                tgTef.current.classList.remove('active')
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <div className="support">
            <div className="support__wrapper">
                <div ref={ref} onClick={() => tgTef.current.classList.toggle('active')} className="support__block">
                    <span className="support-bg-svg">
                                    <svg
                                        width="65"
                                        height="66"
                                        viewBox="0 0 65 66"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                          d="M56.7773 33C56.7773 46.669 46.0322 57.75 32.7773 57.75C27.3469 57.75 8.77927 57.75 8.77927 57.75C8.77927 57.75 12.9371 47.4544 11.2731 44.0022C9.67562 40.688 8.77734 36.9522 8.77734 33C8.77734 19.331 19.5225 8.25 32.7773 8.25C46.0322 8.25 56.7773 19.331 56.7773 33Z"
                                          stroke-width="5.64774"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      />
                                    </svg>
                                  </span>
                    <span className="support__heart">
                        <img src={supportHeart} alt=""/>
                    </span>
                    <div className="support-hint">Служба поддержки</div>
                </div>
                <a ref={tgTef} href="https://t.me/kidsprojecttop" className="support__telegram">
                    <div className="support__telegram-icon">
                        <img src={supportTelegram} alt="@kidsprojecttop"/>
                    </div>
                </a>
            </div>
        </div>
    )
}
