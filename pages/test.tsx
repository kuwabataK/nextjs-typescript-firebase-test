import { useState, useEffect } from "react";

type User = {
    userId?: string | null
    mail?: string | null
}

const getUser = () => {
    return new Promise((res: (user: User) => void) => {
        setTimeout(() => {
            const user = {
                userId: null,
                mail: 'test@mail.com'
            }
            res(user)
        }, 2000)
    })
}

const createForm = (
    id: keyof User,
    label: string,
    type: string,
    value: string,
    setter: Function
) => ({
    id: id,
    label: label,
    type: type,
    value: value,
    setter: setter
})

const getUserParam = (setUserId: Function, setMail: Function) => {
    getUser().then(user => {
        setUserId(user.userId || '')
        setMail(user.mail || '')
    })
}

const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, setter: Function) => {
    const value = event.currentTarget.value
    setter(value)
}

const UserSetting = () => {
    const [userId, setUserId] = useState('')
    const [mail, setMail] = useState('')

    useEffect(() => getUserParam(setUserId, setMail), [])

    const paramList = [
        createForm('userId', '2', 'text', userId, setUserId),
        createForm('mail', '4', 'text', mail, setMail)
    ]

    const userForm = paramList.map(param => (
        <div key={param.id}>
            <textarea
                value={param.value}
                onChange={(e) => handleChange(e, param.setter)}
            />
        </div>
    ))

    return (
        <div>
            {userForm}
        </div>
    )
}

export default UserSetting