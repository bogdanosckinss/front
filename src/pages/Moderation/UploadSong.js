import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import {UploadFileService} from "../../services/uploadFileService.js";
import axios from "axios";

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
            const response = await privateAxios.get('content/songs', {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            setSongs(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    async function test(e) {
        e.preventDefault()

        // try {
        //     let response = await fetch('https://api.exolve.ru/messaging/v1/SendSMS', {
        //         method: 'POST',
        //         headers: {
        //             "access-control-allow-origin": "*",
        //             'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //             'Access-Control-Allow-Methods': '*',
        //             Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRV05sMENiTXY1SHZSV29CVUpkWjVNQURXSFVDS0NWODRlNGMzbEQtVHA0In0.eyJleHAiOjIwNDA4MjI1OTMsImlhdCI6MTcyNTQ2MjU5MywianRpIjoiZjU2ZTE2ZDAtZWE4ZC00MjBiLTkyMTktOTg5NWM0NTllNjBiIiwiaXNzIjoiaHR0cHM6Ly9zc28uZXhvbHZlLnJ1L3JlYWxtcy9FeG9sdmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiY2Q0YmVhOTEtNmUwOS00MTVlLTljYjYtZTE3YjUwMDc2NTI1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYTEyNjczMGYtNDgxMC00YjRjLTlmZmUtZjMzMTZkOTIyMDNmIiwic2Vzc2lvbl9zdGF0ZSI6ImZjN2EzMzczLTk2MmYtNDliYi04NzQwLWFlYzI4YjgyMjlhNiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1leG9sdmUiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJleG9sdmVfYXBwIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJmYzdhMzM3My05NjJmLTQ5YmItODc0MC1hZWMyOGI4MjI5YTYiLCJ1c2VyX3V1aWQiOiJiNzk3OTA0Yi0zOThlLTRlZjYtYWU2NS1iYTZiOTc0ZGE0NTQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudEhvc3QiOiIxNzIuMjAuMi4yMiIsImNsaWVudElkIjoiYTEyNjczMGYtNDgxMC00YjRjLTlmZmUtZjMzMTZkOTIyMDNmIiwiYXBpX2tleSI6dHJ1ZSwiYXBpZm9uaWNhX3NpZCI6ImExMjY3MzBmLTQ4MTAtNGI0Yy05ZmZlLWYzMzE2ZDkyMjAzZiIsImJpbGxpbmdfbnVtYmVyIjoiMTIzMzk2MiIsImFwaWZvbmljYV90b2tlbiI6ImF1dDFjYmRlYjg4LTU4ODAtNDA2Ny05ZTdjLWZjOTQ2MWZmYjc1OSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1hMTI2NzMwZi00ODEwLTRiNGMtOWZmZS1mMzMxNmQ5MjIwM2YiLCJjdXN0b21lcl9pZCI6IjQ0OTYzIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4yMC4yLjIyIn0.T_qjSPsbRcWnEjbiLKVhoL70hmOjbX6o8-wZ3qWkOoA8ez57ILTVwIUcj9-Kw0W33XZbIIMRa0aNAoqd1Jg5h8aTZFjS9gNKpNSLlK8CpvpRWfuPP3tZoN0VsEb4uSJLzFQzIRjyCUtceomIb7gVuLeNWs0W-y2pq7fgbSU3j-TmIBsyEXX-A9uws2sNdJK67HXP_JJzsspDJwmMWikTlgABIvYJbLa8BVQMKKsk23-sZ1voCmB5YILNcu84BVJ83ilwiVBSXNomNLxY8LhqidWA38wUQ8aArPlNwzPVE0_no9xMdAnU54QpZyt4LYg8XhdGMFQYIrEgtwJFUASOaA',
        //         },
        //         body: JSON.stringify({
        //             number: "79842698582",
        //             destination: "79051243600",
        //             text: 'Код',
        //         })})
        // } catch(e) {
        //         console.log(e)
        //     }

        axios.post('https://api.exolve.ru/messaging/v1/SendSMS', {
                "number": "79842698582",
                "destination": "79051243600",
                "text": 'Код'
            },
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRV05sMENiTXY1SHZSV29CVUpkWjVNQURXSFVDS0NWODRlNGMzbEQtVHA0In0.eyJleHAiOjIwNDA4MjI1OTMsImlhdCI6MTcyNTQ2MjU5MywianRpIjoiZjU2ZTE2ZDAtZWE4ZC00MjBiLTkyMTktOTg5NWM0NTllNjBiIiwiaXNzIjoiaHR0cHM6Ly9zc28uZXhvbHZlLnJ1L3JlYWxtcy9FeG9sdmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiY2Q0YmVhOTEtNmUwOS00MTVlLTljYjYtZTE3YjUwMDc2NTI1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYTEyNjczMGYtNDgxMC00YjRjLTlmZmUtZjMzMTZkOTIyMDNmIiwic2Vzc2lvbl9zdGF0ZSI6ImZjN2EzMzczLTk2MmYtNDliYi04NzQwLWFlYzI4YjgyMjlhNiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1leG9sdmUiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJleG9sdmVfYXBwIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJmYzdhMzM3My05NjJmLTQ5YmItODc0MC1hZWMyOGI4MjI5YTYiLCJ1c2VyX3V1aWQiOiJiNzk3OTA0Yi0zOThlLTRlZjYtYWU2NS1iYTZiOTc0ZGE0NTQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudEhvc3QiOiIxNzIuMjAuMi4yMiIsImNsaWVudElkIjoiYTEyNjczMGYtNDgxMC00YjRjLTlmZmUtZjMzMTZkOTIyMDNmIiwiYXBpX2tleSI6dHJ1ZSwiYXBpZm9uaWNhX3NpZCI6ImExMjY3MzBmLTQ4MTAtNGI0Yy05ZmZlLWYzMzE2ZDkyMjAzZiIsImJpbGxpbmdfbnVtYmVyIjoiMTIzMzk2MiIsImFwaWZvbmljYV90b2tlbiI6ImF1dDFjYmRlYjg4LTU4ODAtNDA2Ny05ZTdjLWZjOTQ2MWZmYjc1OSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1hMTI2NzMwZi00ODEwLTRiNGMtOWZmZS1mMzMxNmQ5MjIwM2YiLCJjdXN0b21lcl9pZCI6IjQ0OTYzIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4yMC4yLjIyIn0.T_qjSPsbRcWnEjbiLKVhoL70hmOjbX6o8-wZ3qWkOoA8ez57ILTVwIUcj9-Kw0W33XZbIIMRa0aNAoqd1Jg5h8aTZFjS9gNKpNSLlK8CpvpRWfuPP3tZoN0VsEb4uSJLzFQzIRjyCUtceomIb7gVuLeNWs0W-y2pq7fgbSU3j-TmIBsyEXX-A9uws2sNdJK67HXP_JJzsspDJwmMWikTlgABIvYJbLa8BVQMKKsk23-sZ1voCmB5YILNcu84BVJ83ilwiVBSXNomNLxY8LhqidWA38wUQ8aArPlNwzPVE0_no9xMdAnU54QpZyt4LYg8XhdGMFQYIrEgtwJFUASOaA`,
                    "access-control-allow-origin": "*",
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Methods': 'POST',
                }
            }).then((res) => {
            console.log(res)
        })
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
        const imageLink = await uploadFileService.upload(image, 'images')
        setImageLink(imageLink)
    }

    async function uploadSong(song) {
        const songLink = await uploadFileService.upload(song, 'songs')
        setPlusLink(songLink)
    }

    async function uploadSongMinus(song) {
        const minusLink = await uploadFileService.upload(song, 'songs')
        setMinusLink(minusLink)
    }

    return (
        <form style={{border: 'solid black 1px', padding: 10, margin: 10}}>
            <div>

                <button onClick={test}>TEST</button>
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
