import React, {useRef, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

export default function User({ user }) {
    const privateAxios = useAxiosPrivate()
    const ref = useRef()
    const [showData, setShowData] = useState(false)

    function deleteUser(userId) {
        try {
            privateAxios.delete("users/delete/" + userId).then(() => {
                if (ref.current) {
                    ref.current.style.display = 'none'
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <article
            ref={ref}
            style={{
                flexShrink: 0,
                border: "solid #0647C7",
                margin: "10px auto",
                width: "300px",
                padding: "10px 15px",
                borderRadius: "20px",
            }}
        >
            <h3>ID: { user?.id }</h3>
            <h3>Почта: { user?.email ?? '/Отсутствует/' }</h3>
            {
                showData ? <>
                        <img
                            src={user?.image}
                            style={{width: "100%"}}
                            alt="Фото отсутствует"
                        />
                        <h3>Имя: {(user?.lastname ?? '') + ' ' + (user?.name ?? '')}</h3>
                        <h3>Номер: {user?.phone_number ?? '/Отсутствует/'}</h3>
                        <h3>Соц. сеть: {user?.social_media_link ?? '/Отсутствует/'}</h3>
                        <h3>Город: {user?.city ?? '/Отсутствует/'}</h3>
                    </> :
                    <button style={{fontWeight: 'bold', border: 0, padding: 0, fontSize: '15px', marginTop: '10px'}}
                            onClick={() => setShowData(true)}>Детальнее</button>
            }

            <button
                onClick={() => {
                    if (window.confirm('Вы уверенны что хотите удалить пользователя с ID ' + user.id + '?')) {
                        deleteUser(user.id)
                    }
                }}
                style={{
                    display: 'flex',
                    margin: '10px auto',
                    background: "black",
                    color: "white",
                    padding: "8px 13px",
                    borderRadius: "10px",
                    fontSize: "20px",
                }}
            >
                Удалить
            </button>
        </article>
    );
}
