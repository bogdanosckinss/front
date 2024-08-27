import React, {useState} from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import {UploadFileService} from "../Services/uploadFileService";

export default function Upload() {
    const privateAxios = useAxiosPrivate()
    const [video, setVideo] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [socialMediaLink, setSocialMediaLink] = useState('')
    const uploadFileService = new UploadFileService()

    async function upload(event) {
        event.preventDefault()

        let response = {}
        try {
            response = await privateAxios.post('http://localhost:3000/content/create', {
                video,
                image,
                name,
                lastname,
                phone_number: phone,
                email,
                age,
                city,
                social_media_link: socialMediaLink
            })
        } catch (err) {
            console.log(err)
        }

        console.log(response)
    }

    async function uploadImage(image) {
        await uploadFileService.upload(image, setImage)
        // const imageRef = ref(storage, image.name)
        // const uploadTask =  uploadBytesResumable(imageRef, image)
        //
        // uploadTask.on('state_changed', snapshot => {
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     }, error => {
        //         console.error(error)
        //     },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
        //             console.log(downloadedURL)
        //             setImage(downloadedURL)
        //         })
        //     })
    }

    async function uploadVideo(video) {
        await uploadFileService.upload(video, setVideo)
        // const imageRef = ref(storage, video.name)
        // const uploadTask =  uploadBytesResumable(imageRef, video)
        //
        // uploadTask.on('state_changed', snapshot => {
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     }, error => {
        //         console.error(error)
        //     },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
        //             console.log(downloadedURL)
        //             setVideo(downloadedURL)
        //         })
        //     })
    }

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10}}>
            <div>
                <div>
                    <label>Video</label>
                    <input onChange={async (e) => await uploadVideo(e.target.files[0])} type='file' accept='video/*'/>
                </div>
                <div>
                    <label>Image</label>
                    <img style={{width: 300}} src={image} />
                    <input onChange={async (e) => await uploadImage(e.target.files[0])} type='file' accept='image/*' />
                </div>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text'/>
                </div>

                <div>
                    <label>Lastname</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)}  type='text'/>
                </div>

                <div>
                    <label>Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)}  type='number'/>
                </div>

                <div>
                    <label>Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)}  type='text'/>
                </div>

                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  type='text'/>
                </div>

                <div>
                    <label>City</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)}  type='text'/>
                </div>

                <div>
                    <label>Social media link</label>
                    <input value={socialMediaLink} onChange={(e) => setSocialMediaLink(e.target.value)}  type='text'/>
                </div>
                <button onClick={async (e) => {
                    await upload(e)
                }}>Upload Content
                </button>
            </div>
        </form>
    )
}
