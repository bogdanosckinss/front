import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../utils/firebase";

export class UploadFileService {
    async upload(file, setFileUrl){
        const fileRef = ref(storage, `images/${new Date().getTime()}`)
        const uploadTask =  uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, error => {
                console.error(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
                    console.log(downloadedURL)
                    setFileUrl(downloadedURL)
                })
            })
    }
}
