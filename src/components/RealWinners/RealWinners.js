import React from "react";
import SingleVideo from "./SingleVideo.js";
export default function RealWinners() {
    return (
        <div id="winnersnew" className="real-winners">
            <div className="real-winners__wrapper">
                <div className="container">
                    <div className="real-winners__title">Победители конкурса</div>
                    <div lang="ru" className="real-winners__subtitle">
                        Для получения призов мы свяжемся <br/>с вами по телефону или почте,
                        которую вы указывали при регистрации заявки
                    </div>
                    <ul className="videos-result__list">
                        <SingleVideo
                            age={9}
                            city={'Москва'}
                            singer={'Марьяна Локель, Вау Вероника'}
                            song={'Не малышка'}
                            song_icon={'https://like2024.storage.yandexcloud.net/images/2b0b3cfe-4756-482a-8441-3cecf8d6d7f4.jpeg'}
                            likes={7662}
                            name={'Софья Носова'}
                            link={'https://like2024.storage.yandexcloud.net/videos/2e0963ef-7ca9-48fc-b147-6cc3b0b32df9.mp4'}
                        />
                        <SingleVideo
                            age={11}
                            city={'Красноярск'}
                            singer={'Miroslava'}
                            song={'Сама'}
                            song_icon={'https://like2024.storage.yandexcloud.net/images/402185b7-bd25-4a96-b5aa-3a8da7b406a5.jpeg'}
                            likes={141}
                            name={'Мирослава Злобина'}
                            photo={'https://storage.yandexcloud.net/like2024/images/09707762-4835-4b18-91fa-69a89a0b64d0.image/2024-10-03%2015.58.11.jpg'}
                            link={'https://like2024.storage.yandexcloud.net/videos/08fe6e0f-c66b-4311-baa4-dee17f167d3a.mov'}
                        />
                        <SingleVideo
                            age={14}
                            city={'Тула'}
                            singer={'Milana Star'}
                            song={'Barbie'}
                            song_icon={'https://like2024.storage.yandexcloud.net/images/00182e06-ad78-4bca-b00c-c7de56f93048.jpeg'}
                            likes={211}
                            name={'Низор Дармарик'}
                            link={'https://like2024.storage.yandexcloud.net/videos/1678f2b6-00c3-4168-ad6a-b2dc7663d4a7.mp4'}
                        />
                    </ul>
                </div>
            </div>
        </div>

    )
}
