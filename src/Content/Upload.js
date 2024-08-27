import React, {useState} from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

export default function Upload() {
    const privateAxios = useAxiosPrivate()

    async function upload(event) {
        event.preventDefault()

        let response = {}
        try {
            response = await privateAxios.post('http://localhost:3000/content/create', {
            })
        } catch (err) {
            console.log(err)
        }

        console.log(response)
    }

    return (
        <form>
            <div>
                <button onClick={async (e) => {
                    await upload(e)
                }}>Upload Content</button>
            </div>
        </form>
    )
}
