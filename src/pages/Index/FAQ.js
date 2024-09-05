import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";

export default function FAQ() {
    return (
        <>
            <div className="faq">
                <div className="faq__wrapper">
                    <div className="container">
                        <div className="faq__title">FAQ</div>
                        <Accordion id="voting" allowZeroExpanded={true} allowMultipleExpanded={true}
                                   className="faq__list accordion-container">
                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Кто может принять участие в розыгрыше?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Мы запускаем конкурс для детей — ведь именно они смогут выступить на розовой дорожке с любимыми блогерами во время Премии «СуперЛайкШоу». Но так как в конкурсе могут участвовать только дееспособные граждане РФ достигшие 18-лет, видео своего ребенка должен загрузить родитель (или другой его законный представитель), и указать свои контакты для связи в случае победы ребенка.
                                        Родитель может принять участие в ролике — но мы ищем детские таланты, поэтому модерацию пройдут только видео, в которых песню исполняет ребенок.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Как принять участие?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Для участия нужно: записать видео, где ребенок поет один из треков, который заявлен в конкурсе, и загрузить видео на сайт like.detmir.ru с 9 по 29 сентября 2024г. Список треков, которые можно использовать, здесь. Важно исполнить трек самостоятельно: петь можно под минус или инструментальный аккомпанемент, но голос ребенка-участника должно быть хорошо слышно, чтобы жюри могло оценить вокальные данные ребенка.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Как будут выбирать победителей?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        В конкурсе 3 победителя. Первым победителем станет участник, чье видео соберет больше всего «лайков» на сайте конкурса с 9 по 29 сентября. Второго и третьего победителя выберет жюри.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Могу ли я просить проголосовать за себя друзей?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Да, конечно! Чем больше людей проголосуют за видео, тем больше шансов занять место первого победителя.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        В какие сроки проходит голосование?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Голосовать за работы участников можно с 9 по 29 сентября 2024г.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Могу ли я загрузить несколько видео?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Нет, участник может загрузить только одно видео.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Если я из другого города, оплачивается ли трансфер в Москву?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Если я из другого города, оплачивается ли трансфер в Москву?
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Если я стану победителем в конкурсе, как я получу свой приз?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        3 октября на сайте like.detmir.ru будут опубликованы итоги конкурса, и с каждым победителем мы свяжемся по контактным данным, указанным при загрузке видео на сайт. Призы вручим победителям 19 октября в концертном зале «Москва» на сцене Премии «СуперЛайкШоу».
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Не получается загрузить ролик. Что делать?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Если ролик не проходит модерацию, убедитесь, что он соответствует следующим требованиям: длительность 30 – 60 секунд, формат видео mp4, mov, avi, размером не более 50 Мб. Также проверьте, что в ролике ребенок исполняет один из треков, указанных в списке на сайте конкурса. Если все условия соблюдены, пожалуйста, обратитесь в службу поддержки конкурса.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Могу ли я проголосовать за несколько участников?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Да, можете. Но за каждого конкретного участника можно проголосовать только один раз.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Зачем регистрироваться для голосования за участника?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Таким образом мы сможем избежать накрутки голосов и убедиться, что вы проголосовали за одного участника только один раз.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Какой приз получит каждый победитель?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Каждый победитель получит возможность выступить на розовой дорожке Премии «СуперЛайкШоу» 19 октября в Москве в ТЦ «Остров мечты», и сертификат в студию звукозаписи Acoustic Records на запись собственной песни. Сертификат действует 6 месяцев и в него входит: запись песни в профессиональной студии, работа с опытным звукорежиссером, уникальная обработка вокала (правка неточных нот) и возможность получить готовую песню за 3-5 дней.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}
