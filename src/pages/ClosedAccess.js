import React, {useState} from 'react'
import {UploadFileService} from "../services/uploadFileService.js";

export default function ClosedAccess() {
    const [link, setLink] = useState('')
    const [uploadingVideo, setUploadingVideo] = useState()
    const uploadFileService = new UploadFileService();

    async function uploadVideo(video) {
        setUploadingVideo(true);
        try {
            const link = await uploadFileService.uploadVideo(video, "videos");
            setLink(link)
            setUploadingVideo(false);
        } catch (err) {
            setUploadingVideo(false);
        }
    }

    return(
        <>
            <h1>{link}</h1>
            {uploadingVideo ? <p>loading...</p> : '' }
            <input onChange={async (e) => {
                if (e.target.files.length == 0) {
                    return;
                }

                await uploadVideo(e.target.files[0]);
            }}
                   type='file' />
        </>
    )
}
