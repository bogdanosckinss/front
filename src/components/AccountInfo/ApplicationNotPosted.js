import React from "react";

export default function ApplicationNotPosted() {
    return (
        <div className="video-not-posted">
                  <span className="video-posted__icon">
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="11.5996" r="5.98291" fill="white"/>
                      <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.6414 20.8042C14.54 19.8149 20 16.5823 20 12.1212V8.33881C20 7.5393 20 7.13954 19.8692 6.79591C19.7537 6.49235 19.566 6.22149 19.3223 6.00674C19.0465 5.76365 18.6722 5.62328 17.9236 5.34256L12.5618 3.33188C12.3539 3.25392 12.25 3.21494 12.143 3.19949C12.0482 3.18578 11.9518 3.18578 11.857 3.19949C11.75 3.21494 11.6461 3.25392 11.4382 3.33188L6.0764 5.34256C5.3278 5.62328 4.9535 5.76365 4.67766 6.00674C4.43398 6.22149 4.24627 6.49235 4.13076 6.79591C4 7.13954 4 7.5393 4 8.33881V12.1212C4 16.5823 9.45996 19.8149 11.3586 20.8042C11.5639 20.9112 11.6666 20.9647 11.809 20.9924C11.92 21.014 12.08 21.014 12.191 20.9924C12.3334 20.9647 12.4361 20.9112 12.6414 20.8042ZM9.25414 10.0579C10.1309 9.34442 11.2978 9.55401 11.9976 10.3331C12.6974 9.55401 13.8492 9.35193 14.7411 10.0579C15.6329 10.7638 15.7413 11.9642 15.0527 12.808C14.664 13.2844 13.7404 14.1195 13.0098 14.7565C12.6633 15.0586 12.4901 15.2097 12.2805 15.2715C12.1018 15.3242 11.8934 15.3242 11.7147 15.2715C11.5051 15.2097 11.3319 15.0586 10.9854 14.7565C10.2548 14.1195 9.33119 13.2844 8.94247 12.808C8.25394 11.9642 8.37738 10.7713 9.25414 10.0579Z"
                          fill="white"
                      />
                      <path
                          d="M9.5 9.62122L14.5 14.6212M14.5 9.62122L9.5 14.6212"
                          stroke="#FF4F3E"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                    </svg>
                  </span>
            <span className="video-posted__text">Видео не опубликовано</span>
        </div>
    )
}
