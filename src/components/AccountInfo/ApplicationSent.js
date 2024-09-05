import React from "react";
import applicationSent from '../../img/application-sent.svg'

export default function ApplicationSent() {
    return (
        <div className="application-sent">
                  <span className="application-sent-span"
                  ><img src={applicationSent} alt="icon"/></span
                  ><span className="application-sent__text"
        >Заявка отправлена
                  </span>
        </div>
    )
}
