import React, {useRef} from "react";
import CopyLink from "./CopyLink.js";
import ShareInSocials from "./ShareInSocials.js";
import TryUploadingAgain from "./TryUploadingAgain.js";

export default function ShareWithFriends({link, tryAgain, canShare, removeVideo}) {
    const input = useRef()

    return (
        <div className="application-approved display-mob" style={canShare || tryAgain ? {} : {display: 'none'}}>
            <div className="application-approved__title" style={canShare ? {} : {display: 'none'}}>
                Поделись ссылкой с друзьями, чтобы собрать больше голосов
            </div>
            <div className="account-share-block" style={canShare ? {} : {display: 'none'}}>
                <div className="account-share-block-left">
                    <input
                        ref={input}
                        className="account-share-block-left__input"
                        type="text"
                        value={link}
                        id="application-approved-myInput"
                    />
                    <CopyLink input={input} link={link}/>
                </div>

                <ShareInSocials link={link}/>
            </div>

            {tryAgain ?  <TryUploadingAgain removeVideo={removeVideo}/> : '' }
        </div>
    )
}
