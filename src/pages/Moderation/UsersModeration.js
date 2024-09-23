import React, { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import debounce from "lodash/debounce.js";
import User from "../../components/Moderation/User.js";

export default function UsersModeration() {
    const privateAxios = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState("");
    const [accessApproved, setAccessApproved] = useState(false);
    const [withAuthors, setWithAuthors] = useState(true);
    const [skipCount, setSkipCount] = useState(0);

    useEffect(() => {
        const key = localStorage.getItem('md_key')

        if (key && key == process.env.REACT_APP_SECRET_PASSWORD) {
            setAccessApproved(true)
        }
    }, []);


    const findMore = useCallback(
        debounce(async () => {
            let response = {};
            try {
                response = await privateAxios.get(
                    "users/list?skip=" + skipCount + (withAuthors ? '&authors=true' : '')
                )

                const allUsers = [...users, ...response.data]
                setUsers(allUsers)
                setSkipCount(allUsers.length)
            } catch (err) {
                console.log(err)
            }
        }, 1000),
        [privateAxios, users, withAuthors, skipCount]
    );

    useEffect(() => {
        if (accessApproved) {
            findMore()
        }
    }, [accessApproved, withAuthors])

    return (
        <>
            {accessApproved ? (
                <>
                    <h1>Пользователи {skipCount}</h1>
                    <button style={withAuthors ? {background: 'green', color: 'white'} : {}} onClick={() => {
                        setUsers([])
                        setWithAuthors(true)
                    }}>Все</button>
                    <button style={!withAuthors ? {background: 'green', color: 'white'} : {}} onClick={() => {
                        setUsers([])
                        setWithAuthors(false)
                    }}>Без авторов видео</button>
                    <div className="moderation" style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap'
                    }}>
                        {users.map((user) => {
                            return <User user={user} onDelete={() => setSkipCount(count => count - 1)} />
                        })}

                        <button
                            style={{
                                border: "2px solid blueviolet",
                                borderRadius: "10px",
                                display: "block",
                                margin: "10px auto",
                                fontSize: "28px",
                            }}
                            onClick={findMore}
                        >
                            Загрузить ещё
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <label>Пароль</label>
                    <input
                        style={{border: "solid black"}}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (password == process.env.REACT_APP_SECRET_PASSWORD) {
                                localStorage.setItem('md_key', password)
                                setAccessApproved(true)
                            }
                        }}
                    >
                        Войти
                    </button>
                </div>
            )}
        </>
    );
}
