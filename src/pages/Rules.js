import React, {useEffect, useRef} from "react";
import headerLogo from '../img/logo-main.svg'
import {setIsAuthenticated, setShowAuth, setUserInfo} from "../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Rules() {
    const dispatch = useDispatch()
    const privateAxios = useAxiosPrivate()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const mobhead = useRef()
    const burger = useRef()

    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('body-rules')
    }, [])

    function toggleMob(e) {
        e.preventDefault()
        document.querySelector('#mobile_menu_toggle').classList.toggle('active');
        document.querySelector('.mobile__menu').classList.toggle('active');
        document.querySelector('.js-login-bg').classList.toggle('active');

        document.querySelector('.top__hamburger').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }

    async function toggleAuth(e, isMobile) {
        e.preventDefault()

        if (!isAuthenticated) {
            if (isMobile) {
                toggleMob(e)
            }
            dispatch(setShowAuth(true))
            return
        }

        try {
            await privateAxios.delete('/auth/logout')
            localStorage.clear()
            dispatch(setIsAuthenticated(false))
            dispatch(setUserInfo({}))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <header className="header header-rules-page">
                <div className="header__container">
                    <div className="header__wrapper">
                        <div className="header__block">
                            <div className="header__logo">
                                <a href="/">
                                    <img src={headerLogo} alt="logo"/>
                                </a>
                            </div>
                            <nav className="header__nav">
                                <ul className="header__list">
                                    <li><a href="#rules">Правила конкурса</a></li>
                                    <li><a href="#prizes">Призы</a></li>
                                    <li><a href="#voting">Как проголосовать</a></li>
                                </ul>
                                <button
                                    onClick={(e) => toggleAuth(e)}
                                    className="header__button-block header__button-real js-header__button-block"
                                >
                                    <span>{isAuthenticated ? 'Выйти' : 'Войти'}</span>
                                    <svg
                                        width="91"
                                        height="44"
                                        viewBox="0 0 91 44"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M44.052 0.28748C57.8075 0.219193 79.9174 -0.425051 85.989 4.88577C92.0606 10.1966 92.3821 30.8606 88.2079 37.8403C85.079 43.0714 82.1271 44.2664 41.0316 43.9539C12.7935 43.7398 8.78331 42.8581 4.00095 38.0956C-0.781407 33.3331 -1.77633 13.5212 3.77912 6.92948C11.4983 -2.22711 31.0715 0.351962 44.052 0.28748Z"
                                            fill="white"
                                            fill-opacity="0.3"
                                        />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="header__mobile mobile__menu">
                <a id="mobile_menu_toggle" href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div className="top__hamburger">
                <div className="top__hamburger-cover">
                    <div className="top__hamburger-logo">
                        <a href="./">
                            <img src={headerLogo} alt="logo"/>
                        </a>
                    </div>
                    <ul>
                        <li>
                            <a href="#rules">Правила конкурса</a>
                        </li>

                        <li>
                            <a href="#prizes">Как проголосовать</a>
                        </li>
                        <li>
                            <a href="#voting"> Призы</a>
                        </li>
                    </ul>
                    <button
                        className="button-special join__button header-hamb-btn js-header__button-block-mob"
                    >
                        <span className="">Войти</span>
                        <svg
                            width="188"
                            height="45"
                            viewBox="0 0 188 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M91.0085 0.78748C119.426 0.719193 165.104 0.0749492 177.648 5.38577C190.191 10.6966 190.855 31.3606 182.232 38.3403C175.768 43.5714 169.669 44.7664 84.7685 44.4539C26.4305 44.2398 18.1457 43.3581 8.2657 38.5956C-1.61434 33.8331 -3.66979 14.0212 7.80742 7.42948C23.7547 -1.72711 64.1916 0.851962 91.0085 0.78748Z"
                                fill="white"
                                fill-opacity="0.3"
                            />
                        </svg>
                    </button>
                </div>
            </div>


            <main>
                <div className="rules">
                    <div className="rules__wrapper">
                        <div className="rules__container">
                            <div className="rules__title">
                                Правила и условия участия в конкурсе «Конкурс талантов»
                            </div>
                            <ol className="rules__main-list">
                                <li>
                                    Общие положения
                                    <ul className="rules-sublist">
                                        <li>
                                            1.1. Наименование конкурса «Конкурс талантов» (далее –
                                            «Конкурс»).
                                        </li>
                                        <li>
                                            1.2. Организатором конкурса «Конкурс талантов» является
                                            Общество с ограниченной ответственностью
                                            «ДМ»: ОГРН1237770205232 <br/>Юридический адрес: 119415,
                                            г. Москва, пр. Вернадского, д. 37, корп. 3 <br/>Почтовый
                                            адрес: 127238, г. Москва, 3-й Нижнелихоборский пр-д,
                                            д. 3 с. 6 (далее — Организатор).
                                        </li>
                                        <li>
                                            1.3. Партнёром акции является ООО «Контекстно-Медийные
                                            Технологии»:ОГРН 1126829002520 <br/>Юридический адрес:
                                            392036, Тамбовская область, г. Тамбов, ул. Коммунальная,
                                            д. 18, кв. 3 <br/>Почтовый адрес: 392036, Тамбовская
                                            область, г. Тамбов, ул. Коммунальная, д. 18, кв. 3
                                        </li>
                                        <li>
                                            1.4. Конкурс «Конкурс талантов» направлен на поддержание
                                            интереса к сети магазинов «Детский мир»,
                                            <br/>а также на его популяризацию и продвижение. <br/>
                                            Конкурс не является публичным конкурсом в смысле
                                            гл. 57 Гражданского кодекса Российской Федерации (далее –
                                            «РФ»), <br/>не является лотереей в смысле Федерального
                                            закона РФ от 11.11.2003 № 138-ФЗ «О лотереях», участие
                                            в нем не связано <br/>с внесением платы Участниками
                                            и не основано на риске.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    В Конкурсе могут принять участие только лица, соответствующие
                                    всем <br />
                                    следующим требованиям (далее – «Участники»):
                                    <ul>
                                        <li>граждане Российской Федерации;</li>
                                        <li>
                                            совершеннолетние граждане РФ (достигшие 18-летнего
                                            возраста);
                                        </li>
                                        <li>дееспособные;</li>
                                        <li>
                                            являющиеся зарегистрированными владельцами именной учётной
                                            записи в социальных сетях Вконтакте, или Инстаграм*,
                                            или Likee;
                                        </li>
                                        <li>
                                            К участию в Конкурсе не допускаются сотрудники Организатора,
                                            аффилированных с ним компаний, <br /> а также членов
                                            их семей.
                                        </li>
                                    </ul>
                                </li>
                                <li>Конкурс проводится на территории Российской Федерации.</li>
                                <li>
                                    Сроки проведения конкурса
                                    <ul>
                                        <li>
                                            Общий срок проведения Конкурса — с 00:00 2 сентября
                                            2024 года по 23:59 19 октября 2024 года включительно  (далее — Период проведения Конкурса), из них:
                                        </li>
                                        <li>
                                            период приёма заявок на участие в Конкурсе с 00:00
                                            02.09.2024–23:59 22.09.2024 г. (включительно);
                                        </li>
                                        <li>
                                            период определения победителей в Конкурсе с 00:00
                                            23.09.2024 по 23:59 30.09.2024 г. (включительно);
                                        </li>
                                        <li>
                                            период размещения информации о победителях с 00:00
                                            01.10.24 по 23:59 01.10.24 (включительно);
                                        </li>
                                        <li>
                                            период связи с победителями с 00:00 01.10.2024 по 23:59
                                            10.10.24 (включительно);
                                        </li>
                                        <li>
                                            период выдачи призов с 00:00 19.10.2024 по 23:59 19.10.2024
                                            (включительно)
                                        </li>
                                        <li>
                                            4.1. Любое время, указанное в настоящих Правилах, считается
                                            по Московскому времени.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Условия участия в Конкурсе
                                    <ul>
                                        <li>
                                            5.1. Для того чтобы принять участие в Конкурсе, Участнику
                                            необходимо в Период приёма заявок на участие в Конкурсе  с 02.09.2024 по 22.09.2024 г. (включительно):
                                        </li>
                                        <li>
                                            5.1.1. С 02.09.2024 по 22.09.2024 г. выполнить Творческую
                                            работу — снять видео, где участник (ребёнок) поёт
                                            под минусовую  фонограмму или аккомпанемент одной из песен,
                                            указанных в п._________.
                                        </li>
                                        <li>
                                            5.1.2. С 02.09.2024 по 22.09.2024 г. авторизоваться на сайте
                                            конкурса like.detmir.ru и загрузить на сайт получившуюся  творческую работу, указав ФИО участника, номер телефона,
                                            почту, город участника, возраст, а также выбрав
                                            из выпадающего  списка песню, которую участник исполняет
                                            в своей творческой работе. Участники, выполнив указанные
                                            условия, тем самым подтверждают, что полностью ознакомлены
                                            и согласны с настоящими Правилами.
                                        </li>
                                        <li>
                                            5.1.3. В период с 00:00 01.10.24 по 23:59 10.10.24 участник
                                            должен ознакомиться со списком победителей Конкурса на сайте  like.detmir.ru. Партнёр акции связывается с победителями
                                            конкурса в течении времени, указанного в п 4., посредством  отправки сообщения на электронный адрес, указанный
                                            участником при загрузке творческой работы на like.detmir.ru.
                                        </li>
                                        <li>
                                            5.2. В случае несоответствия критериям, перечисленным
                                            в пункте
                                        </li>
                                        <li>
                                            5.1., а также требованиям п.2. настоящих правил,  Организатор вправе исключить Участника из конкурса,
                                            направив соответствующее уведомление по электронной почте.  Участника о таком исключении в течение 10 (десяти) рабочих
                                            дней с момента исключения Участника из конкурса.
                                        </li>
                                        <li>
                                            5.3. Каждое загруженное видео на like.detmir.ru является
                                            заявкой на участие в Конкурсе при условии выполнения  остальных условий конкурса, указанных в п.5.1 настоящих
                                            Правил. Количество заявок для участия в Конкурсе от одного  участника не ограничивается.
                                        </li>
                                    </ul>
                                </li>
                                <li>Определение победителей Конкурса</li>
                                <li>Призовой фонд Конкурса.</li>
                                <li>Условия и порядок получения призов Конкурса</li>
                                <li>Иные условия Конкурса</li>
                                <li>О персональных данных</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="login">
                    <div className="login-bg js-login-bg"></div>
                    <div className="login__container forms-popup js-forms-popup">
                        <div className="login__forw-wrapper">
                            <button className="login-btn-close js-login-btn-close">
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
                                        stroke-opacity="0.25"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </button>
                            <form className="form">
                                <h1 className="login__title">Вход или регистрация</h1>
                                <label className="login__label"
                                ><input type="text" placeholder="Ваше имя"
                                /></label>
                                <label className="login__label"
                                ><input type="text" placeholder="Ваш номер телефона"
                                /></label>
                                <div className="login__agree">
                                    <label className="login__label-check">
                                        <input
                                            className="login__check-input js-login__check-input"
                                            type="checkbox"
                                        />
                                        <span className="checkmark"></span>
                                        <p>
                                            Даю согласие на обработку данных в соответствии c
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
                                <button className="login__button js-login__button">
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
                    <div className="login__container forms-popup js-forms-popup">
                        <div className="login__forw-wrapper">
                            <button className="login-btn-close js-login-btn-close">
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
                                        stroke-opacity="0.25"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </button>
                            <form className="form">
                                <h1 className="login__title">Введите код из СМС</h1>
                                <p className="code__text">Код был отправлен на номер</p>
                                <p className="code__text">+ 7 (___) ___-__-__</p>
                                <ul className="code__list js-code__list error">
                                    <li>
                                        <label
                                        ><input className="js-code__input" maxLength="1" type="text"
                                        /></label>
                                    </li>
                                    <li>
                                        <label
                                        ><input className="js-code__input" maxLength="1" type="text"
                                        /></label>
                                    </li>
                                    <li>
                                        <label
                                        ><input className="js-code__input" maxLength="1" type="text"
                                        /></label>
                                    </li>
                                    <li>
                                        <label
                                        ><input className="js-code__input" maxLength="1" type="text"
                                        /></label>
                                    </li>
                                    <li>
                                        <label
                                        ><input className="js-code__input" maxLength="1" type="text"
                                        /></label>
                                    </li>
                                    <li>
                                        <label
                                        ><input className="js-code__input" maxLength="1" type="text"
                                        /></label>
                                    </li>
                                </ul>
                                <p className="code__error-text">Введён неверный код</p>
                                <code className="code__text-p">Запросить код в СМС через 00:00</code>
                                <code className="code__text-p">Не приходит СМС</code>
                                <div className="code__agree"></div>
                                <button className="login__button js-code-login__button">
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
                    <div className="login__container forms-popup js-forms-popup">
                        <div className="login__forw-wrapper">
                            <button className="login-btn-close js-login-btn-close">
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
                                        stroke-opacity="0.25"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </button>
                            <form className="form form-problems">
                                <h1 className="login__title">Проблемы со входом?</h1>
                                <p className="code__text">Обратитесь в службу поддержки</p>
                                <div className="form-problems__btns">
                                    <button className="form-problems__buttin">
                                        <span> Попробовать снова</span>
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
                                    <button className="form-problems__buttin">
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
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
