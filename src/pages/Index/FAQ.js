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
                                        Могу ли я спеть свою песню на видео?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Да, мы организуем трансфер для победителей, если они проживают
                                        не в Москве и МО.
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
                                        Да, мы организуем трансфер для победителей, если они проживают
                                        не в Москве и МО.
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
                                        Да, мы организуем трансфер для победителей, если они проживают
                                        не в Москве и МО.
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
                                        Да, мы организуем трансфер для победителей, если они проживают
                                        не в Москве и МО.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem activeClassName='is-active faq__item ac' className="faq__item ac">
                                <AccordionItemHeading className="ac-header">
                                    <AccordionItemButton className="ac-trigger">
                                        Если я стану победителем в конкурсе, мне придёт уведомление?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="ac-panel">
                                    <p className="ac-text">
                                        Да, мы организуем трансфер для победителей, если они проживают
                                        не в Москве и МО.
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
