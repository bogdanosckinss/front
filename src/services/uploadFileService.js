import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../utils/firebase";

export class UploadFileService {
    async upload(file, setFileUrl, setLoading = null){
        const fileRef = ref(storage, `images/${new Date().getTime()}`)
        const uploadTask =  uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (setLoading) {
                    setLoading(true)
                }
            }, error => {
                console.error(error)
            },
            () => {
                if (setLoading) {
                    setLoading(false)
                }
                getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
                    setFileUrl(downloadedURL)
                })
            })
    }
}
