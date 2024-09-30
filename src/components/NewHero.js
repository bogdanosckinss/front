import React from "react";
import webc1 from '../img/bear/web-c1.svg'
import webc2 from '../img/bear/web-c2.svg'
import webc3 from '../img/bear/web-c3.svg'
import webc4 from '../img/bear/web-c4.svg'
import webc5 from '../img/bear/web-c5.svg'
import webc6 from '../img/bear/web-c6.svg'
import webc7 from '../img/bear/web-c7.svg'
import webc8 from '../img/bear/web-c8.svg'
import webc9 from '../img/bear/web-c9.svg'
import webcTail from '../img/bear/web-tail.svg'
import webcCbg from '../img/bear/web-cbg.svg'
import newHero from '../img/new-hero.svg'
import newHeroMob from '../img/new-hero-mob.svg'
export default function NewHero() {
    return (
        <div className="new-hero">
            <div className="new-hero__wrapper">
                <div className="container">
                    <p className="hero-text">Онлайн-конкурс <span>детских</span> талантов</p>

                    <div className="new-hero-item bear">
                        <div className="cloud cloudAnim">
                            <div className="cloud-wrapper">
                                <img
                                    src={webc1}
                                    alt="circle"
                                    className="circle c1 ca1"
                                />
                                <img
                                    src={webc2}
                                    alt="circle"
                                    className="circle c2 ca2"
                                />
                                <img
                                    src={webc3}
                                    alt="circle"
                                    className="circle c3 ca3"
                                />
                                <img
                                    src={webc4}
                                    alt="circle"
                                    className="circle c4 ca4"
                                />
                                <img
                                    src={webc5}
                                    alt="circle"
                                    className="circle c5 ca5"
                                />
                                <img
                                    src={webc6}
                                    alt="circle"
                                    className="circle c6 ca6"
                                />
                                <img
                                    src={webc7}
                                    alt="circle"
                                    className="circle c7 ca7"
                                />
                                <img
                                    src={webc8}
                                    alt="circle"
                                    className="circle c8 ca8"
                                />
                                <img
                                    src={webc9}
                                    alt="circle"
                                    className="circle c9 ca9"
                                />
                                <img src={webcTail} alt="tail" className="tail taila"/>
                                <img src={webcCbg} alt="circle" className="cbg"/>
                                <p className="cloud-text">
              <span className="line1">
                <span className="animText t1"> Ко</span
                ><span className="animText t2">нкурс </span>
                <span className="animText t3"> тала</span
                ><span className="animText t4">нтов </span>
                <span className="animText t5"> завер</span
                ><span className="animText t6">шен</span>
              </span>
                                    <span className="line2">
                <span className="animText t5">Спа</span
                ><span className="animText t4">сибо </span>
                <span className="animText t3"> всем </span>
                <span className="animText t4">участ</span
                ><span className="animText t5">никам</span>
              </span>
                                    <span className="line3">
                <br/>
                <span className="animText t6">за </span>
                <span className="animText t5"> ви</span
                ><span className="animText t4">део </span>
                <span className="animText t3"> и  </span>
                <span className="animText t2">эмо</span
                ><span className="animText t1">ции!</span>
              </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="new-hero__image hero__image">
                        <picture>
                            <source srcSet={newHero} media="(min-width: 551px)"/>
                            <img src={newHeroMob} alt="Dema"/>
                        </picture>
                    </div>

                    <div className="hero__bottom">
                        <a href="#winnersnew" className="button-special new-hero__btn">
                            <span className="">Победители конкурса</span>
                            <svg
                                height="55"
                                viewBox="0 0 320 55"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M154.908 1.00516C203.279 0.921354 281.028 0.130691 302.379 6.64852C323.73 13.1663 324.86 38.5267 310.182 47.0927C299.179 53.5127 288.799 54.9793 144.287 54.5958C44.9881 54.333 30.8864 53.2509 14.0693 47.406C-2.74781 41.5612 -6.24645 17.2465 13.2892 9.1567C40.4336 -2.08093 109.262 1.0843 154.908 1.00516Z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
