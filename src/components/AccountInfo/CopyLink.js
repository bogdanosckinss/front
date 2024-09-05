import React from "react";

export default function CopyLink() {
    return (
        <div className="application-approved-tooltip">
            <button id="application-approved-button">
                <span
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
    )
}
