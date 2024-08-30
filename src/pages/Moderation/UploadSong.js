import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {UploadFileService} from "../../services/uploadFileService";

export default function UploadSong() {
    const privateAxios = useAxiosPrivate()
    const [minusLink, setMinusLink] = useState('')
    const [plusLink, setPlusLink] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [songs, setSongs] = useState([])
    const uploadFileService = new UploadFileService()

    async function getSongs() {
        try {
            const response = await privateAxios.get('content/songs')
            setSongs(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getSongs()
    }, [])

    async function upload(event) {
        event.preventDefault()

        let response = {}
        try {
            response = await privateAxios.post('content/create/song', {
                minus_link: minusLink,
                plus_link: plusLink,
                image_link: imageLink,
                title: title,
                description: description,
                author_name: authorName,
            })
        } catch (err) {
            console.log(err)
        }

        console.log(response)
    }

    async function uploadImage(image) {
        await uploadFileService.upload(image, setImageLink)
    }

    async function uploadSong(song) {
        await uploadFileService.upload(song, setPlusLink)
    }

    async function uploadSongMinus(song) {
        await uploadFileService.upload(song, setMinusLink)
    }

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10}}>
            <div>
                <div>
                    <label>Minus</label>
                    <input onChange={async (e) => await uploadSongMinus(e.target.files[0])} type='file'
                           accept='audio/*'/>
                </div>

                <div>
                    <label>Plus</label>
                    <input onChange={async (e) => await uploadSong(e.target.files[0])} type='file'
                           accept='audio/*'/>
                </div>

                <div>
                    <label>Image</label>
                    <img style={{width: 300}} src={imageLink}/>
                    <input onChange={async (e) => await uploadImage(e.target.files[0])} type='file' accept='image/*'/>
                </div>

                <div>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type='text'/>
                </div>

                <div>
                    <label>Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type='text'/>
                </div>

                <div>
                    <label>Author</label>
                    <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} type='text'/>
                </div>


                <button onClick={async (e) => {
                    await upload(e)
                }}>Upload Content
                </button>
            </div>

            <div style={{marginTop: 100}}>
                {songs.map(song => {
                    return(
                        <div style={{border: 'solid orange', marginBottom: 10}}>
                            <p>Song name: {song.title}</p>
                            <p>Singer: {song.author_name}</p>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}
