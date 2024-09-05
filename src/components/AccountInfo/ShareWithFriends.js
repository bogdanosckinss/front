import React from "react";
import CopyLink from "./CopyLink";
import ShareInSocials from "./ShareInSocials";
import TryUploadingAgain from "./TryUploadingAgain";

export default function ShareWithFriends() {
    return (
        <div className="application-approved display-mob">
            <div className="application-approved__title">
                Поделись ссылкой с друзьями, чтобы собрать больше голосов
            </div>
            <div className="account-share-block">
                <div className="account-share-block-left">
                    <input
                        className="account-share-block-left__input"
                        type="text"
                        value="https://like.detmir.ru/proto/cEJyKj3v2554ImChsZdTbb/My-website-portfolio%"
                        id="application-approved-myInput"
                    />
                    <CopyLink/>
                </div>

                <ShareInSocials/>
            </div>

            <TryUploadingAgain/>
        </div>
    )
}
